import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';
import { createNotification, logAudit } from './auditService.js';

export const onNewLeadCreated = (lead) => {
  try {
    let salesRepId = lead.assigned_to;
    if (!salesRepId) {
      const salesRep = db.prepare("SELECT id FROM users WHERE role IN ('Sales Executive', 'Sales Manager') AND status = 'Active' ORDER BY RANDOM() LIMIT 1").get();
      salesRepId = salesRep ? salesRep.id : 'USR-001';
      db.prepare('UPDATE leads SET assigned_to = ? WHERE id = ?').run(salesRepId, lead.id);
    }

    // SLA 1: Initial Discovery Call Activity / Follow-up
    const activityId = `ACT-${uuidv4().substring(0, 8)}`;
    const dueDate = new Date(Date.now() + 2 * 3600000).toISOString();
    db.prepare(`
      INSERT INTO activities (id, lead_id, user_id, type, subject, notes, scheduled_at, status)
      VALUES (?, ?, ?, 'Call', 'SLA: Initial Discovery Call (Within 2 Hours)', 'Reach out to qualify technical requirements and timeline.', ?, 'Pending')
    `).run(activityId, lead.id, salesRepId, dueDate);

    // Notification
    createNotification({
      userId: salesRepId,
      title: '⚡ New Inbound Lead Assigned',
      message: `${lead.name} from ${lead.company || 'Direct Web'} submitted an enquiry (${lead.service || 'General'}). SLA: Call within 2 hrs.`,
      type: 'Lead',
      link: `/admin?tab=leads&id=${lead.id}`
    });

    // Auto-WhatsApp Welcome
    const phone = lead.phone || lead.whatsapp;
    if (phone) {
      const msgId = `WAM-${uuidv4().substring(0, 8)}`;
      db.prepare(`
        INSERT INTO whatsapp_messages (id, lead_id, direction, from_phone, to_phone, message, template_id, status)
        VALUES (?, ?, 'Outbound', '+91 77940 45500', ?, ?, 'TPL-ACK-01', 'Delivered')
      `).run(
        msgId,
        lead.id,
        phone,
        `Hello ${lead.name}, thank you for contacting NEUORZIN! We have received your request regarding ${lead.service || 'our solutions'}. A senior solution consultant has been assigned and will connect shortly.`
      );
    }
  } catch (err) {
    console.error('[AUTOMATION: onNewLeadCreated Error]', err.message);
  }
};

export const onFollowUpCompleted = (activity) => {
  try {
    if (activity.lead_id) {
      const remaining = db.prepare("SELECT COUNT(*) as count FROM activities WHERE lead_id = ? AND status = 'Pending'").get(activity.lead_id).count;
      if (remaining === 0) {
        const nextId = `ACT-${uuidv4().substring(0, 8)}`;
        const nextDueDate = new Date(Date.now() + 2 * 86400000).toISOString();
        db.prepare(`
          INSERT INTO activities (id, lead_id, user_id, type, subject, notes, scheduled_at, status)
          VALUES (?, ?, ?, 'Email', 'Follow-up: Share Solution Architecture & Deck', 'Send overview deck based on discovery conversation.', ?, 'Pending')
        `).run(nextId, activity.lead_id, activity.user_id || 'USR-001', nextDueDate);
      }
    }
  } catch (err) {
    console.error('[AUTOMATION: onFollowUpCompleted Error]', err.message);
  }
};

