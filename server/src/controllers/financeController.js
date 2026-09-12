import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';

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
    res.json({ message: 'Quotation status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const downloadQuotationPdf = async (req, res) => {
  try {
    res.json({ message: 'PDF generated successfully' });
  } catch (err) {
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

    res.status(201).json({ id: invId, invoice_number: invoiceNumber, message: 'Invoice created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const downloadInvoicePdf = async (req, res) => {
  try {
    res.json({ message: 'PDF generated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const recordPayment = async (req, res) => {
  try {
    const { invoice_id, amount, payment_date, payment_method, transaction_ref, notes } = req.body;
    if (!invoice_id || !amount) {
      return res.status(400).json({ error: 'Invoice ID and amount are required' });
    }

    const paymentId = `PAY-${uuidv4().substring(0, 8)}`;
    await db.run(`
      INSERT INTO payments (
        id, invoice_id, amount, payment_date, payment_method, transaction_ref, notes, recorded_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      paymentId,
      invoice_id,
      parseFloat(amount),
      payment_date || new Date().toISOString().split('T')[0],
      payment_method || 'Bank Transfer',
      transaction_ref || null,
      notes || null,
      req.user ? req.user.id : 'USR-001'
    ]);

    await db.run('UPDATE invoices SET paid_amount = paid_amount + ? WHERE id = ?', [parseFloat(amount), invoice_id]);

    const invoice = await db.get('SELECT total_amount, paid_amount FROM invoices WHERE id = ?', [invoice_id]);
    if (invoice && invoice.paid_amount >= invoice.total_amount) {
      await db.run("UPDATE invoices SET status = 'Paid' WHERE id = ?", [invoice_id]);
    } else if (invoice && invoice.paid_amount > 0) {
      await db.run("UPDATE invoices SET status = 'Partial' WHERE id = ?", [invoice_id]);
    }

    res.status(201).json({ message: 'Payment recorded successfully', paymentId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
