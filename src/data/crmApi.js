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

export const crmApi = {
  // Health
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
      return res.ok;
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

  // Finance: Quotations, Invoices & Payments
  getQuotations: () => request('/quotations'),
  createQuotation: (qtnData) => request('/quotations', { method: 'POST', body: JSON.stringify(qtnData) }),
  updateQuotationStatus: (id, status) => request(`/quotations/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  getQuotationPdfUrl: (id) => `${API_BASE_URL}/quotations/${id}/pdf`,

  getInvoices: () => request('/invoices'),
  createInvoice: (invData) => request('/invoices', { method: 'POST', body: JSON.stringify(invData) }),
  getInvoicePdfUrl: (id) => `${API_BASE_URL}/invoices/${id}/pdf`,
  recordPayment: (paymentData) => request('/invoices/payments', { method: 'POST', body: JSON.stringify(paymentData) }),

  // Projects & Tasks
  getProjects: () => request('/projects'),
  getProjectById: (id) => request(`/projects/${id}`),
  createProject: (projData) => request('/projects', { method: 'POST', body: JSON.stringify(projData) }),
  updateProject: (id, updates) => request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),

  getTasks: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/tasks${query ? `?${query}` : ''}`);
  },
  createTask: (taskData) => request('/tasks', { method: 'POST', body: JSON.stringify(taskData) }),
  updateTask: (id, updates) => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  logTimesheet: (timesheetData) => request('/tasks/timesheets', { method: 'POST', body: JSON.stringify(timesheetData) }),

  // Communications & Marketing
  getWhatsAppMessages: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/whatsapp/messages${query ? `?${query}` : ''}`);
  },
  sendWhatsAppMessage: (msgData) => request('/whatsapp/send', { method: 'POST', body: JSON.stringify(msgData) }),
  getCampaigns: () => request('/marketing/campaigns'),
  createCampaign: (campData) => request('/marketing/campaigns', { method: 'POST', body: JSON.stringify(campData) }),

  // Reports & Search
  getDashboardMetrics: () => request('/reports/dashboard'),
  globalSearch: (q) => request(`/search?q=${encodeURIComponent(q)}`),
  getAuditLogs: () => request('/audit-logs'),
  getNotifications: () => request('/notifications'),
  markNotificationRead: (id) => request(`/notifications/${id}/read`, { method: 'PUT' })
};

export default crmApi;
