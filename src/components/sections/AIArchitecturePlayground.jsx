import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Database, Zap, Shield, Play, Terminal, 
  CheckCircle2, Server, Activity, ArrowRight, 
  Layers, RefreshCw, Sliders, Sparkles, Copy, Check
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

const ARCHITECTURES = [
  {
    id: 'multi-agent',
    title: 'Autonomous Multi-Agent Swarm',
    badge: 'Agentic AI / LangGraph',
    desc: 'Self-healing distributed agent network with dynamic routing, tool execution, and consensus verification.',
    latency: '18ms',
    rps: '125,000 req/s',
    costSaving: '74%',
    nodes: [
      { id: 'gateway', label: 'API Gateway', status: 'ACTIVE', color: 'border-cyan-400' },
      { id: 'orchestrator', label: 'LangGraph Router', status: 'PROCESSING', color: 'border-purple-400' },
      { id: 'worker1', label: 'Code Gen Agent', status: 'OPTIMAL', color: 'border-blue-400' },
      { id: 'worker2', label: 'Verification Agent', status: 'OPTIMAL', color: 'border-emerald-400' },
      { id: 'vector', label: 'Pinecone Vector DB', status: 'ACTIVE', color: 'border-sky-400' },
    ],
    logs: [
      '[00:00.01] [INIT] Neural gateway loaded on 12 distributed edge nodes.',
      '[00:00.04] [AGENT] LangGraph Orchestrator initialized 4 sub-agent execution pools.',
      '[00:00.09] [VECTOR] Hybrid semantic indexing connected (Pinecone + Redis Cache).',
      '[00:00.14] [HEALTH] 99.999% SLA verified. Latency: 18.2ms p99.',
      '[00:00.18] [STREAM] Live consensus validation complete. Ready for enterprise workload.'
    ]
  },
  {
    id: 'snowflake-mesh',
    title: 'Snowflake Real-Time Data Mesh',
    badge: 'Data Mesh / dbt / Kafka',
    desc: 'Zero-copy data sharing architecture across multi-cloud regions with real-time streaming ETL pipelines.',
    latency: '34ms',
    rps: '450,000 evt/s',
    costSaving: '62%',
    nodes: [
      { id: 'kafka', label: 'Kafka Ingestion Stream', status: 'ACTIVE', color: 'border-amber-400' },
      { id: 'snowpark', label: 'Snowpark Container', status: 'PROCESSING', color: 'border-blue-400' },
      { id: 'dbt', label: 'dbt Transformation Mesh', status: 'OPTIMAL', color: 'border-orange-400' },
      { id: 'governance', label: 'Immuta Data Governance', status: 'ENFORCED', color: 'border-emerald-400' },
      { id: 'bi', label: 'Real-Time Feature Store', status: 'ACTIVE', color: 'border-purple-400' },
    ],
    logs: [
      '[00:00.01] [INGEST] Apache Kafka partition stream connected (450k events/sec).',
      '[00:00.03] [TRANSFORM] Snowpark Python runtime executing dynamic aggregation.',
      '[00:00.07] [DBT] dbt incremental model materialized in 420ms.',
      '[00:00.12] [SECURITY] Immuta column-level dynamic masking enforced.',
      '[00:00.16] [STORE] Feature store synced with downstream real-time inference models.'
    ]
  },
  {
    id: 'edge-sovereign',
    title: 'Sovereign Edge AI & LLM Cluster',
    badge: 'On-Prem / vLLM / Triton',
    desc: 'Fully air-gapped sovereign inference cluster powered by vLLM, TensorRT-LLM, and hardware-accelerated GPUs.',
    latency: '8ms',
    rps: '80,000 req/s',
    costSaving: '81%',
    nodes: [
      { id: 'triton', label: 'Triton Inference Server', status: 'ACTIVE', color: 'border-emerald-400' },
      { id: 'vllm', label: 'vLLM Continuous Batching', status: 'OPTIMAL', color: 'border-cyan-400' },
      { id: 'guardrails', label: 'NeMo Guardrails', status: 'ENFORCED', color: 'border-purple-400' },
      { id: 'tensorrt', label: 'TensorRT-LLM Engine', status: 'PROCESSING', color: 'border-blue-400' },
      { id: 'cache', label: 'Semantic Prompt Cache', status: 'ACTIVE', color: 'border-amber-400' },
    ],
    logs: [
      '[00:00.01] [CLUSTER] 8x NVIDIA H100 SXM5 NVLink interconnect verified.',
      '[00:00.02] [BATCHING] vLLM continuous PagedAttention enabled (KV-cache 94% hit rate).',
      '[00:00.06] [SECURITY] NeMo safety guardrails checking input/output hallucination vectors.',
      '[00:00.10] [BENCHMARK] Token generation speed: 185 tokens/sec per user stream.',
      '[00:00.14] [READY] Air-gapped compliance verified. Zero telemetry leaves sovereign perimeter.'
    ]
  },
  {
    id: 'quantum-hybrid',
    title: 'Quantum-Resistant Hybrid Architecture',
    badge: 'Post-Quantum / Qiskit / Cirq',
    desc: 'Next-generation quantum combinatorial optimization combined with NIST-standardized Kyber/Dilithium encryption.',
    latency: '42ms',
    rps: '35,000 req/s',
    costSaving: '55%',
    nodes: [
      { id: 'pqc', label: 'NIST ML-KEM Encryption', status: 'ENFORCED', color: 'border-violet-400' },
      { id: 'qpu', label: 'Qiskit QPU Simulator', status: 'PROCESSING', color: 'border-cyan-400' },
      { id: 'hybrid', label: 'QAOA Classical Optimizer', status: 'OPTIMAL', color: 'border-emerald-400' },
      { id: 'vault', label: 'Quantum Key Vault', status: 'ACTIVE', color: 'border-blue-400' },
      { id: 'telemetry', label: 'Q-Entropy Generator', status: 'ACTIVE', color: 'border-pink-400' },
    ],
    logs: [
      '[00:00.01] [ENCRYPT] ML-KEM (Kyber-1024) post-quantum handshake negotiated.',
      '[00:00.04] [QAOA] Combinatorial portfolio allocation mapped to 64-qubit Hamiltonian.',
      '[00:00.08] [SOLVER] Hybrid classical-quantum gradient descent reached convergence in 38 iterations.',
      '[00:00.13] [RESILIENCE] Zero vulnerable RSA/ECC cryptographic keys detected in pipeline.',
      '[00:00.17] [SUCCESS] Optimization completed with 4.8x efficiency over classical LP solver.'
    ]
  }
];

