import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cron from 'node-cron';
import apiRoutes from './routes/api.js';
import { runOverdueAlertsCheck } from './services/automationService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static PDF uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount API Router
app.use('/api', apiRoutes);

// Root Status
app.get('/', (req, res) => {
  res.json({
    message: 'NEUORZIN CRM Enterprise Backend Server is running',
    version: '2.0.0',
    documentation: '/api/health'
  });
});

// Scheduled Background Jobs (Runs hourly to check SLA / overdue followups)
cron.schedule('0 * * * *', () => {
  console.log('[CRON] Running hourly SLA & Overdue check...');
  runOverdueAlertsCheck();
});

// Run initial check on startup
runOverdueAlertsCheck();

// Start Express Listener (Standalone Node execution)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 NEUORZIN CRM Server running on http://localhost:${PORT}`);
    console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🔒 Authentication: admin@neuorzin.com / demo0722`);
    console.log(`=======================================================`);
  });
}

export default app;
