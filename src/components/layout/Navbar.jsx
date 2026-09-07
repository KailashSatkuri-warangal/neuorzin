import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';

export function Navbar({ onOpenBooking, onOpenSearch, onOpenOffcanvas }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const menuItems = [
    {
      name: 'HOME',
      href: '/',
      hasDropdown: true,
      items: [
        { title: 'Home IT Solutions', href: '/', desc: 'Next-gen enterprise software' },
        { title: 'Our Methodology', href: '/approach', desc: 'Agile architecture & design' },
        { title: 'Services Overview', href: '/services', desc: 'End-to-end engineering' }
      ]
    },
    {
      name: 'COMPANY',
      href: '/about',
      hasDropdown: true,
      items: [
        { title: 'About Company', href: '/about', desc: 'Our mission & leadership' },
        { title: 'Meet Our Team', href: '/careers', desc: 'World-class tech architects' },
        { title: 'Our Approach', href: '/approach', desc: 'How we build high-scale apps' },
        { title: 'Industry Verticals', href: '/industries', desc: 'Fintech, Health, AI' },
        { title: 'FAQ', href: '/faq', desc: 'Frequently asked questions' }
      ]
    },
    {
      name: 'SERVICES',
      href: '/services',
      hasDropdown: true,
      items: [
        { title: 'All Services Overview', href: '/services', desc: 'Full-stack engineering capabilities' },
        { title: 'Product Engineering', href: '/services/product-engineering', desc: 'Web, Mobile, SaaS platforms' },
        { title: 'Data Engineering & Mesh', href: '/services/data-engineering', desc: 'Snowflake, Kafka, Lakehouse' },
        { title: 'AI & Autonomous Swarms', href: '/services/ai-automation', desc: 'Agentic AI & LLM workflows' },
        { title: 'Cloud & FinOps', href: '/services/cloud-performance', desc: 'Multi-cloud & cost optimization' },
        { title: 'Industry Solutions', href: '/industries', desc: 'Regulated domain architectures' }
      ]
    },
    {
      name: 'CASE STUDIES',
      href: '/projects',
      hasDropdown: true,
      items: [
        { title: 'All Work Showcase', href: '/projects', desc: 'Selected client case studies' },
        { title: 'Enterprise Deliveries', href: '/projects', desc: 'High-impact product transformations' },
        { title: 'Technology Transformations', href: '/projects', desc: 'Cloud migrations & AI pipelines' }
      ]
    },
    {
      name: 'BLOG',
      href: '/journal',
      hasDropdown: true,
      items: [
        { title: 'Blog Standard', href: '/journal', desc: 'Articles & tutorials' },
        { title: 'Engineering Insights', href: '/journal', desc: 'Deep-dive architectural papers' }
      ]
    },
    {
      name: 'CONTACT',
      href: '/contact',
      hasDropdown: false
    }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-slate-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            className="lg:hidden p-2 text-slate-800 hover:text-[#0070ba] focus:outline-none cursor-pointer rounded-xl hover:bg-slate-100 transition-colors"
            onClick={onOpenOffcanvas}
            aria-label="Toggle Mobile Menu"
          >
            <i className="fa fa-bars text-xl"></i>
          </button>

          <Link to="/" className="flex items-center focus:outline-none group">
            <img
              src="/assets/images/neuorzin-logo.png"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              alt="NeuOrzin"
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
          {menuItems.map((item) => {
            const isActive = item.href === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.href);

            const isOpen = activeDropdown === item.name;

            if (item.hasDropdown) {
              return (
                <div
                  key={item.name}
                  className="relative py-3 group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs xl:text-sm font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                      isActive || isOpen
                        ? 'text-[#0070ba]'
                        : 'text-slate-800 hover:text-[#0070ba]'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown 
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#0070ba]' : 'opacity-60 group-hover:opacity-100'
                      }`} 
                    />
                  </Link>

                  {/* Smooth Solid White Dropdown Panel */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-0.5 w-72 p-2.5 bg-white border border-slate-200 shadow-2xl rounded-2xl z-50 space-y-1"
                      >
                        {item.items.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            to={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 hover:text-[#0070ba] text-slate-700 transition-all group/item"
                          >
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover/item:text-[#0070ba] transition-colors">
                                {sub.title}
                              </div>
                              {sub.desc && (
                                <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                                  {sub.desc}
                                </div>
                              )}
                            </div>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#0070ba] shrink-0" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3.5 py-2 text-xs xl:text-sm font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#0070ba]'
                    : 'text-slate-800 hover:text-[#0070ba]'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Attributes: Search, Hamburger Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-full text-slate-800 hover:text-[#0070ba] hover:bg-slate-100 transition-all cursor-pointer"
            title="Search"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Side Menu 3-Bar Hamburger */}
          <button
            onClick={onOpenOffcanvas}
            className="p-2.5 rounded-xl text-slate-800 hover:text-[#0070ba] hover:bg-slate-100 transition-all cursor-pointer flex flex-col justify-center items-end gap-1.5 w-10 h-10"
            title="Open Sidebar Menu"
            aria-label="Open Sidebar Menu"
          >
            <span className="w-5 h-[2.5px] bg-slate-900 rounded-full"></span>
            <span className="w-3.5 h-[2.5px] bg-slate-900 rounded-full"></span>
            <span className="w-5 h-[2.5px] bg-slate-900 rounded-full"></span>
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
