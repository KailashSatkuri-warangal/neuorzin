import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { testimonialsData } from '../../data/testimonialsData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((c) => (c === 0 ? testimonialsData.length - 1 : c - 1));
  };

  const next = () => {
    setCurrent((c) => (c === testimonialsData.length - 1 ? 0 : c + 1));
  };

  const active = testimonialsData[current];

  return (
    <section className="py-24 relative overflow-hidden bg-slate-100/30 dark:bg-surface/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Testimonials"
          title="Trusted by Businesses Who Believe in"
          highlightText="Innovation & Engineering"
          description="We partner with organizations across industries to deliver AI-driven automation, cloud transformation, powerful data systems, and high-performance digital products."
        />

        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 relative shadow-xl">
          <Quote className="absolute top-6 right-8 w-16 h-16 text-brand-blue/10 pointer-events-none" />

          <div className="flex items-center gap-1 mb-6 text-accent-amber">
            {[...Array(active.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent-amber" />
            ))}
          </div>

          <p className="text-lg sm:text-2xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed italic mb-8 font-sans">
            "{active.quote}"
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-200 dark:border-white/10">
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display">{active.author}</h4>
              <p className="text-xs text-brand-blue dark:text-primary-light font-semibold">{active.role} — <span className="text-slate-500 dark:text-slate-400">{active.company}</span></p>
              <span className="inline-block mt-2 text-[11px] font-bold text-emerald-700 dark:text-accent-emerald bg-emerald-50 dark:bg-accent-emerald/10 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-accent-emerald/20">
                {active.highlight}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="p-3 rounded-full bg-white dark:bg-surface-card hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors cursor-pointer shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-3 rounded-full bg-white dark:bg-surface-card hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors cursor-pointer shadow-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
