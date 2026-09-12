import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';
import { onNewLeadCreated } from '../services/automationService.js';
import { logAudit } from '../services/auditService.js';

export const getLeads = async (req, res) => {
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
    const leads = await db.all(query, params);
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLeadById = async (req, res) => {
  try {
    const lead = await db.get(`
      SELECT l.*, u.name as assigned_to_name, u.email as assigned_to_email
      FROM leads l
      LEFT JOIN users u ON l.assigned_to = u.id
      WHERE l.id = ?
    `, [req.params.id]);

    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    const activities = await db.all(`
      SELECT a.*, u.name as user_name
      FROM activities a
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.lead_id = ?
      ORDER BY a.created_at DESC
    `, [req.params.id]);

    res.json({ lead, activities });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createLead = async (req, res) => {
  try {
    const {
      name, email, phone, company, whatsapp, location, service,
      requirement_need, budget, timeline, source, utm_source, utm_medium, utm_campaign
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required fields' });
    }

    const leadId = `LEAD-${uuidv4().substring(0, 8)}`;
    const score = budget && budget.includes('10L') ? 85 : 60;

    await db.run(`
      INSERT INTO leads (
        id, source, name, company, phone, whatsapp, email, location,
        service, requirement_need, budget, timeline, priority, score, status,
        utm_source, utm_medium, utm_campaign
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Medium', ?, 'New', ?, ?, ?)
    `, [
      leadId,
      source || 'Website',
      name,
      company || 'Direct Client',
      phone || null,
      whatsapp || phone || null,
      email,
      location || 'India',
      service || 'General Technology Consultation',
      requirement_need || null,
      budget || null,
      timeline || null,
      score,
      utm_source || null,
      utm_medium || null,
      utm_campaign || null
    ]);

    const created = await db.get('SELECT * FROM leads WHERE id = ?', [leadId]);

    // Non-blocking automation triggers
    try { onNewLeadCreated(created); } catch {}

    res.status(201).json({
      message: 'Inbound lead captured and routed successfully',
      lead: created
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assigned_to, score, priority, notes } = req.body;

    await db.run(`
      UPDATE leads
      SET status = COALESCE(?, status),
          assigned_to = COALESCE(?, assigned_to),
          score = COALESCE(?, score),
          priority = COALESCE(?, priority),
          requirement_need = COALESCE(?, requirement_need),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [status, assigned_to, score, priority, notes, id]);

    const updated = await db.get('SELECT * FROM leads WHERE id = ?', [id]);
    res.json({ message: 'Lead updated successfully', lead: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const convertLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { deal_amount } = req.body;

    const lead = await db.get('SELECT * FROM leads WHERE id = ?', [id]);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    // Create Customer
    const custId = `CUST-${uuidv4().substring(0, 8)}`;
    await db.run(`
      INSERT INTO customers (id, lead_id, name, company, email, phone)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [custId, lead.id, lead.name, lead.company || 'Direct Client', lead.email, lead.phone]);

    // Create Deal
    const dealId = `DEAL-${uuidv4().substring(0, 8)}`;
    await db.run(`
      INSERT INTO deals (
        id, pipeline_id, title, lead_id, customer_id, stage, value, status
      ) VALUES (?, 'PIPE-SW', ?, ?, ?, 'Negotiation', ?, 'Open')
    `, [dealId, `${lead.name} - ${lead.service}`, lead.id, custId, parseFloat(deal_amount) || 150000]);

    // Mark Lead as Won
    await db.run("UPDATE leads SET status = 'Won', updated_at = CURRENT_TIMESTAMP WHERE id = ?", [id]);

    res.json({
      message: 'Lead converted successfully into Customer and Deal',
      customerId: custId,
      dealId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
