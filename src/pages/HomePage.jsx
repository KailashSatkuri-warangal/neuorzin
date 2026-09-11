import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { CapabilitiesSection } from '../components/sections/CapabilitiesSection';
import { IndustriesSection } from '../components/sections/IndustriesSection';
import { ApproachSection } from '../components/sections/ApproachSection';
import { ExpertiseAccordion } from '../components/sections/ExpertiseAccordion';
import { CaseStudiesSection } from '../components/sections/CaseStudiesSection';
import { BrandMarquee } from '../components/sections/BrandMarquee';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { FunFactorSection } from '../components/sections/FunFactorSection';
import { FaqSection } from '../components/sections/FaqSection';
import { BlogSection } from '../components/sections/BlogSection';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

export function HomePage({ onOpenBooking, onSelectProject, onSelectArticle }) {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* 1. Hero Section */}
      <HeroSection onOpenBooking={onOpenBooking} />

      {/* 2. Processing / Core Capabilities (Product Eng, Data Eng, Sales & Mktg, AI & Auto) */}
      <CapabilitiesSection onOpenBooking={onOpenBooking} />

      {/* 3. Solutions for Every Industry / Industries We Serve (01 Fintech .. 05 Education) */}
      <IndustriesSection onOpenBooking={onOpenBooking} />

      {/* 4. Our Core Expertise (Dark Section with 5 Accordion Pillars) */}
      <ExpertiseAccordion onOpenBooking={onOpenBooking} />

      {/* 5. Selected Case Studies & Brand Marquee */}
      {/* <CaseStudiesSection onSelectProject={onSelectProject} /> - Hidden temporarily */}
      {/* <BrandMarquee /> - Hidden temporarily */}

      {/* 6. Testimonials (Animated 01 ── 04 Slider) */}
      <TestimonialsSection />

      {/* Approach Methodology Section */}
      <ApproachSection onOpenBooking={onOpenBooking} />

      {/* 7. Fun Factor (687+ Clients, 2,348+ Projects, 450+ Experts, 1,200+ Media) */}
      {/* <FunFactorSection /> - Hidden temporarily */}

      {/* 8. Frequently Asked Questions */}
      {/* <FaqSection onOpenBooking={onOpenBooking} /> - Hidden temporarily */}

      {/* 9. Insights & Newsroom (Updated Journal) */}
      {/* <BlogSection onSelectArticle={onSelectArticle} /> - Hidden temporarily */}

      {/* 10. Closing CTA Banner */}
      <QuickContactBanner onOpenBooking={onOpenBooking} />
    </div>
  );
}

export default HomePage;
