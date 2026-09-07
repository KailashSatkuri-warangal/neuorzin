import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Send, 
  User, 
  Mail, 
  Building, 
  CalendarPlus
} from 'lucide-react';

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
    company: '',
    service: 'Product Engineering (Web / Mobile / MVP)',
    date: todayISO,
    time: '11:00 AM - 12:00 PM',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onBookingSuccess) {
        onBookingSuccess(`Appointment booked for ${formData.date} at ${formData.time}!`);
      }
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const generateGoogleCalendarLink = () => {
    const title = encodeURIComponent(`NeuOrzin Strategy Consultation: ${formData.service}`);
    const details = encodeURIComponent(`Strategy consultation with NeuOrzin.
Service: ${formData.service}
Client: ${formData.name} (${formData.company || 'Direct'})`);
    const location = encodeURIComponent('Google Meet (Link will be emailed)');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Book an Appointment" maxWidth="max-w-xl">
      {submitted ? (
        <div className="text-center py-6 space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-scale-up">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1.5">
            <h4 className="text-2xl font-black text-slate-900 font-display">
              Appointment Reserved!
            </h4>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900">{formData.name}</strong>. A calendar invite has been sent to <strong className="text-[#0070ba]">{formData.email}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-700 space-y-2">
            <div><strong className="text-slate-900">Date:</strong> {formData.date} ({formData.time})</div>
            <div><strong className="text-slate-900">Domain:</strong> {formData.service}</div>
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
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Select your preferred consultation date and time. Past dates are automatically blocked.
          </p>

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
                <Mail className="w-3.5 h-3.5 text-[#0070ba]" /> Work Email *
              </label>
              <input
                type="email"
                required
                placeholder="alex@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#0070ba]" /> Company (Optional)
              </label>
              <input
                type="text"
                placeholder="Acme Inc."
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Primary Focus Area
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all cursor-pointer"
              >
                <option value="Product Engineering (Web / Mobile / MVP)">Product Engineering (Web / Mobile / MVP)</option>
                <option value="AI & Autonomous Agents">AI & Autonomous Agents</option>
                <option value="Data Engineering & Snowflake Migration">Data Engineering & Snowflake Migration</option>
                <option value="Cloud Architecture & FinOps">Cloud Architecture & FinOps</option>
                <option value="Quantum Computing Innovation">Quantum Computing Innovation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#0070ba]" /> Select Date *
              </label>
              <input
                type="date"
                required
                min={todayISO}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0070ba]" /> Select Time Slot *
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all cursor-pointer"
              >
                <option value="09:30 AM - 10:30 AM">09:30 AM - 10:30 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                <option value="03:30 PM - 04:30 PM">03:30 PM - 04:30 PM</option>
                <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                <option value="06:30 PM - 07:30 PM">06:30 PM - 07:30 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Project Vision & Goals (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Tell us about your product goals, timeline, or requirements..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-[#0070ba]/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {isSubmitting ? 'Reserving...' : 'Confirm Appointment'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default BookingModal;
