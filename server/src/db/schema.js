import { db } from './database.js';

export function initSchema() {
  db.exec(`
    -- 1. USERS & ROLES
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'Sales Executive',
      department TEXT NOT NULL DEFAULT 'Sales',
      phone TEXT,
      avatar TEXT,
      status TEXT NOT NULL DEFAULT 'Active',
      permissions TEXT, -- JSON string of granular overrides
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 2. LEADS (Inbound & Outbound Lead Management)
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      source TEXT NOT NULL DEFAULT 'Website',
      name TEXT NOT NULL,
      company TEXT,
      phone TEXT,
      whatsapp TEXT,
      email TEXT NOT NULL,
      location TEXT,
      service TEXT NOT NULL,
      requirement_need TEXT,
      budget TEXT,
      timeline TEXT,
      assigned_to TEXT,
      team TEXT DEFAULT 'Sales',
      priority TEXT DEFAULT 'Medium', -- Low, Medium, High
      score INTEGER DEFAULT 50,
      status TEXT DEFAULT 'New', -- New, Contacted, Qualified, Meeting, Proposal, Negotiation, Won, Lost
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT,
      last_activity_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      next_followup_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
    );

    -- 3. CUSTOMERS / ACCOUNTS
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      lead_id TEXT,
      name TEXT NOT NULL,
      company TEXT,
      email TEXT NOT NULL,
      phone TEXT,
      whatsapp TEXT,
      location TEXT,
      gst_number TEXT,
      billing_address TEXT,
      balance_amount REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL
    );

    -- 4. FOLLOW-UPS & ACTIVITIES
    CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY,
      lead_id TEXT,
      customer_id TEXT,
      deal_id TEXT,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL, -- Call, WhatsApp, Email, Meeting, Note
      subject TEXT NOT NULL,
      notes TEXT,
      scheduled_at DATETIME,
      completed_at DATETIME,
      status TEXT DEFAULT 'Pending', -- Pending, Completed, Overdue, Cancelled
      next_action TEXT,
      outcome TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- 5. SALES PIPELINES & DEALS
    CREATE TABLE IF NOT EXISTS pipelines (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL, -- e.g. Software Development, Website Development, Digital Marketing, SEO, Social Media, Advertising, Support
      type TEXT DEFAULT 'Sales', -- Sales, Project
      stages TEXT NOT NULL, -- JSON array of stages
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS deals (
      id TEXT PRIMARY KEY,
      pipeline_id TEXT NOT NULL,
      title TEXT NOT NULL,
      lead_id TEXT,
      customer_id TEXT,
      assigned_to TEXT,
      stage TEXT NOT NULL, -- Stage name
      value REAL DEFAULT 0,
      currency TEXT DEFAULT 'INR',
      probability INTEGER DEFAULT 20, -- 0-100%
      expected_close_date DATE,
      status TEXT DEFAULT 'Open', -- Open, Won, Lost, Abandoned
      lost_reason TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (pipeline_id) REFERENCES pipelines(id) ON DELETE CASCADE,
      FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
      FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
    );

    -- 6. WHATSAPP SHARED INBOX & TEMPLATES
    CREATE TABLE IF NOT EXISTS whatsapp_templates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL, -- Acknowledgement, Quotation, Invoice, Project_Milestone, Followup
      content TEXT NOT NULL,
      language TEXT DEFAULT 'en',
      status TEXT DEFAULT 'Approved',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS whatsapp_messages (
      id TEXT PRIMARY KEY,
      lead_id TEXT,
      customer_id TEXT,
      deal_id TEXT,
      user_id TEXT,
      direction TEXT NOT NULL, -- Inbound, Outbound
      from_phone TEXT NOT NULL,
      to_phone TEXT NOT NULL,
      message TEXT NOT NULL,
      template_id TEXT,
      status TEXT DEFAULT 'Sent', -- Sent, Delivered, Read, Failed
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );

    -- 7. QUOTATIONS / PROPOSALS
    CREATE TABLE IF NOT EXISTS quotations (
      id TEXT PRIMARY KEY,
      quote_number TEXT UNIQUE NOT NULL, -- QT-2026-XXXX
      lead_id TEXT,
      customer_id TEXT NOT NULL,
      deal_id TEXT,
      created_by TEXT NOT NULL,
      service_title TEXT NOT NULL,
      scope_of_work TEXT,
      items TEXT NOT NULL, -- JSON array of line items { description, qty, rate, tax, amount }
      subtotal REAL NOT NULL,
      discount REAL DEFAULT 0,
      gst_rate REAL DEFAULT 18.0,
      gst_amount REAL DEFAULT 0,
      total_amount REAL NOT NULL,
      terms_conditions TEXT,
      valid_until DATE,
      status TEXT DEFAULT 'Draft', -- Draft, Sent, Viewed, Accepted, Rejected, Expired
      pdf_path TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
      FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE SET NULL,
      FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
    );

    -- 8. INVOICES & PAYMENTS
    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      invoice_number TEXT UNIQUE NOT NULL, -- INV-2026-XXXX
      quotation_id TEXT,
      deal_id TEXT,
      customer_id TEXT NOT NULL,
      created_by TEXT NOT NULL,
      issue_date DATE NOT NULL,
      due_date DATE NOT NULL,
      items TEXT NOT NULL, -- JSON array
      subtotal REAL NOT NULL,
      discount REAL DEFAULT 0,
      gst_number TEXT,
      gst_amount REAL DEFAULT 0,
      total_amount REAL NOT NULL,
      paid_amount REAL DEFAULT 0,
      status TEXT DEFAULT 'Unpaid', -- Unpaid, Partially Paid, Paid, Overdue, Cancelled
      notes TEXT,
      pdf_path TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
      FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE SET NULL,
      FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      invoice_id TEXT NOT NULL,
      customer_id TEXT NOT NULL,
      receipt_number TEXT UNIQUE NOT NULL, -- REC-XXXX
      amount REAL NOT NULL,
      payment_method TEXT NOT NULL, -- Bank Transfer, UPI, Razorpay, Stripe, Card, Cash
      transaction_ref TEXT,
      payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      notes TEXT,
      recorded_by TEXT NOT NULL,
      FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
      FOREIGN KEY (recorded_by) REFERENCES users(id) ON DELETE CASCADE
    );

    -- 9. PROJECTS & PROJECT PIPELINES
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      project_code TEXT UNIQUE NOT NULL, -- PRJ-XXXX
      name TEXT NOT NULL,
      customer_id TEXT NOT NULL,
      deal_id TEXT,
      quotation_id TEXT,
      project_manager_id TEXT,
      department TEXT DEFAULT 'Development',
      start_date DATE,
      deadline DATE,
      budget REAL DEFAULT 0,
      priority TEXT DEFAULT 'High',
      status TEXT DEFAULT 'Kickoff', -- Kickoff, Requirement, Planning, Design, Development, Internal QA, Client Review, Changes, Final Approval, Deployment, Completed, Support
      health TEXT DEFAULT 'Good', -- Good, At Risk, Delayed
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
      FOREIGN KEY (project_manager_id) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS project_milestones (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      due_date DATE,
      billing_amount REAL DEFAULT 0,
      linked_invoice_id TEXT,
      status TEXT DEFAULT 'Pending', -- Pending, In Progress, Completed, Approved
      client_approved INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    );

    -- 10. TEAMS, TASKS & TIMESHEETS
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      task_code TEXT UNIQUE NOT NULL, -- TSK-XXXX
      project_id TEXT,
      title TEXT NOT NULL,
      description TEXT,
      department TEXT NOT NULL, -- Development, Design, Digital Marketing, SEO, Support
      assigned_to TEXT,
      priority TEXT DEFAULT 'Medium', -- Low, Medium, High, Critical
      due_date DATETIME,
      status TEXT DEFAULT 'Todo', -- Todo, In Progress, In Review, Completed, Blocked
      estimated_hours REAL DEFAULT 0,
      logged_hours REAL DEFAULT 0,
      subtasks TEXT, -- JSON array of subtasks
      created_by TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
      FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS timesheets (
      id TEXT PRIMARY KEY,
      task_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      date DATE NOT NULL,
      hours REAL NOT NULL,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- 11. MARKETING CAMPAIGNS & LEAD SOURCES
    CREATE TABLE IF NOT EXISTS marketing_campaigns (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      platform TEXT NOT NULL, -- Google Ads, Meta Ads, LinkedIn, Organic SEO, Email
      utm_source TEXT,
      utm_campaign TEXT,
      budget REAL DEFAULT 0,
      spend REAL DEFAULT 0,
      impressions INTEGER DEFAULT 0,
      clicks INTEGER DEFAULT 0,
      leads_generated INTEGER DEFAULT 0,
      deals_won INTEGER DEFAULT 0,
      revenue_generated REAL DEFAULT 0,
      status TEXT DEFAULT 'Active',
      start_date DATE,
      end_date DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 12. AUTOMATION RULES & LOGS
    CREATE TABLE IF NOT EXISTS automation_rules (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      trigger_event TEXT NOT NULL, -- NEW_LEAD, LEAD_ASSIGNED, FOLLOWUP_DUE, FOLLOWUP_OVERDUE, QUOTE_ACCEPTED, PAYMENT_RECEIVED, TASK_OVERDUE
      conditions TEXT, -- JSON condition rules
      actions TEXT NOT NULL, -- JSON action list
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS automation_logs (
      id TEXT PRIMARY KEY,
      rule_id TEXT,
      event_type TEXT NOT NULL,
      details TEXT,
      status TEXT DEFAULT 'Success',
      executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 13. AUDIT LOGS & SYSTEM NOTIFICATIONS
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      entity_type TEXT NOT NULL, -- Lead, Deal, Quotation, Invoice, Project, Task, User
      entity_id TEXT NOT NULL,
      action TEXT NOT NULL, -- CREATE, UPDATE, DELETE, STATUS_CHANGE, ASSIGN
      user_id TEXT,
      user_name TEXT,
      changes TEXT, -- JSON diff
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT DEFAULT 'Info', -- Info, Warning, Success, Escalation
      link TEXT,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Database schema initialized with all 13 core modules!');
}
