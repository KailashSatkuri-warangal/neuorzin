import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Database, Cloud, Cpu, ArrowRight } from 'lucide-react';
import { 
  CinematicReveal, 
  CinematicContainer, 
  StaggerContainer, 
  StaggerItem 
} from '../animations';

export function FeaturedServicesSection() {
  const pillars = [
    {
      title: 'Product Intelligence',
      desc: 'Autonomous AI decision swarms and self-healing automated QA pipelines.',
      icon: Bot,
      href: '/services/intelligent-autonomous-systems',
      badge: 'Pillar 1',
      tag: 'Autonomous AI'
    },
    {
      title: 'Enterprise Data Power',
      desc: 'Snowflake migrations, real-time data mesh & private enterprise RAG architectures.',
      icon: Database,
      href: '/services/enterprise-data-operations',
      badge: 'Pillar 2',
      tag: 'Data Mesh'
    },
    {
      title: 'Cloud Scale & FinOps',
      desc: 'High-availability multi-cloud orchestration, FinOps telemetry & zero-downtime transition.',
      icon: Cloud,
      href: '/services/cloud-performance-management',
      badge: 'Pillar 3',
      tag: 'Cloud & FinOps'
    },
    {
      title: 'Deep-Tech & Quantum',
      desc: 'Quantum-enhanced machine learning, QPU simulation & post-quantum security enclaves.',
      icon: Cpu,
      href: '/services/quantum-enhanced-machine-learning',
      badge: 'Pillar 4',
      tag: 'Quantum Innovation'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Scene 02 Header) */}
        <CinematicReveal intensity="medium" className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0070ba] text-xs font-bold uppercase tracking-wider mb-3">
            Core Engineering Pillars
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display">
            Engineered for <strong className="text-[#0070ba]">Unrivaled Performance</strong>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Four specialized technical disciplines architected to elevate your enterprise software from standard code to an unstoppable competitive moat.
          </p>
        </CinematicReveal>

        {/* 4 Cards (Scene 02 Stagger Grid with 3D Depth) */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <StaggerItem key={idx}>
                <div className="group h-full p-6 sm:p-7 rounded-2xl bg-[#f8fafc] border border-slate-200/80 hover:border-[#0070ba]/60 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-[#0070ba] flex items-center justify-center group-hover:bg-[#0070ba] group-hover:text-white transition-all shadow-xs">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0070ba] text-[10px] font-bold uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-[#0070ba] uppercase tracking-wider block mb-1">
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-[#0070ba] transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60">
                    <Link
                      to={item.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0070ba] hover:text-[#005c99] transition-colors group/link"
                    >
                      <span>Explore Pillar</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
}

export default FeaturedServicesSection;
