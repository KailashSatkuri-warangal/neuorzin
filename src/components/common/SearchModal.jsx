import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal';
import { Search, ArrowRight } from 'lucide-react';
import { detailedServices } from '../../data/servicesDetailedData';
import { projectsData } from '../../data/projectsData';

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filteredServices = query.trim() === '' ? [] : detailedServices.filter(s => 
    s.title.toLowerCase().includes(query.toLowerCase()) || 
    s.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = query.trim() === '' ? [] : projectsData.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Search NeuOrzin" maxWidth="max-w-xl">
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search services, case studies, technologies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all"
          />
        </div>

        {query.trim() !== '' && (
          <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar pt-2">
            {filteredServices.length > 0 && (
              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Services</h5>
                {filteredServices.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onClose();
                      navigate(`/services/${s.id}`);
                    }}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 flex items-center justify-between transition-all group"
                  >
                    <div>
                      <h6 className="text-sm font-bold text-slate-900 group-hover:text-[#0070ba]">{s.title}</h6>
                      <p className="text-xs text-slate-500 line-clamp-1">{s.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0070ba] group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {filteredProjects.length > 0 && (
              <div className="pt-2">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Case Studies</h5>
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onClose();
                      navigate('/projects');
                    }}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 flex items-center justify-between transition-all group"
                  >
                    <div>
                      <h6 className="text-sm font-bold text-slate-900 group-hover:text-[#0070ba]">{p.title}</h6>
                      <p className="text-xs text-slate-500 line-clamp-1">{p.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0070ba] group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {filteredServices.length === 0 && filteredProjects.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-400">
                No matching results found for "{query}".
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default SearchModal;
