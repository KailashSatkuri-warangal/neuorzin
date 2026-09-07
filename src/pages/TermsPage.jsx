import React from 'react';
import { FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="pt-28 pb-20 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5" /> Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Terms of Service & Engineering Master Services
          </h1>
          <p className="text-xs text-slate-500 mt-2">Effective: September 2026</p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-xl space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the NeuOrzin digital platform or entering into a Statement of Work (SOW) with NeuOrzin, you agree to these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              2. Intellectual Property (IP) Ownership
            </h2>
            <p>
              Unless explicitly specified in a custom Master Services Agreement, <strong>100% of all software code, architecture blueprints, database schemas, and proprietary custom models developed by NeuOrzin pods for the client become the sole property of the client upon payment completion</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              3. Service Level Agreements (SLAs) & Uptime
            </h2>
            <p>
              Production platforms deployed under our Managed SRE tier are guaranteed 99.999% availability, backed by financial credits in the event of unscheduled system downtime exceeding agreed thresholds.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              4. Limitation of Liability
            </h2>
            <p>
              NeuOrzin guarantees software execution strictly within agreed project boundaries and specifications. Neither party shall be liable for indirect, incidental, or consequential damages.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
export default TermsPage;
