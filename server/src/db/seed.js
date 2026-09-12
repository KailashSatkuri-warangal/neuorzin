import bcrypt from 'bcryptjs';
import { db } from './database.js';
import { initSchema } from './schema.js';

export async function seedDatabase() {
  initSchema();

  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount > 0) {
    console.log('Database already contains records. Skipping initial seeding.');
    return;
  }

  console.log('Seeding initial CRM database...');

  const passwordHash = await bcrypt.hash('demo0722', 10);

  // 1. Seed Users
  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, password, role, department, phone, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUser.run('USR-001', 'Kailash S (Super Admin)', 'admin@neuorzin.com', passwordHash, 'Super Admin', 'Executive', '+91 77940 45500', 'Active');
  insertUser.run('USR-002', 'Rohan Mehta (Sales Lead)', 'rohan.sales@neuorzin.com', passwordHash, 'Sales Manager', 'Sales', '+91 98201 12345', 'Active');
  insertUser.run('USR-003', 'Ananya Roy (Senior AE)', 'ananya.ae@neuorzin.com', passwordHash, 'Sales Executive', 'Sales', '+91 98402 54321', 'Active');
  insertUser.run('USR-004', 'Vikram Sen (PM)', 'vikram.pm@neuorzin.com', passwordHash, 'Project Manager', 'Development', '+91 97112 88990', 'Active');
  insertUser.run('USR-005', 'Aditya Verma (Lead Dev)', 'aditya.dev@neuorzin.com', passwordHash, 'Developer', 'Development', '+91 96541 22334', 'Active');
  insertUser.run('USR-006', 'Meera Nair (Growth Lead)', 'meera.mktg@neuorzin.com', passwordHash, 'Digital Marketing', 'Marketing', '+91 99881 77665', 'Active');
  insertUser.run('USR-007', 'Sanjay Gupta (Finance)', 'accounts@neuorzin.com', passwordHash, 'Accounts', 'Finance', '+91 94432 11223', 'Active');

  // 2. Seed Pipelines
  const insertPipeline = db.prepare(`
    INSERT INTO pipelines (id, name, type, stages) VALUES (?, ?, ?, ?)
  `);

  insertPipeline.run(
    'PIPE-SW',
    'Software & App Development',
    'Sales',
    JSON.stringify([
      { name: 'Lead Qualified', probability: 20 },
      { name: 'Discovery & Scope', probability: 40 },
      { name: 'Proposal / Quote Sent', probability: 60 },
      { name: 'Negotiation', probability: 80 },
      { name: 'Won / Signed', probability: 100 }
    ])
  );

  insertPipeline.run(
    'PIPE-MKTG',
    'Digital Marketing & Growth Engines',
    'Sales',
    JSON.stringify([
      { name: 'Audit Request', probability: 25 },
      { name: 'Strategy Presentation', probability: 50 },
      { name: 'Proposal Sent', probability: 70 },
      { name: 'Contract Closing', probability: 90 },
      { name: 'Won / Retainer Live', probability: 100 }
    ])
  );

  insertPipeline.run(
    'PIPE-PRJ-DEV',
    'Standard Agile Delivery Framework',
    'Project',
    JSON.stringify([
      { name: 'Kickoff' },
      { name: 'Requirement Analysis' },
      { name: 'Architecture & UI/UX' },
      { name: 'Core Development' },
      { name: 'Internal QA' },
      { name: 'Client Review & UAT' },
      { name: 'Deployment' },
      { name: 'Support & Retainer' }
    ])
  );

  // 3. Seed Customers
  const insertCustomer = db.prepare(`
    INSERT INTO customers (id, name, company, email, phone, whatsapp, location, gst_number, balance_amount)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertCustomer.run('CUST-001', 'Arjun Nambiar', 'Aura Retail Global', 'arjun@auraretail.com', '+91 98112 34567', '+91 98112 34567', 'Bengaluru, India', '29AABCA1234F1Z5', 0);
  insertCustomer.run('CUST-002', 'Siddharth Rao', 'Nexis PropTech AI', 'siddharth@nexisprop.io', '+91 99401 22334', '+91 99401 22334', 'Hyderabad, India', '36AABCN9876E1Z9', 150000);
  insertCustomer.run('CUST-003', 'Dr. Kavita Deshmukh', 'SkillSphere EduTech', 'kavita@skillsphere.in', '+91 97654 88990', '+91 97654 88990', 'Mumbai, India', '27AABCS5432D1Z1', 0);

  // 4. Seed Leads
  const insertLead = db.prepare(`
    INSERT INTO leads (id, source, name, company, phone, whatsapp, email, location, service, requirement_need, budget, timeline, assigned_to, priority, score, status, utm_source, utm_campaign)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertLead.run(
    'LEAD-1001',
    'Website',
    'Arjun Nambiar',
    'Aura Retail Global',
    '+91 98112 34567',
    '+91 98112 34567',
    'arjun@auraretail.com',
    'Bengaluru, India',
    'Retail',
    'Headless Next.js e-commerce storefront with high concurrency and Shopify backend connector',
    '₹8,00,000 - ₹12,00,000',
    '6 Weeks',
    'USR-002',
    'High',
    95,
    'Won',
    'google',
    'brand_search'
  );

  insertLead.run(
    'LEAD-1002',
    'Google Ads',
    'Siddharth Rao',
    'Nexis PropTech AI',
    '+91 99401 22334',
    '+91 99401 22334',
    'siddharth@nexisprop.io',
    'Hyderabad, India',
    'Real Estate',
    'Interactive 3D geospatial property appraisal engine and tenant screening portal',
    '₹15,00,000+',
    '3 Months',
    'USR-003',
    'High',
    88,
    'Proposal',
    'google_ads',
    'proptech_solutions'
  );

  insertLead.run(
    'LEAD-1003',
    'Meta Ads',
    'Dr. Kavita Deshmukh',
    'SkillSphere EduTech',
    '+91 97654 88990',
    '+91 97654 88990',
    'kavita@skillsphere.in',
    'Mumbai, India',
    'EduTech',
    'AI adaptive exam scoring pipeline with real-time video proctoring and LMS integration',
    '₹10,00,000',
    '8 Weeks',
    'USR-002',
    'Medium',
    78,
    'Qualified',
    'meta_ads',
    'edutech_leadgen'
  );

  insertLead.run(
    'LEAD-1004',
    'WhatsApp',
    'Rajesh Singhal',
    'Singhal Heavy Manufacturing',
    '+91 98765 00112',
    '+91 98765 00112',
    'rajesh@singhalmachinery.com',
    'Pune, India',
    'Manufacturing',
    'SCADA telemetry IoT sensors dashboard and predictive maintenance alerting system',
    '₹18,00,000',
    '4 Months',
    'USR-003',
    'High',
    90,
    'New',
    'whatsapp_direct',
    'inbound_chat'
  );

  // 5. Seed Deals
  const insertDeal = db.prepare(`
    INSERT INTO deals (id, pipeline_id, title, lead_id, customer_id, assigned_to, stage, value, probability, expected_close_date, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertDeal.run('DEAL-001', 'PIPE-SW', 'Aura Retail - Headless Storefront & POS', 'LEAD-1001', 'CUST-001', 'USR-002', 'Won / Signed', 950000, 100, '2026-09-15', 'Won');
  insertDeal.run('DEAL-002', 'PIPE-SW', 'Nexis PropTech - 3D Geospatial Engine', 'LEAD-1002', 'CUST-002', 'USR-003', 'Proposal / Quote Sent', 1500000, 60, '2026-09-28', 'Open');
  insertDeal.run('DEAL-003', 'PIPE-MKTG', 'SkillSphere - B2B Inbound Acquisition Retainer', 'LEAD-1003', 'CUST-003', 'USR-002', 'Strategy Presentation', 450000, 50, '2026-10-05', 'Open');

  // 6. Seed Quotations
  const insertQuote = db.prepare(`
    INSERT INTO quotations (id, quote_number, lead_id, customer_id, deal_id, created_by, service_title, scope_of_work, items, subtotal, discount, gst_rate, gst_amount, total_amount, terms_conditions, valid_until, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const quoteItems1 = JSON.stringify([
    { description: 'Headless Next.js Storefront & Mobile Responsive UI Architecture', qty: 1, rate: 450000, amount: 450000 },
    { description: 'Omnichannel Real-Time Inventory Synchronization Gateway', qty: 1, rate: 300000, amount: 300000 },
    { description: 'Payment Orchestration (Stripe, UPI, Razorpay) & Fraud Shield', qty: 1, rate: 100000, amount: 100000 },
    { description: 'Cloud Infrastructure Setup (AWS ECS, Redis, CloudFront CDN)', qty: 1, rate: 100000, amount: 100000 }
  ]);

  insertQuote.run(
    'QT-001',
    'QT-2026-0101',
    'LEAD-1001',
    'CUST-001',
    'DEAL-001',
    'USR-002',
    'Headless Retail Storefront & Inventory Mesh',
    'Full engineering delivery from UX prototyping to production deployment with 90 days hypercare support.',
    quoteItems1,
    950000,
    50000,
    18.0,
    162000,
    1062000,
    'Payment Milestone: 40% Advance on Kickoff, 40% on UAT Approval, 20% on Production Launch.',
    '2026-09-30',
    'Accepted'
  );

  // 7. Seed Invoices & Payments
  const insertInvoice = db.prepare(`
    INSERT INTO invoices (id, invoice_number, quotation_id, deal_id, customer_id, created_by, issue_date, due_date, items, subtotal, discount, gst_number, gst_amount, total_amount, paid_amount, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const invItems1 = JSON.stringify([
    { description: 'Project Kickoff Milestone (40% Advance) - Headless Retail Storefront', qty: 1, rate: 360000, amount: 360000 },
    { description: 'GST @ 18% (CGST 9% + SGST 9%)', qty: 1, rate: 64800, amount: 64800 }
  ]);

  insertInvoice.run(
    'INV-001',
    'INV-2026-0042',
    'QT-001',
    'DEAL-001',
    'CUST-001',
    'USR-007',
    '2026-09-10',
    '2026-09-20',
    invItems1,
    360000,
    0,
    '29AABCA1234F1Z5',
    64800,
    424800,
    424800,
    'Paid'
  );

  const insertPayment = db.prepare(`
    INSERT INTO payments (id, invoice_id, customer_id, receipt_number, amount, payment_method, transaction_ref, recorded_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertPayment.run(
    'PAY-001',
    'INV-001',
    'CUST-001',
    'REC-2026-8801',
    424800,
    'Bank Transfer (NEFT/RTGS)',
    'HDFC00012398741029',
    'USR-007'
  );

  // 8. Seed Projects & Milestones
  const insertProject = db.prepare(`
    INSERT INTO projects (id, project_code, name, customer_id, deal_id, quotation_id, project_manager_id, department, start_date, deadline, budget, priority, status, health, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertProject.run(
    'PRJ-001',
    'PRJ-AURA-01',
    'Aura Retail - Headless Next.js Commerce Engine',
    'CUST-001',
    'DEAL-001',
    'QT-001',
    'USR-004',
    'Development',
    '2026-09-12',
    '2026-10-30',
    950000,
    'High',
    'Architecture & UI/UX',
    'Good',
    'Enterprise headless store with Shopify backend, multi-currency checkout, and real-time inventory synchronization.'
  );

  const insertMilestone = db.prepare(`
    INSERT INTO project_milestones (id, project_id, title, description, due_date, billing_amount, status, client_approved)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertMilestone.run('MS-001', 'PRJ-001', 'Sprint 1: System Architecture & Storefront UI Prototyping', 'Figma prototypes, Next.js boilerplate, API contract definitions', '2026-09-22', 360000, 'In Progress', 0);
  insertMilestone.run('MS-002', 'PRJ-001', 'Sprint 2: Inventory Sync Gateway & Checkout Engine', 'Redis cache integration, Shopify Webhooks, Stripe checkout', '2026-10-10', 360000, 'Pending', 0);
  insertMilestone.run('MS-003', 'PRJ-001', 'Sprint 3: QA, Performance Tuning & Deployment', 'Load testing (10k req/sec), CDN configuration, production go-live', '2026-10-30', 230000, 'Pending', 0);

  // 9. Seed Tasks
  const insertTask = db.prepare(`
    INSERT INTO tasks (id, task_code, project_id, title, description, department, assigned_to, priority, due_date, status, estimated_hours, logged_hours, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertTask.run(
    'TSK-001',
    'TSK-101',
    'PRJ-001',
    'Setup Next.js 15 App Router & Tailwind CSS Design System',
    'Implement atomic design tokens, theme switcher, responsive header and footer',
    'Development',
    'USR-005',
    'High',
    '2026-09-16 18:00:00',
    'In Progress',
    24,
    14,
    'USR-004'
  );

  insertTask.run(
    'TSK-002',
    'TSK-102',
    'PRJ-001',
    'Build Inventory WebSocket Lock Synchronization Mechanism',
    'Prevent concurrent order race conditions using Redis distributed lock keys',
    'Development',
    'USR-005',
    'Critical',
    '2026-09-20 18:00:00',
    'Todo',
    30,
    0,
    'USR-004'
  );

  // 10. Seed WhatsApp Templates
  const insertTemplate = db.prepare(`
    INSERT INTO whatsapp_templates (id, name, category, content) VALUES (?, ?, ?, ?)
  `);

  insertTemplate.run(
    'TPL-01',
    'inbound_lead_ack',
    'Acknowledgement',
    'Hi {{1}}, thank you for reaching out to NeuOrzin. Our senior solutions architect has received your project requirement for {{2}} and will connect with you shortly.'
  );

  insertTemplate.run(
    'TPL-02',
    'quotation_share',
    'Quotation',
    'Hello {{1}}, your official project proposal & quotation ({{2}}) for {{3}} is ready. View scope and terms here: {{4}}.'
  );

  insertTemplate.run(
    'TPL-03',
    'invoice_receipt',
    'Invoice',
    'Dear {{1}}, we have received your payment of ₹{{2}} against Invoice {{3}}. Receipt reference: {{4}}. Thank you for partnering with NeuOrzin.'
  );

  // 11. Seed Marketing Campaigns
  const insertCampaign = db.prepare(`
    INSERT INTO marketing_campaigns (id, name, platform, utm_source, utm_campaign, budget, spend, leads_generated, deals_won, revenue_generated, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertCampaign.run('CAMP-01', 'Q3 Enterprise App Development LeadGen', 'Google Ads', 'google_ads', 'app_dev_q3', 120000, 68000, 24, 3, 2450000, 'Active');
  insertCampaign.run('CAMP-02', 'PropTech & Real Estate AI Campaign', 'Meta Ads', 'meta_ads', 'proptech_ai_2026', 80000, 42000, 18, 1, 1500000, 'Active');
  insertCampaign.run('CAMP-03', 'High-Scale Retail E-Commerce Outreach', 'LinkedIn', 'linkedin', 'retail_headless_scale', 90000, 51000, 14, 2, 1900000, 'Active');

  console.log('CRM Database seeded successfully with full enterprise data across all modules!');
}

seedDatabase();
