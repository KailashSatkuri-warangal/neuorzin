import React from 'react';
import { CountUp } from '../common/CountUp';

export function FunFactorSection() {
  const facts = [
    { number: 687, suffix: '+', label: 'Happy Clients' },
    { number: 2348, suffix: '+', label: 'Finished Projects' },
    { number: 450, suffix: '+', label: 'Skilled Experts' },
    { number: 1200, suffix: '+', label: 'Media Posts' },
  ];

  return (
    <div className="fun-factor-area overflow-hidden py-16 sm:py-20 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center">
          {facts.map((fact, idx) => (
            <div key={idx} className="fun-fact p-4 group transition-transform hover:-translate-y-1 duration-300">
              <div className="timer text-4xl sm:text-5xl lg:text-6xl font-black text-[#0070ba] font-display">
                <CountUp end={fact.number} suffix={fact.suffix} duration={2.2} />
              </div>
              <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-700 mt-3 block">
                {fact.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FunFactorSection;
