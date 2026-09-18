import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';
import { createNotification, logAudit } from './auditService.js';

export const onNewLeadCreated = async (lead) => {
  try {
    let salesRepId = lead.assigned_to;
    if (!salesRepId) {
      const salesRep = await db.get("SELECT id FROM users WHERE role IN ('Sales Executive', 'Sales Manager') AND status = 'Active' LIMIT 1");
      salesRepId = salesRep ? salesRep.id : 'USR-001';
      await db.run('UPDATE leads SET assigned_to = ? WHERE id = ?', [salesRepId, lead.id]);
    }

    // SLA 1: Initial Discovery Call Activity / Follow-up
    const activityId = `ACT-${uuidv4().substring(0, 8)}`;
    const dueDate = new Date(Date.now() + 2 * 3600000).toISOString();
    await db.run(`
      INSERT INTO activities (id, lead_id, user_id, type, subject, notes, scheduled_at, status)
      VALUES (?, ?, ?, 'Call', 'SLA: Initial Discovery Call (Within 2 Hours)', 'Reach out to qualify technical requirements and timeline.', ?, 'Pending')
    `, [activityId, lead.id, salesRepId, dueDate]);

    // Notification
    await createNotification({
      userId: salesRepId,
      title: '⚡ New Inbound Lead Assigned',
      message: `${lead.name} from ${lead.company || 'Direct Web'} submitted an enquiry (${lead.service || 'General'}). SLA: Call within 2 hrs.`,
      type: 'Lead',
      link: `/admin/leads?id=${lead.id}`
    });

    // Auto-WhatsApp Welcome
    const phone = lead.phone || lead.whatsapp;
    if (phone) {
      const msgId = `WAM-${uuidv4().substring(0, 8)}`;
      await db.run(`
        INSERT INTO whatsapp_messages (id, lead_id, direction, from_phone, to_phone, message, template_id, status)
        VALUES (?, ?, 'Outbound', '+91 77940 45500', ?, ?, 'TPL-ACK-01', 'Delivered')
      `, [
        msgId,
        lead.id,
        phone,
        `Hello ${lead.name}, thank you for contacting NEUORZIN! We have received your request regarding ${lead.service || 'our solutions'}. A senior solution consultant has been assigned and will connect shortly.`
      ]);
    }

    await logAudit({
      userId: salesRepId,
      userName: 'System Automation',
      action: 'LEAD_CAPTURED_AND_ROUTED',
      entityType: 'Lead',
      entityId: lead.id,
      changes: { lead_name: lead.name, assigned_to: salesRepId, source: lead.source }
    });
  } catch (err) {
    console.error('[AUTOMATION: onNewLeadCreated Error]', err.message);
  }
};

export const onFollowUpCompleted = async (activity) => {
  try {
    if (activity.lead_id) {
      const remainingRow = await db.get("SELECT COUNT(*) as count FROM activities WHERE lead_id = ? AND status = 'Pending'", [activity.lead_id]);
      const remaining = Number(remainingRow?.count || 0);
      if (remaining === 0) {
        const nextId = `ACT-${uuidv4().substring(0, 8)}`;
        const nextDueDate = new Date(Date.now() + 2 * 86400000).toISOString();
        await db.run(`
          INSERT INTO activities (id, lead_id, user_id, type, subject, notes, scheduled_at, status)
          VALUES (?, ?, ?, 'Email', 'Follow-up: Share Solution Architecture & Deck', 'Send overview deck based on discovery conversation.', ?, 'Pending')
        `, [nextId, activity.lead_id, activity.user_id || 'USR-001', nextDueDate]);
      }
    }
  } catch (err) {
    console.error('[AUTOMATION: onFollowUpCompleted Error]', err.message);
  }
};

