import React from 'react';
import { Button } from '../common/Button';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';

export function CtaBannerSection({ onOpenBooking }) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 bg-gradient-to-r from-brand-blue/20 via-brand-cyan/15 to-brand-violet/20 dark:from-primary/30 dark:via-secondary/25 dark:to-accent-cyan/15 border border-brand-blue/30 dark:border-primary/40 shadow-2xl backdrop-blur-xl overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-violet/15 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-blue/10 dark:bg-white/10 text-brand-blue dark:text-white border border-brand-blue/20 dark:border-white/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent-amber" /> Ready to Build What’s Next?
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
            NeuOrzin delivers the technology & engineering expertise you need to stay ahead.
          </h2>

          <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg max-w-2xl mx-auto mb-10">
            Whether you need a full product engineering team, specialized AI agent integration, or an end-to-end Snowflake data overhaul, we are ready to accelerate your roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={Calendar}
              onClick={onOpenBooking}
              className="w-full sm:w-auto shadow-xl"
            >
              For Enquiries
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="#expertise"
              icon={ArrowRight}
              className="w-full sm:w-auto"
            >
              Explore All Solutions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
