import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';
import { onNewLeadCreated } from '../services/automationService.js';
import { logAudit } from '../services/auditService.js';

export const getLeads = (req, res) => {
  try {
    const { status, source, assigned_to, search } = req.query;
    let query = `
      SELECT l.*, u.name as assigned_to_name, u.email as assigned_to_email 
      FROM leads l
      LEFT JOIN users u ON l.assigned_to = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += ' AND l.status = ?';
      params.push(status);
    }
    if (source) {
      query += ' AND l.source = ?';
      params.push(source);
    }
    if (assigned_to) {
      query += ' AND l.assigned_to = ?';
      params.push(assigned_to);
    }
    if (search) {
      query += ' AND (l.name LIKE ? OR l.email LIKE ? OR l.company LIKE ? OR l.phone LIKE ? OR l.service LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term, term);
    }

    query += ' ORDER BY l.created_at DESC';
    const leads = db.prepare(query).all(...params);
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLeadById = (req, res) => {
  try {
    const lead = db.prepare(`
      SELECT l.*, u.name as assigned_to_name, u.email as assigned_to_email
      FROM leads l
      LEFT JOIN users u ON l.assigned_to = u.id
      WHERE l.id = ?
    `).get(req.params.id);

    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    const activities = db.prepare(`
      SELECT a.*, u.name as user_name
      FROM activities a
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.lead_id = ?
      ORDER BY a.created_at DESC
    `).all(req.params.id);

    res.json({ lead, activities });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createLead = (req, res) => {
  try {
    const {
      name, email, phone, whatsapp, company, location, service,
      requirement_need, budget, timeline, source, utm_source,
      utm_medium, utm_campaign, priority, assigned_to, score
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const leadId = `LEAD-${uuidv4().substring(0, 8)}`;

    let leadScore = score || 40;
    if (phone || whatsapp) leadScore += 20;
    if (company) leadScore += 15;
    if (budget) leadScore += 15;
    if (requirement_need && requirement_need.length > 20) leadScore += 10;

    const stmt = db.prepare(`
      INSERT INTO leads (
        id, source, name, company, phone, whatsapp, email, location,
        service, requirement_need, budget, timeline, assigned_to,
        priority, score, status, utm_source, utm_medium, utm_campaign
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', ?, ?, ?)
    `);

    stmt.run(
      leadId,
      source || 'Website Enquiries',
      name,
      company || null,
      phone || null,
      whatsapp || phone || null,
      email,
      location || 'Hyderabad, India',
      service || 'Enterprise Solutions',
      requirement_need || null,
      budget || null,
      timeline || null,
      assigned_to || null,
      priority || 'Medium',
      leadScore,
      utm_source || 'direct',
      utm_medium || 'organic',
      utm_campaign || 'inbound'
    );

    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(leadId);

    onNewLeadCreated(lead);

    if (req.user) {
      logAudit({
        userId: req.user.id,
        userName: req.user.name,
        action: 'LEAD_CREATED',
        entityType: 'Lead',
        entityId: leadId,
        changes: { name, email, company, service }
      });
    }

    res.status(201).json({
      message: 'Lead created successfully',
      leadId,
      lead
    });
  } catch (err) {
    console.error('Error creating lead:', err);
    res.status(500).json({ error: err.message });
  }
};

export const updateLead = (req, res) => {
  try {
    const {
      name, email, phone, whatsapp, company, location, service,
      requirement_need, budget, timeline, priority, score, status, assigned_to, notes
    } = req.body;

    const leadId = req.params.id;
    const existing = db.prepare('SELECT * FROM leads WHERE id = ?').get(leadId);
    if (!existing) return res.status(404).json({ error: 'Lead not found' });

    db.prepare(`
      UPDATE leads
      SET name = COALESCE(?, name),
          email = COALESCE(?, email),
          phone = COALESCE(?, phone),
          whatsapp = COALESCE(?, whatsapp),
          company = COALESCE(?, company),
          location = COALESCE(?, location),
          service = COALESCE(?, service),
          requirement_need = COALESCE(?, requirement_need),
          budget = COALESCE(?, budget),
          timeline = COALESCE(?, timeline),
          priority = COALESCE(?, priority),
          score = COALESCE(?, score),
          status = COALESCE(?, status),
          assigned_to = COALESCE(?, assigned_to),
          notes = COALESCE(?, notes),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      name, email, phone, whatsapp, company, location, service,
      requirement_need, budget, timeline, priority, score, status, assigned_to, notes, leadId
    );

    if (req.user) {
      logAudit({
        userId: req.user.id,
        userName: req.user.name,
        action: 'LEAD_UPDATED',
        entityType: 'Lead',
        entityId: leadId,
        changes: req.body
      });
    }

    const updatedLead = db.prepare('SELECT * FROM leads WHERE id = ?').get(leadId);
    res.json({ message: 'Lead updated', lead: updatedLead });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const convertLead = (req, res) => {
  try {
    const leadId = req.params.id;
    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(leadId);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    let customer = db.prepare('SELECT * FROM customers WHERE email = ?').get(lead.email);
    let customerId;
    if (customer) {
      customerId = customer.id;
    } else {
      customerId = `CUST-${uuidv4().substring(0, 8)}`;
      db.prepare(`
        INSERT INTO customers (id, lead_id, name, company, email, phone, whatsapp, location, billing_address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        customerId,
        lead.id,
        lead.name,
        lead.company || lead.name,
        lead.email,
        lead.phone || null,
        lead.whatsapp || lead.phone || null,
        lead.location || 'Hyderabad, India',
        lead.location || 'Hyderabad, India'
      );
    }

    const dealId = `DEAL-${uuidv4().substring(0, 8)}`;
    const dealTitle = `${lead.company || lead.name} - ${lead.service || 'Enterprise Solution'}`;

    db.prepare(`
      INSERT INTO deals (
        id, pipeline_id, title, lead_id, customer_id, assigned_to,
        stage, value, currency, probability, expected_close_date, status
      ) VALUES (?, 'PIPE-SW', ?, ?, ?, ?, 'Lead Qualified', ?, 'INR', 20, DATE('now', '+30 days'), 'Open')
    `).run(
      dealId,
      dealTitle,
      lead.id,
      customerId,
      lead.assigned_to || (req.user ? req.user.id : 'USR-001'),
      req.body.deal_amount || 350000.00
    );

    db.prepare("UPDATE leads SET status = 'Qualified', updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(leadId);

    const actId = `ACT-${uuidv4().substring(0, 8)}`;
    db.prepare(`
      INSERT INTO activities (id, lead_id, user_id, type, subject, notes, status)
      VALUES (?, ?, ?, 'Note', 'Lead Converted', 'Converted lead into Customer and created Deal: ' || ?, 'Completed')
    `).run(actId, leadId, req.user ? req.user.id : 'USR-001', dealTitle);

    res.json({
      message: 'Lead converted successfully',
      customerId,
      dealId
    });
  } catch (err) {
    console.error('Error converting lead:', err);
    res.status(500).json({ error: err.message });
  }
};
