import bcrypt from 'bcryptjs';
import { db } from './src/db/database.js';
import { initSchema } from './src/db/schema.js';

async function enrichDatabase() {
  initSchema();

  console.log('Enriching database with comprehensive multi-industry dataset...');

  const passwordHash = await bcrypt.hash('demo0722', 10);

  // Clear existing to reseed cleanly
  db.exec(`
    DELETE FROM timesheets;
    DELETE FROM tasks;
    DELETE FROM project_milestones;
    DELETE FROM projects;
    DELETE FROM payments;
    DELETE FROM invoices;
    DELETE FROM quotations;
    DELETE FROM whatsapp_messages;
    DELETE FROM deals;
    DELETE FROM activities;
    DELETE FROM customers;
    DELETE FROM leads;
    DELETE FROM marketing_campaigns;
    DELETE FROM audit_logs;
    DELETE FROM notifications;
    DELETE FROM users;
  `);

  // 1. Users
  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, password, role, department, phone, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'Active')
  `);

  insertUser.run('USR-001', 'Kailash S (Super Admin)', 'admin@neuorzin.com', passwordHash, 'Super Admin', 'Executive', '+91 77940 45500');
  insertUser.run('USR-002', 'Rohan Mehta (Sales Lead)', 'rohan.sales@neuorzin.com', passwordHash, 'Sales Manager', 'Sales', '+91 98201 12345');
  insertUser.run('USR-003', 'Ananya Roy (Senior AE)', 'ananya.ae@neuorzin.com', passwordHash, 'Sales Executive', 'Sales', '+91 98402 54321');
  insertUser.run('USR-004', 'Vikram Sen (PM)', 'vikram.pm@neuorzin.com', passwordHash, 'Project Manager', 'Development', '+91 97112 88990');
  insertUser.run('USR-005', 'Aditya Verma (Lead Dev)', 'aditya.dev@neuorzin.com', passwordHash, 'Developer', 'Development', '+91 96541 22334');
  insertUser.run('USR-006', 'Meera Nair (Growth Lead)', 'meera.mktg@neuorzin.com', passwordHash, 'Digital Marketing', 'Marketing', '+91 99881 77665');
  insertUser.run('USR-007', 'Sanjay Gupta (Finance)', 'accounts@neuorzin.com', passwordHash, 'Accounts', 'Finance', '+91 94432 11223');

  // 2. Customers
  const insertCust = db.prepare(`
    INSERT INTO customers (id, name, company, email, phone, whatsapp, location, gst_number, billing_address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertCust.run('CUST-001', 'Rajesh Sharma', 'RetailPro Omnichannel Ltd', 'rajesh.sharma@retailpro.in', '+91 98111 22334', '+91 98111 22334', 'Mumbai, India', '27AABCR1234F1Z1', 'Level 4, Bandra Kurla Complex, Mumbai');
  insertCust.run('CUST-002', 'Dr. Sunita Rao', 'Apex Healthcare Systems', 's.rao@apexhealth.org', '+91 98222 33445', '+91 98222 33445', 'Hyderabad, India', '36AABCA5678F1Z9', 'Hitech City, Hyderabad');
  insertCust.run('CUST-003', 'Vikramaditya Singhania', 'Precision Manufacturing Corp', 'v.singh@precisionmfg.com', '+91 98333 44556', '+91 98333 44556', 'Pune, India', '27AABCP9012F1Z3', 'Chakan Industrial Zone, Pune');
  insertCust.run('CUST-004', 'Pooja Hegde', 'Horizon Real Estate Holdings', 'pooja@horizonrealty.co.in', '+91 98444 55667', '+91 98444 55667', 'Bengaluru, India', '29AABCH3456F1Z5', 'MG Road, Bengaluru');
  insertCust.run('CUST-005', 'Arun Kumar', 'EduTech Next Knowledge Labs', 'arun.k@edutechnext.io', '+91 98555 66778', '+91 98555 66778', 'Delhi NCR, India', '07AABCE7890F1Z7', 'Sector 62, Noida');
  insertCust.run('CUST-006', 'Naveen Jindal', 'PureBlend CPG Brands', 'naveen@pureblendcpg.com', '+91 98666 77889', '+91 98666 77889', 'Chennai, India', '33AABCP1122F1Z2', 'OMR Road, Chennai');

  // 3. Leads (Targeting Retail, Manufacturing, Real Estate, EduTech, CPG, and AI)
  const insertLead = db.prepare(`
    INSERT INTO leads (
      id, source, name, company, phone, whatsapp, email, location, service,
      requirement_need, budget, timeline, assigned_to, team, priority, score, status,
      utm_source, utm_medium, utm_campaign
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Sales', ?, ?, ?, ?, ?, ?)
  `);

  insertLead.run(
    'LEAD-101', 'Google Ads', 'Rajesh Sharma', 'RetailPro Omnichannel Ltd', '+91 98111 22334', '+91 98111 22334',
    'rajesh.sharma@retailpro.in', 'Mumbai', 'Retail Omnichannel AI & POS',
    'Need unified multi-store POS sync with AI inventory demand forecasting across 45 stores.', '₹15,00,000 - ₹30,00,000',
    '3 Months', 'USR-002', 'High', 95, 'Qualified', 'google_ads', 'cpc', 'retail_q3'
  );

  insertLead.run(
    'LEAD-102', 'Website Contact Form', 'Dr. Sunita Rao', 'Apex Healthcare Systems', '+91 98222 33445', '+91 98222 33445',
    's.rao@apexhealth.org', 'Hyderabad', 'Healthcare Diagnostic AI Suite',
    'Looking for custom microservices and medical imaging automated triage platform.', '₹25,00,000 - ₹50,00,000',
    '4 Months', 'USR-003', 'High', 90, 'Won', 'direct_web', 'organic', 'healthcare_seo'
  );

  insertLead.run(
    'LEAD-103', 'LinkedIn Ads', 'Vikramaditya Singhania', 'Precision Manufacturing Corp', '+91 98333 44556', '+91 98333 44556',
    'v.singh@precisionmfg.com', 'Pune', 'Manufacturing IoT & Predictive Maintenance',
    'Plant floor IoT telemetry integration with predictive maintenance dashboard.', '₹18,00,000 - ₹35,00,000',
    '2 Months', 'USR-002', 'High', 85, 'Proposal', 'linkedin', 'inbound', 'mfg_iot_2026'
  );

  insertLead.run(
    'LEAD-104', 'Meta Ads', 'Pooja Hegde', 'Horizon Real Estate Holdings', '+91 98444 55667', '+91 98444 55667',
    'pooja@horizonrealty.co.in', 'Bengaluru', 'Real Estate CRM & 3D Interactive Virtual Tour',
    'Need lead auto-capture engine for luxury apartments with 3D floor plan explorer.', '₹10,00,000 - ₹20,00,000',
    '1 Month', 'USR-003', 'Medium', 80, 'Contacted', 'meta_ads', 'paid_social', 'realty_leads'
  );

  insertLead.run(
    'LEAD-105', 'Website Enquiry', 'Arun Kumar', 'EduTech Next Knowledge Labs', '+91 98555 66778', '+91 98555 66778',
    'arun.k@edutechnext.io', 'Noida', 'EduTech Adaptive Learning Platform',
    'LMS platform with AI-assisted quiz generation and automated student progress analytics.', '₹12,00,000 - ₹25,00,000',
    '3 Months', 'USR-002', 'High', 88, 'New', 'organic_search', 'seo', 'edutech_lms'
  );

  insertLead.run(
    'LEAD-106', 'Referral', 'Naveen Jindal', 'PureBlend CPG Brands', '+91 98666 77889', '+91 98666 77889',
    'naveen@pureblendcpg.com', 'Chennai', 'CPG Direct-to-Consumer Growth Engine & Shopify Plus',
    'D2C headless commerce architecture with automated WhatsApp re-engagement flows.', '₹8,00,000 - ₹15,00,000',
    '1 Month', 'USR-003', 'Medium', 75, 'New', 'referral', 'direct', 'cpg_growth'
  );

  // 4. Deals
  const insertDeal = db.prepare(`
    INSERT INTO deals (
      id, pipeline_id, title, lead_id, customer_id, assigned_to,
      stage, value, currency, probability, expected_close_date, status, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'INR', ?, ?, ?, ?)
  `);

  insertDeal.run('DEAL-201', 'PIPE-SW', 'Apex Health - Diagnostic AI Platform', 'LEAD-102', 'CUST-002', 'USR-003', 'Won / Signed', 2800000.00, 100, '2026-09-01', 'Won', 'Deal closed and kickoff advance invoice issued.');
  insertDeal.run('DEAL-202', 'PIPE-SW', 'RetailPro - Omnichannel POS Sync', 'LEAD-101', 'CUST-001', 'USR-002', 'Negotiation', 1850000.00, 80, '2026-09-25', 'Open', 'Final commercial negotiations on scope.');
  insertDeal.run('DEAL-203', 'PIPE-SW', 'Precision Mfg - IoT Predictive Suite', 'LEAD-103', 'CUST-003', 'USR-002', 'Discovery & Scope', 1400000.00, 50, '2026-10-15', 'Open', 'Technical architecture review in progress.');
  insertDeal.run('DEAL-204', 'PIPE-MKTG', 'Horizon Realty - Digital Growth Retainer', 'LEAD-104', 'CUST-004', 'USR-003', 'Proposal Sent', 600000.00, 60, '2026-09-30', 'Open', 'Paid search and lead funnel proposal submitted.');
  insertDeal.run('DEAL-205', 'PIPE-SW', 'EduTech Next - Adaptive LMS Core', 'LEAD-105', 'CUST-005', 'USR-002', 'Lead Qualified', 1200000.00, 30, '2026-10-30', 'Open', 'Discovery call scheduled.');

  // 5. Quotations
  const insertQuote = db.prepare(`
    INSERT INTO quotations (
      id, quote_number, lead_id, customer_id, deal_id, created_by,
      service_title, scope_of_work, items, subtotal, discount,
      gst_rate, gst_amount, total_amount, terms_conditions, valid_until, status
    ) VALUES (?, ?, ?, ?, ?, 'USR-001', ?, ?, ?, ?, 0, 18.0, ?, ?, ?, '2026-10-15', ?)
  `);

  const quoteItems1 = JSON.stringify([
    { description: 'Phase 1: Architecture Blueprint & Cloud Infra', qty: 1, rate: 800000, amount: 800000 },
    { description: 'Phase 2: Custom Healthcare Microservices & LLM Triage', qty: 1, rate: 1200000, amount: 1200000 },
    { description: 'Phase 3: Clinical UAT, Security & HIPAA Compliance', qty: 1, rate: 800000, amount: 800000 }
  ]);
  insertQuote.run('QTN-301', 'QT-2026-0101', 'LEAD-102', 'CUST-002', 'DEAL-201', 'Healthcare Diagnostic AI Suite', 'Comprehensive cloud-native diagnostic AI microservices architecture.', quoteItems1, 2800000, 504000, 3304000, '40% Advance on Kickoff, 40% on Beta, 20% on Deployment.', 'Accepted');

  const quoteItems2 = JSON.stringify([
    { description: 'Omnichannel POS Core Integration Engine', qty: 1, rate: 1000000, amount: 1000000 },
    { description: 'AI Demand Forecasting & Store Sync Microservices', qty: 1, rate: 850000, amount: 850000 }
  ]);
  insertQuote.run('QTN-302', 'QT-2026-0102', 'LEAD-101', 'CUST-001', 'DEAL-202', 'Retail Omnichannel POS & AI Sync', 'Real-time multi-store inventory synchronization engine.', quoteItems2, 1850000, 333000, 2183000, '40% Kickoff Advance, 40% Delivery Milestone, 20% Sign-off.', 'Sent');

  // 6. Invoices & Payments
  const insertInv = db.prepare(`
    INSERT INTO invoices (
      id, invoice_number, quotation_id, deal_id, customer_id, created_by,
      issue_date, due_date, items, subtotal, discount,
      gst_number, gst_amount, total_amount, paid_amount, status, notes
    ) VALUES (?, ?, ?, ?, ?, 'USR-001', ?, ?, ?, ?, 0, '36ABCDE1234F1Z5', ?, ?, ?, ?, ?)
  `);

  const invItems1 = JSON.stringify([
    { description: '40% Mobilization Advance: Healthcare Diagnostic AI Platform', sac: '998313', qty: 1, rate: 1120000, amount: 1120000 }
  ]);
  insertInv.run('INV-401', 'INV-2026-0041', 'QTN-301', 'DEAL-201', 'CUST-002', '2026-09-02', '2026-09-16', invItems1, 1120000, 201600, 1321600, 1321600, 'Paid', '40% Project Kickoff Advance Payment - Fully Reconciled');

  const invItems2 = JSON.stringify([
    { description: 'Milestone 2: Custom AI Diagnostic Models Beta Release', sac: '998313', qty: 1, rate: 1120000, amount: 1120000 }
  ]);
  insertInv.run('INV-402', 'INV-2026-0042', 'QTN-301', 'DEAL-201', 'CUST-002', '2026-09-10', '2026-09-24', invItems2, 1120000, 201600, 1321600, 500000, 'Partially Paid', 'Milestone 2 Beta Progress Invoice - ₹5,00,000 received');

  const insertPay = db.prepare(`
    INSERT INTO payments (
      id, invoice_id, customer_id, receipt_number, amount,
      payment_method, transaction_ref, payment_date, notes, recorded_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'USR-001')
  `);

  insertPay.run('PAY-501', 'INV-401', 'CUST-002', 'REC-2026-0001', 1321600, 'Bank Transfer', 'NEFT-HDFC-998822', '2026-09-04', 'Full advance received');
  insertPay.run('PAY-502', 'INV-402', 'CUST-002', 'REC-2026-0002', 500000, 'Bank Transfer', 'RTGS-ICICI-443322', '2026-09-11', 'Part payment for Milestone 2');

  // 7. Projects & Milestones
  const insertProj = db.prepare(`
    INSERT INTO projects (
      id, project_code, name, customer_id, deal_id, quotation_id,
      project_manager_id, department, start_date, deadline, budget,
      priority, status, health, description
    ) VALUES (?, ?, ?, ?, ?, ?, 'USR-004', 'Development', ?, ?, ?, ?, ?, ?, ?)
  `);

  insertProj.run('PRJ-601', 'PRJ-2026-0001', 'Apex Health AI Diagnostic Engine', 'CUST-002', 'DEAL-201', 'QTN-301', '2026-09-05', '2026-12-15', 2800000, 'High', 'Development', 'Good', 'Active delivery sprint for clinical diagnostic microservices.');
  insertProj.run('PRJ-602', 'PRJ-2026-0002', 'RetailPro Omnichannel Sync Engine', 'CUST-001', 'DEAL-202', 'QTN-302', '2026-09-15', '2026-11-30', 1850000, 'Medium', 'Kickoff', 'Good', 'Initial discovery and POS API interface specifications.');

  const insertMilestone = db.prepare(`
    INSERT INTO project_milestones (id, project_id, title, due_date, billing_amount, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insertMilestone.run('MS-701', 'PRJ-601', 'Milestone 1: Architectural Blueprint & Cloud Infra', '2026-09-20', 1120000, 'Completed');
  insertMilestone.run('MS-702', 'PRJ-601', 'Milestone 2: MVP Development & AI Microservices', '2026-10-30', 1120000, 'In Progress');
  insertMilestone.run('MS-703', 'PRJ-601', 'Milestone 3: Clinical UAT & Cloud Deployment', '2026-12-10', 560000, 'Pending');

  // 8. Tasks & Timesheets
  const insertTask = db.prepare(`
    INSERT INTO tasks (
      id, task_code, project_id, title, description, department,
      assigned_to, priority, status, estimated_hours, logged_hours,
      due_date, created_by
    ) VALUES (?, ?, ?, ?, ?, ?, 'USR-005', ?, ?, ?, ?, ?, 'USR-004')
  `);

  insertTask.run('TSK-801', 'TSK-001', 'PRJ-601', 'Implement DICOM scan ingestion microservice', 'Build async background queue for multi-modal medical scan uploads.', 'Development', 'Critical', 'In Progress', 32, 24, '2026-09-18');
  insertTask.run('TSK-802', 'TSK-002', 'PRJ-601', 'Integrate HIPAA audit logging engine', 'Immutable JSON logging for patient data access verification.', 'Development', 'High', 'Completed', 16, 16, '2026-09-12');
  insertTask.run('TSK-803', 'TSK-003', 'PRJ-602', 'Design POS webhook sync schema', 'Event-driven webhook receiver for store inventory updates.', 'Development', 'Medium', 'Todo', 20, 0, '2026-09-22');

  const insertTime = db.prepare(`
    INSERT INTO timesheets (id, task_id, user_id, date, hours, notes)
    VALUES (?, ?, 'USR-005', ?, ?, ?)
  `);
  insertTime.run('TM-901', 'TSK-801', '2026-09-11', 8, 'Engineered S3 async presigned upload handlers.');
  insertTime.run('TM-902', 'TSK-801', '2026-09-12', 6, 'Built worker queue consumer and image compression.');
  insertTime.run('TM-903', 'TSK-802', '2026-09-10', 8, 'Created audit log database model and tamper check.');

  // 9. Activities & SLA Follow-ups
  const insertAct = db.prepare(`
    INSERT INTO activities (id, lead_id, customer_id, deal_id, user_id, type, subject, notes, scheduled_at, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertAct.run('ACT-1001', 'LEAD-101', 'CUST-001', 'DEAL-202', 'USR-002', 'Meeting', 'Commercial Scope Review with CTO', 'Review revised POS integration timelines.', '2026-09-14 11:00:00', 'Pending');
  insertAct.run('ACT-1002', 'LEAD-103', 'CUST-003', 'DEAL-203', 'USR-002', 'Call', 'SLA 2-Hour Technical Discovery Call', 'Qualify PLC and IoT gateway network security specs.', '2026-09-13 15:30:00', 'Pending');
  insertAct.run('ACT-1003', 'LEAD-104', 'CUST-004', 'DEAL-204', 'USR-003', 'Email', 'Send Horizon 3D Virtual Tour Deck', 'Dispatched proposal PDF and pricing tier.', '2026-09-11 16:00:00', 'Completed');

  // 10. WhatsApp Messages
  const insertWa = db.prepare(`
    INSERT INTO whatsapp_messages (id, lead_id, customer_id, direction, from_phone, to_phone, message, template_id, status, timestamp)
    VALUES (?, ?, ?, ?, '+91 77940 45500', ?, ?, ?, 'Delivered', ?)
  `);

  insertWa.run('WAM-1101', 'LEAD-102', 'CUST-002', 'Outbound', '+91 98222 33445', 'Hello Dr. Sunita, thank you for reaching out to NeuOrzin! We have assigned a Senior AI Solutions Architect to review your diagnostic triage requirement.', 'TPL-ACK-01', '2026-09-01 10:15:00');
  insertWa.run('WAM-1102', 'LEAD-101', 'CUST-001', 'Outbound', '+91 98111 22334', 'Hi Rajesh, formal Quotation QT-2026-0102 for RetailPro Omnichannel POS Sync has been generated. Please review at your earliest convenience.', 'TPL-QUOTE-01', '2026-09-08 14:20:00');
  insertWa.run('WAM-1103', 'LEAD-103', 'CUST-003', 'Outbound', '+91 98333 44556', 'Greetings Vikramaditya, your IoT predictive maintenance architecture deck has been shared over email. Let us know if 3:30 PM tomorrow works for a quick walkthrough.', 'TPL-DIRECT', '2026-09-12 09:30:00');

  // 11. Marketing Campaigns
  const insertCamp = db.prepare(`
    INSERT INTO marketing_campaigns (
      id, name, platform, utm_source, utm_campaign, budget,
      spend, impressions, clicks, leads_generated, deals_won, revenue_generated, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')
  `);

  insertCamp.run('CMP-1201', 'Q3 Enterprise AI Search & Solution Demand', 'Google Ads', 'google_ads', 'enterprise_ai_search', 150000, 112000, 48500, 3200, 42, 4, 4200000);
  insertCamp.run('CMP-1202', 'Manufacturing & Industry 4.0 IoT Sponsored', 'LinkedIn Ads', 'linkedin', 'mfg_iot_2026', 100000, 78000, 24000, 1150, 18, 2, 1400000);
  insertCamp.run('CMP-1203', 'Real Estate & Omnichannel Retargeting', 'Meta Ads', 'meta_ads', 'omnichannel_growth', 60000, 42000, 92000, 4100, 35, 1, 600000);

  // 12. Audit Logs
  const insertAudit = db.prepare(`
    INSERT INTO audit_logs (id, entity_type, entity_id, action, user_id, user_name, changes, timestamp)
    VALUES (?, ?, ?, ?, 'USR-001', 'Kailash S (Super Admin)', ?, ?)
  `);

  insertAudit.run('AUD-1301', 'Invoice', 'INV-401', 'PAYMENT_RECORDED', 'Recorded full payment of ₹13,21,600 for Invoice INV-2026-0041', '2026-09-04 15:45:00');
  insertAudit.run('AUD-1302', 'Quotation', 'QTN-301', 'STATUS_CHANGE', 'Quotation QT-2026-0101 marked as Accepted by Client', '2026-09-02 11:20:00');
  insertAudit.run('AUD-1303', 'Project', 'PRJ-601', 'PROJECT_CREATED', 'Project PRJ-2026-0001 automatically generated from Won Deal', '2026-09-02 11:21:00');
  insertAudit.run('AUD-1304', 'Lead', 'LEAD-101', 'LEAD_CREATED', 'Inbound Lead from RetailPro Omnichannel captured & SLA task assigned to USR-002', '2026-09-08 09:30:00');

  // 13. Notifications
  const insertNotif = db.prepare(`
    INSERT INTO notifications (id, user_id, title, message, type, link, is_read, created_at)
    VALUES (?, 'USR-001', ?, ?, ?, ?, 0, ?)
  `);

  insertNotif.run('NOTIF-1401', '💰 Milestone Payment Received', 'Received ₹5,00,000 for Invoice INV-2026-0042 (Apex Health). Balance remaining: ₹8,21,600.', 'Success', '/admin?tab=invoices', '2026-09-11 16:30:00');
  insertNotif.run('NOTIF-1402', '⚡ High Priority SLA Task Due', 'SLA 2-Hour Technical Discovery Call with Precision Mfg Corp is scheduled for 3:30 PM.', 'Warning', '/admin?tab=activities', '2026-09-12 09:00:00');

  console.log('Enrichment complete! Database successfully populated with realistic multi-industry data.');
  process.exit(0);
}

enrichDatabase().catch(err => {
  console.error('Enrichment error:', err);
  process.exit(1);
});
