import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { Preloader } from './components/common/Preloader';
import { Navbar } from './components/layout/Navbar';
import { OffcanvasMenu } from './components/layout/OffcanvasMenu';
import { Footer } from './components/layout/Footer';
import { RouteProgressBar } from './components/common/RouteProgressBar';
import { FloatingActionDock } from './components/common/FloatingActionDock';
import { Toast } from './components/common/Toast';
import { BookingModal } from './components/common/BookingModal';
import { SearchModal } from './components/common/SearchModal';
import { ProjectDetailModal } from './components/common/ProjectDetailModal';
import { ArticleModal } from './components/common/ArticleModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ApproachPage } from './pages/ApproachPage';
import { BlogPage } from './pages/BlogPage';
import { CareersPage } from './pages/CareersPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export function App() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Run preloader ONCE per browser session (until session ends)
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const sessionPreloaded = sessionStorage.getItem('neuorzin_preloaded') === 'true';
      return !sessionPreloaded;
    }
    return false;
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <>
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#0070ba] selection:text-white transition-colors duration-200 overflow-x-hidden">
        {/* Navigation */}
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

        {/* Routes */}
        <main className="flex-grow w-full overflow-x-hidden">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><HomePage onOpenBooking={() => setIsBookingOpen(true)} onSelectProject={setSelectedProject} onSelectArticle={setSelectedArticle} /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><AboutPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
              <Route path="/services" element={<PageWrapper><ServicesPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
              <Route path="/services/:id" element={<PageWrapper><ServiceDetailPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
              <Route path="/industries" element={<PageWrapper><IndustriesPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
              <Route path="/projects" element={<PageWrapper><ProjectsPage onSelectProject={setSelectedProject} onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
              <Route path="/work" element={<PageWrapper><ProjectsPage onSelectProject={setSelectedProject} onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
              <Route path="/approach" element={<PageWrapper><ApproachPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
              <Route path="/journal" element={<PageWrapper><BlogPage onSelectArticle={setSelectedArticle} onShowToast={showToast} /></PageWrapper>} />
              <Route path="/blog" element={<PageWrapper><BlogPage onSelectArticle={setSelectedArticle} onShowToast={showToast} /></PageWrapper>} />
              <Route path="/careers" element={<PageWrapper><CareersPage onShowToast={showToast} /></PageWrapper>} />
              <Route path="/faq" element={<PageWrapper><FaqPage onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><ContactPage onShowToast={showToast} onOpenBooking={() => setIsBookingOpen(true)} /></PageWrapper>} />
              <Route path="/privacy" element={<PageWrapper><PrivacyPage /></PageWrapper>} />
              <Route path="/terms" element={<PageWrapper><TermsPage /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer
          onOpenBooking={() => setIsBookingOpen(true)}
          onShowToast={showToast}
        />

        {/* Modals & Docks */}
        <RouteProgressBar />
        <FloatingActionDock
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          onBookingSuccess={(msg) => showToast(msg)}
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
