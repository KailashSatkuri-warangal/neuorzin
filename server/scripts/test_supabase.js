import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
const cleanConnectionString = connectionString.replace(/[\?&]sslmode=[^&]+/g, '').replace(/[\?&]supa=[^&]+/g, '');

const pool = new Pool({
  connectionString: cleanConnectionString,
  ssl: { rejectUnauthorized: false }
});

async function runTest() {
  console.log('--- Testing Supabase Postgres Live Connection ---');
  const client = await pool.connect();
  try {
    // 1. Query Users
    const users = await client.query('SELECT id, name, email, role FROM users');
    console.log('✅ Users in Supabase:', users.rows);

    // 2. Query Pipelines
    const pipelines = await client.query('SELECT id, name FROM pipelines');
    console.log('✅ Pipelines in Supabase:', pipelines.rows);

    // 3. Insert Test Lead
    const testId = `LEAD-TEST-${Date.now().toString().slice(-4)}`;
    await client.query(
      'INSERT INTO leads (id, name, company, email, phone, service, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [testId, 'Supabase Test User', 'Cloud Corp', 'test@supabase.io', '+91 99999 88888', 'Enterprise AI', 'New']
    );
    console.log('✅ Inserted Test Lead:', testId);

    // 4. Verify Read
    const leadRead = await client.query('SELECT * FROM leads WHERE id = $1', [testId]);
    console.log('✅ Read Test Lead from Supabase:', leadRead.rows[0].name, '-', leadRead.rows[0].company);

    // 5. Clean up test record
    await client.query('DELETE FROM leads WHERE id = $1', [testId]);
    console.log('✅ Cleaned up test record.');

    console.log('🎉 Supabase Postgres is 100% OPERATIONAL and verified!');
  } catch (err) {
    console.error('❌ Error testing Supabase:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

runTest();
