import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, HeartPulse, ShoppingBag, Bot, Shield, 
  Sparkles, CheckCircle2, ArrowRight, Lock, Activity, 
  Plane, Zap, Globe 
} from 'lucide-react';
import { industriesData } from '../data/industriesData';

export function IndustriesPage({ onOpenBooking }) {
  const [selectedIndustry, setSelectedIndustry] = useState(industriesData[0].id);

  const activeInd = industriesData.find(i => i.id === selectedIndustry) || industriesData[0];

  return (
    <div className="pt-28 pb-20 overflow-hidden">
      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Industry Solutions
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] max-w-4xl mx-auto">
          Tailored Domain Engineering for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan">Regulated Enterprises</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Deep industry expertise meets hardcore systems architecture. We build compliance-ready platforms for high-stakes domains.
        </p>
      </section>

      {/* Interactive Industry Selector & Detail */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Industry Tabs */}
          <div className="lg:col-span-4 space-y-3">
            {industriesData.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between group ${
                  selectedIndustry === ind.id
                    ? 'bg-gradient-to-r from-brand-purple to-brand-blue text-white border-transparent shadow-lg shadow-brand-purple/20'
                    : 'bg-white dark:bg-card border-slate-200 dark:border-border text-slate-800 dark:text-slate-200 hover:border-brand-purple/40'
                }`}
              >
                <div>
                  <div className="font-bold text-base">{ind.title}</div>
                  <div className={`text-xs mt-1 ${selectedIndustry === ind.id ? 'text-purple-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    {ind.subtitle}
                  </div>
                </div>
                <ArrowRight className={`w-5 h-5 shrink-0 transition-transform ${selectedIndustry === ind.id ? 'translate-x-1' : 'opacity-40'}`} />
              </button>
            ))}
          </div>

          {/* Active Industry Showcase */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeInd.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-xl flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {activeInd.title}
                    </h2>
                    <p className="text-sm font-semibold text-brand-purple mt-1">{activeInd.subtitle}</p>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan dark:text-cyan-400 text-xs font-bold font-mono">
                    Impact: {activeInd.metrics}
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                  {activeInd.description}
                </p>

                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                  Key Engineering Solutions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {activeInd.points.map((pt, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                  Applied Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeInd.technologies.map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-500">Need a specialized domain architect?</span>
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold text-xs shadow-md hover:opacity-95 transition-all"
                >
                  Consult an Industry Architect
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance Frameworks Matrix */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan">Compliance by Design</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">Certified Security & Regulatory Readiness</h2>
            <p className="text-slate-400 text-sm mt-2">Every system adheres to international privacy, auditability, and cybersecurity frameworks.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'SOC2 Type II', desc: 'Continuous automated compliance telemetry & access control' },
              { title: 'HIPAA & HITECH', desc: 'Encrypted ePHI storage with signed BAA and zero-knowledge pipelines' },
              { title: 'PCI-DSS Level 1', desc: 'Tokenized transaction gateways & cryptographic HSM integration' },
              { title: 'GDPR / CCPA', desc: 'Automated data residency controls & self-serve deletion APIs' },
            ].map((comp, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700 text-center">
                <Lock className="w-6 h-6 text-brand-cyan mx-auto mb-3" />
                <h3 className="font-bold text-base text-white mb-1">{comp.title}</h3>
                <p className="text-xs text-slate-400">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default IndustriesPage;
