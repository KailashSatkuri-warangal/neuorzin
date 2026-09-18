import React, { useState } from 'react';
import {
  Inbox,
  Phone,
  Mail,
  MessageSquare,
  PlusCircle,
  Search,
  ChevronRight,
  TrendingUp,
  Pencil
} from 'lucide-react';

export default function MobileLeadList({
  leads = [],
  onSelectLead,
  onAddNewLead,
  onEditLead,
  onConvertToDeal,
  onStatusChange
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredLeads = leads.filter(l => {
    const matchesSearch = !searchTerm || 
      (l.name && l.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.company && l.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.email && l.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.phone && l.phone.includes(searchTerm));
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4 pb-20 md:hidden animate-in fade-in duration-150">
      
      {/* Top Action & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-black text-slate-900">Inbound Leads</h3>
            <p className="text-[10px] text-slate-500">{filteredLeads.length} leads in qualification pipeline</p>
          </div>
          <button
            onClick={onAddNewLead}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#0070ba] text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Lead</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, company, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#0070ba]"
          />
        </div>

        {/* Status Filters Horizontal Scroll */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          {['All', 'New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-[#0070ba] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 active:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Card List */}
      <div className="space-y-3">
        {filteredLeads.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
            <Inbox className="w-8 h-8 mx-auto text-slate-300" />
            <div className="text-xs font-bold text-slate-700">No leads found</div>
            <p className="text-[10px] text-slate-400">Try adjusting your search or status filter</p>
          </div>
        ) : (
          filteredLeads.map(lead => {
            const isHighPriority = lead.score >= 80 || lead.priority === 'High' || lead.priority === 'Urgent';
            return (
              <div
                key={lead.id}
                className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3 relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0" onClick={() => onSelectLead(lead)}>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-black text-slate-900 truncate">{lead.name}</h4>
                      {isHighPriority && (
                        <span className="px-1.5 py-0.2 rounded-md bg-rose-50 text-rose-700 text-[9px] font-black uppercase">
                          Hot
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium truncate">{lead.company || 'Enterprise Partner'}</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <select
                      value={lead.status || 'New'}
                      onChange={(e) => onStatusChange(lead.id, e.target.value)}
                      className="text-[10px] font-bold px-2 py-1 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 focus:outline-none"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Proposal">Proposal</option>
                      <option value="Won">Won</option>
                      <option value="Lost">Lost</option>
                    </select>

                    <button
                      onClick={() => onEditLead(lead)}
                      className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Details Pills */}
                <div className="flex items-center gap-2 flex-wrap text-[11px]">
                  <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-[#0070ba] font-bold">
                    {lead.service_interest || lead.service || 'AI & Cloud'}
                  </span>
                  {lead.deal_value && (
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-mono font-bold">
                      ₹{Number(lead.deal_value).toLocaleString('en-IN')}
                    </span>
                  )}
                  {lead.score && (
                    <span className="px-2 py-0.5 rounded-lg bg-purple-50 text-purple-700 font-bold">
                      Score: {lead.score}/100
                    </span>
                  )}
                </div>

                {/* Quick Action Touch Bar */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    {lead.phone && (
                      <a
                        href={`tel:${lead.phone}`}
                        className="p-2 rounded-xl bg-slate-100 active:bg-blue-50 text-slate-600 active:text-[#0070ba] flex items-center justify-center transition-colors"
                        title="Call Client"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {lead.phone && (
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center transition-colors"
                        title="WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}`}
                        className="p-2 rounded-xl bg-slate-100 active:bg-blue-50 text-slate-600 active:text-[#0070ba] flex items-center justify-center transition-colors"
                        title="Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {lead.status !== 'Converted' && lead.status !== 'Won' && (
                      <button
                        onClick={() => onConvertToDeal(lead)}
                        className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <TrendingUp className="w-3 h-3" />
                        <span>Convert</span>
                      </button>
                    )}
                    <button
                      onClick={() => onSelectLead(lead)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
