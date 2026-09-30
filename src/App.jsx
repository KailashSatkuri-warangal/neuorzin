import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { Preloader } from './components/common/Preloader';
import { Navbar } from './components/layout/Navbar';
import { OffcanvasMenu } from './components/layout/OffcanvasMenu';
import { Footer } from './components/layout/Footer';
import { PublicBottomNav } from './components/layout/PublicBottomNav';
import { RouteProgressBar } from './components/common/RouteProgressBar';
import { FloatingActionDock } from './components/common/FloatingActionDock';
import { Toast } from './components/common/Toast';
import { BookingModal } from './components/common/BookingModal';
import { SearchModal } from './components/common/SearchModal';
import { ProjectDetailModal } from './components/common/ProjectDetailModal';
import { ArticleModal } from './components/common/ArticleModal';
import { ScrollProgress } from './components/animations/ScrollProgress';

// Critical Homepage imported eagerly
import { HomePage } from './pages/HomePage';

// Secondary pages lazy loaded for optimal mobile performance
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage').then(m => ({ default: m.IndustriesPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ApproachPage = lazy(() => import('./pages/ApproachPage').then(m => ({ default: m.ApproachPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const InsightsPage = lazy(() => import('./pages/InsightsPage').then(m => ({ default: m.InsightsPage })));
const NewsroomPage = lazy(() => import('./pages/NewsroomPage').then(m => ({ default: m.NewsroomPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then(m => ({ default: m.CareersPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(m => ({ default: m.FaqPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const LoadingDemoPage = lazy(() => import('./pages/LoadingDemoPage').then(m => ({ default: m.LoadingDemoPage })));

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export function App() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Instant rendering without render-blocking preloader delay for high mobile PageSpeed
  const [isLoading, setIsLoading] = useState(false);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg, type = 'info') => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const isAdmin = location.pathname.startsWith('/admin');

  // Dynamic Document Title based on active route
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/admin')) {
      document.title = 'NeuOrzin CRM — Executive Command Portal';
    } else if (path.startsWith('/services')) {
      document.title = 'Services & Solutions | NeuOrzin';
    } else if (path.startsWith('/about') || path.startsWith('/company')) {
      document.title = 'About Us | NeuOrzin';
    } else if (path.startsWith('/projects') || path.startsWith('/work')) {
      document.title = 'Case Studies & Projects | NeuOrzin';
    } else if (path.startsWith('/contact')) {
      document.title = 'Contact Us | NeuOrzin';
    } else if (path.startsWith('/careers') || path.startsWith('/team')) {
      document.title = 'Careers & Team | NeuOrzin';
    } else if (path.startsWith('/industries')) {
      document.title = 'Industries | NeuOrzin';
    } else if (path.startsWith('/insights') || path.startsWith('/newsroom')) {
      document.title = 'Insights & Newsroom | NeuOrzin';
    } else {
      document.title = 'Technology That Powers Digital Growth | NeuOrzin';
    }
  }, [location.pathname]);

  return (
    <>
      {isLoading && !isAdmin && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      {!isAdmin && <ScrollProgress />}

      <div className={`min-h-screen ${isAdmin ? 'bg-[#f8fafc]' : 'bg-white'} text-slate-900 flex flex-col font-sans selection:bg-[#0070ba] selection:text-white transition-colors duration-200 overflow-x-hidden`}>
        {/* Navigation - Hidden for Admin Portal */}
        {!isAdmin && (
          <>
            <Navbar
              onOpenBooking={() => setIsBookingOpen(true)}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenOffcanvas={() => setIsOffcanvasOpen(true)}
            />

            {/* Offcanvas Drawer */}
            <OffcanvasMenu
              isOpen={isOffcanvasOpen}
              onClose={() => setIsOffcanvasOpen(false)}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
          </>
        )}

        {/* Routes */}
        <main className={`flex-grow w-full overflow-x-hidden ${isAdmin ? 'p-0 m-0' : ''}`}>
          <Suspense fallback={
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="w-7 h-7 border-2 border-[#0070ba] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* Home */}
                <Route path="/" element={<PageWrapper><HomePage onOpenBooking={() => setIsBookingOpen(true)} onSelectProject={setSelectedProject} onSelectArticle={setSelectedArticle} /></PageWrapper>} />
                
                {/* Company & About */}
                <Route path="/about" element={<PageWrapper><AboutPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
                <Route path="/about-us" element={<PageWrapper><AboutPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
                <Route path="/company" element={<PageWrapper><AboutPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
                <Route path="/team" element={<PageWrapper><CareersPage onShowToast={showToast} /></PageWrapper>} />
                
                {/* Services & Detail */}
                <Route path="/services" element={<PageWrapper><ServicesPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
                <Route path="/services/:id" element={<PageWrapper><ServiceDetailPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
                
                {/* Industries */}
                <Route path="/industries" element={<PageWrapper><IndustriesPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
                
                {/* Case Studies / Projects */}
                <Route path="/projects" element={<PageWrapper><ProjectsPage onSelectProject={setSelectedProject} onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
                <Route path="/work" element={<PageWrapper><ProjectsPage onSelectProject={setSelectedProject} onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
                
                {/* Methodology / Approach */}
                <Route path="/approach" element={<PageWrapper><ApproachPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
                
                {/* Dedicated Insights / Whitepapers */}
                <Route path="/insights" element={<PageWrapper><InsightsPage onShowToast={showToast} /></PageWrapper>} />
                
                {/* Dedicated Newsroom / Newspaper / Press Center */}
                <Route path="/newsroom" element={<PageWrapper><NewsroomPage onShowToast={showToast} /></PageWrapper>} />
                <Route path="/newspaper" element={<PageWrapper><NewsroomPage onShowToast={showToast} /></PageWrapper>} />
                
                {/* Dedicated Gallery / Media Showcase */}
                <Route path="/gallery" element={<PageWrapper><GalleryPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
                
                {/* Standard Blog / Journal */}
                <Route path="/journal" element={<PageWrapper><BlogPage onSelectArticle={setSelectedArticle} onShowToast={showToast} /></PageWrapper>} />
                <Route path="/blog" element={<PageWrapper><BlogPage onSelectArticle={setSelectedArticle} onShowToast={showToast} /></PageWrapper>} />
                <Route path="/resources" element={<PageWrapper><BlogPage onSelectArticle={setSelectedArticle} onShowToast={showToast} /></PageWrapper>} />
                
                {/* Careers & Hiring */}
                <Route path="/careers" element={<PageWrapper><CareersPage onShowToast={showToast} /></PageWrapper>} />
                
                {/* FAQ */}
                <Route path="/faq" element={<PageWrapper><FaqPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
                
                {/* Contact */}
                <Route path="/contact" element={<PageWrapper><ContactPage onShowToast={showToast} onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
                <Route path="/contact-us" element={<PageWrapper><ContactPage onShowToast={showToast} onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
                
                {/* Legal */}
                <Route path="/privacy" element={<PageWrapper><PrivacyPage /></PageWrapper>} />
                <Route path="/terms" element={<PageWrapper><TermsPage /></PageWrapper>} />
                
                {/* Fallback & Demos */}
                <Route path="/admin" element={<AdminPage onShowToast={showToast} />} />
                <Route path="/admin/*" element={<AdminPage onShowToast={showToast} />} />
                <Route path="/loading-demo" element={<PageWrapper><LoadingDemoPage /></PageWrapper>} />
                <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>

        {/* Footer */}
        {!isAdmin && (
          <Footer
            onOpenBooking={() => setIsBookingOpen(true)}
            onShowToast={showToast}
          />
        )}

        {/* Modals & Docks */}
        {!isAdmin && <PublicBottomNav onOpenBooking={() => setIsBookingOpen(true)} />}
        {!isAdmin && <RouteProgressBar />}
        {!isAdmin && (
          <FloatingActionDock
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          onBookingSuccess={(msg) => showToast(msg, 'success')}
        />
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
        <ProjectDetailModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          onBookCall={() => setIsBookingOpen(true)}
        />
        <ArticleModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      </div>
    </>
  );
}

export default App;
