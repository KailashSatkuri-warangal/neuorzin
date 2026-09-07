import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { expertiseData } from '../../data/expertiseData';
import { ChevronDown, CheckCircle2, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

export function ExpertiseAccordion({ onOpenBooking }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="expertise" className="py-24 relative bg-slate-100/60 dark:bg-dark-300/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Specialized Knowledge"
          badgeVariant="cyan"
          title="Deep Architectural"
          highlightText="Domain Expertise"
          description="Decades of combined engineering excellence across distributed cloud architectures, enterprise data governance, and artificial intelligence."
        />

        <div className="space-y-4 max-w-4xl mx-auto">
          {expertiseData.map((area, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={area.id}
                className="rounded-3xl bg-white dark:bg-card border border-slate-200 dark:border-border overflow-hidden transition-all duration-300 shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-lg sm:text-xl text-slate-900 dark:text-white hover:text-brand-purple transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-brand-purple/10 text-brand-purple dark:text-purple-300 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{area.title}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-purple' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    <p className="mb-4 text-slate-700 dark:text-slate-200">{area.summary}</p>
                    <div className="space-y-2 mb-6">
                      {area.details?.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex flex-wrap gap-2">
                        {area.techStack?.map((tech, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={onOpenBooking}
                        className="text-xs font-bold text-brand-purple hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Request Architecture Spec <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default ExpertiseAccordion;
