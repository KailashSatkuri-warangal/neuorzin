import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  { q: 'Do I need a business plan', a: 'While a complete formal business plan is helpful, our team can work directly from your vision, user stories, or early technical requirements to produce an agile technical architecture and milestone roadmap.' },
  { q: 'How long should a business plan be', a: 'Most production-ready MVPs with NeuOrzin take between 4 to 8 weeks, structured into rapid 2-week continuous deployment sprints.' },
  { q: 'Where do I start', a: 'We conduct a comprehensive architecture and security audit, isolating critical dependencies and designing a zero-downtime progressive migration path.' }
];

export function FaqSection({ onOpenBooking }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="faq-area default-padding bg-gray">
      <div className="container">
        <div className="faq-items">
          <div className="row">
            <div className="col-lg-5 info">
              <h5 className="text-[#0070ba] font-bold text-xs uppercase tracking-wider mb-2">faq</h5>
              <h2 className="title text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight font-display mb-6">
                Most common question about our services
              </h2>
              <Link to="/faq" className="btn btn-theme effect btn-md">View All</Link>
            </div>
            <div className="col-lg-7">
              <div className="faq-content space-y-3">
                {faqs.map((f, idx) => {
                  const isOpen = openIdx === idx;
                  return (
                    <div key={idx} className="accordion-item rounded-2xl bg-white dark:bg-[#111424] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                      <h2 className="accordion-header">
                        <button
                          onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                          className="accordion-button p-4 text-left w-full font-bold text-sm sm:text-base flex items-center justify-between text-slate-900 dark:text-white cursor-pointer"
                        >
                          <span className="flex items-center gap-3">
                            <strong className="w-7 h-7 rounded-full bg-[#0070ba]/10 text-[#0070ba] flex items-center justify-center text-xs">?</strong>
                            {f.q}
                          </span>
                          <i className={`fas fa-chevron-down text-xs transition-transform ${isOpen ? 'rotate-180 text-[#0070ba]' : 'text-slate-400'}`}></i>
                        </button>
                      </h2>
                      {isOpen && (
                        <div className="accordion-body p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                          {f.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FaqSection;
