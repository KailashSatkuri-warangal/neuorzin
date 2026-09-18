import React, { useEffect, useRef } from 'react';
import { Search, X, Inbox, TrendingUp, Receipt, Briefcase, Users, ArrowRight } from 'lucide-react';

export default function MobileGlobalSearch({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  searchResults,
  onNavigate
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const hasResults = searchResults && (
    (searchResults.leads?.length || 0) +
    (searchResults.deals?.length || 0) +
    (searchResults.invoices?.length || 0) +
    (searchResults.projects?.length || 0) +
    (searchResults.customers?.length || 0)
  ) > 0;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-150">
      {/* Search Header */}
      <div className="p-3 border-b border-slate-200 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search leads, deals, invoices, projects, customers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-2xl pl-10 pr-10 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-slate-50 focus:ring-2 focus:ring-[#0070ba]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          Cancel
        </button>
      </div>

      {/* Results Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!searchQuery ? (
          <div className="text-center py-12 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0070ba] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Quick Global Search</h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Search live records across Leads, Deals, GST Invoices, Projects, and Customer contacts.
            </p>
          </div>
        ) : !hasResults ? (
          <div className="text-center py-12 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <X className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-700">No records found</h4>
            <p className="text-xs text-slate-400">No matches for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 1. Leads Matches */}
            {searchResults.leads?.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-[#0070ba] tracking-wider flex items-center gap-1.5">
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Leads ({searchResults.leads.length})</span>
                </div>
                <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white overflow-hidden">
                  {searchResults.leads.map(l => (
                    <div
                      key={l.id}
                      onClick={() => {
                        onNavigate('leads', l);
                        onClose();
                      }}
                      className="p-3 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{l.name}</div>
                        <div className="text-[10px] text-slate-500">{l.company || 'Enterprise'} • {l.email || l.phone}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0070ba] text-[9px] font-bold">
                          {l.status}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Deals Matches */}
            {searchResults.deals?.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-purple-700 tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Deals ({searchResults.deals.length})</span>
                </div>
                <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white overflow-hidden">
                  {searchResults.deals.map(d => (
                    <div
                      key={d.id}
                      onClick={() => {
                        onNavigate('deals', d);
                        onClose();
                      }}
                      className="p-3 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{d.title}</div>
                        <div className="text-[10px] text-slate-500">₹{Number(d.value || 0).toLocaleString('en-IN')} • {d.stage}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Invoices Matches */}
            {searchResults.invoices?.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5" />
                  <span>Invoices ({searchResults.invoices.length})</span>
                </div>
                <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white overflow-hidden">
                  {searchResults.invoices.map(inv => (
                    <div
                      key={inv.id}
                      onClick={() => {
                        onNavigate('invoices', inv);
                        onClose();
                      }}
                      className="p-3 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{inv.invoice_number}</div>
                        <div className="text-[10px] text-slate-500">₹{Number(inv.total_amount || 0).toLocaleString('en-IN')} • {inv.status}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Projects Matches */}
            {searchResults.projects?.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Projects ({searchResults.projects.length})</span>
                </div>
                <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white overflow-hidden">
                  {searchResults.projects.map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onNavigate('projects', p);
                        onClose();
                      }}
                      className="p-3 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{p.name}</div>
                        <div className="text-[10px] text-slate-500">{p.project_code} • {p.status || 'Active'}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
