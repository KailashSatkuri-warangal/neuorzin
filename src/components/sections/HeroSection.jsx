import React from 'react';
import { Phone } from 'lucide-react';

export function HeroSection({ onOpenBooking }) {
  return (
    <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-24 bg-[#f4f7fb] dark:bg-[#080a14] overflow-hidden transition-colors">
      {/* Background Soft Glow */}
      <div className="absolute top-10 -left-10 w-96 h-96 bg-[#80ffdb]/40 dark:bg-[#0070ba]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[580px]">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-black text-slate-900 dark:text-white leading-[1.08] font-display">
              Creating a better <br />
              <strong className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070ba] to-[#00c6ff] font-extrabold">
                IT solutions
              </strong>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
              Affixed pretend account ten natural. Need eat week even yet that. Incommode delighted he resolving sportsmen do in listening.
            </p>

            {/* Call Us Box matching Image 1 */}
            <div className="pt-2">
              <div
                onClick={onOpenBooking}
                className="inline-flex items-center gap-4 p-2 rounded-2xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all group"
              >
                <div className="w-13 h-13 rounded-full bg-[#0070ba] text-white flex items-center justify-center text-lg shadow-lg shadow-[#0070ba]/30 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 fill-white" />
                </div>
                <div className="text-left">
                  <h5 className="text-base sm:text-lg font-bold text-[#0070ba] dark:text-cyan-400 m-0 leading-tight">
                    (+3454) 123 7890
                  </h5>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mt-0.5">
                    Call for any question
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Thumb Illustration Column */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <img
              src="/assets/img/illustration/2.png"
              alt="IT Solutions Illustration"
              className="w-full max-w-[560px] h-auto object-contain drop-shadow-2xl animate-float"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
export default HeroSection;
