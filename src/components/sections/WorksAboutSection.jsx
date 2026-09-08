import React from 'react';
import { CountUp } from '../common/CountUp';
import { 
  CinematicReveal, 
  ImageReveal, 
  StaggerContainer, 
  StaggerItem 
} from '../animations';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function WorksAboutSection({ onOpenBooking }) {
  const highlights = [
    'Sub-millisecond latency autonomous AI execution',
    'Zero-downtime cloud migration architecture',
    'Automated self-healing QA and test engineering',
    'Dedicated 24/7 post-quantum security governance'
  ];

  return (
    <section className="works-about-area overflow-hidden py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Information (Scene 04 Layer A) */}
          <div className="lg:col-span-6 info space-y-6 text-left">
            <CinematicReveal intensity="subtle">
              <h5 className="text-[#0070ba] font-bold text-xs uppercase tracking-widest">Works & Track Record</h5>
            </CinematicReveal>

            <CinematicReveal intensity="medium" delay={0.1}>
              <h2 className="title text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight font-display">
                Trusted by <strong className="text-[#0070ba]"><CountUp end={5000} suffix="+" duration={2.5} /></strong> <br className="hidden sm:inline" /> Happy Enterprise Clients
              </h2>
            </CinematicReveal>

            <CinematicReveal intensity="medium" delay={0.2}>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                NeuOrzin delivers battle-tested software engineering across North America, Europe, and Asia-Pacific. We combine deep domain expertise in autonomous AI workflows with rock-solid cloud infrastructure.
              </p>
            </CinematicReveal>

            <StaggerContainer className="space-y-3 pt-2">
              {highlights.map((item, idx) => (
                <StaggerItem key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#0070ba] shrink-0" />
                  <span>{item}</span>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <CinematicReveal intensity="subtle" delay={0.35}>
              <div className="pt-4">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 rounded-xl bg-[#0070ba] hover:bg-[#005c99] text-white font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Schedule Technical Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </CinematicReveal>
          </div>

          {/* Right Media Illustration (Scene 04 Layer B) */}
          <div className="lg:col-span-6">
            <ImageReveal 
              src="/assets/img/about/3.jpg" 
              alt="NeuOrzin Enterprise Works" 
              className="rounded-3xl shadow-2xl border border-slate-100"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default WorksAboutSection;
