import 'dotenv/config';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const connectionString = (process.env.POSTGRES_URL || process.env.DATABASE_URL || '').replace(/[\?&]sslmode=[^&]+/g, '').replace(/[\?&]supa=[^&]+/g, '');
const isPostgres = Boolean(connectionString);

let pool = null;
let sqliteDb = null;

if (isPostgres) {
  pool = new pg.Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000
  });
} else {
  try {
    const { default: Database } = await import('better-sqlite3');
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dataDir = path.resolve(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    sqliteDb = new Database(path.join(dataDir, 'neuorzin_crm.db'));
    sqliteDb.pragma('journal_mode = WAL');
    sqliteDb.pragma('foreign_keys = ON');
  } catch (err) {
    console.warn('[DB] better-sqlite3 not available, fallback to memory or postgres only');
  }
}

function formatSql(sql) {
  if (!isPostgres) return sql;
  let idx = 1;
  let formatted = sql.replace(/\?/g, () => `$${idx++}`);
  formatted = formatted.replace(/datetime\('now'\)/gi, 'CURRENT_TIMESTAMP');
  formatted = formatted.replace(/INSERT OR IGNORE INTO/gi, 'INSERT INTO');
  formatted = formatted.replace(/status = "Active"/gi, "status = 'Active'");
  return formatted;
}

export const db = {
  isPostgres,

  async query(sql, params = []) {
    if (isPostgres) {
      const client = await pool.connect();
      try {
        return await client.query(formatSql(sql), params);
      } finally {
        client.release();
      }
    } else {
      const stmt = sqliteDb.prepare(sql);
      if (sql.trim().toUpperCase().startsWith('SELECT')) {
        const rows = stmt.all(...params);
        return { rows, rowCount: rows.length };
      } else {
        const info = stmt.run(...params);
        return { rows: [], rowCount: info.changes, lastInsertRowid: info.lastInsertRowid };
      }
    }
  },

  async all(sql, params = []) {
    if (isPostgres) {
      const client = await pool.connect();
      try {
        const res = await client.query(formatSql(sql), params);
        return res.rows;
      } finally {
        client.release();
      }
    } else {
      return sqliteDb ? sqliteDb.prepare(sql).all(...params) : [];
    }
  },

  async get(sql, params = []) {
    if (isPostgres) {
      const client = await pool.connect();
      try {
        const res = await client.query(formatSql(sql), params);
        return res.rows[0] || null;
      } finally {
        client.release();
      }
    } else {
      return sqliteDb ? (sqliteDb.prepare(sql).get(...params) || null) : null;
    }
  },

  async run(sql, params = []) {
    if (isPostgres) {
      const client = await pool.connect();
      try {
        const res = await client.query(formatSql(sql), params);
        return { changes: res.rowCount };
      } finally {
        client.release();
      }
    } else {
      return sqliteDb ? sqliteDb.prepare(sql).run(...params) : { changes: 0 };
    }
  },

  prepare(sql) {
    if (isPostgres) {
      return {
        all: async (...params) => (await pool.query(formatSql(sql), params)).rows,
        get: async (...params) => (await pool.query(formatSql(sql), params)).rows[0] || null,
        run: async (...params) => {
          const res = await pool.query(formatSql(sql), params);
          return { changes: res.rowCount };
        }
      };
    } else {
      return sqliteDb ? sqliteDb.prepare(sql) : {
        all: () => [],
        get: () => null,
        run: () => ({ changes: 0 })
      };
    }
  }
};

export default db;
