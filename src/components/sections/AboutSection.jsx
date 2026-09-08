import React from 'react';
import { CountUp } from '../common/CountUp';
import { SlideRight, SlideLeft, FadeIn } from '../animations';

export function AboutSection({ onOpenBooking }) {
  return (
    <div className="about-area inc-shape default-padding py-16 sm:py-24 bg-[#f8fafc] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6">
            <SlideRight distance={30} className="thumb relative max-w-lg mx-auto lg:max-w-none">
              <img src="/assets/img/about/1.jpg" alt="About NeuOrzin" className="rounded-3xl shadow-xl w-full object-cover" />
              <img src="/assets/img/about/2.jpg" alt="Team Work" className="rounded-2xl shadow-2xl absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-8 w-1/2 border-4 border-white hidden sm:block object-cover" />
              <div className="absolute top-6 left-6 bg-[#0070ba] text-white p-4 sm:p-6 rounded-2xl shadow-xl">
                <h4 className="text-xl sm:text-2xl font-black font-display leading-tight m-0 text-white">
                  <strong className="text-3xl sm:text-4xl block">
                    <CountUp end={20} suffix="+" duration={2} />
                  </strong> 
                  Years of Experience
                </h4>
              </div>
            </SlideRight>
          </div>

          <div className="lg:col-span-6 info space-y-6 text-left">
            <SlideLeft distance={25} className="space-y-4">
              <h5 className="text-[#0070ba] font-bold text-xs sm:text-sm uppercase tracking-wider mb-2">
                About NeuOrzin
              </h5>
              <h2 className="title text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight font-display">
                We Help IT Companies Scale Engineering
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                NeuOrzin is a product engineering studio helping startups from idea — MVP — scale using modern web, mobile, data and AI technologies. We design resilient architectures that withstand hyper-scale growth while keeping infrastructure lean and cost-efficient.
              </p>
            </SlideLeft>
            
            <FadeIn delay={0.2} y={15}>
              <ul className="space-y-4 pt-2">
                <li className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#0070ba]/10 text-[#0070ba] flex items-center justify-center text-xl shrink-0">
                    <i className="flaticon-certification"></i>
                  </div>
                  <div className="info">
                    <h4 className="font-bold text-slate-900 text-base">Certified Engineering Standards</h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Rigorous ISO/SOC2 security practices, automated CI/CD pipelines, and multi-cloud resilience.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#0070ba]/10 text-[#0070ba] flex items-center justify-center text-xl shrink-0">
                    <i className="flaticon-award-star-with-olive-branches"></i>
                  </div>
                  <div className="info">
                    <h4 className="font-bold text-slate-900 text-base">Award-Winning Innovation</h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Recognized for pioneering low-latency AI agent swarms and scalable Snowflake data warehousing.
                    </p>
                  </div>
                </li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.3} y={10}>
              <div className="author flex items-center justify-between pt-6 border-t border-slate-200">
                <div className="signature">
                  <img src="/assets/img/signature.png" alt="signature" className="h-10 sm:h-12 w-auto" />
                </div>
                <div className="intro text-right">
                  <h5 className="font-bold text-slate-900 text-sm sm:text-base">Principal Architect</h5>
                  <span className="text-xs text-slate-500">Head of Technology, NeuOrzin</span>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
