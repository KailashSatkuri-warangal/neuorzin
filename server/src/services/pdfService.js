import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Safe uploads directory with tmp fallback for serverless (Vercel)
let uploadsDir = path.resolve(__dirname, '../../uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch {
  uploadsDir = os.tmpdir();
}

function renderQuotationContent(doc, quotation, customer) {
  // Header Brand
  doc.fillColor('#0070ba')
     .fontSize(22)
     .font('Helvetica-Bold')
     .text('NEUORZIN CRM & TECH LABS', 50, 50);
  
  doc.fillColor('#64748b')
     .fontSize(9)
     .font('Helvetica')
     .text('Enterprise Software & Autonomous AI Solutions Provider', 50, 75)
     .text('GSTIN: 36AAACN1234F1Z8 | SAC: 998313 | info@neuorzin.com | www.neuorzin.com', 50, 88);

  // Divider
  doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(50, 108).lineTo(545, 108).stroke();

  // Quotation Title
  doc.fillColor('#0f172a')
     .fontSize(15)
     .font('Helvetica-Bold')
     .text('FORMAL GST COMMERCIAL ESTIMATE / QUOTATION', 50, 122);

  // Meta block
  doc.fontSize(9).font('Helvetica').fillColor('#334155')
     .text(`Quotation #: ${quotation.quote_number || quotation.id}`, 50, 145)
     .text(`Issue Date: ${new Date(quotation.created_at || Date.now()).toLocaleDateString('en-IN')}`, 50, 158)
     .text(`Valid Until: ${quotation.valid_until || '30 Days from Issue'}`, 50, 171)
     .text(`Scope: ${quotation.service_title || 'Enterprise Software Implementation'}`, 50, 184);

  // Customer block
  doc.font('Helvetica-Bold').fillColor('#0f172a').text('Prepared For:', 320, 145)
     .font('Helvetica').fillColor('#334155')
     .text(customer?.company || quotation.company || quotation.customer_name || 'Valued Client Enterprise', 320, 158)
     .text(`Attn: ${customer?.name || quotation.customer_name || 'Project Sponsor'}`, 320, 171)
     .text(`Email: ${customer?.email || 'client@enterprise.com'}`, 320, 184)
     .text(`GSTIN: ${customer?.gst_number || '36AAACN9999Z1Z5'}`, 320, 197);

  // Table Header
  let y = 220;
  doc.rect(50, y, 495, 22).fill('#f1f5f9');
  doc.fillColor('#1e293b').font('Helvetica-Bold').fontSize(9)
     .text('Item / Service Deliverable Scope', 60, y + 6)
     .text('Qty', 290, y + 6)
     .text('Rate (₹)', 350, y + 6)
     .text('Amount (₹)', 460, y + 6);

  y += 28;
  const items = typeof quotation.items === 'string' ? JSON.parse(quotation.items) : (quotation.items || [
    { description: 'Phase 1: Architecture & UI/UX Design System', qty: 1, rate: quotation.subtotal ? quotation.subtotal * 0.4 : 50000, amount: quotation.subtotal ? quotation.subtotal * 0.4 : 50000 },
    { description: 'Phase 2: Core Engineering & Backend Services', qty: 1, rate: quotation.subtotal ? quotation.subtotal * 0.6 : 75000, amount: quotation.subtotal ? quotation.subtotal * 0.6 : 75000 }
  ]);
  
  doc.font('Helvetica').fontSize(9).fillColor('#334155');
  items.forEach((item) => {
    doc.text(item.description || item.name || 'Custom Engineering Scope', 60, y, { width: 220 })
       .text(String(item.qty || item.quantity || 1), 290, y)
       .text(Number(item.rate || item.unit_price || 0).toLocaleString('en-IN'), 350, y)
       .text(Number(item.amount || item.total || 0).toLocaleString('en-IN'), 460, y);
    y += 20;
  });

  // Totals
  y += 15;
  doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(50, y).lineTo(545, y).stroke();
  y += 10;

  const sub = Number(quotation.subtotal || (Number(quotation.total_amount || 0) / 1.18));
  const gst = Number(quotation.gst_amount || (sub * 0.18));
  const tot = Number(quotation.total_amount || (sub + gst));

  doc.font('Helvetica-Bold').fontSize(9).fillColor('#1e293b')
     .text('Subtotal (Taxable):', 320, y).text(`₹ ${sub.toLocaleString('en-IN')}`, 450, y);
  y += 16;
  doc.font('Helvetica').fontSize(9).fillColor('#64748b')
     .text(`GST (18% Integrated IGST/CGST):`, 320, y).text(`₹ ${gst.toLocaleString('en-IN')}`, 450, y);
  y += 18;
  doc.font('Helvetica-Bold').fontSize(12).fillColor('#0070ba')
     .text('Total Commercial Value:', 300, y).text(`₹ ${tot.toLocaleString('en-IN')}`, 440, y);

  // Terms
  y += 35;
  doc.font('Helvetica-Bold').fontSize(9).fillColor('#0f172a').text('Terms & Milestone Conditions:', 50, y);
  y += 14;
  doc.font('Helvetica').fontSize(8).fillColor('#64748b')
     .text(quotation.terms_conditions || '1. 40% Mobilization advance upon quotation acceptance.\n2. 40% upon staging milestone demo.\n3. 20% upon final production deployment and handover.', 50, y, { width: 495 });
}

