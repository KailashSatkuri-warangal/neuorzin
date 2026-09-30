import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { CapabilitiesSection } from '../components/sections/CapabilitiesSection';
import { IndustriesSection } from '../components/sections/IndustriesSection';
import { ApproachSection } from '../components/sections/ApproachSection';
import { ExpertiseAccordion } from '../components/sections/ExpertiseAccordion';
import { CaseStudiesSection } from '../components/sections/CaseStudiesSection';
import { BrandMarquee } from '../components/sections/BrandMarquee';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { ClientSpotlightSection } from '../components/sections/ClientSpotlightSection';
import { FunFactorSection } from '../components/sections/FunFactorSection';
import { FaqSection } from '../components/sections/FaqSection';
import { BlogSection } from '../components/sections/BlogSection';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

export function HomePage({ onOpenBooking, onSelectProject, onSelectArticle }) {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* 1. Hero Section (Above the fold, rendered immediately) */}
      <HeroSection onOpenBooking={onOpenBooking} />

      {/* 2. Processing / Core Capabilities (Product Eng, Data Eng, Sales & Mktg, AI & Auto) */}
      <div className="content-visibility-auto">
        <CapabilitiesSection onOpenBooking={onOpenBooking} />
      </div>

      {/* 3. Solutions for Every Industry / Industries We Serve */}
      <div className="content-visibility-auto">
        <IndustriesSection onOpenBooking={onOpenBooking} />
      </div>

      {/* 4. Our Core Expertise (Dark Section with 5 Accordion Pillars) */}
      <div className="content-visibility-auto">
        <ExpertiseAccordion onOpenBooking={onOpenBooking} />
      </div>

      {/* 5. Client Spotlight: Technology Built Around the Way You Work */}
      <div className="content-visibility-auto">
        <ClientSpotlightSection onOpenBooking={onOpenBooking} />
      </div>

      {/* 6. Testimonials (Animated Slider) */}
      <div className="content-visibility-auto">
        <TestimonialsSection />
      </div>

      {/* Approach Methodology Section */}
      <div className="content-visibility-auto">
        <ApproachSection onOpenBooking={onOpenBooking} />
      </div>

      {/* 10. Closing CTA Banner */}
      <div className="content-visibility-auto">
        <QuickContactBanner onOpenBooking={onOpenBooking} />
      </div>
    </div>
  );
}

export default HomePage;
