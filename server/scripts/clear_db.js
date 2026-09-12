import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../data/neuorzin_crm.db');
const db = new Database(dbPath);

console.log('--- Clearing Database Data ---');

const tablesToClear = [
  'timesheets',
  'tasks',
  'project_milestones',
  'projects',
  'payments',
  'invoices',
  'quotations',
  'whatsapp_messages',
  'deals',
  'activities',
  'customers',
  'leads',
  'marketing_campaigns',
  'audit_logs',
  'notifications',
  'automation_logs'
];

db.pragma('foreign_keys = OFF');

for (const tbl of tablesToClear) {
  try {
    const info = db.prepare(`DELETE FROM ${tbl}`).run();
    console.log(`Cleared ${tbl}: ${info.changes} rows deleted`);
  } catch (err) {
    console.error(`Error clearing ${tbl}:`, err.message);
  }
}

db.pragma('foreign_keys = ON');

console.log('\n--- Verification: Row Counts After Clear ---');
const allTables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();
for (const t of allTables) {
  const count = db.prepare('SELECT COUNT(*) as c FROM ' + t.name).get().c;
  console.log(`  - ${t.name}: ${count} rows`);
}