function renderInvoiceContent(doc, invoice, customer) {
  // Header Brand
  doc.fillColor('#059669')
     .fontSize(22)
     .font('Helvetica-Bold')
     .text('TAX INVOICE', 50, 50);
  
  doc.fillColor('#64748b')
     .fontSize(9)
     .font('Helvetica')
     .text('NEUORZIN TECH LABS PVT LTD', 50, 75)
     .text('GSTIN: 36AAACN1234F1Z8 | SAC: 998313 | Hitech City, Hyderabad, India', 50, 88);

  // Status Badge
  const isPaid = invoice.status === 'Paid';
  doc.rect(430, 45, 115, 28).fill(isPaid ? '#dcfce7' : '#fee2e2');
  doc.fillColor(isPaid ? '#15803d' : '#b91c1c')
     .fontSize(11)
     .font('Helvetica-Bold')
     .text((invoice.status || 'PENDING').toUpperCase(), 442, 54);

  // Divider
  doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(50, 108).lineTo(545, 108).stroke();

  // Meta
  doc.fillColor('#334155').fontSize(9).font('Helvetica')
     .text(`Invoice Number: ${invoice.invoice_number || invoice.id}`, 50, 125)
     .text(`Issue Date: ${invoice.issue_date || new Date().toISOString().split('T')[0]}`, 50, 138)
     .text(`Due Date: ${invoice.due_date || 'Net 15 Days'}`, 50, 151)
     .text(`SAC Code: 998313 (IT Software Design & Development)`, 50, 164);

  // Billed To
  doc.font('Helvetica-Bold').fillColor('#0f172a').text('Billed To (Client):', 320, 125)
     .font('Helvetica').fillColor('#334155')
     .text(customer?.company || invoice.company || invoice.customer_name || 'Client Enterprise', 320, 138)
     .text(`Attn: ${customer?.name || invoice.customer_name || 'Accounts Payable'}`, 320, 151)
     .text(`GSTIN: ${customer?.gst_number || '36AAACN8888Z1Z2'}`, 320, 164)
     .text(`Email: ${customer?.email || 'accounts@enterprise.com'}`, 320, 177);

  // Table Header
  let y = 205;
  doc.rect(50, y, 495, 22).fill('#f8fafc');
  doc.fillColor('#1e293b').font('Helvetica-Bold').fontSize(9)
     .text('Milestone / Deliverable Description', 60, y + 6)
     .text('SAC Code', 280, y + 6)
     .text('Taxable (₹)', 360, y + 6)
     .text('Amount (₹)', 465, y + 6);

  y += 28;
  const items = typeof invoice.items === 'string' ? JSON.parse(invoice.items) : (invoice.items || [
    { description: 'Enterprise AI & Custom Software Architecture Implementation', sac: '998313', rate: invoice.total_amount || 75000, amount: invoice.total_amount || 75000 }
  ]);
  
  doc.font('Helvetica').fontSize(9).fillColor('#334155');
  items.forEach((item) => {
    doc.text(item.description || item.name || 'Deliverable Item', 60, y, { width: 210 })
       .text(item.sac || '998313', 280, y)
       .text(Number(item.rate || item.amount || 0).toLocaleString('en-IN'), 360, y)
       .text(Number(item.amount || item.total || 0).toLocaleString('en-IN'), 465, y);
    y += 20;
  });

  // Summary
  y += 15;
  doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(50, y).lineTo(545, y).stroke();
  y += 10;

  const total = Number(invoice.total_amount || 0);
  const paid = Number(invoice.paid_amount || 0);
  const balanceDue = Math.max(0, total - paid);

  doc.font('Helvetica-Bold').fontSize(9).fillColor('#1e293b')
     .text('Total Invoice Amount:', 320, y).text(`₹ ${total.toLocaleString('en-IN')}`, 450, y);
  y += 16;
  doc.font('Helvetica').fontSize(9).fillColor('#059669')
     .text('Total Amount Received:', 320, y).text(`₹ ${paid.toLocaleString('en-IN')}`, 450, y);
  y += 16;
  doc.font('Helvetica-Bold').fontSize(11).fillColor(balanceDue > 0 ? '#b91c1c' : '#059669')
     .text('Balance Outstanding:', 320, y).text(`₹ ${balanceDue.toLocaleString('en-IN')}`, 450, y);

  // Bank Details
  y += 35;
  doc.font('Helvetica-Bold').fontSize(9).fillColor('#0f172a').text('Bank Remittance Information:', 50, y);
  y += 14;
  doc.font('Helvetica').fontSize(8).fillColor('#64748b')
     .text('Account Name: NEUORZIN TECH LABS PVT LTD | Bank: HDFC Bank Ltd', 50, y)
     .text('A/C No: 50200088991122 | IFSC: HDFC0001234 | Branch: Hitech City, Hyderabad', 50, y + 11)
     .text('UPI ID: neuorzin@hdfcbank | Payment Terms: Immediate via RTGS/NEFT/IMPS', 50, y + 22);
}

export const generateQuotationPDFBuffer = (quotation, customer) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const buffers = [];
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      renderQuotationContent(doc, quotation, customer);
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

export const generateInvoicePDFBuffer = (invoice, customer) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const buffers = [];
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      renderInvoiceContent(doc, invoice, customer);
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

export const generateQuotationPDF = async (quotation, customer) => {
  const fileName = `Quotation_${quotation.quote_number || quotation.id}.pdf`;
  const filePath = path.join(uploadsDir, fileName);
  const buffer = await generateQuotationPDFBuffer(quotation, customer);
  try {
    fs.writeFileSync(filePath, buffer);
  } catch {}
  return filePath;
};

export const generateInvoicePDF = async (invoice, customer) => {
  const fileName = `Invoice_${invoice.invoice_number || invoice.id}.pdf`;
  const filePath = path.join(uploadsDir, fileName);
  const buffer = await generateInvoicePDFBuffer(invoice, customer);
  try {
    fs.writeFileSync(filePath, buffer);
  } catch {}
  return filePath;
};
