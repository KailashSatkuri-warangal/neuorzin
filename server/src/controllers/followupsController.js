import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';

export const getFollowUps = async (req, res) => {
  try {
    const { lead_id, status } = req.query;
    let query = `
      SELECT a.*, u.name as user_name, l.name as lead_name, l.phone as lead_phone, l.email as lead_email
      FROM activities a
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN leads l ON a.lead_id = l.id
      WHERE 1=1
    `;
    const params = [];

    if (lead_id) {
      query += ' AND a.lead_id = ?';
      params.push(lead_id);
    }
    if (status) {
      query += ' AND a.status = ?';
      params.push(status);
    }

    query += ' ORDER BY a.scheduled_at ASC';
    const activities = await db.all(query, params);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createFollowUp = async (req, res) => {
  try {
    const { lead_id, customer_id, deal_id, type, subject, notes, scheduled_at, next_action } = req.body;
    if (!subject || !type) {
      return res.status(400).json({ error: 'Subject and activity type are required' });
    }

    const activityId = `ACT-${uuidv4().substring(0, 8)}`;
    await db.run(`
      INSERT INTO activities (
        id, lead_id, customer_id, deal_id, user_id, type, subject, notes, scheduled_at, status, next_action
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', ?)
    `, [
      activityId,
      lead_id || null,
      customer_id || null,
      deal_id || null,
      req.user ? req.user.id : 'USR-001',
      type,
      subject,
      notes || null,
      scheduled_at || new Date().toISOString(),
      next_action || null
    ]);

    res.status(201).json({ id: activityId, message: 'Follow-up activity scheduled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFollowUp = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, outcome } = req.body;

    await db.run(`
      UPDATE activities
      SET status = COALESCE(?, status),
          outcome = COALESCE(?, outcome),
          completed_at = CASE WHEN ? = 'Completed' THEN CURRENT_TIMESTAMP ELSE completed_at END
      WHERE id = ?
    `, [status, outcome, status, id]);

    res.json({ message: 'Activity updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
