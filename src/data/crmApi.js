/**
 * NEUORZIN CRM Enterprise API Client
 * Connects frontend Admin Dashboard directly to Express backend on http://localhost:5000/api
 * Supports JWT auth, live data streaming, PDF downloads, and graceful fallback.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

function getAuthToken() {
  return localStorage.getItem('neuorzin_jwt_token') || '';
}

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error(`Backend API route '${endpoint}' not responding with JSON. (Status: ${res.status})`);
    }

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.error || `HTTP ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`[CRM API] ${endpoint} fetch error:`, err.message);
    throw err;
  }
}

function printOrDownloadDoc(type, number, data) {
  const isInvoice = type === 'INVOICE';
  const title = isInvoice ? 'TAX INVOICE' : 'GST COMMERCIAL ESTIMATE / QUOTATION';
  const color = isInvoice ? '#059669' : '#0070ba';
  const clientName = data?.customer_name || data?.company || 'Valued Client Enterprise';
  const items = Array.isArray(data?.items) ? data.items : [];
  const sub = Number(data?.subtotal || (Number(data?.total_amount || 0) / 1.18));
  const gst = Number(data?.gst_amount || (sub * 0.18));
  const tot = Number(data?.total_amount || (sub + gst));
  const paid = Number(data?.paid_amount || 0);
  const bal = Math.max(0, tot - paid);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title} - ${number}</title>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 40px; color: #1e293b; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; }
          .logo { font-size: 24px; font-weight: 900; color: ${color}; letter-spacing: -0.5px; }
          .sub { font-size: 12px; color: #64748b; margin-top: 4px; }
          .title { font-size: 16px; font-weight: 800; margin: 24px 0 16px; color: #0f172a; text-transform: uppercase; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; font-size: 13px; }
          .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
          th { background: #f1f5f9; text-align: left; padding: 10px 14px; font-weight: 700; border-bottom: 1px solid #cbd5e1; }
          td { padding: 12px 14px; border-bottom: 1px solid #e2e8f0; }
          .totals { margin-left: auto; width: 320px; margin-bottom: 30px; font-size: 14px; }
          .totals-row { display: flex; justify-content: space-between; padding: 6px 0; }
          .grand-total { border-top: 2px solid ${color}; font-size: 16px; font-weight: 900; color: ${color}; padding-top: 10px; }
          .footer { font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 40px; }
          @media print { body { margin: 0; } .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 20px; text-align: right;">
          <button onclick="window.print()" style="padding: 10px 20px; background: ${color}; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Print / Save as PDF</button>
        </div>
        <div class="header">
          <div>
            <div class="logo">NEUORZIN TECH LABS</div>
            <div class="sub">Enterprise Software & Autonomous AI Solutions Provider</div>
            <div class="sub">GSTIN: 36AAACN1234F1Z8 | SAC: 998313 | info@neuorzin.com</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 18px; font-weight: bold; color: ${color};">${number}</div>
            <div class="sub">Date: ${new Date().toLocaleDateString('en-IN')}</div>
            <div class="sub">Status: <strong>${data?.status || (isInvoice ? 'Pending' : 'Issued')}</strong></div>
          </div>
        </div>

        <div class="title">${title}</div>

        <div class="meta-grid">
          <div class="meta-box">
            <strong style="color: #64748b; font-size: 11px; text-transform: uppercase;">Billed / Prepared To</strong>
            <div style="font-size: 15px; font-weight: bold; margin: 4px 0;">${clientName}</div>
            <div style="color: #64748b;">Attn: ${data?.customer_name || 'Management'}</div>
            <div style="color: #64748b;">Service: ${data?.service_title || 'Enterprise Engineering Implementation'}</div>
          </div>
          <div class="meta-box">
            <strong style="color: #64748b; font-size: 11px; text-transform: uppercase;">Commercial Terms</strong>
            <div style="margin: 4px 0;">Due Date: <strong>${data?.due_date || data?.valid_until || 'Net 15 Days'}</strong></div>
            <div style="color: #64748b;">Currency: INR (₹) Indian Rupee</div>
            <div style="color: #64748b;">SAC/HSN Code: 998313 (IT Services)</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Description / Scope Deliverable</th>
              <th style="width: 60px;">Qty</th>
              <th style="width: 120px; text-align: right;">Rate (₹)</th>
              <th style="width: 140px; text-align: right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${items.length > 0 ? items.map(it => `
              <tr>
                <td><strong>${it.description || it.name || 'Deliverable'}</strong></td>
                <td>${it.qty || 1}</td>
                <td style="text-align: right;">₹${Number(it.rate || it.amount || 0).toLocaleString('en-IN')}</td>
                <td style="text-align: right;">₹${Number(it.amount || (Number(it.rate || 0) * Number(it.qty || 1))).toLocaleString('en-IN')}</td>
              </tr>
            `).join('') : `
              <tr>
                <td><strong>${data?.service_title || 'Enterprise Software Architecture & Custom Engineering'}</strong></td>
                <td>1</td>
                <td style="text-align: right;">₹${sub.toLocaleString('en-IN')}</td>
                <td style="text-align: right;">₹${sub.toLocaleString('en-IN')}</td>
              </tr>
            `}
          </tbody>
        </table>

        <div class="totals">
          <div class="totals-row"><span>Subtotal (Taxable):</span><strong>₹${sub.toLocaleString('en-IN')}</strong></div>
          <div class="totals-row"><span>GST (18% Integrated IGST):</span><span>₹${gst.toLocaleString('en-IN')}</span></div>
          <div class="totals-row grand-total"><span>Total Value:</span><span>₹${tot.toLocaleString('en-IN')}</span></div>
          ${isInvoice ? `
            <div class="totals-row" style="color: #059669; margin-top: 6px;"><span>Amount Paid:</span><strong>₹${paid.toLocaleString('en-IN')}</strong></div>
            <div class="totals-row" style="color: ${bal > 0 ? '#dc2626' : '#059669'}; font-weight: bold;"><span>Balance Due:</span><strong>₹${bal.toLocaleString('en-IN')}</strong></div>
          ` : ''}
        </div>

        <div class="footer">
          <strong>Bank Remittance:</strong> NEUORZIN TECH LABS PVT LTD | HDFC Bank A/C: 50200088991122 | IFSC: HDFC0001234 | UPI: neuorzin@hdfcbank<br/>
          <em>This is a computer-generated GST invoice/quotation. No physical signature required.</em>
        </div>
      </body>
    </html>
  `;

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
  }
}

export const crmApi = {
  // Health
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
      const ct = res.headers.get('content-type') || '';
      return res.ok && ct.includes('application/json');
    } catch {
      return false;
    }
  },

  // Auth
  login: async (email, password) => {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data.token) {
      localStorage.setItem('neuorzin_jwt_token', data.token);
    }
    return data;
  },

  getMe: () => request('/auth/me'),
  getUsers: () => request('/users'),

  // Leads
  getLeads: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/leads${query ? `?${query}` : ''}`);
  },
  getLeadById: (id) => request(`/leads/${id}`),
  createLead: (leadData) => request('/leads', { method: 'POST', body: JSON.stringify(leadData) }),
  updateLead: (id, updates) => request(`/leads/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteLead: (id) => request(`/leads/${id}`, { method: 'DELETE' }),
  convertLead: (id, dealAmount) => request(`/leads/${id}/convert`, { method: 'POST', body: JSON.stringify({ deal_amount: dealAmount }) }),

  // Follow-ups & Activities
  getActivities: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/followups${query ? `?${query}` : ''}`);
  },
  createActivity: (actData) => request('/followups', { method: 'POST', body: JSON.stringify(actData) }),
  updateActivity: (id, updates) => request(`/followups/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),

  // Deals & Pipelines
  getPipelines: () => request('/pipelines'),
  getDeals: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/deals${query ? `?${query}` : ''}`);
  },
  createDeal: (dealData) => request('/deals', { method: 'POST', body: JSON.stringify(dealData) }),
  updateDeal: (id, updates) => request(`/deals/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteDeal: (id) => request(`/deals/${id}`, { method: 'DELETE' }),

  // Finance: Quotations, Invoices & Payments
  getQuotations: () => request('/quotations'),
  createQuotation: (qtnData) => request('/quotations', { method: 'POST', body: JSON.stringify(qtnData) }),
  updateQuotation: (id, updates) => request(`/quotations/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  updateQuotationStatus: (id, status) => request(`/quotations/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  deleteQuotation: (id) => request(`/quotations/${id}`, { method: 'DELETE' }),
  getQuotationPdfUrl: (id) => `${API_BASE_URL}/quotations/${id}/pdf`,
  downloadQuotationPdf: async (id, quoteNumber = 'Quotation', quotationData = null) => {
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE_URL}/quotations/${id}/pdf`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const blob = await res.blob();
        if (blob && blob.size > 0) {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Quotation_${quoteNumber}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          return true;
        }
      }
    } catch (err) {
      console.warn('Backend PDF download notice, generating printable document:', err);
    }
    // Reliable Fallback Document Viewer / PDF
    printOrDownloadDoc('QUOTATION', quoteNumber, quotationData);
    return true;
  },

  getInvoices: () => request('/invoices'),
  createInvoice: (invData) => request('/invoices', { method: 'POST', body: JSON.stringify(invData) }),
  updateInvoice: (id, updates) => request(`/invoices/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteInvoice: (id) => request(`/invoices/${id}`, { method: 'DELETE' }),
  getInvoicePdfUrl: (id) => `${API_BASE_URL}/invoices/${id}/pdf`,
  downloadInvoicePdf: async (id, invoiceNumber = 'Invoice', invoiceData = null) => {
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE_URL}/invoices/${id}/pdf`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const blob = await res.blob();
        if (blob && blob.size > 0) {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Invoice_${invoiceNumber}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          return true;
        }
      }
    } catch (err) {
      console.warn('Backend PDF download notice, generating printable document:', err);
    }
    // Reliable Fallback Document Viewer / PDF
    printOrDownloadDoc('INVOICE', invoiceNumber, invoiceData);
    return true;
  },
  recordPayment: (paymentData) => request('/invoices/payments', { method: 'POST', body: JSON.stringify(paymentData) }),


  // Projects & Tasks
  getProjects: () => request('/projects'),
  getProjectById: (id) => request(`/projects/${id}`),
  createProject: (projData) => request('/projects', { method: 'POST', body: JSON.stringify(projData) }),
  updateProject: (id, updates) => request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE' }),

  getTasks: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/tasks${query ? `?${query}` : ''}`);
  },
  createTask: (taskData) => request('/tasks', { method: 'POST', body: JSON.stringify(taskData) }),
  updateTask: (id, updates) => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteTask: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
  logTimesheet: (timesheetData) => request('/tasks/timesheets', { method: 'POST', body: JSON.stringify(timesheetData) }),

  // Communications & Marketing
  getWhatsAppMessages: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/whatsapp/messages${query ? `?${query}` : ''}`);
  },
  sendWhatsAppMessage: (msgData) => request('/whatsapp/send', { method: 'POST', body: JSON.stringify(msgData) }),
  deleteWhatsAppMessage: (id) => request(`/whatsapp/messages/${id}`, { method: 'DELETE' }),
  getCampaigns: () => request('/marketing/campaigns'),
  createCampaign: (campData) => request('/marketing/campaigns', { method: 'POST', body: JSON.stringify(campData) }),
  updateCampaign: (id, updates) => request(`/marketing/campaigns/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteCampaign: (id) => request(`/marketing/campaigns/${id}`, { method: 'DELETE' }),

  // Reports & Search
  getDashboardMetrics: () => request('/reports/dashboard'),
  globalSearch: (q) => request(`/search?q=${encodeURIComponent(q)}`),
  getAuditLogs: () => request('/audit-logs'),
  getNotifications: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await request(`/notifications${query ? `?${query}` : ''}`);
    return Array.isArray(res) ? res : (res?.notifications || []);
  },
  markNotificationRead: (id) => request(`/notifications/${id}/read`, { method: 'PUT' }),
  markAllNotificationsRead: () => request('/notifications/read-all', { method: 'PUT' }),
  deleteNotification: (id) => request(`/notifications/${id}`, { method: 'DELETE' })
};

export default crmApi;


