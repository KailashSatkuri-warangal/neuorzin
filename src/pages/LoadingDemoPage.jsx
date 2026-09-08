import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SkeletonLoader,
  CardLoader,
  TableLoader,
  ListLoader,
  ButtonLoader,
  InlineLoader,
  SectionLoader,
  OverlayLoader,
  ModalLoader,
  ProgressLoader,
  ImageLoader,
  DashboardLoader,
  PageLoader
} from '../components/loading';
import { Play, RefreshCw, CheckCircle2, Layers, Cpu, ShieldCheck } from 'lucide-react';

export function LoadingDemoPage() {
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isOverlayLoading, setIsOverlayLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [progressVal, setProgressVal] = useState(45);
  const [selectedAnimation, setSelectedAnimation] = useState('shimmer');
  const [showLiveCards, setShowLiveCards] = useState(false);

  const simulateButtonAction = () => {
    setIsBtnLoading(true);
    setTimeout(() => setIsBtnLoading(false), 2000);
  };

  const simulateOverlayAction = () => {
    setIsOverlayLoading(true);
    setTimeout(() => setIsOverlayLoading(false), 2500);
  };

  const simulatePageLoader = () => {
    setIsPageLoading(true);
    setTimeout(() => setIsPageLoading(false), 2000);
  };

  return (
    <div className="pt-28 pb-24 bg-[#f8fafc] dark:bg-[#070913] min-h-screen text-slate-900 dark:text-white transition-colors">
      {/* Full Page Loader simulation */}
      <PageLoader
        loading={isPageLoading}
        message="Simulating Enterprise Architecture Loader..."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#0070ba] dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>NeuOrzin Design System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-slate-900 dark:text-white">
            Premium Loading & Skeleton System
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Isolated, lightweight, accessible and theme-aware loading states crafted to preserve layout integrity with zero layout shifts.
          </p>

          {/* Interactive Controls Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={simulatePageLoader}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0070ba] to-[#00a8ff] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5" /> Simulate PageLoader (2s)
            </button>

            <button
              onClick={() => setShowLiveCards(prev => !prev)}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Toggle Skeleton vs Live Content ({showLiveCards ? 'Live' : 'Skeleton'})
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>Animation:</span>
              <select
                value={selectedAnimation}
                onChange={(e) => setSelectedAnimation(e.target.value)}
                className="bg-transparent font-bold text-[#0070ba] focus:outline-none cursor-pointer"
              >
                <option value="shimmer">Shimmer</option>
                <option value="pulse">Pulse</option>
                <option value="wave">Wave</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        </div>

        {/* 1. ButtonLoaders & Micro-Interactions */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1020] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                1. ButtonLoader & Micro Inline Loaders
              </h3>
              <p className="text-xs text-slate-500">
                Preserves exact button geometry, prevents duplicate submissions, and offers multiple spinner flavors.
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#0070ba]">
              Interactive
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ButtonLoader
              loading={isBtnLoading}
              loadingText="Saving Cloud IaC..."
              onClick={simulateButtonAction}
              spinnerVariant="spinner"
              className="w-full py-3.5 px-4 rounded-xl bg-[#0070ba] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#005a96]"
            >
              Click to Save (Spinner)
            </ButtonLoader>

            <ButtonLoader
              loading={isBtnLoading}
              loadingText="Processing..."
              onClick={simulateButtonAction}
              spinnerVariant="dots"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0070ba] to-[#00c6ff] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-90"
            >
              Deploy Model (Dots)
            </ButtonLoader>

            <ButtonLoader
              loading={isBtnLoading}
              loadingText="Syncing Snowflake..."
              onClick={simulateButtonAction}
              spinnerVariant="ring"
              className="w-full py-3.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs uppercase tracking-wider shadow-md"
            >
              Sync DB (Ring)
            </ButtonLoader>

            <ButtonLoader
              loading={isBtnLoading}
              loadingText="Verifying..."
              onClick={simulateButtonAction}
              spinnerVariant="pulse"
              className="w-full py-3.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Audit Tests (Pulse)
            </ButtonLoader>
          </div>

          {/* Inline Micro Loaders */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center gap-6 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Inline Variants:</span>
            <div className="flex items-center gap-2">
              <InlineLoader size="sm" variant="spinner" color="primary" />
              <span>Spinner</span>
            </div>
            <div className="flex items-center gap-2">
              <InlineLoader size="sm" variant="dots" color="primary" />
              <span>Dots</span>
            </div>
            <div className="flex items-center gap-2">
              <InlineLoader size="sm" variant="ring" color="primary" />
              <span>Ring</span>
            </div>
            <div className="flex items-center gap-2">
              <InlineLoader size="sm" variant="pulse" color="primary" />
              <span>Pulse</span>
            </div>
          </div>
        </section>

        {/* 2. Progress & Overlay Loaders */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Progress Loaders */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1020] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              2. ProgressLoader
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">Indeterminate (Route Transitions / Stream)</span>
                <ProgressLoader indeterminate />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">Determinate ({progressVal}%)</span>
                <ProgressLoader value={progressVal} showLabel />
                <div className="flex gap-2 mt-2">
                  <button onClick={() => setProgressVal(25)} className="px-2 py-1 text-[11px] rounded bg-slate-100 dark:bg-slate-800 font-bold cursor-pointer">25%</button>
                  <button onClick={() => setProgressVal(65)} className="px-2 py-1 text-[11px] rounded bg-slate-100 dark:bg-slate-800 font-bold cursor-pointer">65%</button>
                  <button onClick={() => setProgressVal(100)} className="px-2 py-1 text-[11px] rounded bg-slate-100 dark:bg-slate-800 font-bold cursor-pointer">100%</button>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay Loader */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1020] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                3. OverlayLoader
              </h3>
              <button
                onClick={simulateOverlayAction}
                className="px-3 py-1.5 rounded-lg bg-[#0070ba] text-white font-bold text-xs cursor-pointer hover:bg-[#005a96]"
              >
                Trigger Overlay (2.5s)
              </button>
            </div>
            <OverlayLoader loading={isOverlayLoading} message="Generating Quantum Circuit Blueprint...">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-3">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-[#0070ba]" />
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Quantum Workload Pod #108</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Target: IBM Quantum Heron 133-Qubit Processor. QAOA Optimization active.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" /> Ready for execution
                </div>
              </div>
            </OverlayLoader>
          </div>
        </section>

        {/* 3. Card Skeletons vs Live Cards */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">
                4. Service & Feature Card Skeletons
              </h3>
              <p className="text-xs text-slate-500">
                Pixel-matched dimensions avoiding cumulative layout shifts (CLS).
              </p>
            </div>
            <span className="text-xs font-bold text-[#0070ba]">
              {showLiveCards ? 'Rendering Live Content' : 'Rendering Skeletons'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {!showLiveCards ? (
              <CardLoader variant="service" count={4} />
            ) : (
              [
                { title: 'Intelligent Autonomous Systems', pillar: 'Pillar 1', desc: 'Multi-agent cognitive workflows & decision loops.' },
                { title: 'Enterprise Data Operations', pillar: 'Pillar 2', desc: 'Snowflake migrations, data mesh & real-time telemetry.' },
                { title: 'Cloud Performance Management', pillar: 'Pillar 3', desc: 'Kubernetes tuning, FinOps spend reduction & DR.' },
                { title: 'Quantum Machine Learning', pillar: 'Pillar 4', desc: 'Hybrid quantum-classical combinatorial optimization.' },
              ].map((item, idx) => (
                <div key={idx} className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#111424] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#0070ba]/10 text-[#0070ba] flex items-center justify-center font-bold">
                        0{idx+1}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#0070ba]">{item.pillar}</span>
                    </div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-[#0070ba]">
                    Active Capability
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* 4. Table & List Loaders */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              5. TableLoader (Enterprise Telemetry)
            </h3>
            <TableLoader rows={4} columns={4} />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              6. ListLoader (Pods & Activity)
            </h3>
            <ListLoader items={3} />
          </div>
        </section>

        {/* 5. Section & Modal Loaders */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              7. SectionLoader (Contained Area)
            </h3>
            <SectionLoader
              title="Loading Real-Time FinOps Telemetry..."
              subtitle="Fetching multi-cluster Kubernetes node metrics and AWS billing data."
            />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              8. ModalLoader (Dialog Skeleton)
            </h3>
            <ModalLoader />
          </div>
        </section>

        {/* 6. Complete Dashboard Skeleton */}
        <section className="space-y-4">
          <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">
            9. Full DashboardLoader Skeleton
          </h3>
          <DashboardLoader />
        </section>

      </div>
    </div>
  );
}

export default LoadingDemoPage;
