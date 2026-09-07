import React from 'react';
import { CountUp } from '../common/CountUp';

export function WorksAboutSection({ onOpenBooking }) {
  return (
    <div className="works-about-area overflow-hidden py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 info space-y-6 text-left">
            <h5 className="text-[#0070ba] font-bold text-xs uppercase tracking-widest">Works About</h5>
            <h2 className="title text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight font-display">
              Trusted by <strong className="text-[#0070ba]"><CountUp end={5000} suffix="+" duration={2.5} /></strong> <br className="hidden sm:inline" /> Happy Customers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Leading fintechs, healthcare providers, and high-growth technology startups rely on NeuOrzin to execute high-stakes product engineering, infrastructure migrations, and AI transformations.
            </p>
            
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-2xl font-black text-[#0070ba] font-display">
                  <CountUp end={100} suffix="%" duration={2} />
                </div>
                <div className="text-xs font-bold text-slate-700 mt-1">Client Satisfaction</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-2xl font-black text-[#0070ba] font-display">
                  <CountUp end={50} suffix="+" duration={2} />
                </div>
                <div className="text-xs font-bold text-slate-700 mt-1">World-Class Engineers</div>
              </div>
            </div>

            <button 
              onClick={onOpenBooking} 
              className="px-8 py-3.5 rounded-full bg-[#0070ba] hover:bg-[#005a96] text-white font-bold text-sm shadow-lg shadow-[#0070ba]/30 transition-all hover:scale-105 cursor-pointer"
            >
              Talk to a consultant
            </button>
          </div>

          <div className="lg:col-span-6">
            <div className="thumb relative max-w-md mx-auto lg:max-w-none">
              <img src="/assets/img/about/3.jpg" alt="NeuOrzin Project Delivery" className="rounded-3xl shadow-xl w-full object-cover" />
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100">
                <div className="timer font-black font-display text-4xl sm:text-5xl text-[#0070ba]">
                  <CountUp end={875} suffix="+" duration={2.2} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mt-1">
                  Completed Projects
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
export default WorksAboutSection;
