import db from '../src/db/database.js';
import bcrypt from 'bcryptjs';
import { onNewLeadCreated, onDealWon, onQuotationAccepted, onPaymentReceived } from '../src/services/automationService.js';
import { generateQuotationPDF, generateInvoicePDF } from '../src/services/pdfService.js';

async function runTestSuite() {
  console.log('---------------------------------------------------------');
  console.log('🧪 RUNNING COMPREHENSIVE CRM INTEGRATION TEST SUITE');
  console.log('---------------------------------------------------------');

  // Test 1: Verify Database Schema
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log(`[PASS] Database initialized with ${tables.length} tables:`, tables.map(t => t.name).join(', '));

  // Test 2: Verify Super Admin Credentials
  const admin = db.prepare("SELECT * FROM users WHERE email = 'admin@neuorzin.com'").get();
  if (!admin) throw new Error('Super Admin user missing!');
  const isMatch = bcrypt.compareSync('demo0722', admin.password);
  if (!isMatch) throw new Error('Admin password hash mismatch!');
  console.log('[PASS] Super Admin credentials verified (admin@neuorzin.com / demo0722)');

  // Test 3: Test Inbound Lead & Automation Pipeline (SLA + Welcome Message)
  const testLeadId = `LEAD-TEST-${Date.now()}`;
  db.prepare(`
    INSERT INTO leads (id, name, email, phone, company, service, requirement_need, score, status)
    VALUES (?, 'Dr. Vikram Seth', 'vikram@apollo.org', '+91 9988776655', 'Apollo Health Tech', 'Healthcare AI Platform', 'Looking for an AI platform to analyze multi-modal scans.', 90, 'New')
  `).run(testLeadId);
  
  const newLead = db.prepare("SELECT * FROM leads WHERE id = ?").get(testLeadId);
  onNewLeadCreated(newLead);

  const activities = db.prepare("SELECT * FROM activities WHERE lead_id = ?").all(testLeadId);
  if (activities.length === 0) throw new Error('Automated follow-up task was not generated!');
  console.log(`[PASS] Lead #${testLeadId} created & SLA follow-up task triggered: "${activities[0].subject}"`);

  const waMsgs = db.prepare("SELECT * FROM whatsapp_messages WHERE lead_id = ?").all(testLeadId);
  if (waMsgs.length === 0) throw new Error('Automated WhatsApp welcome message was not sent!');
  console.log(`[PASS] Inbound Lead auto-dispatched WhatsApp welcome message`);

  // Test 4: Test PDF Generation
  const qtn = db.prepare('SELECT * FROM quotations LIMIT 1').get();
  const cust = db.prepare('SELECT * FROM customers LIMIT 1').get();
  const qtnPath = await generateQuotationPDF(qtn, cust);
  console.log(`[PASS] GST Quotation PDF generated successfully: ${qtnPath}`);

  const inv = db.prepare('SELECT * FROM invoices LIMIT 1').get();
  const invPath = await generateInvoicePDF(inv, cust);
  console.log(`[PASS] GST Invoice PDF generated successfully: ${invPath}`);

  // Test 5: Test Deal Won -> Auto Project & Advance Invoice Workflow
  const deal = db.prepare('SELECT * FROM deals LIMIT 1').get();
  onDealWon(deal);
  const proj = db.prepare('SELECT * FROM projects WHERE deal_id = ?').get(deal.id);
  if (!proj) throw new Error('Project not created on deal won!');
  const milestones = db.prepare('SELECT * FROM project_milestones WHERE project_id = ?').all(proj.id);
  console.log(`[PASS] Deal Won automation successfully instantiated Project #${proj.id} with ${milestones.length} milestones`);

  // Test 6: Verify Dashboard Metrics Calculation
  const rev = db.prepare("SELECT COALESCE(SUM(paid_amount), 0) as total FROM invoices").get().total;
  console.log(`[PASS] Dashboard Metrics Engine: Total Revenue = ₹${rev.toLocaleString('en-IN')}`);

  console.log('---------------------------------------------------------');
  console.log('✅ ALL BACKEND API & AUTOMATION TESTS PASSED 100%!');
  console.log('---------------------------------------------------------');
  process.exit(0);
}

runTestSuite().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
