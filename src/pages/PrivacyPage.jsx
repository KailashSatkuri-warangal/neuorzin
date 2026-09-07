import React from 'react';
import { Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" /> Legal & Governance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Enterprise Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-2">Last Updated: September 2026 | ISO 27001 & GDPR Compliant</p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-xl space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-purple" /> 1. Commitment to Client Data Sovereignty
            </h2>
            <p>
              At NeuOrzin, we treat data confidentiality as paramount. We adhere to international security and privacy standards including the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and SOC2 Type II compliance frameworks.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              2. Zero AI Training on Client Data
            </h2>
            <p>
              We explicitly state that <strong>client proprietary datasets, intellectual property, code repositories, and telemetry logs are NEVER used to train public or shared artificial intelligence foundation models</strong>. All models and RAG knowledge graphs deployed by NeuOrzin operate strictly inside client-owned isolated virtual private clouds (VPCs).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              3. Information We Collect
            </h2>
            <p className="mb-2">When engaging with NeuOrzin via our website or services, we collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contact details (Name, Work Email, Phone Number, Company Name)</li>
              <li>Project scope requirements and technical architecture specifications</li>
              <li>Standard website analytics (anonymized IP addresses, browser types, session performance)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              4. Data Retention & Cryptographic Security
            </h2>
            <p>
              All client data in transit is encrypted using TLS 1.3, and all data at rest is encrypted using AES-256 with customer-managed cryptographic keys (CMEK) where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              5. Contact Our Data Protection Officer (DPO)
            </h2>
            <p>
              For privacy audits or data erasure requests, contact our legal team at <a href="mailto:privacy@neuorzin.com" className="text-brand-purple font-semibold hover:underline">privacy@neuorzin.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
export default PrivacyPage;
