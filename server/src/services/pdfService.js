import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.resolve(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const generateQuotationPDF = (quotation, customer) => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = `Quotation_${quotation.quote_number}.pdf`;
      const filePath = path.join(uploadsDir, fileName);
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // Header Brand
      doc.fillColor('#4338ca')
         .fontSize(22)
         .font('Helvetica-Bold')
         .text('NEUORZIN CRM & TECH LABS', 50, 50);
      
      doc.fillColor('#6b7280')
         .fontSize(9)
         .font('Helvetica')
         .text('Enterprise Software & AI Solutions Provider', 50, 75)
         .text('GSTIN: 36ABCDE1234F1Z5 | info@neuorzin.com | www.neuorzin.com', 50, 88);

      // Divider
      doc.strokeColor('#e5e7eb').lineWidth(1).moveTo(50, 110).lineTo(545, 110).stroke();

      // Quotation Title
      doc.fillColor('#111827')
         .fontSize(16)
         .font('Helvetica-Bold')
         .text('FORMAL GST QUOTATION', 50, 125);

      // Meta block
      doc.fontSize(10).font('Helvetica')
         .text(`Quotation #: ${quotation.quote_number}`, 50, 150)
         .text(`Date: ${new Date(quotation.created_at || Date.now()).toLocaleDateString('en-IN')}`, 50, 165)
         .text(`Valid Until: ${quotation.valid_until || '30 Days'}`, 50, 180);

      // Customer block
      doc.font('Helvetica-Bold').text('Prepared For:', 320, 150)
         .font('Helvetica')
         .text(customer?.company || customer?.name || 'Valued Client', 320, 165)
         .text(`Attn: ${customer?.name || 'Management'}`, 320, 180)
         .text(`Email: ${customer?.email || 'N/A'}`, 320, 195)
         .text(`Phone: ${customer?.phone || 'N/A'}`, 320, 210);

      // Table Header
      let y = 240;
      doc.rect(50, y, 495, 22).fill('#f3f4f6');
      doc.fillColor('#374151').font('Helvetica-Bold').fontSize(9)
         .text('Item / Service Scope', 60, y + 6)
         .text('Qty', 290, y + 6)
         .text('Unit Price (₹)', 350, y + 6)
         .text('Amount (₹)', 460, y + 6);

      y += 28;
      const items = typeof quotation.items === 'string' ? JSON.parse(quotation.items) : (quotation.items || []);
      
      doc.font('Helvetica').fontSize(9).fillColor('#1f2937');
      items.forEach((item) => {
        doc.text(item.description || item.name || 'Custom Engineering Scope', 60, y, { width: 220 })
           .text(String(item.qty || item.quantity || 1), 290, y)
           .text(Number(item.rate || item.unit_price || 0).toLocaleString('en-IN'), 350, y)
           .text(Number(item.amount || item.total || 0).toLocaleString('en-IN'), 460, y);
        y += 20;
      });

      // Totals
      y += 15;
      doc.strokeColor('#e5e7eb').lineWidth(1).moveTo(50, y).lineTo(545, y).stroke();
      y += 10;

      doc.font('Helvetica-Bold').fontSize(10).fillColor('#111827')
         .text('Subtotal:', 350, y).text(`₹ ${Number(quotation.subtotal || quotation.total_amount).toLocaleString('en-IN')}`, 460, y);
      y += 16;
      doc.font('Helvetica').fontSize(9)
         .text(`GST (${quotation.gst_rate || 18}% Integrated):`, 350, y).text(`₹ ${Number(quotation.gst_amount || 0).toLocaleString('en-IN')}`, 460, y);
      y += 18;
      doc.font('Helvetica-Bold').fontSize(12).fillColor('#4338ca')
         .text('Total Investment:', 320, y).text(`₹ ${Number(quotation.total_amount).toLocaleString('en-IN')}`, 450, y);

      // Terms
      y += 35;
      doc.font('Helvetica-Bold').fontSize(10).fillColor('#111827').text('Terms & Commercial Conditions:', 50, y);
      y += 15;
      doc.font('Helvetica').fontSize(8).fillColor('#4b5563')
         .text(quotation.terms_conditions || '1. 40% Advance upon acceptance\n2. 40% upon beta milestone\n3. 20% upon final UAT & deployment', 50, y, { width: 495 });

      doc.end();
      stream.on('finish', () => resolve(filePath));
      stream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
};

