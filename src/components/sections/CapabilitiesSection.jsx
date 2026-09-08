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
    <section id="capabilities" className="py-16 sm:py-24 bg-white overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <CinematicReveal intensity="medium" className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Processing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            Our Core Capabilities
          </h2>
          <p className="mt-3 text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Advanced technology services built for modern digital enterprises.
          </p>
        </CinematicReveal>

        {/* 4 Cards Grid - Original Size Proportions */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {capabilities.map((item, idx) => (
            <StaggerItem key={item.id}>
              <div className="group h-full flex flex-col justify-between text-left p-6 sm:p-7 rounded-2xl bg-white hover:bg-[#f8fafc] border border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <div>
                  {/* Illustration */}
                  <div className="h-36 sm:h-40 w-full flex items-center justify-center mb-6 overflow-hidden">
                    <img
                      src={item.illustration}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display leading-snug mb-3 group-hover:text-[#0070ba] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100/80">
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
