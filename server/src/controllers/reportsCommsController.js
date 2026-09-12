import db from '../db/database.js';

export const getDashboardMetrics = (req, res) => {
  try {
    const totalRevenue = db.prepare("SELECT COALESCE(SUM(paid_amount), 0) as total FROM invoices").get().total;
    const totalPipelineValue = db.prepare("SELECT COALESCE(SUM(value), 0) as total FROM deals WHERE status = 'Open'").get().total;
    const activeLeadsCount = db.prepare("SELECT COUNT(*) as count FROM leads WHERE status NOT IN ('Won', 'Lost')").get().count;
    const wonDealsCount = db.prepare("SELECT COUNT(*) as count FROM deals WHERE status = 'Won'").get().count;
    const totalDealsCount = db.prepare("SELECT COUNT(*) as count FROM deals").get().count;
    const conversionRate = totalDealsCount > 0 ? ((wonDealsCount / totalDealsCount) * 100).toFixed(1) : '0.0';
    
    const overdueActivities = db.prepare("SELECT COUNT(*) as count FROM activities WHERE status = 'Pending' AND scheduled_at < datetime('now')").get().count;
    const activeProjects = db.prepare("SELECT COUNT(*) as count FROM projects WHERE status NOT IN ('Completed', 'Support')").get().count;
    const unpaidInvoicesAmount = db.prepare("SELECT COALESCE(SUM(total_amount - paid_amount), 0) as total FROM invoices WHERE status != 'Paid'").get().total;

    const recentActivities = db.prepare(`
      SELECT a.*, u.name as user_name, l.name as lead_name
      FROM activities a
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN leads l ON a.lead_id = l.id
      ORDER BY a.created_at DESC
      LIMIT 10
    `).all();

    const pipelineFunnel = db.prepare(`
      SELECT stage, COUNT(*) as deal_count, COALESCE(SUM(value), 0) as stage_value
      FROM deals
      GROUP BY stage
    `).all();

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

export const globalSearch = (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.json({ leads: [], deals: [], customers: [], projects: [], invoices: [] });
    }

    const term = `%${q}%`;

    const leads = db.prepare('SELECT id, name, email, phone, company, status, service FROM leads WHERE name LIKE ? OR email LIKE ? OR company LIKE ? OR service LIKE ? LIMIT 5').all(term, term, term, term);
    const customers = db.prepare('SELECT id, name, company, email, phone FROM customers WHERE company LIKE ? OR name LIKE ? OR email LIKE ? LIMIT 5').all(term, term, term);
    const deals = db.prepare('SELECT id, title, stage, value, currency FROM deals WHERE title LIKE ? LIMIT 5').all(term);
    const projects = db.prepare('SELECT id, project_code, name, status, health FROM projects WHERE name LIKE ? OR project_code LIKE ? LIMIT 5').all(term, term);
    const invoices = db.prepare('SELECT id, invoice_number, total_amount, status FROM invoices WHERE invoice_number LIKE ? LIMIT 5').all(term);

    res.json({
      query: q,
      results: {
        leads,
        customers,
        deals,
        projects,
        invoices
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNotifications = (req, res) => {
  try {
    const userId = req.user ? req.user.id : 'USR-001';
    const notifications = db.prepare('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 20').all(userId);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markNotificationRead = (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('UPDATE notifications SET is_read = 1 WHERE id = ?').run(id);
    res.json({ message: 'Marked read' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAuditLogs = (req, res) => {
  try {
    const logs = db.prepare(`
      SELECT * FROM audit_logs
      ORDER BY timestamp DESC
      LIMIT 50
    `).all();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCampaigns = (req, res) => {
  try {
    const campaigns = db.prepare('SELECT * FROM marketing_campaigns ORDER BY created_at DESC').all();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCampaign = (req, res) => {
  try {
    const { name, platform, utm_source, utm_campaign, budget, start_date, end_date } = req.body;
    if (!name || !platform) {
      return res.status(400).json({ error: 'Name and platform are required' });
    }

    const campaignId = `CMP-${Date.now().toString().slice(-6)}`;
    db.prepare(`
      INSERT INTO marketing_campaigns (
        id, name, platform, utm_source, utm_campaign, budget,
        spend, impressions, clicks, leads_generated, deals_won, revenue_generated,
        status, start_date, end_date
      ) VALUES (?, ?, ?, ?, ?, ?, 0, 0, 0, 0, 0, 0, 'Active', ?, ?)
    `).run(
      campaignId,
      name,
      platform,
      utm_source || 'website',
      utm_campaign || name.toLowerCase().replace(/\\s+/g, '_'),
      budget || 0,
      start_date || null,
      end_date || null
    );

    res.status(201).json({ id: campaignId, message: 'Campaign created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWhatsAppMessages = (req, res) => {
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
    const messages = db.prepare(query).all(...params);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendWhatsAppMessage = (req, res) => {
  try {
    const { lead_id, customer_id, template_id } = req.body;
    const phone_number = req.body.phone_number || req.body.to || req.body.phone;
    const message = req.body.message || req.body.text;
    if (!phone_number || !message) {
      return res.status(400).json({ error: 'Phone number and message are required' });
    }

    const msgId = `WAM-${Date.now().toString().slice(-6)}`;
    db.prepare(`
      INSERT INTO whatsapp_messages (
        id, lead_id, customer_id, direction, from_phone, to_phone, message, template_id, status
      ) VALUES (?, ?, ?, 'Outbound', '+91 77940 45500', ?, ?, ?, 'Delivered')
    `).run(
      msgId,
      lead_id || null,
      customer_id || null,
      phone_number,
      message,
      template_id || 'TPL-ACK-01'
    );

    res.status(201).json({ id: msgId, message: 'WhatsApp message sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

