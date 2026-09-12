import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';

export const logAudit = ({ userId, userName, action, entityType, entityId, changes }) => {
  try {
    const id = `AUD-${uuidv4().substring(0, 8)}`;
    const stmt = db.prepare(`
      INSERT INTO audit_logs (id, entity_type, entity_id, action, user_id, user_name, changes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id,
      entityType || 'General',
      String(entityId || 'N/A'),
      action,
      userId || null,
      userName || null,
      changes ? (typeof changes === 'string' ? changes : JSON.stringify(changes)) : null
    );
  } catch (err) {
    console.error('[AUDIT LOG ERROR]', err.message);
  }
};

export const createNotification = ({ userId, title, message, type, link }) => {
  try {
    const id = `NOTIF-${uuidv4().substring(0, 8)}`;
    const stmt = db.prepare(`
      INSERT INTO notifications (id, user_id, title, message, type, link, is_read)
      VALUES (?, ?, ?, ?, ?, ?, 0)
    `);
    stmt.run(id, userId, title, message, type || 'Info', link || null);
  } catch (err) {
    console.error('[NOTIFICATION ERROR]', err.message);
  }
};
