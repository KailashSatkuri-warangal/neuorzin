import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { CapabilitiesSection } from '../components/sections/CapabilitiesSection';
import { IndustriesSection } from '../components/sections/IndustriesSection';
import { ExpertiseAccordion } from '../components/sections/ExpertiseAccordion';
import { CaseStudiesSection } from '../components/sections/CaseStudiesSection';
import { BrandMarquee } from '../components/sections/BrandMarquee';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { WorksAboutSection } from '../components/sections/WorksAboutSection';
import { FunFactorSection } from '../components/sections/FunFactorSection';
import { FaqSection } from '../components/sections/FaqSection';
import { BlogSection } from '../components/sections/BlogSection';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

export function HomePage({ onOpenBooking, onSelectProject, onSelectArticle }) {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection onOpenBooking={onOpenBooking} />

      {/* 2. About NeuOrzin (with Signature & Certifications) */}
      <AboutSection onOpenBooking={onOpenBooking} />

      {/* 3. Processing / Core Capabilities (Original Size Categories: Product Eng, Data Eng, Sales & Mktg, AI & Auto) */}
      <CapabilitiesSection onOpenBooking={onOpenBooking} />

      {/* 4. Solutions for Every Industry / Industries We Serve (01 Fintech .. 05 Education) */}
      <IndustriesSection onOpenBooking={onOpenBooking} />

      {/* 5. Our Core Expertise (Dark Section with 5 Accordion Pillars) */}
      <ExpertiseAccordion onOpenBooking={onOpenBooking} />

      {/* 6. Selected Case Studies & Brand Marquee */}
      <CaseStudiesSection onSelectProject={onSelectProject} />
      <BrandMarquee />

      {/* 7. Testimonials (01 ── 03 Slider) */}
      <TestimonialsSection />

      {/* 8. Works & Track Record (Trusted by 5,000+ Happy Clients) */}
      <WorksAboutSection onOpenBooking={onOpenBooking} />

      {/* 9. Fun Factor (687+ Clients, 2,348+ Projects, 450+ Experts, 1,200+ Media) */}
      <FunFactorSection />

      {/* 10. Frequently Asked Questions */}
      <FaqSection onOpenBooking={onOpenBooking} />

      {/* 11. Insights & Newsroom (Updated Journal) */}
      <BlogSection onSelectArticle={onSelectArticle} />

      {/* 12. Closing CTA Banner */}
      <QuickContactBanner onOpenBooking={onOpenBooking} />
    </div>
  );
}

export default HomePage;
