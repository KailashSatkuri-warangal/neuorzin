import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { FeaturedServicesSection } from '../components/sections/FeaturedServicesSection';
import { AboutSection } from '../components/sections/AboutSection';
import { WorksAboutSection } from '../components/sections/WorksAboutSection';
import { CaseStudiesSection } from '../components/sections/CaseStudiesSection';
import { FunFactorSection } from '../components/sections/FunFactorSection';
import { TeamSection } from '../components/sections/TeamSection';
import { FaqSection } from '../components/sections/FaqSection';
import { BlogSection } from '../components/sections/BlogSection';

export function HomePage({ onOpenBooking, onSelectProject, onSelectArticle }) {
  return (
    <div className="flex flex-col">
      <HeroSection onOpenBooking={onOpenBooking} />
      <FeaturedServicesSection />
      <AboutSection onOpenBooking={onOpenBooking} />
      <WorksAboutSection onOpenBooking={onOpenBooking} />
      <CaseStudiesSection onSelectProject={onSelectProject} />
      <FunFactorSection />
      <TeamSection />
      <FaqSection onOpenBooking={onOpenBooking} />
      <BlogSection onSelectArticle={onSelectArticle} />
    </div>
  );
}
export default HomePage;
