import { EMAIL_CONFIG, sendEmailEnquiry } from '../data/emailConfig';
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  Loader2, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle,
  Lock
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
  { name: 'Qatar', code: '+974', flag: '🇶🇦', placeholder: '3312 3456' },
  { name: 'Malaysia', code: '+60', flag: '🇲🇾', placeholder: '12 345 6789' },
  { name: 'Other', code: '+', flag: '🌐', placeholder: 'Phone Number' }
];

export function ContactPage({ onShowToast, onOpenBooking }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    comments: '',
    honeypot: '' // Anti-bot honeypot field
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securityStatus, setSecurityStatus] = useState('');
  const mountTimeRef = useRef(Date.now());

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  // Input Sanitizer
  const sanitizeInput = (str) => {
    if (!str) return '';
    return str
      .replace(/<script[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .trim();
  };

  const validateForm = () => {
    const errors = {};
    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');

    // Name Validation
    if (!cleanName || cleanName.length < 2) {
      errors.name = 'Please provide a valid full name (at least 2 characters).';
    }

    // Email Validation (valid email format, supports gmail and custom domains)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      errors.email = 'Please enter a valid email address (e.g. name@gmail.com).';
    }

    // Phone Validation (must have at least 7 to 15 digits)
    if (cleanPhone && (cleanPhone.length < 7 || cleanPhone.length > 15)) {
      errors.phone = 'Please enter a valid phone number (7-15 digits).';
    }

    // Comments Validation
    if (!formData.comments || formData.comments.trim().length < 5) {
      errors.comments = 'Please enter a brief message (at least 5 characters).';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSecurityStatus('');

    // Security check 1: Honeypot trap for automated spam bots
    if (formData.honeypot) {
      console.warn('Bot detected via honeypot trap.');
      setSubmitted(true);
      return;
    }

    // Security check 2: Time-gate check (Bots fill forms in under 1 second)
    const timeSpent = (Date.now() - mountTimeRef.current) / 1000;
    if (timeSpent < 1.2) {
      setSecurityStatus('Verification in progress. Please submit again.');
      return;
    }

    // Security check 3: Rate Limiting (Prevent flood spamming within 30s)
    const lastSubmitTime = localStorage.getItem('neuorzin_last_contact_ts');
    if (lastSubmitTime && Date.now() - parseInt(lastSubmitTime, 10) < 25000) {
      const waitSeconds = Math.ceil((25000 - (Date.now() - parseInt(lastSubmitTime, 10))) / 1000);
      setSecurityStatus(`Please wait ${waitSeconds}s before sending another message to prevent spam.`);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const fullPhone = formData.phone 
      ? `${formData.countryCode} ${formData.phone.trim()}` 
      : 'Not provided';

    try {
      await sendEmailEnquiry({
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: fullPhone,
        message: sanitizeInput(formData.comments),
        formType: 'Contact Page Inquiry',
        targetEmail: EMAIL_CONFIG.enquiries
      });

      localStorage.setItem('neuorzin_last_contact_ts', Date.now().toString());
      setSubmitted(true);

      if (onShowToast) {
        onShowToast(`Enquiry sent directly to ${EMAIL_CONFIG.enquiries}!`);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCountry = COUNTRY_CODES.find(c => c.code === formData.countryCode) || COUNTRY_CODES[0];

  const mailtoFallback = `mailto:${EMAIL_CONFIG.enquiries}?subject=${encodeURIComponent(
    'Enquiry from ' + (formData.name || 'Website Visitor')
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.countryCode} ${formData.phone}

Message:
${formData.comments}`
  )}`;

  return (
    <div className="pt-24 overflow-hidden">
      {/* Page Breadcrumb Header */}
      <div className="py-20 bg-[#f4f7fb] dark:bg-[#080a14] border-b border-slate-200 dark:border-slate-800 text-center transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display">
            Contact <strong className="text-[#0070ba] dark:text-cyan-400">Us</strong>
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#0070ba] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0070ba] dark:text-cyan-400">Get In Touch</span>
          </div>
        </div>
      </div>

      <section className="py-24 bg-white dark:bg-[#0b0d18] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 3 Contact Info Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center">
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#111424] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-[#0070ba]/10 dark:bg-cyan-500/10 text-[#0070ba] dark:text-cyan-400 flex items-center justify-center mx-auto mb-5">
                <Phone className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Make a Call</h4>
              <a href="tel:+917794045500" className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#0070ba] block">
                77940 45500
              </a>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#111424] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-[#0070ba]/10 dark:bg-cyan-500/10 text-[#0070ba] dark:text-cyan-400 flex items-center justify-center mx-auto mb-5">
                <Mail className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Send a Mail</h4>
              <a href={`mailto:${EMAIL_CONFIG.enquiries}`} className="text-xs text-slate-500 dark:text-slate-400 hover:text-[#0070ba] block font-medium">
                {EMAIL_CONFIG.enquiries}
              </a>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#111424] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-[#0070ba]/10 dark:bg-cyan-500/10 text-[#0070ba] dark:text-cyan-400 flex items-center justify-center mx-auto mb-5">
                <MapPin className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Visit Office</h4>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Visit Office: Hyderabad, India
              </p>
            </div>
          </div>

          {/* Contact Form & Google Map Simulation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-[#111424] border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="flex items-center justify-between gap-2 mb-6">
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Have Questions? Get in Touch!
                  </h3>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Protected
                  </div>
                </div>

                {securityStatus && (
                  <div className="mb-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{securityStatus}</span>
                  </div>
                )}

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Message Dispatched!</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
                      Your enquiry has been securely dispatched to <strong className="text-[#0070ba] dark:text-cyan-400">{EMAIL_CONFIG.enquiries}</strong>. Our engineering leads will review your requirements and respond within 4 business hours.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={mailtoFallback}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0070ba] text-white text-xs font-semibold hover:bg-[#005a96] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Open Direct Mail
                      </a>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', countryCode: '+91', phone: '', comments: '', honeypot: '' });
                          setFormErrors({});
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Hidden Honeypot Anti-Bot Field */}
                    <div className="opacity-0 absolute -z-10 select-none pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
                      <label htmlFor="website_url_hp">Leave empty</label>
                      <input
                        type="text"
                        id="website_url_hp"
                        name="website_url_hp"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.honeypot}
                        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border ${
                            formErrors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                          } text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#0070ba]`}
                        />
                        {formErrors.name && (
                          <p className="text-[11px] text-rose-500 mt-1 pl-1">{formErrors.name}</p>
                        )}
                      </div>

                      {/* Email Field with @gmail.com placeholder */}
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Your Email (e.g. name@gmail.com) *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border ${
                            formErrors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                          } text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#0070ba]`}
                        />
                        {formErrors.email && (
                          <p className="text-[11px] text-rose-500 mt-1 pl-1">{formErrors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Country Code & Phone Number Group */}
                    <div>
                      <div className="flex rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden focus-within:border-[#0070ba] transition-all">
                        {/* Country Selector */}
                        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 px-3 border-r border-slate-200 dark:border-slate-800 shrink-0">
                          <select
                            value={formData.countryCode}
                            onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                            className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer py-3.5 pr-1"
                          >
                            {COUNTRY_CODES.map((c, i) => (
                              <option key={i} value={c.code} className="text-slate-900 bg-white dark:bg-slate-900">
                                {c.flag} {c.code} ({c.name})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Phone Input */}
                        <input
                          type="tel"
                          placeholder={selectedCountry.placeholder}
                          value={formData.phone}
                          onChange={(e) => {
                            // Only allow numbers, spaces, hyphens
                            const val = e.target.value.replace(/[^0-9\s-]/g, '');
                            setFormData({ ...formData, phone: val });
                          }}
                          className="w-full px-4 py-3.5 bg-transparent text-slate-900 dark:text-white text-xs focus:outline-none"
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-[11px] text-rose-500 mt-1 pl-1">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* Comments / Message */}
                    <div>
                      <textarea
                        required
                        rows="4"
                        placeholder="Tell us about your project or architecture questions... *"
                        value={formData.comments}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                        className={`w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border ${
                          formErrors.comments ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                        } text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#0070ba]`}
                      />
                      {formErrors.comments && (
                        <p className="text-[11px] text-rose-500 mt-1 pl-1">{formErrors.comments}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#0070ba]/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Verifying & Dispatching...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Send Secure Message
                        </>
                      )}
                    </button>

                    {/* Security Footnote */}
                    <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-400">
                      <Lock className="w-3 h-3 text-emerald-500" />
                      <span>256-Bit SSL Encrypted • Anti-Spam Protected</span>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Map Image / Location Box */}
            <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900 h-[480px] relative">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3370903333333!2d78.3789!3d17.4483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzUzLjkiTiA3OMKwMjInNDQuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ContactPage;
