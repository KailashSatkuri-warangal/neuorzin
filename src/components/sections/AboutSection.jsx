import React from 'react';
import { SlideRight, SlideLeft, FadeIn } from '../animations';

export function AboutSection({ onOpenBooking }) {
  return (
    <div className="about-area inc-shape default-padding py-16 sm:py-24 bg-[#f8fafc] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column - Clean image without the 20+ overlay */}
          <div className="lg:col-span-6">
            <SlideRight distance={30} className="thumb relative max-w-lg mx-auto lg:max-w-none">
              <img src="/assets/img/about/1.jpg" alt="About NeuOrzin" className="rounded-3xl shadow-xl w-full object-cover" />
              <img src="/assets/img/about/2.jpg" alt="Team Work" className="rounded-2xl shadow-2xl absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-8 w-1/2 border-4 border-white hidden sm:block object-cover" />
            </SlideRight>
          </div>

          {/* Right Information Column */}
          <div className="lg:col-span-6 info space-y-6 text-left">
            <SlideLeft distance={25} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0070ba] text-xs font-bold uppercase tracking-wider">
                About NeuOrzin
              </div>
              <h2 className="title text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight font-display">
                We Help IT Companies Scale Engineering
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                NeuOrzin is a product engineering studio helping startups from idea → MVP → scale using modern web, mobile, data and AI technologies. We design resilient architectures that withstand hyper-scale growth while keeping infrastructure lean and cost-efficient.
              </p>
            </SlideLeft>
            
            <FadeIn delay={0.2} y={10}>
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 rounded-xl bg-[#0070ba] hover:bg-[#005c99] text-white font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  Schedule Technical Audit →
                </button>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
