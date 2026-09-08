import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CinematicReveal } from '../animations';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote: "NeuOrzin transformed our infrastructure with intelligent automation and scalable cloud architecture. Our deployment time dropped by 60%, and system reliability improved instantly. Their engineering expertise is unmatched",
      author: "Enterprise Engineering Director",
      company: "Fintech Platform"
    },
    {
      id: 2,
      quote: "The team at NeuOrzin built a complete data pipeline that changed the way we operate. Our analytics are faster, cleaner, and more actionable than ever. True experts in modern data engineering.",
      author: "VP of Product Analytics",
      company: "HealthTech Solutions"
    },
    {
      id: 3,
      quote: "From concept to production, NeuOrzin guided us through every step. The product architecture they built is incredibly scalable and future-ready. Their attention to detail is on another level.",
      author: "Co-Founder & CTO",
      company: "Autonomous AI Studio"
    },
    {
      id: 4,
      quote: "Migrating our core banking services to NeuOrzin's zero-trust cloud mesh was seamless with zero downtime. Exceptional delivery pace and rock-solid architecture.",
      author: "Head of Infrastructure",
      company: "Global Capital Corp"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const totalSlides = testimonials.length;

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute 2 visible items for desktop (wrap around smoothly)
  const firstItem = testimonials[currentIndex];
  const secondItem = testimonials[(currentIndex + 1) % totalSlides];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 26 },
        opacity: { duration: 0.35 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 26 },
        opacity: { duration: 0.25 }
      }
    })
  };

  const progressPercentage = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white overflow-hidden border-b border-slate-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <CinematicReveal intensity="medium" className="max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            Trusted by Businesses Who Believe in <br className="hidden sm:inline" />
            Innovation & Engineering Excellence
          </h2>
          <p className="mt-4 text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            We partner with organizations across industries to deliver AI-driven automation, cloud transformation, powerful data systems, and high-performance digital products. Here's what our clients say about working with NeuOrzin.
          </p>
        </CinematicReveal>

        {/* Animated Testimonial Cards Carousel */}
        <div className="max-w-5xl mx-auto mb-12 min-h-[190px] relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left"
            >
              {/* Card 1 */}
              <div className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {firstItem.quote}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
                  {firstItem.author} • <span className="text-[#0070ba]">{firstItem.company}</span>
                </div>
              </div>

              {/* Card 2 (Desktop / Tablet) */}
              <div className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full hidden md:flex">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {secondItem.quote}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
                  {secondItem.author} • <span className="text-[#0070ba]">{secondItem.company}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive 01 ─── 03 Pagination Controls */}
        <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold text-slate-400">
          {/* Previous Button */}
          <button 
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Current Page Number */}
          <span className="text-slate-700 font-bold min-w-[20px]">
            0{currentIndex + 1}
          </span>

          {/* Dynamic Progress Bar */}
          <div className="w-24 sm:w-32 h-1 bg-slate-200 rounded-full overflow-hidden relative cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = clickX / rect.width;
              const targetIndex = Math.min(Math.floor(ratio * totalSlides), totalSlides - 1);
              setDirection(targetIndex > currentIndex ? 1 : -1);
              setCurrentIndex(targetIndex);
            }}
          >
            <motion.div 
              className="h-full bg-[#0070ba] rounded-full"
              initial={false}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>

          {/* Total Slides Count */}
          <span className="text-slate-400">
            0{totalSlides}
          </span>

          {/* Next Button */}
          <button 
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default TestimonialsSection;