export function AIArchitecturePlayground({ onOpenBooking }) {
  const [selectedArch, setSelectedArch] = useState(ARCHITECTURES[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedLogs, setSimulatedLogs] = useState(selectedArch.logs);
  const [copied, setCopied] = useState(false);
  const [trafficVolume, setTrafficVolume] = useState(50);

  useEffect(() => {
    setSimulatedLogs(selectedArch.logs);
  }, [selectedArch]);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulatedLogs(['[RUNNING] Triggering dynamic workload stress test...']);

    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx < selectedArch.logs.length) {
        const nextLog = selectedArch.logs[logIdx];
        setSimulatedLogs((prev) => [...prev, nextLog]);
        logIdx++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 280);
  };

  const handleCopyArchitecture = () => {
    const text = `NeuOrzin Blueprint: ${selectedArch.title}
Latency: ${selectedArch.latency} | Throughput: ${selectedArch.rps} | Efficiency Gain: ${selectedArch.costSaving}
Components: ${selectedArch.nodes.map(n => n.label).join(' -> ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="ai-playground" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#070913] border-y border-slate-200 dark:border-slate-800/80">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-cyan/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge variant="cyan" dot className="shadow-sm">
              Interactive AI & Data Sandbox
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Simulate Enterprise <span className="text-gradient-brand">Architecture Pipelines</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Test how NeuOrzin engineers high-throughput agent swarms, Snowflake data meshes, and low-latency sovereign AI infrastructure in real time.
          </p>
        </div>

        {/* Architecture Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {ARCHITECTURES.map((arch) => {
            const isSelected = selectedArch.id === arch.id;
            return (
              <button
                key={arch.id}
                onClick={() => setSelectedArch(arch)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'bg-white dark:bg-card border-brand-purple dark:border-brand-purple shadow-lg shadow-brand-purple/10 scale-[1.02]'
                    : 'bg-white/60 dark:bg-card/50 border-slate-200 dark:border-border hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="text-[11px] font-mono font-semibold text-brand-purple dark:text-brand-cyan mb-1">
                  {arch.badge}
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white font-display line-clamp-1">
                  {arch.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Studio Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Node Topology & Metrics */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-border">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <Activity className="w-4 h-4 text-accent-emerald animate-pulse" />
                    <span>SYSTEM TOPOLOGY: <strong className="text-slate-900 dark:text-white uppercase">{selectedArch.id}</strong></span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    {selectedArch.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyArchitecture}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Copy blueprint specification"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-accent-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Export Specs'}</span>
                  </button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleRunSimulation}
                    disabled={isSimulating}
                    icon={isSimulating ? RefreshCw : Play}
                    className={`shadow-md ${isSimulating ? 'animate-pulse' : ''}`}
                  >
                    {isSimulating ? 'Simulating...' : 'Run Simulation'}
                  </Button>
                </div>
              </div>

              {/* Topology Nodes Grid with Live Pulses */}
              <div className="py-8 space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Data Execution Path & Node Health
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedArch.nodes.map((node, i) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                      className={`p-4 rounded-2xl bg-slate-50 dark:bg-surface-card border ${node.color} border-l-4 transition-all hover:translate-y-[-2px] shadow-sm`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                        <span>Node 0{i + 1}</span>
                        <span className="flex items-center gap-1 text-accent-emerald font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-ping" />
                          {node.status}
                        </span>
                      </div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {node.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Real-Time Telemetry Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-border text-center">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-surface-card">
                  <div className="text-xs font-mono text-slate-400">p99 Latency</div>
                  <div className="text-lg sm:text-xl font-black text-brand-purple dark:text-purple-300 font-display">
                    {selectedArch.latency}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-surface-card">
                  <div className="text-xs font-mono text-slate-400">Throughput</div>
                  <div className="text-lg sm:text-xl font-black text-brand-blue dark:text-cyan-400 font-display">
                    {selectedArch.rps}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-surface-card">
                  <div className="text-xs font-mono text-slate-400">Efficiency Gain</div>
                  <div className="text-lg sm:text-xl font-black text-accent-emerald font-display">
                    +{selectedArch.costSaving}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Workload Load Dial */}
            <div className="p-6 rounded-3xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-brand-purple" />
                  Simulate Concurrency Stress Level:
                </span>
                <span className="text-xs font-mono font-bold text-brand-purple dark:text-cyan-400">
                  {trafficVolume * 5000} req/sec
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={trafficVolume}
                onChange={(e) => setTrafficVolume(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-purple"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>Baseline (50k req/s)</span>
                <span>Enterprise Surge (500k req/s)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Streaming Terminal & Consultation CTA */}
          <div className="lg:col-span-5 space-y-6">
            {/* Terminal Window */}
            <div className="rounded-3xl bg-[#090b14] border border-slate-800 text-slate-200 font-mono text-xs overflow-hidden shadow-2xl flex flex-col h-[400px]">
              {/* Terminal Header */}
              <div className="px-4 py-3 bg-[#0d1020] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] text-slate-400 font-mono">neuorzin-engine-v3.0.4</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-accent-emerald">
                  <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                  LIVE
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-4 space-y-2 flex-grow overflow-y-auto font-mono text-[12px] leading-relaxed text-slate-300">
                <div className="text-slate-500"># NeuOrzin Distributed Runtime Simulator initialized</div>
                <div className="text-slate-500"># Selected Cluster: {selectedArch.title}</div>
                {simulatedLogs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={
                      log.includes('[SUCCESS]') || log.includes('[READY]')
                        ? 'text-accent-emerald font-semibold'
                        : log.includes('[INIT]') || log.includes('[SECURITY]')
                        ? 'text-brand-cyan'
                        : 'text-slate-300'
                    }
                  >
                    {log}
                  </motion.div>
                ))}
                {isSimulating && (
                  <div className="flex items-center gap-2 text-brand-purple">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>Executing live benchmark verification...</span>
                  </div>
                )}
              </div>

              {/* Terminal Footer */}
              <div className="px-4 py-2.5 bg-[#0d1020] border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Cluster Health: 100%</span>
                <span>Active Nodes: 5/5</span>
              </div>
            </div>

            {/* Quick Action Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-purple/15 via-brand-blue/10 to-transparent border border-brand-purple/30 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-purple text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                    Need This In Production?
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Deploy this custom architecture with NeuOrzin in under 4 weeks.
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={onOpenBooking}
                icon={ArrowRight}
                className="w-full shadow-lg"
              >
                Schedule Architecture Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AIArchitecturePlayground;
