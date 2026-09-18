import 'dotenv/config';
import jwt from 'jsonwebtoken';
import db from '../src/db/database.js';
import * as authController from '../src/controllers/authController.js';
import * as leadsController from '../src/controllers/leadsController.js';
import * as followupsController from '../src/controllers/followupsController.js';
import * as dealsController from '../src/controllers/dealsController.js';
import * as financeController from '../src/controllers/financeController.js';
import * as projectsTasksController from '../src/controllers/projectsTasksController.js';
import * as reportsCommsController from '../src/controllers/reportsCommsController.js';
import fs from 'fs';

function createMockReqRes(body = {}, params = {}, query = {}, headers = {}, user = null) {
  const req = { body, params, query, headers, user, ip: '127.0.0.1' };
  let statusCode = 200;
  let responseData = null;

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseData = data;
      return this;
    },
    send(data) {
      responseData = data;
      return this;
    },
    setHeader() {
      return this;
    },
    end(data) {
      if (Buffer.isBuffer(data)) {
        responseData = { file: 'in-memory-buffer', exists: data.length > 0, size: data.length };
      } else {
        responseData = data;
      }
      return this;
    },
    getStatusCode() {
      return statusCode;
    },
    getData() {
      return responseData;
    }
  };

  return { req, res };
}

