import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';

export const getPipelines = async (req, res) => {
  try {
    const pipelines = await db.all('SELECT * FROM pipelines');
    const formatted = pipelines.map(p => ({
      ...p,
      stages: typeof p.stages === 'string' ? JSON.parse(p.stages || '[]') : p.stages
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDeals = async (req, res) => {
  try {
    const { pipeline_id, stage, status } = req.query;
    let query = `
      SELECT d.*, c.name as customer_name, c.company as customer_company,
             l.name as lead_name, u.name as assigned_to_name
      FROM deals d
      LEFT JOIN customers c ON d.customer_id = c.id
      LEFT JOIN leads l ON d.lead_id = l.id
      LEFT JOIN users u ON d.assigned_to = u.id
      WHERE 1=1
    `;
    const params = [];

    if (pipeline_id) {
      query += ' AND d.pipeline_id = ?';
      params.push(pipeline_id);
    }
    if (stage) {
      query += ' AND d.stage = ?';
      params.push(stage);
    }
    if (status) {
      query += ' AND d.status = ?';
      params.push(status);
    }

    query += ' ORDER BY d.created_at DESC';
    const deals = await db.all(query, params);
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDeal = async (req, res) => {
  try {
    const { pipeline_id, title, customer_id, lead_id, assigned_to, stage, value, probability, expected_close_date } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Deal title is required' });
    }

    const dealId = `DEAL-${uuidv4().substring(0, 8)}`;
    await db.run(`
      INSERT INTO deals (
        id, pipeline_id, title, customer_id, lead_id, assigned_to,
        stage, value, probability, expected_close_date, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Open')
    `, [
      dealId,
      pipeline_id || 'PIPE-SW',
      title,
      customer_id || null,
      lead_id || null,
      assigned_to || (req.user ? req.user.id : 'USR-001'),
      stage || 'Lead Qualified',
      parseFloat(value) || 0,
      parseInt(probability) || 50,
      expected_close_date || null
    ]);

    res.status(201).json({ id: dealId, message: 'Deal created in pipeline' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { stage, value, probability, status, expected_close_date } = req.body;

    await db.run(`
      UPDATE deals
      SET stage = COALESCE(?, stage),
          value = COALESCE(?, value),
          probability = COALESCE(?, probability),
          status = COALESCE(?, status),
          expected_close_date = COALESCE(?, expected_close_date),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [stage, value, probability, status, expected_close_date, id]);

    res.json({ message: 'Deal updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
