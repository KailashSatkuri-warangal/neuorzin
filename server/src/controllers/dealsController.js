import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';
import { onDealWon } from '../services/automationService.js';
import { logAudit } from '../services/auditService.js';

export const getPipelines = (req, res) => {
  try {
    const pipelines = db.prepare('SELECT * FROM pipelines ORDER BY id ASC').all();
    const formatted = pipelines.map(p => ({
      ...p,
      stages: JSON.parse(p.stages || '[]')
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDeals = (req, res) => {
  try {
    const { stage, pipeline_id, assigned_to } = req.query;
    let query = `
      SELECT d.*, c.name as customer_name, c.company as customer_company,
             c.email as customer_email, c.phone as customer_phone,
             u.name as assigned_to_name, p.name as pipeline_name
      FROM deals d
      LEFT JOIN customers c ON d.customer_id = c.id
      LEFT JOIN users u ON d.assigned_to = u.id
      LEFT JOIN pipelines p ON d.pipeline_id = p.id
      WHERE 1=1
    `;
    const params = [];

    if (stage) {
      query += ' AND d.stage = ?';
      params.push(stage);
    }
    if (pipeline_id) {
      query += ' AND d.pipeline_id = ?';
      params.push(pipeline_id);
    }
    if (assigned_to) {
      query += ' AND d.assigned_to = ?';
      params.push(assigned_to);
    }

    query += ' ORDER BY d.created_at DESC';
    const deals = db.prepare(query).all(...params);
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDeal = (req, res) => {
  try {
    const {
      title, customer_id, lead_id, pipeline_id, stage,
      value, currency, probability, expected_close_date, assigned_to, notes
    } = req.body;

    if (!title || !customer_id) {
      return res.status(400).json({ error: 'Title and customer_id are required' });
    }

    const dealId = `DEAL-${uuidv4().substring(0, 8)}`;
    db.prepare(`
      INSERT INTO deals (
        id, pipeline_id, title, lead_id, customer_id, assigned_to,
        stage, value, currency, probability, expected_close_date, status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Open', ?)
    `).run(
      dealId,
      pipeline_id || 'PIPE-SW',
      title,
      lead_id || null,
      customer_id,
      assigned_to || (req.user ? req.user.id : 'USR-001'),
      stage || 'Lead Qualified',
      value || 0,
      currency || 'INR',
      probability || 20,
      expected_close_date || null,
      notes || null
    );

    res.status(201).json({ id: dealId, message: 'Deal created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDeal = (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, stage, value, probability, expected_close_date,
      status, lost_reason, notes, assigned_to
    } = req.body;

    const existing = db.prepare('SELECT * FROM deals WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ error: 'Deal not found' });

    let newStatus = status || existing.status;
    if (stage === 'Won / Signed' || stage === 'Closed Won') {
      newStatus = 'Won';
    } else if (stage === 'Lost' || stage === 'Closed Lost') {
      newStatus = 'Lost';
    }

    db.prepare(`
      UPDATE deals
      SET title = COALESCE(?, title),
          stage = COALESCE(?, stage),
          value = COALESCE(?, value),
          probability = COALESCE(?, probability),
          expected_close_date = COALESCE(?, expected_close_date),
          status = ?,
          lost_reason = COALESCE(?, lost_reason),
          notes = COALESCE(?, notes),
          assigned_to = COALESCE(?, assigned_to),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      title, stage, value, probability, expected_close_date,
      newStatus, lost_reason, notes, assigned_to, id
    );

    const updated = db.prepare('SELECT * FROM deals WHERE id = ?').get(id);

    if (newStatus === 'Won' && existing.status !== 'Won') {
      onDealWon(updated);
    }

    if (req.user) {
      logAudit({
        userId: req.user.id,
        userName: req.user.name,
        action: 'DEAL_UPDATED',
        entityType: 'Deal',
        entityId: id,
        changes: { fromStage: existing.stage, toStage: stage, value: updated.value }
      });
    }

    res.json({ message: 'Deal updated successfully', deal: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
