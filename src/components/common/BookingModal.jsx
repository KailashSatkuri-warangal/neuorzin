import { EMAIL_CONFIG, sendEmailEnquiry } from '../../data/emailConfig';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Modal } from './Modal';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Send, 
  User, 
  Mail, 
  Building, 
  CalendarPlus, 
  HelpCircle,
  Loader2,
  Lock,
  Phone,
  ShieldCheck
} from 'lucide-react';

const COUNTRY_CODES = [
  { name: 'India', code: '+91', flag: '🇮🇳', placeholder: '98765 43210' },
  { name: 'United States', code: '+1', flag: '🇺🇸', placeholder: '555 019 2834' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧', placeholder: '7911 123456' },
  { name: 'UAE', code: '+971', flag: '🇦🇪', placeholder: '50 123 4567' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦', placeholder: '50 123 4567' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬', placeholder: '8123 4567' },
  { name: 'Australia', code: '+61', flag: '🇦🇺', placeholder: '412 345 678' },
  { name: 'Germany', code: '+49', flag: '🇩🇪', placeholder: '151 23456789' },
  { name: 'Canada', code: '+1', flag: '🇨🇦', placeholder: '555 019 2834' },
  { name: 'Other', code: '+', flag: '🌐', placeholder: 'Phone Number' }
];

export function BookingModal({ isOpen, onClose, onBookingSuccess }) {
  const todayISO = useMemo(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    company: '',
    service: 'Sales & Marketing Growth Engines',
    otherServiceDetails: '',
    date: todayISO,
    time: '11:00 AM - 12:00 PM',
    notes: '',
    honeypot: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const mountTimeRef = useRef(Date.now());

  useEffect(() => {
    if (isOpen) {
      mountTimeRef.current = Date.now();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Security Honeypot check
    if (formData.honeypot) {
      setSubmitted(true);
      return;
    }

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrorMsg('Please enter a valid email address (e.g. name@gmail.com).');
      return;
    }

    setIsSubmitting(true);

    const fullPhone = formData.phone 
      ? `${formData.countryCode} ${formData.phone.trim()}` 
      : 'Not provided';

    try {
      await sendEmailEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: fullPhone,
        company: formData.company.trim(),
        service: formData.service === 'Other Technology Initiative' && formData.otherServiceDetails.trim() ? `Other: ${formData.otherServiceDetails.trim()}` : formData.service,
        message: `Preferred Date & Time: ${formData.date} (${formData.time})
Notes: ${formData.notes}`,
        formType: 'Strategy & Consultation Booking',
        targetEmail: EMAIL_CONFIG.enquiries
      });
      setSubmitted(true);
      if (onBookingSuccess) {
        onBookingSuccess(`Enquiry dispatched to ${EMAIL_CONFIG.enquiries} for ${formData.service}!`);
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  const selectedCountry = COUNTRY_CODES.find(c => c.code === formData.countryCode) || COUNTRY_CODES[0];

  const generateGoogleCalendarLink = () => {
    const title = encodeURIComponent(`NeuOrzin Consultation Enquiry: ${formData.service}`);
    const details = encodeURIComponent(`Strategy consultation enquiry with NeuOrzin.
Service: ${formData.service}
Client: ${formData.name} (${formData.company || 'Direct'})
Contact: ${formData.countryCode} ${formData.phone || ''}`);
    const location = encodeURIComponent('Google Meet / Technical Call');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="For Enquiries" maxWidth="max-w-xl">
      {submitted ? (
        <div className="text-center py-6 space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-scale-up">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1.5">
            <h4 className="text-2xl font-black text-slate-900 font-display">
              Enquiry Submitted!
            </h4>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your enquiry has been securely dispatched to <strong className="text-[#0070ba]">{EMAIL_CONFIG.enquiries}</strong>. Our senior engineering team will review your scope and reply to <strong className="text-slate-900">{formData.email}</strong> within 4 business hours.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-700 space-y-2">
            <div><strong className="text-slate-900">Preferred Date:</strong> {formData.date} ({formData.time})</div>
            <div><strong className="text-slate-900">Domain:</strong> {formData.service === 'Other Technology Initiative' && formData.otherServiceDetails ? `Other: ${formData.otherServiceDetails}` : formData.service}</div>
            {formData.phone && (
              <div><strong className="text-slate-900">Phone:</strong> {formData.countryCode} {formData.phone}</div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={generateGoogleCalendarLink()}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold transition-all cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4 text-[#0070ba]" /> Add to Google Calendar
            </a>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0070ba] text-white text-xs font-bold hover:bg-[#005a96] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-slate-900">
          {/* Honeypot Trap */}
          <div className="opacity-0 absolute -z-10 select-none pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
            <input
              type="text"
              name="booking_trap_hp"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Submit your project details and preferred discussion slot for our architecture team.
            </p>
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
              <ShieldCheck className="w-3 h-3" /> Encrypted
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-xl font-medium">
              {errorMsg}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#0070ba]" /> Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Alex Johnson"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#0070ba]" /> Email Address (e.g. @gmail.com) *
              </label>
              <input
                type="email"
                required
                placeholder="alex@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Country & Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#0070ba]" /> Phone Number
              </label>
              <div className="flex rounded-xl bg-slate-50 border border-slate-200 overflow-hidden focus-within:border-[#0070ba] focus-within:bg-white transition-all">
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  className="bg-slate-100 px-2.5 text-xs font-bold text-slate-700 border-r border-slate-200 focus:outline-none cursor-pointer"
                >
                  {COUNTRY_CODES.map((c, i) => (
                    <option key={i} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder={selectedCountry.placeholder}
                  value={formData.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9\s-]/g, '');
                    setFormData({ ...formData, phone: val });
                  }}
                  className="w-full bg-transparent px-3 py-2.5 text-slate-900 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#0070ba]" /> Company / Startup
              </label>
              <input
                type="text"
                placeholder="e.g. Stealth Startup"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#0070ba]" /> Primary Service Focus *
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all"
            >
              <option value="Sales & Marketing Growth Engines">Sales & Marketing Growth Engines</option>
              <option value="CRM & Revenue Operations">CRM & Revenue Operations</option>
              <option value="Product Engineering (Web / Mobile / MVP)">Product Engineering (Web / Mobile / MVP)</option>
              <option value="AI Systems & Autonomous Agents">AI Systems & Autonomous Agents</option>
              <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
              <option value="Enterprise Architecture Consulting">Enterprise Architecture Consulting</option>
              <option value="Other Technology Initiative">Other Technology Initiative</option>
            </select>

            {/* Conditional 20-word textarea when 'Other Technology Initiative' is selected */}
            {formData.service === 'Other Technology Initiative' && (
              <div className="mt-2.5 p-3 rounded-2xl bg-blue-50/60 border border-blue-100 dark:border-blue-900/30 animate-fadeIn">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-700">
                    Specify Your Initiative / Requirement:
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    (formData.otherServiceDetails.trim().split(/\s+/).filter(Boolean).length) > 20
                      ? 'bg-rose-100 text-rose-600 font-bold'
                      : 'bg-blue-100 text-[#0070ba]'
                  }`}>
                    {formData.otherServiceDetails.trim().split(/\s+/).filter(Boolean).length} / 20 words
                  </span>
                </div>
                <textarea
                  rows="2"
                  required
                  placeholder="Describe your custom technology requirement (up to 20 words)..."
                  value={formData.otherServiceDetails}
                  onChange={(e) => {
                    const text = e.target.value;
                    const words = text.trim().split(/\s+/).filter(Boolean);
                    if (words.length <= 20 || text.length < formData.otherServiceDetails.length) {
                      setFormData({ ...formData, otherServiceDetails: text });
                    }
                  }}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-[#0070ba] transition-all resize-none shadow-sm"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#0070ba]" /> Preferred Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0070ba]" /> Time Window (IST / UTC) *
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all"
              >
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM IST</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM IST</option>
                <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM IST</option>
                <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM IST</option>
                <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM IST</option>
                <option value="08:00 PM - 09:00 PM">08:00 PM - 09:00 PM IST (US Morning / EU Eve)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Project Context / Goals (Optional)
            </label>
            <textarea
              rows="3"
              placeholder="Tell us a little bit about what you want to build or improve..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>SSL Secure</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-2.5 rounded-full bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold transition-all shadow-md shadow-[#0070ba]/20 cursor-pointer flex items-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Dispatching...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Submit Enquiry
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
}
export default BookingModal;