export const onDealWon = async (deal) => {
  try {
    const existingProject = await db.get('SELECT id FROM projects WHERE deal_id = ?', [deal.id]);
    let projectId;

    if (!existingProject) {
      projectId = `PRJ-${uuidv4().substring(0, 8)}`;
      const projCountRow = await db.get('SELECT COUNT(*) as count FROM projects');
      const projCount = Number(projCountRow?.count || 0);
      const projectCode = `PRJ-2026-${String(projCount + 1).padStart(4, '0')}`;

      let customerId = deal.customer_id;
      if (!customerId) {
        const firstCust = await db.get('SELECT id FROM customers LIMIT 1');
        customerId = firstCust ? firstCust.id : 'CUST-001';
      }

      await db.run(`
        INSERT INTO projects (
          id, project_code, name, customer_id, deal_id, project_manager_id,
          department, start_date, budget, priority, status, health, description
        ) VALUES (?, ?, ?, ?, ?, 'USR-001', 'Development', CURRENT_DATE, ?, 'High', 'Kickoff', 'Good', ?)
      `, [
        projectId,
        projectCode,
        deal.title,
        customerId,
        deal.id,
        parseFloat(deal.value || 500000),
        deal.notes || 'Project initialized automatically from Won Deal'
      ]);

      // Create 3 standard delivery milestones
      const milestones = [
        { title: 'Milestone 1: Architectural Blueprint & Discovery', amount: (deal.value || 500000) * 0.4, order: 1, due: 15 },
        { title: 'Milestone 2: MVP Development & Integration', amount: (deal.value || 500000) * 0.4, order: 2, due: 45 },
        { title: 'Milestone 3: Final UAT, Cloud Deploy & Handover', amount: (deal.value || 500000) * 0.2, order: 3, due: 60 }
      ];

      for (const m of milestones) {
        const msId = `MS-${uuidv4().substring(0, 8)}`;
        await db.run(`
          INSERT INTO project_milestones (id, project_id, title, due_date, billing_amount, status)
          VALUES (?, ?, ?, CURRENT_DATE + ${m.due}, ?, 'Pending')
        `, [msId, projectId, m.title, m.amount]);
      }
    } else {
      projectId = existingProject.id;
    }

    // Auto-generate 40% Advance GST Invoice
    const existingInvoice = await db.get('SELECT id FROM invoices WHERE deal_id = ?', [deal.id]);
    if (!existingInvoice) {
      const invId = `INV-${uuidv4().substring(0, 8)}`;
      const invCountRow = await db.get('SELECT COUNT(*) as count FROM invoices');
      const invCount = Number(invCountRow?.count || 0);
      const invoiceNumber = `INV-2026-${String(invCount + 1).padStart(4, '0')}`;
      const advanceTaxable = (parseFloat(deal.value) || 500000) * 0.4;
      const gst = advanceTaxable * 0.18;
      const total = advanceTaxable + gst;

      let customerId = deal.customer_id;
      if (!customerId) {
        const firstCust = await db.get('SELECT id FROM customers LIMIT 1');
        customerId = firstCust ? firstCust.id : 'CUST-001';
      }

      const lineItems = [
        {
          description: `40% Mobilization Advance: ${deal.title}`,
          sac: '998313',
          qty: 1,
          rate: advanceTaxable,
          amount: advanceTaxable
        }
      ];

      await db.run(`
        INSERT INTO invoices (
          id, invoice_number, deal_id, customer_id, created_by,
          issue_date, due_date, items, subtotal, discount,
          gst_number, gst_amount, total_amount, paid_amount, status, notes
        ) VALUES (?, ?, ?, ?, 'USR-001', CURRENT_DATE, CURRENT_DATE + 7, ?, ?, 0, '36ABCDE1234F1Z5', ?, ?, 0, 'Unpaid', '40% Project Kickoff Advance Payment')
      `, [
        invId,
        invoiceNumber,
        deal.id,
        customerId,
        JSON.stringify(lineItems),
        advanceTaxable,
        gst,
        total
      ]);
    }

    await createNotification({
      userId: deal.assigned_to || 'USR-001',
      title: '🎉 Deal Closed Won!',
      message: `Deal "${deal.title}" (₹${Number(deal.value || 0).toLocaleString('en-IN')}) is won! Automated Project and 40% Advance Invoice generated.`,
      type: 'Success',
      link: `/admin/projects`
    });

    await logAudit({
      userId: deal.assigned_to || 'USR-001',
      userName: 'Deal Closer',
      action: 'DEAL_WON_AUTOMATION',
      entityType: 'Deal',
      entityId: deal.id,
      changes: { deal_title: deal.title, value: deal.value, project_id: projectId }
    });
  } catch (err) {
    console.error('[AUTOMATION: onDealWon Error]', err.message);
  }
};

