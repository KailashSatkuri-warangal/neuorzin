import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';
import { onFollowUpCompleted } from '../services/automationService.js';
import { logAudit } from '../services/auditService.js';

export const getFollowUps = (req, res) => {
  try {
    const { status, type, user_id } = req.query;
    let query = `
      SELECT a.*, l.name as lead_name, l.company as lead_company, l.phone as lead_phone,
             c.name as customer_name, c.company as customer_company,
             d.title as deal_title, u.name as user_name
      FROM activities a
      LEFT JOIN leads l ON a.lead_id = l.id
      LEFT JOIN customers c ON a.customer_id = c.id
      LEFT JOIN deals d ON a.deal_id = d.id
      LEFT JOIN users u ON a.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += ' AND a.status = ?';
      params.push(status);
    }
    if (type) {
      query += ' AND a.type = ?';
      params.push(type);
    }
    if (user_id) {
      query += ' AND a.user_id = ?';
      params.push(user_id);
    }

    query += ' ORDER BY a.scheduled_at ASC';
    const activities = db.prepare(query).all(...params);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createFollowUp = (req, res) => {
  try {
    const { lead_id, customer_id, deal_id, type, subject, notes, scheduled_at, user_id } = req.body;
    if (!subject) {
      return res.status(400).json({ error: 'Subject is required' });
    }

    const activityId = `ACT-${uuidv4().substring(0, 8)}`;
    db.prepare(`
      INSERT INTO activities (
        id, lead_id, customer_id, deal_id, user_id, type, subject, notes, scheduled_at, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
    `).run(
      activityId,
      lead_id || null,
      customer_id || null,
      deal_id || null,
      user_id || (req.user ? req.user.id : 'USR-001'),
      type || 'Call',
      subject,
      notes || null,
      scheduled_at || new Date(Date.now() + 86400000).toISOString()
    );

    res.status(201).json({ id: activityId, message: 'Activity created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFollowUp = (req, res) => {
  try {
    const { id } = req.params;
    const { status, outcome, notes, scheduled_at } = req.body;

    const existing = db.prepare('SELECT * FROM activities WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ error: 'Activity not found' });

    let completedAt = existing.completed_at;
    if (status === 'Completed' && existing.status !== 'Completed') {
      completedAt = new Date().toISOString();
    }

    db.prepare(`
      UPDATE activities
      SET status = COALESCE(?, status),
          outcome = COALESCE(?, outcome),
          notes = COALESCE(?, notes),
          scheduled_at = COALESCE(?, scheduled_at),
          completed_at = ?
      WHERE id = ?
    `).run(status, outcome, notes, scheduled_at, completedAt, id);

    const updated = db.prepare('SELECT * FROM activities WHERE id = ?').get(id);

    if (status === 'Completed') {
      onFollowUpCompleted(updated);
    }

    res.json({ message: 'Activity updated', activity: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
