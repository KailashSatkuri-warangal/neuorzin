import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

import * as authController from '../controllers/authController.js';
import * as leadsController from '../controllers/leadsController.js';
import * as followupsController from '../controllers/followupsController.js';
import * as dealsController from '../controllers/dealsController.js';
import * as financeController from '../controllers/financeController.js';
import * as projectsTasksController from '../controllers/projectsTasksController.js';
import * as reportsCommsController from '../controllers/reportsCommsController.js';

const router = express.Router();

// API Index & Health Check (Public)
router.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'NeuOrzin CRM Enterprise Backend API',
    version: '2.0.0',
    documentation: {
      health: '/api/health',
      dashboard: '/api/reports/dashboard',
      leads: '/api/leads',
      deals: '/api/deals',
      quotations: '/api/quotations',
      invoices: '/api/invoices',
      projects: '/api/projects',
      tasks: '/api/tasks',
      whatsapp: '/api/comms/whatsapp',
      campaigns: '/api/reports/roi-campaigns',
      audit: '/api/reports/audit-logs'
    },
    timestamp: new Date().toISOString()
  });
});

router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'NEUORZIN CRM Enterprise Backend',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Auth Routes (Public)
router.post('/auth/login', authController.login);

// Inbound Lead Capture (Public Webhook / Contact Form endpoint)
router.post('/leads/inbound', leadsController.createLead);
router.post('/leads', leadsController.createLead);

// Protected Routes (Require JWT)
router.use(authenticateToken);

// Auth & Users
router.get('/auth/me', authController.getMe);
router.get('/users', authController.getUsers);
router.post('/users', authorizeRoles('Super Admin', 'Admin'), authController.createUser);

// Leads
router.get('/leads', leadsController.getLeads);
router.get('/leads/:id', leadsController.getLeadById);
router.put('/leads/:id', leadsController.updateLead);
router.post('/leads/:id/convert', leadsController.convertLead);

// Follow-ups
router.get('/followups', followupsController.getFollowUps);
router.post('/followups', followupsController.createFollowUp);
router.put('/followups/:id', followupsController.updateFollowUp);

// Deals & Pipelines
router.get('/pipelines', dealsController.getPipelines);
router.get('/deals', dealsController.getDeals);
router.post('/deals', dealsController.createDeal);
router.put('/deals/:id', dealsController.updateDeal);

// Finance: Quotations, Invoices & Payments
router.get('/quotations', financeController.getQuotations);
router.post('/quotations', financeController.createQuotation);
router.put('/quotations/:id/status', financeController.updateQuotationStatus);
router.get('/quotations/:id/pdf', financeController.downloadQuotationPdf);

router.get('/invoices', financeController.getInvoices);
router.post('/invoices', financeController.createInvoice);
router.get('/invoices/:id/pdf', financeController.downloadInvoicePdf);
router.post('/invoices/payments', financeController.recordPayment);

// Projects & Tasks
router.get('/projects', projectsTasksController.getProjects);
router.get('/projects/:id', projectsTasksController.getProjectById);
router.post('/projects', projectsTasksController.createProject);
router.put('/projects/:id', projectsTasksController.updateProject);

router.get('/tasks', projectsTasksController.getTasks);
router.post('/tasks', projectsTasksController.createTask);
router.put('/tasks/:id', projectsTasksController.updateTask);
router.post('/tasks/timesheets', projectsTasksController.logTimesheet);

// Reports & Global Search
router.get('/reports/dashboard', reportsCommsController.getDashboardMetrics);
router.get('/search', reportsCommsController.globalSearch);
router.get('/audit-logs', reportsCommsController.getAuditLogs);
router.get('/notifications', reportsCommsController.getNotifications);
router.put('/notifications/:id/read', reportsCommsController.markNotificationRead);

// Marketing Campaigns
router.get('/marketing/campaigns', reportsCommsController.getCampaigns);
router.post('/marketing/campaigns', reportsCommsController.createCampaign);

// WhatsApp Communications
router.get('/whatsapp/messages', reportsCommsController.getWhatsAppMessages);
router.post('/whatsapp/send', reportsCommsController.sendWhatsAppMessage);

export default router;
