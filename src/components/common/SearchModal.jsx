import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal';
import { Search, ArrowRight, ShieldCheck, Lock, Sparkles, FolderKanban, PhoneCall, Calendar, ExternalLink, KeyRound } from 'lucide-react';
import { detailedServices } from '../../data/servicesDetailedData';
import { projectsData } from '../../data/projectsData';

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // 1. Admin Portal & Login Matching
  const adminKeywords = ['login', 'admin', 'admin login', 'crm', 'portal', 'executive', 'super admin', 'signin', 'sign in', 'auth', 'executive login', 'dashboard', 'operations'];
  const matchesAdmin = normalizedQuery !== '' && adminKeywords.some(kw => 
    kw.includes(normalizedQuery) || normalizedQuery.includes(kw)
  );

  // 2. Services Matching
  const filteredServices = normalizedQuery === '' ? [] : detailedServices.filter(s => 
    s.title.toLowerCase().includes(normalizedQuery) || 
    s.description.toLowerCase().includes(normalizedQuery) ||
    (s.category && s.category.toLowerCase().includes(normalizedQuery))
  );

  // 3. Case Studies Matching
  const filteredProjects = normalizedQuery === '' ? [] : projectsData.filter(p =>
    p.title.toLowerCase().includes(normalizedQuery) ||
    p.description.toLowerCase().includes(normalizedQuery) ||
    (p.category && p.category.toLowerCase().includes(normalizedQuery))
  );

  // Quick Navigation Action
  const handleSelect = (path) => {
    onClose();
    setQuery('');
    navigate(path);
  };

  // Form Submit / Enter key trigger
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (matchesAdmin) {
        handleSelect('/admin');
      } else if (filteredServices.length > 0) {
        handleSelect(`/services/${filteredServices[0].id}`);
      } else if (filteredProjects.length > 0) {
        handleSelect('/projects');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Search NeuOrzin" maxWidth="max-w-xl">
      <div className="space-y-4">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search 'login', services, projects, technologies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white shadow-xs transition-all"
          />
        </div>

        {/* Results Stream */}
        {normalizedQuery !== '' ? (
          <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar pt-1 pr-1">
            
            {/* High Priority: Admin Portal & Login Card */}
            {matchesAdmin && (
              <div className="p-1">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#0070ba] mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Executive Portal & Authentication</span>
                </div>
                <button
                  onClick={() => handleSelect('/admin')}
                  className="w-full text-left p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border border-blue-200 hover:border-[#0070ba] flex items-center justify-between transition-all group shadow-xs cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0070ba] to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h6 className="text-sm font-black text-slate-900 group-hover:text-[#0070ba]">
                          Admin Portal & Executive Login
                        </h6>
                        <span className="px-2 py-0.5 rounded-full bg-[#0070ba] text-white text-[9px] font-bold">
                          /admin
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                        Access Executive CRM, Inbound Leads, Invoices, and Operations Suite
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/80 border border-blue-200 text-[#0070ba] text-xs font-bold shrink-0 group-hover:bg-[#0070ba] group-hover:text-white transition-colors">
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </div>
            )}

            {/* Services Results */}
            {filteredServices.length > 0 && (
              <div className="pt-1">
                <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5 px-1">
                  Services & Solutions ({filteredServices.length})
                </h5>
                <div className="space-y-1">
                  {filteredServices.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSelect(`/services/${s.id}`)}
                      className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between transition-all group cursor-pointer"
                    >
                      <div className="min-w-0 pr-3">
                        <h6 className="text-xs font-bold text-slate-900 group-hover:text-[#0070ba] truncate">
                          {s.title}
                        </h6>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{s.description}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0070ba] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Case Studies Results */}
            {filteredProjects.length > 0 && (
              <div className="pt-1">
                <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5 px-1">
                  Case Studies & Work ({filteredProjects.length})
                </h5>
                <div className="space-y-1">
                  {filteredProjects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect('/projects')}
                      className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between transition-all group cursor-pointer"
                    >
                      <div className="min-w-0 pr-3">
                        <h6 className="text-xs font-bold text-slate-900 group-hover:text-[#0070ba] truncate">
                          {p.title}
                        </h6>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{p.description}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0070ba] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results Fallback with Admin Link suggestion */}
            {!matchesAdmin && filteredServices.length === 0 && filteredProjects.length === 0 && (
              <div className="text-center py-8 space-y-3">
                <div className="text-xs text-slate-500">
                  No matching services or case studies found for "{query}".
                </div>
                <button
                  onClick={() => handleSelect('/admin')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-[#0070ba] text-xs font-bold hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Go to Admin Portal Login</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Default Quick Suggestions when search is empty */
          <div className="space-y-2 pt-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
              Quick Suggestions
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleSelect('/admin')}
                className="p-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200/80 text-left flex items-center gap-2.5 transition-colors cursor-pointer group"
              >
                <Lock className="w-4 h-4 text-[#0070ba] shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-[#0070ba]">Admin Login</div>
                  <div className="text-[10px] text-slate-500">Executive CRM Portal</div>
                </div>
              </button>

              <button
                onClick={() => handleSelect('/services')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-left flex items-center gap-2.5 transition-colors cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-[#0070ba]">Services</div>
                  <div className="text-[10px] text-slate-500">AI & Engineering Scope</div>
                </div>
              </button>

              <button
                onClick={() => handleSelect('/projects')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-left flex items-center gap-2.5 transition-colors cursor-pointer group"
              >
                <FolderKanban className="w-4 h-4 text-purple-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-[#0070ba]">Case Studies</div>
                  <div className="text-[10px] text-slate-500">Client Implementations</div>
                </div>
              </button>

              <button
                onClick={() => handleSelect('/contact')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-left flex items-center gap-2.5 transition-colors cursor-pointer group"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-[#0070ba]">Contact Us</div>
                  <div className="text-[10px] text-slate-500">Enquiries & Support</div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default SearchModal;
