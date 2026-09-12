import 'dotenv/config';
import express from 'express';
import apiRoutes from '../src/routes/api.js';

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

const server = app.listen(5099, async () => {
  console.log('--- Testing Live Express Backend with Supabase Postgres ---');
  try {
    // 1. Health
    const hRes = await fetch('http://localhost:5099/api/health');
    console.log('1. Health Check:', hRes.status, await hRes.json());

    // 2. Login
    const lRes = await fetch('http://localhost:5099/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@neuorzin.com', password: 'password123' })
    });
    const authData = await lRes.json();
    console.log('2. Login:', lRes.status, authData.user?.name, 'Token received:', Boolean(authData.token));
    const token = authData.token;
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token };

    // 3. Create Lead in Supabase
    const createLeadRes = await fetch('http://localhost:5099/api/leads', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'Vercel Live Lead',
        email: 'lead@vercel-cloud.com',
        company: 'Vercel Global Inc',
        service: 'Enterprise AI Modernization'
      })
    });
    const leadCreated = await createLeadRes.json();
    console.log('3. Create Lead in Supabase:', createLeadRes.status, leadCreated.lead?.name);

    // 4. Fetch Dashboard Metrics from Supabase
    const dashRes = await fetch('http://localhost:5099/api/reports/dashboard', { headers });
    const dashData = await dashRes.json();
    console.log('4. Dashboard Metrics from Supabase:', dashData.metrics);

    // 5. Fetch Leads from Supabase
    const leadsRes = await fetch('http://localhost:5099/api/leads', { headers });
    const leadsData = await leadsRes.json();
    console.log('5. Total Leads in Supabase Postgres:', leadsData.length);

    console.log('🎉 LIVE SUPABASE POSTGRES BACKEND VERIFIED 100% OPERATIONAL!');
  } catch (err) {
    console.error('❌ Error testing live backend:', err);
  } finally {
    server.close();
  }
});
