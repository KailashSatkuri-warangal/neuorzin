import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { companyContact } from '../data/navigationData';

export function ContactPage({ onShowToast, onOpenBooking }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comments: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onShowToast) {
      onShowToast('Thank you! Your message has been sent to our Principal Architect.');
    }
  };

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
              <a href="mailto:info@neuorzin.com" className="text-xs text-slate-500 dark:text-slate-400 hover:text-[#0070ba] block">
                info@neuorzin.com
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
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">
                  Have Questions? Get in Touch!
                </h3>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Message Dispatched!</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Our engineering leads will review your requirements and respond within 4 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#0070ba]"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#0070ba]"
                      />
                    </div>

                    <input
                      type="tel"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#0070ba]"
                    />

                    <textarea
                      required
                      rows="4"
                      placeholder="Tell us about your project or architecture questions... *"
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#0070ba]"
                    />

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#0070ba]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Send Message
                    </button>
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