export const onDealWon = (deal) => {
  try {
    const existingProject = db.prepare('SELECT id FROM projects WHERE deal_id = ?').get(deal.id);
    let projectId;

    if (!existingProject) {
      projectId = `PRJ-${uuidv4().substring(0, 8)}`;
      const projCount = db.prepare('SELECT COUNT(*) as count FROM projects').get().count;
      const projectCode = `PRJ-2026-${String(projCount + 1).padStart(4, '0')}`;

      db.prepare(`
        INSERT INTO projects (
          id, project_code, name, customer_id, deal_id, project_manager_id,
          department, start_date, budget, priority, status, health, description
        ) VALUES (?, ?, ?, ?, ?, 'USR-004', 'Development', DATE('now'), ?, 'High', 'Kickoff', 'Good', ?)
      `).run(
        projectId,
        projectCode,
        deal.title,
        deal.customer_id,
        deal.id,
        deal.value || 500000.00,
        deal.notes || 'Project initialized automatically from Won Deal'
      );

      // Create 3 standard delivery milestones
      const milestones = [
        { title: 'Milestone 1: Architectural Blueprint & Discovery', amount: (deal.value || 500000) * 0.4, order: 1, due: 15 },
        { title: 'Milestone 2: MVP Development & Integration', amount: (deal.value || 500000) * 0.4, order: 2, due: 45 },
        { title: 'Milestone 3: Final UAT, Cloud Deploy & Handover', amount: (deal.value || 500000) * 0.2, order: 3, due: 60 }
      ];

      milestones.forEach((m) => {
        const msId = `MS-${uuidv4().substring(0, 8)}`;
        db.prepare(`
          INSERT INTO project_milestones (id, project_id, title, due_date, billing_amount, status)
          VALUES (?, ?, ?, DATE('now', '+' || ? || ' days'), ?, 'Pending')
        `).run(msId, projectId, m.title, m.due, m.amount);
      });
    } else {
      projectId = existingProject.id;
    }

    // Auto-generate 40% Advance GST Invoice
    const existingInvoice = db.prepare('SELECT id FROM invoices WHERE deal_id = ?').get(deal.id);
    if (!existingInvoice) {
      const invId = `INV-${uuidv4().substring(0, 8)}`;
      const invCount = db.prepare('SELECT COUNT(*) as count FROM invoices').get().count;
      const invoiceNumber = `INV-2026-${String(invCount + 1).padStart(4, '0')}`;
      const advanceTaxable = (deal.value || 500000) * 0.4;
      const gst = advanceTaxable * 0.18;
      const total = advanceTaxable + gst;

      const lineItems = [
        {
          description: `40% Mobilization Advance: ${deal.title}`,
          sac: '998313',
          qty: 1,
          rate: advanceTaxable,
          amount: advanceTaxable
        }
      ];

      db.prepare(`
        INSERT INTO invoices (
          id, invoice_number, deal_id, customer_id, created_by,
          issue_date, due_date, items, subtotal, discount,
          gst_number, gst_amount, total_amount, paid_amount, status, notes
        ) VALUES (?, ?, ?, ?, 'USR-001', DATE('now'), DATE('now', '+7 days'), ?, ?, 0, '36ABCDE1234F1Z5', ?, ?, 0, 'Unpaid', '40% Project Kickoff Advance Payment')
      `).run(
        invId,
        invoiceNumber,
        deal.id,
        deal.customer_id,
        JSON.stringify(lineItems),
        advanceTaxable,
        gst,
        total
      );
    }

    createNotification({
      userId: deal.assigned_to || 'USR-001',
      title: '🎉 Deal Closed Won!',
      message: `Deal "${deal.title}" (₹${(deal.value || 0).toLocaleString('en-IN')}) is won! Automated Project and 40% Advance Invoice generated.`,
      type: 'Success',
      link: `/admin?tab=projects`
    });
  } catch (err) {
    console.error('[AUTOMATION: onDealWon Error]', err.message);
  }
};

export const onQuotationAccepted = (quotation) => {
  try {
    if (quotation.deal_id) {
      db.prepare("UPDATE deals SET stage = 'Won / Signed', status = 'Won', value = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(quotation.total_amount, quotation.deal_id);
      const deal = db.prepare('SELECT * FROM deals WHERE id = ?').get(quotation.deal_id);
      if (deal) {
        onDealWon(deal);
      }
    }
  } catch (err) {
    console.error('[AUTOMATION: onQuotationAccepted Error]', err.message);
  }
};

export const onPaymentReceived = (payment) => {
  try {
    const invoice = db.prepare('SELECT * FROM invoices WHERE id = ?').get(payment.invoice_id);
    if (!invoice) return;

    const newPaidAmount = Number(invoice.paid_amount || 0) + Number(payment.amount);
    let newStatus = 'Partially Paid';
    if (newPaidAmount >= Number(invoice.total_amount)) {
      newStatus = 'Paid';
    }

    db.prepare('UPDATE invoices SET paid_amount = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(newPaidAmount, newStatus, payment.invoice_id);

    logAudit({
      userId: payment.recorded_by || 'USR-001',
      action: 'PAYMENT_RECORDED',
      entityType: 'Invoice',
      entityId: payment.invoice_id,
      changes: { amount: payment.amount, status: newStatus, transaction_ref: payment.transaction_ref }
    });

    createNotification({
      userId: 'USR-001',
      title: '💰 Payment Received',
      message: `Received ₹${Number(payment.amount).toLocaleString('en-IN')} for Invoice ${invoice.invoice_number}. Status: ${newStatus}`,
      type: 'Success',
      link: `/admin?tab=invoices`
    });
  } catch (err) {
    console.error('[AUTOMATION: onPaymentReceived Error]', err.message);
  }
};

export const runOverdueAlertsCheck = () => {
  try {
    const overdueActivities = db.prepare("SELECT * FROM activities WHERE status = 'Pending' AND scheduled_at < datetime('now')").all();
    overdueActivities.forEach(act => {
      createNotification({
        userId: act.user_id || 'USR-001',
        title: '⚠️ Overdue Activity Task',
        message: `Activity "${act.subject}" was due on ${act.scheduled_at}. Please attend immediately.`,
        type: 'Warning',
        link: '/admin?tab=activities'
      });
    });

    const overdueInvoices = db.prepare("SELECT * FROM invoices WHERE status != 'Paid' AND due_date < date('now')").all();
    overdueInvoices.forEach(inv => {
      createNotification({
        userId: 'USR-001',
        title: '⚠️ Overdue Client Invoice',
        message: `Invoice ${inv.invoice_number} (₹${inv.total_amount}) is past its due date (${inv.due_date}).`,
        type: 'Escalation',
        link: '/admin?tab=invoices'
      });
    });
  } catch (err) {
    console.error('[AUTOMATION: runOverdueAlertsCheck Error]', err.message);
  }
};
