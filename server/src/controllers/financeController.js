import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';
import { generateQuotationPDF, generateInvoicePDF } from '../services/pdfService.js';
import { onQuotationAccepted, onPaymentReceived } from '../services/automationService.js';
import { logAudit } from '../services/auditService.js';

// ---- QUOTATIONS ----
export const getQuotations = (req, res) => {
  try {
    const quotations = db.prepare(`
      SELECT q.*, c.name as customer_name, c.company as customer_company,
             c.email as customer_email, c.phone as customer_phone,
             d.title as deal_title, u.name as created_by_name
      FROM quotations q
      LEFT JOIN customers c ON q.customer_id = c.id
      LEFT JOIN deals d ON q.deal_id = d.id
      LEFT JOIN users u ON q.created_by = u.id
      ORDER BY q.created_at DESC
    `).all();

    const formatted = quotations.map(q => ({
      ...q,
      items: JSON.parse(q.items || '[]')
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

function ensureCustomer(customerId, defaultName = 'Enterprise Client') {
  if (!customerId) customerId = 'CUST-001';
  let cust = db.prepare('SELECT id FROM customers WHERE id = ?').get(customerId);
  if (!cust) {
    let lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(customerId);
    if (lead) {
      db.prepare(`
        INSERT OR IGNORE INTO customers (id, lead_id, name, company, email, phone)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(customerId, lead.id, lead.name, lead.company || 'Enterprise Client', lead.email, lead.phone);
    } else {
      let firstCust = db.prepare('SELECT id FROM customers LIMIT 1').get();
      if (firstCust) return firstCust.id;
      db.prepare(`
        INSERT OR IGNORE INTO customers (id, name, company, email)
        VALUES (?, ?, ?, ?)
      `).run('CUST-001', defaultName, defaultName, 'client@neuorzin.com');
      return 'CUST-001';
    }
  }
  return customerId;
}

export const createQuotation = (req, res) => {
  try {
    let {
      deal_id, customer_id, service_title, scope_of_work, items, subtotal,
      discount, gst_rate, gst_amount, total_amount, valid_until, terms_conditions
    } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Line items are required' });
    }

    customer_id = ensureCustomer(customer_id, service_title || 'Enterprise Client');
    total_amount = parseFloat(total_amount) || (items.reduce((s, it) => s + (parseFloat(it.amount || it.rate || 0) * (parseFloat(it.qty || 1))), 0) * 1.18);
    subtotal = parseFloat(subtotal) || (total_amount / 1.18);
    gst_amount = parseFloat(gst_amount) || (total_amount - subtotal);

    let finalDealId = null;
    if (deal_id) {
      const d = db.prepare('SELECT id FROM deals WHERE id = ?').get(deal_id);
      if (d) finalDealId = d.id;
    }

    const qtnId = `QTN-${uuidv4().substring(0, 8)}`;
    const count = db.prepare('SELECT COUNT(*) as count FROM quotations').get().count;
    const quoteNumber = `QT-2026-${String(count + 1).padStart(4, '0')}`;

    db.prepare(`
      INSERT INTO quotations (
        id, quote_number, deal_id, customer_id, created_by,
        service_title, scope_of_work, items, subtotal, discount,
        gst_rate, gst_amount, total_amount, valid_until, terms_conditions, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Draft')
    `).run(
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
    );

    res.status(201).json({
      id: qtnId,
      quote_number: quoteNumber,
      message: 'Quotation created successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateQuotationStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existing = db.prepare('SELECT * FROM quotations WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ error: 'Quotation not found' });

    db.prepare('UPDATE quotations SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, id);
    const updated = db.prepare('SELECT * FROM quotations WHERE id = ?').get(id);

    if (status === 'Accepted' && existing.status !== 'Accepted') {
      onQuotationAccepted(updated);
    }

    res.json({ message: 'Quotation status updated', quotation: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const downloadQuotationPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const quotation = db.prepare('SELECT * FROM quotations WHERE id = ?').get(id);
    if (!quotation) return res.status(404).json({ error: 'Quotation not found' });

    const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(quotation.customer_id);
    const filePath = await generateQuotationPDF(quotation, customer);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    console.error('PDF error:', err);
    res.status(500).json({ error: err.message });
  }
};

// ---- INVOICES ----
export const getInvoices = (req, res) => {
  try {
    const invoices = db.prepare(`
      SELECT i.*, c.name as customer_name, c.company as customer_company,
             c.email as customer_email, c.phone as customer_phone, c.gst_number as customer_gst,
             d.title as deal_title, u.name as created_by_name
      FROM invoices i
      LEFT JOIN customers c ON i.customer_id = c.id
      LEFT JOIN deals d ON i.deal_id = d.id
      LEFT JOIN users u ON i.created_by = u.id
      ORDER BY i.issue_date DESC
    `).all();

    const formatted = invoices.map(inv => ({
      ...inv,
      items: JSON.parse(inv.items || '[]')
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createInvoice = (req, res) => {
  try {
    let {
      quotation_id, deal_id, customer_id, items, subtotal,
      discount, gst_number, gst_amount, total_amount, issue_date, due_date, notes
    } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Line items are required' });
    }

    customer_id = ensureCustomer(customer_id, 'Enterprise Client');
    total_amount = parseFloat(total_amount) || (items.reduce((s, it) => s + (parseFloat(it.amount || it.rate || 0) * (parseFloat(it.qty || 1))), 0) * 1.18);
    subtotal = parseFloat(subtotal) || (total_amount / 1.18);
    gst_amount = parseFloat(gst_amount) || (total_amount - subtotal);

    // Validate foreign keys
    let finalDealId = null;
    if (deal_id) {
      const d = db.prepare('SELECT id FROM deals WHERE id = ?').get(deal_id);
      if (d) finalDealId = d.id;
    }

    let finalQuoteId = null;
    if (quotation_id) {
      const q = db.prepare('SELECT id FROM quotations WHERE id = ?').get(quotation_id);
      if (q) finalQuoteId = q.id;
    }

    const invId = `INV-${uuidv4().substring(0, 8)}`;
    const count = db.prepare('SELECT COUNT(*) as count FROM invoices').get().count;
    const invoiceNumber = `INV-2026-${String(count + 1).padStart(4, '0')}`;

    db.prepare(`
      INSERT INTO invoices (
        id, invoice_number, quotation_id, deal_id, customer_id, created_by,
        issue_date, due_date, items, subtotal, discount,
        gst_number, gst_amount, total_amount, paid_amount, status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0.00, 'Unpaid', ?)
    `).run(
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
    );

    res.status(201).json({ id: invId, invoice_number: invoiceNumber, message: 'Invoice created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const downloadInvoicePdf = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(invoice.customer_id);
    const filePath = await generateInvoicePDF(invoice, customer);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    console.error('PDF error:', err);
    res.status(500).json({ error: err.message });
  }
};

// ---- PAYMENTS ----
export const recordPayment = (req, res) => {
  try {
    const { invoice_id, amount, payment_method, transaction_ref, payment_date, notes } = req.body;
    if (!invoice_id || !amount) {
      return res.status(400).json({ error: 'Invoice ID and amount are required' });
    }

    const invoice = db.prepare('SELECT * FROM invoices WHERE id = ?').get(invoice_id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    const paymentId = `PAY-${uuidv4().substring(0, 8)}`;
    const payCount = db.prepare('SELECT COUNT(*) as count FROM payments').get().count;
    const receiptNumber = `REC-${String(payCount + 1).padStart(4, '0')}`;

    db.prepare(`
      INSERT INTO payments (
        id, invoice_id, customer_id, receipt_number, amount,
        payment_method, transaction_ref, payment_date, notes, recorded_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      paymentId,
      invoice_id,
      invoice.customer_id,
      receiptNumber,
      amount,
      payment_method || 'Bank Transfer',
      transaction_ref || null,
      payment_date || new Date().toISOString().split('T')[0],
      notes || null,
      req.user ? req.user.id : 'USR-001'
    );

    const payment = db.prepare('SELECT * FROM payments WHERE id = ?').get(paymentId);
    onPaymentReceived(payment);

    res.status(201).json({
      message: 'Payment recorded successfully',
      paymentId,
      receiptNumber
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
