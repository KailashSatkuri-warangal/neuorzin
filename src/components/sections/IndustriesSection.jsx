import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CinematicReveal, 
  StaggerContainer, 
  StaggerItem 
} from '../animations';
import { ArrowUpRight } from 'lucide-react';

export function IndustriesSection({ onOpenBooking }) {
  const industries = [
    { number: '01', title: 'Retail', href: '/industries' },
    { number: '02', title: 'Manufacturing', href: '/industries' },
    { number: '03', title: 'Real Estate', href: '/industries' },
    { number: '04', title: 'EduTech', href: '/industries' },
    { number: '05', title: 'CPG', href: '/industries' },
  ];

  return (
    <section id="industries" className="py-12 sm:py-20 bg-white overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Illustration */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-left">
            <CinematicReveal intensity="subtle">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider">
                Solutions for Every Industry
              </div>
            </CinematicReveal>

            <CinematicReveal intensity="medium" delay={0.1}>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
                Industries We Serve
              </h2>
            </CinematicReveal>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Tailored solutions for every sector.
            </p>

            {/* Illustration */}
            <div className="hidden sm:block pt-2 max-w-[280px] lg:max-w-sm">
              <img
                src="/assets/img/illustration/11.png"
                alt="Industries We Serve"
                className="w-full h-auto object-contain drop-shadow-md"
              />
            </div>
          </div>

          {/* Right Column: Numbered Industry List */}
          <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
            <StaggerContainer className="space-y-2.5 sm:space-y-3">
              {industries.map((ind) => (
                <StaggerItem key={ind.number}>
                  <Link
                    to={ind.href}
                    className="group p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 sm:bg-white hover:bg-slate-100 sm:hover:bg-slate-50 border border-slate-200/80 sm:border-slate-100 hover:border-slate-200 flex items-center justify-between transition-all duration-300 shadow-xs hover:shadow-md"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="text-xs sm:text-base font-bold text-indigo-600 dark:text-cyan-400 font-mono">
                        {ind.number}
                      </span>
                      <h3 className="text-base sm:text-xl font-bold text-slate-800 group-hover:text-[#0070ba] transition-colors font-display">
                        {ind.title}
                      </h3>
                    </div>

                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white sm:bg-slate-100 text-slate-400 group-hover:bg-[#0070ba] group-hover:text-white flex items-center justify-center transition-colors shadow-xs sm:shadow-none">
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

        </div>
      </div>
    </section>
  );
}

export default IndustriesSection;
