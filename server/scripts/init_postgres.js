import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;

if (!connectionString) {
  console.log('❌ No POSTGRES_URL or DATABASE_URL provided in environment variables.');
  console.log('👉 To test Vercel Postgres:');
  console.log('   1. Create a free Postgres database in Vercel Storage (or Neon.tech)');
  console.log('   2. Copy the connection string: postgres://default:***@ep-***.postgres.vercel-storage.com:5432/verceldb?sslmode=require');
  console.log('   3. Set POSTGRES_URL="your_connection_string" in server/.env');
  console.log('   4. Run: node scripts/init_postgres.js');
  process.exit(1);
}

console.log('Connecting to Vercel Postgres / Neon serverless database...');

const cleanConnectionString = connectionString.replace(/[\?&]sslmode=[^&]+/g, '').replace(/[\?&]supa=[^&]+/g, '');

const pool = new Pool({
  connectionString: cleanConnectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initPostgres() {
  const client = await pool.connect();
  try {
    console.log('✅ Connected successfully to Vercel Postgres!');

    console.log('Creating tables...');

    await client.query(`
      -- 1. USERS & ROLES
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(100) NOT NULL DEFAULT 'Sales Executive',
        department VARCHAR(100) NOT NULL DEFAULT 'Sales',
        phone VARCHAR(50),
        avatar TEXT,
        status VARCHAR(50) NOT NULL DEFAULT 'Active',
        permissions JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- 2. LEADS
      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(64) PRIMARY KEY,
        source VARCHAR(100) NOT NULL DEFAULT 'Website',
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        phone VARCHAR(50),
        whatsapp VARCHAR(50),
        email VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        service VARCHAR(255) NOT NULL,
        requirement_need TEXT,
        budget VARCHAR(100),
        timeline VARCHAR(100),
        assigned_to VARCHAR(64),
        team VARCHAR(100) DEFAULT 'Sales',
        priority VARCHAR(50) DEFAULT 'Medium',
        score INTEGER DEFAULT 50,
        status VARCHAR(50) DEFAULT 'New',
        utm_source VARCHAR(100),
        utm_medium VARCHAR(100),
        utm_campaign VARCHAR(100),
        utm_content VARCHAR(100),
        last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        next_followup_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
      );

      -- 3. CUSTOMERS
      CREATE TABLE IF NOT EXISTS customers (
        id VARCHAR(64) PRIMARY KEY,
        lead_id VARCHAR(64),
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        whatsapp VARCHAR(50),
        location VARCHAR(255),
        gst_number VARCHAR(50),
        billing_address TEXT,
        balance_amount NUMERIC DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL
      );

      -- 4. ACTIVITIES
      CREATE TABLE IF NOT EXISTS activities (
        id VARCHAR(64) PRIMARY KEY,
        lead_id VARCHAR(64),
        customer_id VARCHAR(64),
        deal_id VARCHAR(64),
        user_id VARCHAR(64) NOT NULL,
        type VARCHAR(50) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        notes TEXT,
        scheduled_at TIMESTAMP WITH TIME ZONE,
        completed_at TIMESTAMP WITH TIME ZONE,
        status VARCHAR(50) DEFAULT 'Pending',
        next_action VARCHAR(255),
        outcome VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      -- 5. PIPELINES & DEALS
      CREATE TABLE IF NOT EXISTS pipelines (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) DEFAULT 'Sales',
        stages JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS deals (
        id VARCHAR(64) PRIMARY KEY,
        pipeline_id VARCHAR(64) NOT NULL,
        title VARCHAR(255) NOT NULL,
        lead_id VARCHAR(64),
        customer_id VARCHAR(64),
        assigned_to VARCHAR(64),
        stage VARCHAR(100) NOT NULL,
        value NUMERIC DEFAULT 0,
        currency VARCHAR(10) DEFAULT 'INR',
        probability INTEGER DEFAULT 20,
        expected_close_date DATE,
        status VARCHAR(50) DEFAULT 'Open',
        lost_reason TEXT,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (pipeline_id) REFERENCES pipelines(id) ON DELETE CASCADE,
        FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
      );

      -- 6. WHATSAPP
      CREATE TABLE IF NOT EXISTS whatsapp_templates (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        language VARCHAR(10) DEFAULT 'en',
        status VARCHAR(50) DEFAULT 'Approved',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS whatsapp_messages (
        id VARCHAR(64) PRIMARY KEY,
        lead_id VARCHAR(64),
        customer_id VARCHAR(64),
        deal_id VARCHAR(64),
        user_id VARCHAR(64),
        direction VARCHAR(50) NOT NULL,
        from_phone VARCHAR(50) NOT NULL,
        to_phone VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        template_id VARCHAR(64),
        status VARCHAR(50) DEFAULT 'Sent',
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      );

      -- 7. QUOTATIONS
      CREATE TABLE IF NOT EXISTS quotations (
        id VARCHAR(64) PRIMARY KEY,
        quote_number VARCHAR(100) UNIQUE NOT NULL,
        deal_id VARCHAR(64),
        customer_id VARCHAR(64) NOT NULL,
        created_by VARCHAR(64) NOT NULL,
        service_title VARCHAR(255) NOT NULL,
        scope_of_work TEXT,
        items JSONB NOT NULL,
        subtotal NUMERIC NOT NULL,
        discount NUMERIC DEFAULT 0,
        gst_rate NUMERIC DEFAULT 18.0,
        gst_amount NUMERIC NOT NULL,
        total_amount NUMERIC NOT NULL,
        valid_until DATE NOT NULL,
        terms_conditions TEXT,
        status VARCHAR(50) DEFAULT 'Draft',
        pdf_path VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE SET NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
      );

      -- 8. INVOICES & PAYMENTS
      CREATE TABLE IF NOT EXISTS invoices (
        id VARCHAR(64) PRIMARY KEY,
        invoice_number VARCHAR(100) UNIQUE NOT NULL,
        quotation_id VARCHAR(64),
        deal_id VARCHAR(64),
        customer_id VARCHAR(64) NOT NULL,
        created_by VARCHAR(64) NOT NULL,
        issue_date DATE NOT NULL,
        due_date DATE NOT NULL,
        items JSONB NOT NULL,
        subtotal NUMERIC NOT NULL,
        discount NUMERIC DEFAULT 0,
        gst_number VARCHAR(50),
        gst_amount NUMERIC NOT NULL,
        total_amount NUMERIC NOT NULL,
        paid_amount NUMERIC DEFAULT 0,
        status VARCHAR(50) DEFAULT 'Unpaid',
        pdf_path VARCHAR(255),
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE SET NULL,
        FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE SET NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS payments (
        id VARCHAR(64) PRIMARY KEY,
        invoice_id VARCHAR(64) NOT NULL,
        amount NUMERIC NOT NULL,
        payment_date DATE NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        transaction_ref VARCHAR(100),
        notes TEXT,
        recorded_by VARCHAR(64) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
        FOREIGN KEY (recorded_by) REFERENCES users(id) ON DELETE CASCADE
      );

      -- 9. PROJECTS & TASKS
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(64) PRIMARY KEY,
        project_code VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        customer_id VARCHAR(64) NOT NULL,
        deal_id VARCHAR(64),
        project_manager_id VARCHAR(64) NOT NULL,
        department VARCHAR(100) DEFAULT 'Development',
        start_date DATE NOT NULL,
        deadline DATE,
        budget NUMERIC DEFAULT 0,
        priority VARCHAR(50) DEFAULT 'High',
        status VARCHAR(50) DEFAULT 'Kickoff',
        health VARCHAR(50) DEFAULT 'Good',
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE SET NULL,
        FOREIGN KEY (project_manager_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS tasks (
        id VARCHAR(64) PRIMARY KEY,
        task_code VARCHAR(50) UNIQUE NOT NULL,
        project_id VARCHAR(64),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        department VARCHAR(100) DEFAULT 'Development',
        assigned_to VARCHAR(64),
        priority VARCHAR(50) DEFAULT 'Medium',
        status VARCHAR(50) DEFAULT 'Todo',
        estimated_hours NUMERIC DEFAULT 0,
        logged_hours NUMERIC DEFAULT 0,
        due_date DATE,
        created_by VARCHAR(64) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS timesheets (
        id VARCHAR(64) PRIMARY KEY,
        task_id VARCHAR(64) NOT NULL,
        user_id VARCHAR(64) NOT NULL,
        date DATE NOT NULL,
        hours NUMERIC NOT NULL,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      -- 10. MARKETING CAMPAIGNS
      CREATE TABLE IF NOT EXISTS marketing_campaigns (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        platform VARCHAR(100) NOT NULL,
        utm_source VARCHAR(100),
        utm_campaign VARCHAR(100),
        budget NUMERIC DEFAULT 0,
        spend NUMERIC DEFAULT 0,
        impressions INTEGER DEFAULT 0,
        clicks INTEGER DEFAULT 0,
        leads_generated INTEGER DEFAULT 0,
        deals_won INTEGER DEFAULT 0,
        revenue_generated NUMERIC DEFAULT 0,
        status VARCHAR(50) DEFAULT 'Active',
        start_date DATE,
        end_date DATE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- 11. AUDIT LOGS & NOTIFICATIONS
      CREATE TABLE IF NOT EXISTS audit_logs (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64),
        action VARCHAR(100) NOT NULL,
        entity_type VARCHAR(100) NOT NULL,
        entity_id VARCHAR(64) NOT NULL,
        old_values JSONB,
        new_values JSONB,
        ip_address VARCHAR(100),
        user_agent TEXT,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS notifications (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64) NOT NULL,
        type VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        entity_type VARCHAR(100),
        entity_id VARCHAR(64),
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Insert Default Super Admin user if not exists
    const checkUser = await client.query("SELECT id FROM users WHERE email = 'admin@neuorzin.com'");
    if (checkUser.rows.length === 0) {
      await client.query(`
        INSERT INTO users (id, name, email, password, role, department, status)
        VALUES ('USR-001', 'Kailash S (Super Admin)', 'admin@neuorzin.com', '$2a$10$8g4zWJ3Y0r6GkY5yN0dZ.O9zE9e7s0j2L6V8w1a2b3c4d5e6f7g8h', 'Super Admin', 'Executive', 'Active')
      `);
      console.log('✅ Inserted Super Admin: admin@neuorzin.com / demo0722');
    }

    // Insert default pipelines
    const checkPipelines = await client.query("SELECT id FROM pipelines");
    if (checkPipelines.rows.length === 0) {
      await client.query(`
        INSERT INTO pipelines (id, name, type, stages) VALUES
        ('PIPE-SW', 'Software & AI Development', 'Sales', '["Lead Qualified", "Technical Scoping", "Proposal Sent", "Negotiation", "Won", "Lost"]'::jsonb),
        ('PIPE-WEB', 'Enterprise Web & Cloud', 'Sales', '["Discovery", "Design Prototype", "Estimation", "Contract Sent", "Won", "Lost"]'::jsonb),
        ('PIPE-MKT', 'Digital Marketing & Growth', 'Sales', '["Audit Review", "Strategy Pitch", "Retainer Proposal", "Won", "Lost"]'::jsonb)
      `);
      console.log('✅ Inserted Default Pipelines.');
    }

    console.log('🎉 Vercel Postgres schema initialized successfully!');

    // Show row count summary
    const res = await client.query(`
      SELECT table_name,
             (xpath('/row/cnt/text()', xml_count))[1]::text::int as row_count
      FROM (
        SELECT table_name,
               table_schema,
               query_to_xml(format('select count(*) as cnt from %I.%I', table_schema, table_name), false, true, '') as xml_count
        FROM information_schema.tables
        WHERE table_schema = 'public'
      ) t;
    `);
    console.log('\n--- Vercel Postgres Tables & Counts ---');
    for (const row of res.rows) {
      console.log(`  - ${row.table_name}: ${row.row_count} rows`);
    }

  } catch (err) {
    console.error('❌ Error initializing Postgres:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

initPostgres();
