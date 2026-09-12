import db from '../db/database.js';

export const getDashboardMetrics = async (req, res) => {
  try {
    const revRow = await db.get("SELECT COALESCE(SUM(paid_amount), 0) as total FROM invoices");
    const totalRevenue = Number(revRow?.total || 0);

    const pipeRow = await db.get("SELECT COALESCE(SUM(value), 0) as total FROM deals WHERE status = 'Open'");
    const totalPipelineValue = Number(pipeRow?.total || 0);

    const leadsCountRow = await db.get("SELECT COUNT(*) as count FROM leads WHERE status NOT IN ('Won', 'Lost')");
    const activeLeadsCount = Number(leadsCountRow?.count || 0);

    const wonDealsRow = await db.get("SELECT COUNT(*) as count FROM deals WHERE status = 'Won'");
    const wonDealsCount = Number(wonDealsRow?.count || 0);

    const totalDealsRow = await db.get("SELECT COUNT(*) as count FROM deals");
    const totalDealsCount = Number(totalDealsRow?.count || 0);
    const conversionRate = totalDealsCount > 0 ? ((wonDealsCount / totalDealsCount) * 100).toFixed(1) : '0.0';
    
    const overdueRow = await db.get("SELECT COUNT(*) as count FROM activities WHERE status = 'Pending'");
    const overdueActivities = Number(overdueRow?.count || 0);

    const projCountRow = await db.get("SELECT COUNT(*) as count FROM projects WHERE status NOT IN ('Completed', 'Support')");
    const activeProjects = Number(projCountRow?.count || 0);

    const unpaidRow = await db.get("SELECT COALESCE(SUM(total_amount - paid_amount), 0) as total FROM invoices WHERE status != 'Paid'");
    const unpaidInvoicesAmount = Number(unpaidRow?.total || 0);

    const recentActivities = await db.all(`
      SELECT a.*, u.name as user_name, l.name as lead_name
      FROM activities a
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN leads l ON a.lead_id = l.id
      ORDER BY a.created_at DESC
      LIMIT 10
    `);

    const pipelineFunnel = await db.all(`
      SELECT stage, COUNT(*) as deal_count, COALESCE(SUM(value), 0) as stage_value
      FROM deals
      GROUP BY stage
    `);

    res.json({
      metrics: {
        totalRevenue,
        totalPipelineValue,
        activeLeadsCount,
        conversionRate: `${conversionRate}%`,
        overdueActivities,
        activeProjects,
        unpaidInvoicesAmount
      },
      pipelineFunnel,
      recentActivities
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const globalSearch = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.json({ leads: [], deals: [], customers: [], projects: [], invoices: [] });
    }

    const term = `%${q}%`;
    const leads = await db.all('SELECT id, name, email, phone, company, status, service FROM leads WHERE name LIKE ? OR email LIKE ? OR company LIKE ? OR service LIKE ? LIMIT 5', [term, term, term, term]);
    const customers = await db.all('SELECT id, name, company, email, phone FROM customers WHERE company LIKE ? OR name LIKE ? OR email LIKE ? LIMIT 5', [term, term, term]);
    const deals = await db.all('SELECT id, title, stage, value, currency FROM deals WHERE title LIKE ? LIMIT 5', [term]);
    const projects = await db.all('SELECT id, project_code, name, status, health FROM projects WHERE name LIKE ? OR project_code LIKE ? LIMIT 5', [term, term]);
    const invoices = await db.all('SELECT id, invoice_number, total_amount, status FROM invoices WHERE invoice_number LIKE ? LIMIT 5', [term]);

    res.json({ query: q, results: { leads, customers, deals, projects, invoices } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAuditLogs = async (req, res) => {
  try {
    const logs = await db.all('SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 50');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notes = await db.all('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 20');
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    await db.run('UPDATE notifications SET is_read = TRUE WHERE id = ?', [req.params.id]);
    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await db.all('SELECT * FROM marketing_campaigns ORDER BY created_at DESC');
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCampaign = async (req, res) => {
  try {
    const { name, platform, utm_source, utm_campaign, budget, start_date, end_date } = req.body;
    if (!name || !platform) {
      return res.status(400).json({ error: 'Name and platform are required' });
    }

    const campaignId = `CMP-${Date.now().toString().slice(-6)}`;
    await db.run(`
      INSERT INTO marketing_campaigns (
        id, name, platform, utm_source, utm_campaign, budget,
        spend, impressions, clicks, leads_generated, deals_won, revenue_generated,
        status, start_date, end_date
      ) VALUES (?, ?, ?, ?, ?, ?, 0, 0, 0, 0, 0, 0, 'Active', ?, ?)
    `, [campaignId, name, platform, utm_source || 'website', utm_campaign || name.toLowerCase().replace(/\s+/g, '_'), budget || 0, start_date || null, end_date || null]);

    res.status(201).json({ id: campaignId, message: 'Campaign created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWhatsAppMessages = async (req, res) => {
  try {
    const { phone_number, lead_id } = req.query;
    let query = 'SELECT * FROM whatsapp_messages WHERE 1=1';
    const params = [];
    if (phone_number) {
      query += ' AND (from_phone = ? OR to_phone = ?)';
      params.push(phone_number, phone_number);
    }
    if (lead_id) {
      query += ' AND lead_id = ?';
      params.push(lead_id);
    }
    query += ' ORDER BY timestamp ASC';
    const messages = await db.all(query, params);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendWhatsAppMessage = async (req, res) => {
  try {
    const { lead_id, customer_id, template_id } = req.body;
    const phone_number = req.body.phone_number || req.body.to || req.body.phone;
    const message = req.body.message || req.body.text;
    if (!phone_number || !message) {
      return res.status(400).json({ error: 'Phone number and message are required' });
    }

    const msgId = `WAM-${Date.now().toString().slice(-6)}`;
    await db.run(`
      INSERT INTO whatsapp_messages (
        id, lead_id, customer_id, direction, from_phone, to_phone, message, template_id, status
      ) VALUES (?, ?, ?, 'Outbound', '+91 77940 45500', ?, ?, ?, 'Delivered')
    `, [msgId, lead_id || null, customer_id || null, phone_number, message, template_id || 'TPL-ACK-01']);

    res.status(201).json({ id: msgId, message: 'WhatsApp message sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
