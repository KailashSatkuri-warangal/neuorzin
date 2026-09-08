import React from 'react';
import { CountUp } from '../common/CountUp';
import { CinematicReveal, StaggerContainer, StaggerItem } from '../animations';

export function FunFactorSection() {
  const facts = [
    { number: 687, suffix: '+', label: 'Happy Clients' },
    { number: 2348, suffix: '+', label: 'Finished Projects' },
    { number: 450, suffix: '+', label: 'Skilled Experts' },
    { number: 1200, suffix: '+', label: 'Media Mentions' },
  ];

  return (
    <section className="fun-factor-area overflow-hidden py-16 sm:py-20 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center">
          {facts.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="fun-fact p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="counter text-3xl sm:text-4xl lg:text-5xl font-black text-[#0070ba] font-display">
                  <CountUp end={item.number} suffix={item.suffix} duration={2.5} />
                </div>
                <span className="medium text-slate-600 text-xs sm:text-sm font-semibold tracking-wide uppercase mt-2 block">
                  {item.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export default FunFactorSection;
