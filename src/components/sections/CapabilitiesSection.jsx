import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CinematicReveal, 
  StaggerContainer, 
  StaggerItem 
} from '../animations';

export function CapabilitiesSection({ onOpenBooking }) {
  const capabilities = [
    {
      id: 'product-engineering',
      title: 'Product Engineering – Web, Mobile & MVP',
      desc: 'Design and build scalable web and mobile applications, from MVP to full products, delivering seamless user experiences and fast market launches',
      illustration: '/assets/img/illustration/2.png',
      href: '/services'
    },
    {
      id: 'data-engineering',
      title: 'Data Engineering & Analytics',
      desc: 'Develop robust data pipelines, optimize costs, and migrate legacy systems to Snowflake. Transform raw data into actionable insights with dashboards using PowerBI',
      illustration: '/assets/img/illustration/5.png',
      href: '/services'
    },
    {
      id: 'sales-marketing',
      title: 'Sales and Marketing',
      desc: 'Create sales plans, marketing strategies, SEO, content, and social media management. Drive lead generation, brand growth, and advertising campaigns across platforms',
      illustration: '/assets/img/illustration/7.png',
      href: '/services'
    },
    {
      id: 'ai-automation',
      title: 'AI & Automation',
      desc: 'Implement AI agents, automate workflows, and integrate large language models to streamline operations, boost efficiency, and unlock intelligent insights.',
      illustration: '/assets/img/illustration/12.png',
      href: '/services'
    }
  ];

  return (
    <section id="capabilities" className="py-12 sm:py-20 bg-white overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <CinematicReveal intensity="medium" className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3">
            Processing
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            Our Core Capabilities
          </h2>
          <p className="mt-2 sm:mt-3 text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Advanced technology services built for modern digital enterprises.
          </p>
        </CinematicReveal>

        {/* 4 Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {capabilities.map((item, idx) => (
            <StaggerItem key={item.id}>
              <div className="group h-full flex flex-col justify-between text-left p-5 sm:p-7 rounded-2xl bg-[#fafcff] sm:bg-white hover:bg-[#f8fafc] border border-slate-200/80 sm:border-slate-100 hover:border-slate-300 shadow-xs hover:shadow-lg transition-all duration-300">
                <div>
                  {/* Compact Illustration on Mobile */}
                  <div className="h-28 sm:h-36 w-full flex items-center justify-center mb-4 sm:mb-6 overflow-hidden">
                    <img
                      src={item.illustration}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display leading-snug mb-2 sm:mb-3 group-hover:text-[#0070ba] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 mt-4 sm:mt-6 border-t border-slate-100">
                  <Link
                    to={item.href}
                    className="text-xs font-bold text-[#0070ba] hover:underline inline-flex items-center gap-1"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}

export default CapabilitiesSection;
