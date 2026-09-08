import React from 'react';
import { 
  CinematicReveal, 
  StaggerContainer, 
  StaggerItem 
} from '../animations';
import { ArrowUpRight } from 'lucide-react';

const cases = [
  { img: '/assets/img/portfolio/1.jpg', title: 'Cyber Security Enclave', tag: 'Technology / Cloud' },
  { img: '/assets/img/portfolio/2.jpg', title: 'Fintech IT Architecture', tag: 'Architecture / Fintech' },
  { img: '/assets/img/portfolio/4.jpg', title: 'AIOps Observability Mesh', tag: 'DevSecOps / AI' },
  { img: '/assets/img/portfolio/3.jpg', title: 'High-Scale Cloud App', tag: 'Scalability / Web3' }
];

export function CaseStudiesSection({ onSelectProject }) {
  return (
    <section className="py-16 sm:py-24 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Scene 05 Header) */}
        <CinematicReveal intensity="medium" className="text-center max-w-2xl mx-auto mb-14">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0070ba] text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Recent Deployments
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
            Selected <strong className="text-[#0070ba]">Case Studies</strong>
          </h2>
          <p className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
            Real-world systems engineered and scaled for high-velocity global businesses.
          </p>
        </CinematicReveal>

        {/* Case Cards (Scene 05 Grid) */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c, idx) => (
            <StaggerItem key={idx}>
              <div 
                onClick={() => onSelectProject && onSelectProject({ title: c.title, category: c.tag, image: c.img })}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              >
                <div className="h-56 w-full overflow-hidden relative">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <ArrowUpRight className="w-4 h-4 text-[#0070ba]" />
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[10px] font-bold text-[#0070ba] uppercase tracking-wider block mb-1">
                    {c.tag}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 font-display group-hover:text-[#0070ba] transition-colors">
                    {c.title}
                  </h3>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}

export default CaseStudiesSection;