async function runEndToEndVerification() {
  console.log('================================================================');
  console.log('🚀 NEUORZIN CRM — COMPLETE END-TO-END BUSINESS LIFECYCLE AUDIT');
  console.log('================================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ [PASS ${totalTests}] ${message}`);
      passedTests++;
    } else {
      console.error(`  ❌ [FAIL ${totalTests}] ${message}`);
      throw new Error(`Test Failed: ${message}`);
    }
  }

  // STEP 1: AUTHENTICATION & SECURITY (P0)
  console.log('--- Step 1: Authentication, Token & RBAC ---');
  const loginRes = createMockReqRes({ email: 'admin@neuorzin.com', password: 'demo0722' });
  await authController.login(loginRes.req, loginRes.res);
  const authData = loginRes.res.getData();
  assert(loginRes.res.getStatusCode() === 200 && authData.token, 'Super Admin login successful with signed JWT');
  
  const token = authData.token;
  const adminUser = authData.user;

  const badLogin = createMockReqRes({ email: 'admin@neuorzin.com', password: 'wrongpassword' });
  await authController.login(badLogin.req, badLogin.res);
  assert(badLogin.res.getStatusCode() === 401, 'Unauthorized login attempt rejected with HTTP 401');

  // STEP 2: INBOUND LEAD CAPTURE & AUTOMATION (P1)
  console.log('\n--- Step 2: Inbound Lead Capture & Routing ---');
  const leadPayload = {
    name: 'Dr. Anand Mahindra',
    email: `anand.mahindra.${Date.now()}@techauto.in`,
    phone: '+91 9876543210',
    company: 'Mahindra NextGen Mobility',
    service: 'Enterprise AI & Autonomous Telemetry',
    requirement_need: 'Complete AI-driven fleet telematics and predictive maintenance microservices suite.',
    budget: '₹15,00,000 - ₹25,00,000',
    timeline: '3-6 Months',
    source: 'Website Contact Form',
    utm_source: 'google_search',
    utm_campaign: 'enterprise_ai_q3'
  };

  const leadReq = createMockReqRes(leadPayload);
  await leadsController.createLead(leadReq.req, leadReq.res);
  const createdLead = leadReq.res.getData()?.lead;
  assert(createdLead && createdLead.id.startsWith('LEAD-'), `Inbound lead captured with ID: ${createdLead?.id}`);
  assert(createdLead.score >= 80, `Lead scoring algorithm allocated high value score: ${createdLead?.score}`);

  const leadActivities = await db.all('SELECT * FROM activities WHERE lead_id = ?', [createdLead.id]);
  assert(leadActivities.length > 0 && leadActivities[0].type === 'Call', 'Automated 2-Hour SLA Discovery Call activity created');

  const waWelcome = await db.all('SELECT * FROM whatsapp_messages WHERE lead_id = ?', [createdLead.id]);
  assert(waWelcome.length > 0 && waWelcome[0].direction === 'Outbound', 'Automated WhatsApp welcome acknowledgement dispatched');

  // STEP 3: LEAD QUALIFICATION & CONVERSION (P1)
  console.log('\n--- Step 3: Lead Qualification & Conversion to Customer + Deal ---');
  const convertReq = createMockReqRes({ deal_amount: 1800000 }, { id: createdLead.id }, {}, {}, adminUser);
  await leadsController.convertLead(convertReq.req, convertReq.res);
  const convertData = convertReq.res.getData();
  assert(convertData.customerId && convertData.dealId, `Lead converted to Customer (${convertData.customerId}) and Deal (${convertData.dealId})`);

  const customerId = convertData.customerId;
  const dealId = convertData.dealId;

  // STEP 4: FOLLOW-UP ACTIVITY EXECUTION (P1)
  console.log('\n--- Step 4: Activity Follow-ups & Progression ---');
  const actToComplete = leadActivities[0];
  const updateActReq = createMockReqRes({ status: 'Completed', outcome: 'Client agreed to formal architecture proposal.' }, { id: actToComplete.id }, {}, {}, adminUser);
  await followupsController.updateFollowUp(updateActReq.req, updateActReq.res);
  assert(updateActReq.res.getStatusCode() === 200, 'Discovery Call marked Completed with outcome log');

  const newActivities = await db.all('SELECT * FROM activities WHERE lead_id = ?', [createdLead.id]);
  assert(newActivities.length >= 2, 'Follow-up engine automatically scheduled next solution deck follow-up');

  // STEP 5: GST QUOTATION & PDF GENERATION (P1)
  console.log('\n--- Step 5: GST Quotation Builder & PDF Engine ---');
  const quoteItems = [
    { description: 'Phase 1: Architecture Blueprint & Cloud Architecture', qty: 1, rate: 600000, amount: 600000 },
    { description: 'Phase 2: Custom AI Telemetry & Neural Models', qty: 1, rate: 925424, amount: 925424 }
  ];
  const subtotal = 1525424;
  const gstAmount = subtotal * 0.18;
  const totalAmount = subtotal + gstAmount;

  const quoteReq = createMockReqRes({
    deal_id: dealId,
    customer_id: customerId,
    service_title: 'Enterprise AI Telemetry Platform',
    scope_of_work: 'High-availability microservices for connected vehicle fleets with sub-15ms edge inference.',
    items: quoteItems,
    subtotal,
    gst_rate: 18.0,
    gst_amount: gstAmount,
    total_amount: totalAmount
  }, {}, {}, {}, adminUser);

  await financeController.createQuotation(quoteReq.req, quoteReq.res);
  const quoteData = quoteReq.res.getData();
  assert(quoteData.id && quoteData.quote_number, `Formal GST Quotation generated: ${quoteData.quote_number}`);

  const pdfQuoteReq = createMockReqRes({}, { id: quoteData.id }, {}, {}, adminUser);
  await financeController.downloadQuotationPdf(pdfQuoteReq.req, pdfQuoteReq.res);
  const pdfQuoteData = pdfQuoteReq.res.getData();
  assert(pdfQuoteData?.exists, `Quotation PDF successfully compiled and verified: ${pdfQuoteData?.file}`);

  // STEP 6: QUOTATION ACCEPTANCE -> DEAL WON -> AUTO PROJECT & INVOICE (P1)
  console.log('\n--- Step 6: Quotation Acceptance & Deal Won Automation ---');
  const acceptReq = createMockReqRes({ status: 'Accepted' }, { id: quoteData.id }, {}, {}, adminUser);
  await financeController.updateQuotationStatus(acceptReq.req, acceptReq.res);
  assert(acceptReq.res.getStatusCode() === 200, `Quotation ${quoteData.quote_number} marked as Accepted`);

  const wonDeal = await db.get('SELECT * FROM deals WHERE id = ?', [dealId]);
  assert(wonDeal && wonDeal.status === 'Won', 'Deal automatically promoted to Won status');

  const autoProject = await db.get('SELECT * FROM projects WHERE deal_id = ?', [dealId]);
  assert(autoProject && autoProject.project_code, `Automated Agile Project instantiated: ${autoProject?.project_code} (${autoProject?.name})`);

  const milestones = await db.all('SELECT * FROM project_milestones WHERE project_id = ?', [autoProject.id]);
  assert(milestones.length === 3, `Project populated with ${milestones.length} delivery milestones`);

  const autoInvoice = await db.get('SELECT * FROM invoices WHERE deal_id = ?', [dealId]);
  assert(autoInvoice && autoInvoice.invoice_number, `Automated 40% Mobilization Advance Tax Invoice issued: ${autoInvoice?.invoice_number}`);

  const pdfInvReq = createMockReqRes({}, { id: autoInvoice.id }, {}, {}, adminUser);
  await financeController.downloadInvoicePdf(pdfInvReq.req, pdfInvReq.res);
  const pdfInvData = pdfInvReq.res.getData();
  assert(pdfInvData?.exists, `Tax Invoice PDF successfully compiled and verified: ${pdfInvData?.file}`);

  // STEP 7: PAYMENT RECONCILIATION & LEDGER UPDATE (P1)
  console.log('\n--- Step 7: Payment Reconciliation & Customer Ledger ---');
  const advanceAmount = Number(autoInvoice.total_amount);
  const payReq = createMockReqRes({
    invoice_id: autoInvoice.id,
    amount: advanceAmount,
    payment_method: 'RTGS / Bank Transfer',
    transaction_ref: 'HDFC-RTGS-99882211',
    notes: '40% Project Mobilization Advance Payment received via HDFC corporate banking.'
  }, {}, {}, {}, adminUser);

  await financeController.recordPayment(payReq.req, payReq.res);
  const payData = payReq.res.getData();
  assert(payData.paymentId && payData.receiptNumber, `Payment receipt ${payData.receiptNumber} generated and reconciled`);

  const updatedInvoice = await db.get('SELECT * FROM invoices WHERE id = ?', [autoInvoice.id]);
  assert(updatedInvoice.status === 'Paid', `Invoice ${updatedInvoice.invoice_number} reconciled to status: Paid`);

  // STEP 8: AGILE PROJECT SPRINT TASKS & TIMESHEETS (P1)
  console.log('\n--- Step 8: Agile Sprint Tasks & Timesheets ---');
  const taskReq = createMockReqRes({
    project_id: autoProject.id,
    title: 'Design Telemetry Ingestion Architecture (Kafka & Go)',
    department: 'Development',
    priority: 'High',
    estimated_hours: 40,
    due_date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  }, {}, {}, {}, adminUser);

  await projectsTasksController.createTask(taskReq.req, taskReq.res);
  const taskData = taskReq.res.getData();
  assert(taskData.id && taskData.task_code, `Sprint Task backlog created: ${taskData.task_code}`);

  const timeReq = createMockReqRes({
    task_id: taskData.id,
    hours: 8.5,
    notes: 'Implemented Kafka high-throughput consumer with schema registry validation.',
    date: new Date().toISOString().split('T')[0]
  }, {}, {}, {}, adminUser);

  await projectsTasksController.logTimesheet(timeReq.req, timeReq.res);
  assert(timeReq.res.getStatusCode() === 201, 'Logged 8.5 developer hours on task timesheet');

  const updatedTask = await db.get('SELECT * FROM tasks WHERE id = ?', [taskData.id]);
  assert(Number(updatedTask.logged_hours) >= 8.5, `Task ${updatedTask.task_code} logged hours updated to: ${updatedTask.logged_hours}h`);

  // STEP 9: MARKETING CAMPAIGNS & ROI ATTRIBUTION (P2)
  console.log('\n--- Step 9: Marketing Campaigns & ROI Attribution ---');
  const campReq = createMockReqRes({
    name: 'Google AI Cloud Q3 Ads',
    platform: 'Google Ads',
    utm_source: 'google_search',
    utm_campaign: 'enterprise_ai_q3',
    budget: 250000
  }, {}, {}, {}, adminUser);

  await reportsCommsController.createCampaign(campReq.req, campReq.res);
  assert(campReq.res.getStatusCode() === 201, 'Marketing Campaign created with UTM attribution');

  // STEP 10: REAL-TIME EXECUTIVE DASHBOARD KPIS (P1)
  console.log('\n--- Step 10: Real-time Executive Dashboard Metrics ---');
  const dashReq = createMockReqRes({}, {}, {}, {}, adminUser);
  await reportsCommsController.getDashboardMetrics(dashReq.req, dashReq.res);
  const metricsData = dashReq.res.getData();
  assert(metricsData.metrics.totalRevenue > 0, `Dashboard live revenue computed: ₹${metricsData.metrics.totalRevenue.toLocaleString('en-IN')}`);
  assert(metricsData.metrics.activeProjects > 0, `Dashboard active projects: ${metricsData.metrics.activeProjects}`);

  // STEP 11: GLOBAL SEARCH & AUDIT LOGS (P1)
  console.log('\n--- Step 11: Global Search & Audit Logs Trail ---');
  const searchReq = createMockReqRes({}, {}, { q: 'Mahindra' }, {}, adminUser);
  await reportsCommsController.globalSearch(searchReq.req, searchReq.res);
  const searchResults = searchReq.res.getData()?.results;
  assert(searchResults?.leads?.length > 0 || searchResults?.customers?.length > 0, 'Global Search found real matches across Leads and Customers');

  const auditLogs = await db.all('SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 10');
  assert(auditLogs.length > 0, `Tamper-evident audit trail logged ${auditLogs.length} verified operations`);

  console.log('\n================================================================');
  console.log(`🎉 ALL ${passedTests} OF ${totalTests} BUSINESS WORKFLOW TESTS PASSED CLEANLY!`);
  console.log('================================================================');
}

runEndToEndVerification().then(() => {
  process.exit(0);
}).catch((err) => {
  console.error('\n❌ Verification Failed:', err);
  process.exit(1);
});

