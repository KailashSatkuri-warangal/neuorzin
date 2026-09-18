import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';
import { generateQuotationPDF, generateInvoicePDF, generateQuotationPDFBuffer, generateInvoicePDFBuffer } from '../services/pdfService.js';
import { onQuotationAccepted, onPaymentReceived } from '../services/automationService.js';
import { logAudit } from '../services/auditService.js';

async function ensureCustomer(customerId, defaultName = 'Enterprise Client') {
  if (!customerId) customerId = 'CUST-001';
  let cust = await db.get('SELECT id FROM customers WHERE id = ?', [customerId]);
  if (!cust) {
    let lead = await db.get('SELECT * FROM leads WHERE id = ?', [customerId]);
    if (lead) {
      await db.run(`
        INSERT INTO customers (id, lead_id, name, company, email, phone)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [customerId, lead.id, lead.name, lead.company || 'Enterprise Client', lead.email, lead.phone]);
    } else {
      let firstCust = await db.get('SELECT id FROM customers LIMIT 1');
      if (firstCust) return firstCust.id;
      await db.run(`
        INSERT INTO customers (id, name, company, email)
        VALUES (?, ?, ?, ?)
      `, ['CUST-001', defaultName, defaultName, 'client@neuorzin.com']);
      return 'CUST-001';
    }
  }
  return customerId;
}

export const getQuotations = async (req, res) => {
  try {
    const quotations = await db.all(`
      SELECT q.*, c.name as customer_name, c.company as customer_company,
             c.email as customer_email, c.phone as customer_phone,
             d.title as deal_title, u.name as created_by_name
      FROM quotations q
      LEFT JOIN customers c ON q.customer_id = c.id
      LEFT JOIN deals d ON q.deal_id = d.id
      LEFT JOIN users u ON q.created_by = u.id
      ORDER BY q.created_at DESC
    `);

    const formatted = quotations.map(q => ({
      ...q,
      items: typeof q.items === 'string' ? JSON.parse(q.items || '[]') : (q.items || [])
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createQuotation = async (req, res) => {
  try {
    let {
      deal_id, customer_id, service_title, scope_of_work, items, subtotal,
      discount, gst_rate, gst_amount, total_amount, valid_until, terms_conditions
    } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Line items are required' });
    }

    customer_id = await ensureCustomer(customer_id, service_title || 'Enterprise Client');
    total_amount = parseFloat(total_amount) || (items.reduce((s, it) => s + (parseFloat(it.amount || it.rate || 0) * (parseFloat(it.qty || 1))), 0) * 1.18);
    subtotal = parseFloat(subtotal) || (total_amount / 1.18);
    gst_amount = parseFloat(gst_amount) || (total_amount - subtotal);

    let finalDealId = null;
    if (deal_id) {
      const d = await db.get('SELECT id FROM deals WHERE id = ?', [deal_id]);
      if (d) finalDealId = d.id;
    }

    const qtnId = `QTN-${uuidv4().substring(0, 8)}`;
    const countRow = await db.get('SELECT COUNT(*) as count FROM quotations');
    const count = Number(countRow?.count || 0);
    const quoteNumber = `QT-2026-${String(count + 1).padStart(4, '0')}`;

    await db.run(`
      INSERT INTO quotations (
        id, quote_number, deal_id, customer_id, created_by,
        service_title, scope_of_work, items, subtotal, discount,
        gst_rate, gst_amount, total_amount, valid_until, terms_conditions, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Draft')
    `, [
      qtnId,
      quoteNumber,
      finalDealId,
      customer_id,
      req.user ? req.user.id : 'USR-001',
      service_title || 'Custom Engineering Scope',
      scope_of_work || null,
      JSON.stringify(items),
      subtotal,
      discount || 0,
      gst_rate || 18.0,
      gst_amount,
      total_amount,
      valid_until || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      terms_conditions || '1. 40% Advance on project kickoff.\n2. 40% on milestone beta release.\n3. 20% on final deployment.'
    ]);

    await logAudit({
      userId: req.user?.id || 'USR-001',
      userName: req.user?.name || 'Super Admin',
      action: 'QUOTATION_CREATED',
      entityType: 'Quotation',
      entityId: qtnId,
      changes: { quote_number: quoteNumber, total_amount }
    });

    res.status(201).json({ id: qtnId, quote_number: quoteNumber, message: 'Quotation created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateQuotationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db.run('UPDATE quotations SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);

    const quotation = await db.get('SELECT * FROM quotations WHERE id = ?', [id]);
    if (quotation && status === 'Accepted') {
      await onQuotationAccepted(quotation);
    }

    await logAudit({
      userId: req.user?.id || 'USR-001',
      userName: req.user?.name || 'Super Admin',
      action: 'QUOTATION_STATUS_CHANGE',
      entityType: 'Quotation',
      entityId: id,
      changes: { new_status: status }
    });

    res.json({ message: 'Quotation status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const downloadQuotationPdf = async (req, res) => {
  try {
    const { id } = req.params;
    let quotation = await db.get('SELECT * FROM quotations WHERE id = ? OR quote_number = ?', [id, id]);
    if (!quotation) {
      quotation = { id, quote_number: id, subtotal: 100000, gst_amount: 18000, total_amount: 118000, service_title: 'Enterprise Software Implementation' };
    }

    const customer = quotation.customer_id ? await db.get('SELECT * FROM customers WHERE id = ?', [quotation.customer_id]) : null;
    const pdfBuffer = await generateQuotationPDFBuffer(quotation, customer);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Quotation_${quotation.quote_number || id}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    return res.end(pdfBuffer);
  } catch (err) {
    console.error('Quotation PDF error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const invoices = await db.all(`
      SELECT i.*, c.name as customer_name, c.company as customer_company,
             c.email as customer_email, c.phone as customer_phone, c.gst_number as customer_gst,
             d.title as deal_title, u.name as created_by_name
      FROM invoices i
      LEFT JOIN customers c ON i.customer_id = c.id
      LEFT JOIN deals d ON i.deal_id = d.id
      LEFT JOIN users u ON i.created_by = u.id
      ORDER BY i.issue_date DESC
    `);

    const formatted = invoices.map(inv => ({
      ...inv,
      items: typeof inv.items === 'string' ? JSON.parse(inv.items || '[]') : (inv.items || [])
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createInvoice = async (req, res) => {
  try {
    let {
      quotation_id, deal_id, customer_id, items, subtotal,
      discount, gst_number, gst_amount, total_amount, issue_date, due_date, notes
    } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Line items are required' });
    }

    customer_id = await ensureCustomer(customer_id, 'Enterprise Client');
    total_amount = parseFloat(total_amount) || (items.reduce((s, it) => s + (parseFloat(it.amount || it.rate || 0) * (parseFloat(it.qty || 1))), 0) * 1.18);
    subtotal = parseFloat(subtotal) || (total_amount / 1.18);
    gst_amount = parseFloat(gst_amount) || (total_amount - subtotal);

    let finalDealId = null;
    if (deal_id) {
      const d = await db.get('SELECT id FROM deals WHERE id = ?', [deal_id]);
      if (d) finalDealId = d.id;
    }

    let finalQuoteId = null;
    if (quotation_id) {
      const q = await db.get('SELECT id FROM quotations WHERE id = ?', [quotation_id]);
      if (q) finalQuoteId = q.id;
    }

    const invId = `INV-${uuidv4().substring(0, 8)}`;
    const countRow = await db.get('SELECT COUNT(*) as count FROM invoices');
    const count = Number(countRow?.count || 0);
    const invoiceNumber = `INV-2026-${String(count + 1).padStart(4, '0')}`;

    await db.run(`
      INSERT INTO invoices (
        id, invoice_number, quotation_id, deal_id, customer_id, created_by,
        issue_date, due_date, items, subtotal, discount,
        gst_number, gst_amount, total_amount, paid_amount, status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0.00, 'Unpaid', ?)
    `, [
      invId,
      invoiceNumber,
      finalQuoteId,
      finalDealId,
      customer_id,
      req.user ? req.user.id : 'USR-001',
      issue_date || new Date().toISOString().split('T')[0],
      due_date || new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      JSON.stringify(items),
      subtotal,
      discount || 0,
      gst_number || '36AABCN1234F1Z5',
      gst_amount,
      total_amount,
      notes || 'Payment due within 15 days via NEFT/RTGS/IMPS or UPI.'
    ]);

    // Update Customer Outstanding Balance in ledger
    await db.run('UPDATE customers SET balance_amount = COALESCE(balance_amount, 0) + ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [total_amount, customer_id]);

    await logAudit({
      userId: req.user?.id || 'USR-001',
      userName: req.user?.name || 'Super Admin',
      action: 'INVOICE_ISSUED',
      entityType: 'Invoice',
      entityId: invId,
      changes: { invoice_number: invoiceNumber, total_amount }
    });

    res.status(201).json({ id: invId, invoice_number: invoiceNumber, message: 'Invoice created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const downloadInvoicePdf = async (req, res) => {
  try {
    const { id } = req.params;
    let invoice = await db.get('SELECT * FROM invoices WHERE id = ? OR invoice_number = ?', [id, id]);
    if (!invoice) {
      invoice = { id, invoice_number: id, total_amount: 200000, paid_amount: 200000, status: 'Paid', issue_date: '2026-09-18' };
    }

    const customer = invoice.customer_id ? await db.get('SELECT * FROM customers WHERE id = ?', [invoice.customer_id]) : null;
    const pdfBuffer = await generateInvoicePDFBuffer(invoice, customer);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Invoice_${invoice.invoice_number || id}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    return res.end(pdfBuffer);
  } catch (err) {
    console.error('Invoice PDF error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const recordPayment = async (req, res) => {
  try {
    const { invoice_id, amount, payment_date, payment_method, transaction_ref, notes } = req.body;
    if (!invoice_id || !amount) {
      return res.status(400).json({ error: 'Invoice ID and amount are required' });
    }

    const invoice = await db.get('SELECT * FROM invoices WHERE id = ?', [invoice_id]);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const paymentId = `PAY-${uuidv4().substring(0, 8)}`;
    const countRow = await db.get('SELECT COUNT(*) as count FROM payments');
    const recCount = Number(countRow?.count || 0);
    const receiptNumber = `REC-2026-${String(recCount + 1).padStart(4, '0')}`;

    await db.run(`
      INSERT INTO payments (
        id, invoice_id, customer_id, receipt_number, amount, payment_date, payment_method, transaction_ref, notes, recorded_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      paymentId,
      invoice_id,
      invoice.customer_id,
      receiptNumber,
      parseFloat(amount),
      payment_date || new Date().toISOString().split('T')[0],
      payment_method || 'Bank Transfer',
      transaction_ref || null,
      notes || null,
      req.user ? req.user.id : 'USR-001'
    ]);

    // Trigger payment automation & ledger reconciliation
    await onPaymentReceived({
      id: paymentId,
      invoice_id,
      amount: parseFloat(amount),
      payment_method,
      transaction_ref,
      recorded_by: req.user?.id || 'USR-001'
    });

    res.status(201).json({ message: 'Payment recorded and reconciled in ledger', paymentId, receiptNumber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    const { service_title, scope_of_work, items, subtotal, discount, gst_rate, gst_amount, total_amount, status, valid_until } = req.body;
    await db.run(`
      UPDATE quotations
      SET service_title = COALESCE(?, service_title),
          scope_of_work = COALESCE(?, scope_of_work),
          items = COALESCE(?, items),
          subtotal = COALESCE(?, subtotal),
          discount = COALESCE(?, discount),
          gst_rate = COALESCE(?, gst_rate),
          gst_amount = COALESCE(?, gst_amount),
          total_amount = COALESCE(?, total_amount),
          status = COALESCE(?, status),
          valid_until = COALESCE(?, valid_until),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      service_title || null,
      scope_of_work || null,
      items ? (typeof items === 'string' ? items : JSON.stringify(items)) : null,
      subtotal ? parseFloat(subtotal) : null,
      discount ? parseFloat(discount) : null,
      gst_rate ? parseFloat(gst_rate) : null,
      gst_amount ? parseFloat(gst_amount) : null,
      total_amount ? parseFloat(total_amount) : null,
      status || null,
      valid_until || null,
      id
    ]);
    res.json({ message: 'Quotation updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM quotations WHERE id = ?', [id]);
    res.json({ message: 'Quotation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { items, subtotal, discount, gst_amount, total_amount, issue_date, due_date, status, notes } = req.body;
    await db.run(`
      UPDATE invoices
      SET items = COALESCE(?, items),
          subtotal = COALESCE(?, subtotal),
          discount = COALESCE(?, discount),
          gst_amount = COALESCE(?, gst_amount),
          total_amount = COALESCE(?, total_amount),
          issue_date = COALESCE(?, issue_date),
          due_date = COALESCE(?, due_date),
          status = COALESCE(?, status),
          notes = COALESCE(?, notes),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      items ? (typeof items === 'string' ? items : JSON.stringify(items)) : null,
      subtotal ? parseFloat(subtotal) : null,
      discount ? parseFloat(discount) : null,
      gst_amount ? parseFloat(gst_amount) : null,
      total_amount ? parseFloat(total_amount) : null,
      issue_date || null,
      due_date || null,
      status || null,
      notes || null,
      id
    ]);
    res.json({ message: 'Invoice updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM payments WHERE invoice_id = ?', [id]);
    await db.run('DELETE FROM invoices WHERE id = ?', [id]);
    res.json({ message: 'Invoice deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

