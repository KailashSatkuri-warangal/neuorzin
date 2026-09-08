import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CinematicReveal, 
  StaggerContainer, 
  StaggerItem 
} from '../animations';
import { ArrowRight, Minus, Plus } from 'lucide-react';

export function ExpertiseAccordion({ onOpenBooking }) {
  const [openIdx, setOpenIdx] = useState(0);

  const expertiseItems = [
    {
      title: 'AI & Automation Engineering',
      desc: 'We build intelligent automation systems powered by agent-based AI, enabling faster workflows, predictive operations, and scalable business processes.'
    },
    {
      title: 'Cloud Architecture & Optimization',
      desc: 'High-availability multi-cloud orchestration, automated container scaling, Kubernetes performance tuning, and FinOps telemetry to minimize operational overhead.'
    },
    {
      title: 'Data Engineering & Intelligence',
      desc: 'High-throughput data pipelines, Snowflake cloud data warehousing, real-time vector embeddings, and executive telemetry dashboards with sub-second querying.'
    },
    {
      title: 'Product Engineering',
      desc: 'End-to-end full-stack web and mobile application engineering, scalable microservice architectures, and modern reactive user interfaces.'
    },
    {
      title: 'Quantum Computing Innovation',
      desc: 'Hybrid quantum-classical algorithms, QPU circuit simulation, and post-quantum lattice cryptographic enclaves for critical infrastructure resilience.'
    }
  ];

  return (
    <section id="expertise" className="py-20 sm:py-28 bg-[#11141c] text-white overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0070ba]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <CinematicReveal intensity="subtle">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider">
                Our Core Expertise
              </div>
            </CinematicReveal>

            <CinematicReveal intensity="medium" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display leading-tight">
                NeuOrzin specializes in building future-ready technology solutions powered by AI, Cloud, Data Engineering, and Quantum Innovation.
              </h2>
            </CinematicReveal>

            <CinematicReveal intensity="subtle" delay={0.2}>
              <p className="text-xs sm:text-sm text-slate-400">
                Engineering Intelligence, Data Power, Cloud Scale & Quantum Innovation.
              </p>
            </CinematicReveal>

            <CinematicReveal intensity="subtle" delay={0.3} className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white group"
              >
                <span>Know More</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </CinematicReveal>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-6 space-y-3">
            <StaggerContainer className="space-y-3">
              {expertiseItems.map((item, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <StaggerItem key={idx}>
                    <div className="border-b border-slate-800 pb-3">
                      <button
                        onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                        className="w-full py-3.5 text-left flex items-center justify-between gap-4 text-base sm:text-lg font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-cyan-400 text-lg font-mono font-bold">
                            {isOpen ? '—' : '+'}
                          </span>
                          <span>{item.title}</span>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="pl-7 pr-2 pb-3 text-xs sm:text-sm text-slate-400 leading-relaxed animate-fadeIn">
                          {item.desc}
                        </div>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ExpertiseAccordion;