export const generateInvoicePDF = (invoice, customer) => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = `Invoice_${invoice.invoice_number}.pdf`;
      const filePath = path.join(uploadsDir, fileName);
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // Header Brand
      doc.fillColor('#059669')
         .fontSize(22)
         .font('Helvetica-Bold')
         .text('TAX INVOICE', 50, 50);
      
      doc.fillColor('#6b7280')
         .fontSize(9)
         .font('Helvetica')
         .text('NEUORZIN TECH LABS PVT LTD', 50, 75)
         .text('GSTIN: 36ABCDE1234F1Z5 | Hitech City, Hyderabad, India', 50, 88);

      // Status Badge
      doc.rect(430, 45, 115, 30).fill(invoice.status === 'Paid' ? '#d1fae5' : '#fee2e2');
      doc.fillColor(invoice.status === 'Paid' ? '#065f46' : '#991b1b')
         .fontSize(12)
         .font('Helvetica-Bold')
         .text((invoice.status || 'UNPAID').toUpperCase(), 445, 54);

      // Divider
      doc.strokeColor('#e5e7eb').lineWidth(1).moveTo(50, 110).lineTo(545, 110).stroke();

      // Meta
      doc.fillColor('#111827').fontSize(10).font('Helvetica')
         .text(`Invoice Number: ${invoice.invoice_number}`, 50, 130)
         .text(`Issue Date: ${invoice.issue_date}`, 50, 145)
         .text(`Due Date: ${invoice.due_date}`, 50, 160);

      // Billed To
      doc.font('Helvetica-Bold').text('Billed To:', 320, 130)
         .font('Helvetica')
         .text(customer?.company || customer?.name || 'Client', 320, 145)
         .text(`GSTIN: ${customer?.gst_number || 'Unregistered'}`, 320, 160)
         .text(`Email: ${customer?.email || 'N/A'}`, 320, 175);

      // Table Header
      let y = 210;
      doc.rect(50, y, 495, 22).fill('#f9fafb');
      doc.fillColor('#374151').font('Helvetica-Bold').fontSize(9)
         .text('Milestone / Deliverable', 60, y + 6)
         .text('SAC/HSN', 270, y + 6)
         .text('Taxable Value', 360, y + 6)
         .text('Amount (₹)', 465, y + 6);

      y += 28;
      const items = typeof invoice.items === 'string' ? JSON.parse(invoice.items) : (invoice.items || []);
      doc.font('Helvetica').fontSize(9).fillColor('#1f2937');
      items.forEach((item) => {
        doc.text(item.description || item.name || 'Deliverable', 60, y, { width: 200 })
           .text(item.sac || '998313', 270, y)
           .text(Number(item.rate || item.amount || 0).toLocaleString('en-IN'), 360, y)
           .text(Number(item.amount || item.total || 0).toLocaleString('en-IN'), 465, y);
        y += 20;
      });

      // Summary
      y += 20;
      doc.strokeColor('#e5e7eb').lineWidth(1).moveTo(50, y).lineTo(545, y).stroke();
      y += 10;

      doc.font('Helvetica-Bold').fontSize(10).fillColor('#111827')
         .text('Total Amount Due:', 320, y).text(`₹ ${Number(invoice.total_amount).toLocaleString('en-IN')}`, 450, y);
      y += 16;
      doc.font('Helvetica').fontSize(9).fillColor('#059669')
         .text('Amount Paid:', 320, y).text(`₹ ${Number(invoice.paid_amount || 0).toLocaleString('en-IN')}`, 450, y);
      y += 16;
      const balanceDue = Number(invoice.total_amount) - Number(invoice.paid_amount || 0);
      doc.font('Helvetica-Bold').fontSize(11).fillColor('#b91c1c')
         .text('Balance Outstanding:', 320, y).text(`₹ ${balanceDue.toLocaleString('en-IN')}`, 450, y);

      // Bank Details
      y += 35;
      doc.font('Helvetica-Bold').fontSize(10).fillColor('#111827').text('Bank Remittance Information:', 50, y);
      y += 15;
      doc.font('Helvetica').fontSize(8).fillColor('#4b5563')
         .text('Account Name: NEUORZIN TECH LABS PVT LTD | Bank: HDFC Bank Ltd', 50, y)
         .text('A/C No: 50200088991122 | IFSC: HDFC0001234 | Branch: Hitech City, Hyderabad', 50, y + 12)
         .text('UPI ID: neuorzin@hdfcbank', 50, y + 24);

      doc.end();
      stream.on('finish', () => resolve(filePath));
      stream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
};
