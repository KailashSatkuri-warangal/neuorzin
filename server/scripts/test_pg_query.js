import 'dotenv/config';
import pg from 'pg';

const connectionString = (process.env.POSTGRES_URL || '').replace(/[\?&]sslmode=[^&]+/g, '').replace(/[\?&]supa=[^&]+/g, '');
const pool = new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } });

async function test() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT id, name, email, role FROM users WHERE email = $1', ['admin@neuorzin.com']);
    console.log('Postgres Admin Query:', res.rows);
  } finally {
    client.release();
    await pool.end();
  }
}
test();
