import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CinematicReveal, 
  FloatingElement, 
  StaggerContainer, 
  StaggerItem 
} from '../animations';
import { ArrowRight } from 'lucide-react';

export function ApproachSection({ onOpenBooking }) {
  const col1Points = [
    'Understanding Your Vision, Challenges & Opportunities',
    'Designing Scalable, Intelligent Frameworks',
    'Engineering High-Performance Digital Solutions'
  ];

  const col2Points = [
    'Ensuring Quality, Security & Seamless Performance',
    'Launching With Confidence — Scaling With Precision',
    'Continuous Innovation for Long-Term Success'
  ];

  return (
    <section id="approach" className="py-16 sm:py-24 bg-[#11141c] text-white overflow-hidden relative border-y border-slate-800">
      {/* Background atmosphere glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#0070ba]/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Character Illustration (No overlap, perfectly scaled) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <CinematicReveal intensity="cinematic" className="w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[440px]">
              <FloatingElement duration={6} yOffset={8}>
                <img
                  src="/assets/img/illustration/7.png"
                  alt="NeuOrzin Strategic Engineering Approach"
                  className="w-full h-auto object-contain drop-shadow-2xl select-none"
                />
              </FloatingElement>
            </CinematicReveal>
          </div>

          {/* Right Column: Heading & 6 Strategic Approach Points */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <CinematicReveal intensity="subtle">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider">
                <span>Approach</span>
              </div>
            </CinematicReveal>

            <CinematicReveal intensity="medium" delay={0.1}>
              <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-white font-display leading-[1.22] tracking-tight">
                A Strategic, Engineering-Driven Method to Build Future-Ready Solutions
              </h2>
            </CinematicReveal>

            {/* 6 Strategic Points matching exact screenshot layout */}
            <div className="pt-3 border-t border-slate-800/80">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-2">
                
                {/* Column 1 */}
                <div className="space-y-4">
                  {col1Points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 group">
                      <span className="text-cyan-400 font-bold text-sm shrink-0 mt-0.5 group-hover:scale-125 transition-transform">
                        +
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors leading-relaxed">
                        {pt}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  {col2Points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 group">
                      <span className="text-cyan-400 font-bold text-sm shrink-0 mt-0.5 group-hover:scale-125 transition-transform">
                        +
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors leading-relaxed">
                        {pt}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Action CTA */}
            <CinematicReveal intensity="subtle" delay={0.2} className="pt-2">
              <Link
                to="/approach"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0070ba] hover:text-cyan-400 transition-colors group"
              >
                <span>Know More</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </CinematicReveal>

          </div>

        </div>
      </div>
    </section>
  );
}

export default ApproachSection;