export const onQuotationAccepted = async (quotation) => {
  try {
    if (quotation.deal_id) {
      await db.run("UPDATE deals SET stage = 'Won', status = 'Won', value = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [quotation.total_amount, quotation.deal_id]);
      const deal = await db.get('SELECT * FROM deals WHERE id = ?', [quotation.deal_id]);
      if (deal) {
        await onDealWon(deal);
      }
    }
    await logAudit({
      userId: quotation.created_by || 'USR-001',
      userName: 'Client Acceptance',
      action: 'QUOTATION_ACCEPTED',
      entityType: 'Quotation',
      entityId: quotation.id,
      changes: { quote_number: quotation.quote_number, total_amount: quotation.total_amount }
    });
  } catch (err) {
    console.error('[AUTOMATION: onQuotationAccepted Error]', err.message);
  }
};

export const onPaymentReceived = async (payment) => {
  try {
    const invoice = await db.get('SELECT * FROM invoices WHERE id = ?', [payment.invoice_id]);
    if (!invoice) return;

    const newPaidAmount = Number(invoice.paid_amount || 0) + Number(payment.amount);
    let newStatus = 'Partially Paid';
    if (newPaidAmount >= Number(invoice.total_amount)) {
      newStatus = 'Paid';
    }

    await db.run('UPDATE invoices SET paid_amount = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [newPaidAmount, newStatus, payment.invoice_id]);

    // Update Customer Balance Amount in Customer Ledger
    if (invoice.customer_id) {
      await db.run('UPDATE customers SET balance_amount = GREATEST(0, COALESCE(balance_amount, 0) - ?), updated_at = CURRENT_TIMESTAMP WHERE id = ?', [Number(payment.amount), invoice.customer_id]);
    }

    await logAudit({
      userId: payment.recorded_by || 'USR-001',
      userName: 'Finance Reconciler',
      action: 'PAYMENT_RECORDED',
      entityType: 'Invoice',
      entityId: payment.invoice_id,
      changes: { amount: payment.amount, status: newStatus, transaction_ref: payment.transaction_ref }
    });

    await createNotification({
      userId: 'USR-001',
      title: '💰 Payment Received',
      message: `Received ₹${Number(payment.amount).toLocaleString('en-IN')} for Invoice ${invoice.invoice_number}. Status: ${newStatus}`,
      type: 'Success',
      link: `/admin/invoices`
    });
  } catch (err) {
    console.error('[AUTOMATION: onPaymentReceived Error]', err.message);
  }
};

export const runOverdueAlertsCheck = async () => {
  try {
    const overdueActivities = await db.all("SELECT * FROM activities WHERE status = 'Pending' AND scheduled_at < CURRENT_TIMESTAMP");
    for (const act of overdueActivities) {
      await createNotification({
        userId: act.user_id || 'USR-001',
        title: '⚠️ Overdue Activity Task',
        message: `Activity "${act.subject}" was due on ${act.scheduled_at}. Please attend immediately.`,
        type: 'Warning',
        link: '/admin/followups'
      });
    }

    const overdueInvoices = await db.all("SELECT * FROM invoices WHERE status != 'Paid' AND due_date < CURRENT_DATE");
    for (const inv of overdueInvoices) {
      await createNotification({
        userId: 'USR-001',
        title: '⚠️ Overdue Client Invoice',
        message: `Invoice ${inv.invoice_number} (₹${inv.total_amount}) is past its due date (${inv.due_date}).`,
        type: 'Escalation',
        link: '/admin/invoices'
      });
    }
  } catch (err) {
    console.error('[AUTOMATION: runOverdueAlertsCheck Error]', err.message);
  }
};

