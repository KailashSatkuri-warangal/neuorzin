import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Calendar, ShieldCheck, Zap, Layers, Bot, Database, Cloud } from 'lucide-react';

export function LiveEstimator({ onOpenBooking }) {
  const [projectType, setProjectType] = useState('mvp');
  const [timelineWeeks, setTimelineWeeks] = useState(6);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [dataPipeline, setDataPipeline] = useState(true);

  const calculations = {
    mvp: {
      baseWeeks: 4,
      team: '1 Lead Architect, 2 Fullstack Devs, 1 UI/UX Designer',
      deliverables: ['Clickable Prototype', 'Production React/Mobile App', 'Cloud Infrastructure IaC', 'CI/CD Pipeline'],
      speedMultiplier: '3.5x'
    },
    ai: {
      baseWeeks: 6,
      team: '1 AI Research Lead, 2 AI/ML Engineers, 1 Backend Architect',
      deliverables: ['Custom RAG Knowledge Base', 'Multi-Agent Workflow Engine', 'Guardrails & Telemetry', 'Sub-second API'],
      speedMultiplier: '4.2x'
    },
    data: {
      baseWeeks: 8,
      team: '1 Principal Data Architect, 2 Data Engineers, 1 BI Specialist',
      deliverables: ['Snowflake Lakehouse Setup', 'dbt Transformation Models', 'Kafka Streaming Pipeline', 'Executive PowerBI Dashboards'],
      speedMultiplier: '3.8x'
    }
  }[projectType];

  return (
    <section id="estimator" className="py-20 relative bg-slate-100/50 dark:bg-surface/30 border-y border-slate-200 dark:border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Architecture Scope"
          title="Interactive Engineering"
          highlightText="Velocity Estimator"
          description="Customize your startup's technical roadmap parameters and see instant deliverables, team topology, and release velocity."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Controls */}
          <div className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300 mb-3">
                1. Select Architecture Core
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'mvp', label: 'MVP to Scale', icon: Layers },
                  { id: 'ai', label: 'AI Agents', icon: Bot },
                  { id: 'data', label: 'Snowflake/Data', icon: Database },
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = projectType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setProjectType(type.id)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        isSelected
                          ? 'bg-brand-blue/15 border-brand-blue text-brand-blue dark:text-white shadow-md shadow-brand-blue/20'
                          : 'bg-white dark:bg-surface-card hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-brand-blue dark:text-brand-sky' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold font-display">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300">
                  2. Target Launch Sprint: <span className="text-brand-blue dark:text-brand-sky font-display">{timelineWeeks} Weeks</span>
                </label>
                <span className="text-xs text-brand-blue dark:text-accent-cyan font-semibold">
                  {timelineWeeks <= 4 ? '⚡ Rapid Track' : timelineWeeks <= 8 ? '🎯 Agile Sprint' : '🛡️ Enterprise Scale'}
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                value={timelineWeeks}
                onChange={(e) => setTimelineWeeks(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-dark-400 rounded-lg appearance-none cursor-pointer accent-brand-blue"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>3 Wks (Rapid MVP)</span>
                <span>6 Wks</span>
                <span>12 Wks (Full Suite)</span>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-white/10">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300 block">
                3. Technical Modules
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setAiEnabled(!aiEnabled)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    aiEnabled ? 'bg-brand-blue/10 border-brand-blue/30 text-slate-900 dark:text-white' : 'bg-white dark:bg-surface-card border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="text-xs font-semibold flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-brand-blue dark:text-accent-cyan" /> AI RAG Module
                  </span>
                  <input type="checkbox" checked={aiEnabled} readOnly className="accent-brand-blue" />
                </div>

                <div
                  onClick={() => setDataPipeline(!dataPipeline)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    dataPipeline ? 'bg-brand-blue/10 border-brand-blue/30 text-slate-900 dark:text-white' : 'bg-white dark:bg-surface-card border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="text-xs font-semibold flex items-center gap-1.5">
                    <Cloud className="w-3.5 h-3.5 text-emerald-600 dark:text-accent-emerald" /> Cloud Telemetry
                  </span>
                  <input type="checkbox" checked={dataPipeline} readOnly className="accent-brand-blue" />
                </div>
              </div>
            </div>
          </div>

          {/* Scope Output Panel */}
          <div className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-8 border border-brand-blue/30 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-brand-blue/5 dark:from-surface-card/90 dark:via-surface/90 dark:to-primary/10">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Estimated Architecture Scope</span>
                <span className="text-xs font-bold text-emerald-700 dark:text-accent-emerald bg-emerald-50 dark:bg-accent-emerald/10 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-accent-emerald/20">
                  {calculations.speedMultiplier} Velocity Multiplier
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Dedicated Pod Topology
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 font-display">
                  {calculations.team}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  Key Sprint Deliverables
                </span>
                <div className="space-y-1.5">
                  {calculations.deliverables.map((del, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-blue dark:text-primary-light shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                  {aiEnabled && (
                    <div className="flex items-center gap-2 text-xs text-brand-blue dark:text-accent-cyan font-medium">
                      <Zap className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                      <span>Custom Retrieval Augmented Generation (RAG) Bot</span>
                    </div>
                  )}
                  {dataPipeline && (
                    <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-accent-emerald font-medium">
                      <Zap className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                      <span>Automated Cloud Observability & FinOps Alerts</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-white/10 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Sprint Timeline:</div>
                <div className="text-base font-bold text-slate-900 dark:text-white font-display">
                  {timelineWeeks} Weeks Deployment
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={Calendar}
                onClick={onOpenBooking}
                className="w-full sm:w-auto shadow-md"
              >
                Book This Scope
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
