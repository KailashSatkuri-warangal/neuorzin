import { recordNewLead } from './leadsStore';

/**
 * Centralized Email & Enquiry Destination Configuration
 * =======================================================
 * Easily update the destination email addresses for all forms,
 * booking modals, contact requests, and touchpoints across the site.
 * 
 * Change the email values below anytime in this single file.
 */

export const EMAIL_CONFIG = {
  // Main recipient for all project enquiries, consultation bookings, and strategy requests
  enquiries: 'info@neuorzin.com',

  // General corporate contact email
  general: 'info@neuorzin.com',

  // Talent & career application destination
  careers: 'info@neuorzin.com',

  // Press, media, and public relations enquiries
  press: 'info@neuorzin.com',

  // Customer support and technical assistance
  support: 'info@neuorzin.com',

  // Privacy & compliance requests
  privacy: 'privacy@neuorzin.com',

  // Optional access keys for external services (if using Web3Forms or Formspree)
  web3FormsKey: '', // Get free key at https://web3forms.com if preferred
  formspreeId: '',  // Get free form ID at https://formspree.io if preferred
};

/**
 * Dispatch real emails from the browser using FormSubmit / Web3Forms / Formspree
 * and automatically persist into Admin Leads & Email Transactions store in real time.
 * @param {Object} data - Form data payload
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function sendEmailEnquiry(data = {}) {
  const {
    name = '',
    email = '',
    phone = '',
    company = '',
    service = '',
    message = '',
    formType = 'Website Enquiry',
    targetEmail = EMAIL_CONFIG.enquiries
  } = data;

  // Auto-record lead into real-time SQLite Backend DB and Local transactions DB
  try {
    recordNewLead({
      name,
      email,
      phone,
      company,
      service,
      message,
      formType,
      targetEmail
    });

    // POST directly to Express CRM Backend
    fetch('http://localhost:5000/api/leads/inbound', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone,
        company,
        service: service || 'Enterprise Solutions',
        requirement_need: message,
        source: formType || 'Website Inbound'
      })
    }).catch(e => console.warn('Inbound CRM sync notice:', e.message));
  } catch (storeErr) {
    console.warn('Lead store sync note:', storeErr);
  }

  const payload = {
    Name: name,
    Email: email,
    Phone: phone || 'Not provided',
    Company: company || 'Not provided',
    Service: service || 'General Enquiry',
    Message: message || 'No extra notes',
    FormType: formType,
    _subject: `[NeuOrzin Website] New ${formType} from ${name}`,
    _template: 'table',
    _captcha: 'false'
  };

  try {
    // 1. If Web3Forms API Key is configured
    if (EMAIL_CONFIG.web3FormsKey) {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: EMAIL_CONFIG.web3FormsKey,
          ...payload,
          to_email: targetEmail
        })
      });
      const result = await res.json();
      return { success: result.success !== false, message: result.message || 'Dispatched via Web3Forms' };
    }

    // 2. If Formspree Form ID is configured
    if (EMAIL_CONFIG.formspreeId) {
      const res = await fetch(`https://formspree.io/f/${EMAIL_CONFIG.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      return { success: res.ok, message: 'Dispatched via Formspree' };
    }

    // 3. Default: FormSubmit.co (Zero registration / instant real email delivery)
    const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    return { 
      success: true, 
      message: result.message || 'Dispatched to inbox via FormSubmit',
      raw: result 
    };
  } catch (err) {
    console.warn('Real email dispatch error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Helper utility to build pre-formatted mailto links
 */
export function createMailtoLink(destination = EMAIL_CONFIG.enquiries, subject = '', body = '') {
  const params = [];
  if (subject) params.push('subject=' + encodeURIComponent(subject));
  if (body) params.push('body=' + encodeURIComponent(body));
  const queryString = params.length > 0 ? '?' + params.join('&') : '';
  return 'mailto:' + destination + queryString;
}

export default EMAIL_CONFIG;
