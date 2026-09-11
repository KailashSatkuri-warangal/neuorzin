/**
 * Local Real-Time Lead & Transaction Store
 * ----------------------------------------------------
 * Captures live form enquiries, bookings, and contact requests in real time.
 * Synchronizes with browser localStorage and broadcasts live updates.
 */

const STORAGE_KEY = 'neuorzin_leads_db';

// Empty default - strictly real-time inbound transactions only
export const INITIAL_MOCK_LEADS = [];

export function getStoredLeads() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load leads store:', err);
    return [];
  }
}

export function saveLeads(leads) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    // Broadcast live event across browser tabs and active components
    window.dispatchEvent(new CustomEvent('neuorzin_leads_updated', { detail: leads }));
  } catch (err) {
    console.error('Failed to save leads store:', err);
  }
}

export function clearAllLeads() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('neuorzin_leads_updated', { detail: [] }));
  } catch (err) {
    console.error('Failed to clear leads store:', err);
  }
}

export function recordNewLead(leadData) {
  const currentLeads = getStoredLeads();
  const now = new Date();
  const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

  const newEntry = {
    id: `LEAD-${Math.floor(1000 + Math.random() * 9000)}`,
    name: leadData.name || 'Anonymous Visitor',
    email: leadData.email || 'No email provided',
    phone: leadData.phone || 'Not provided',
    company: leadData.company || 'Direct Client',
    service: leadData.service || leadData.formType || 'General Technology Consultation',
    source: leadData.formType || 'Website Form',
    date: dateStr,
    status: 'New',
    emailStatus: `Delivered (${leadData.targetEmail || 'info@neuorzin.com'})`,
    message: leadData.message || 'No additional message',
    notes: leadData.notes || '',
    value: '$10,000+'
  };

  const updated = [newEntry, ...currentLeads];
  saveLeads(updated);
  return newEntry;
}

export default {
  getStoredLeads,
  saveLeads,
  clearAllLeads,
  recordNewLead,
  INITIAL_MOCK_LEADS
};
