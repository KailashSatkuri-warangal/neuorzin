import React, { useState } from 'react';
import {
  X,
  Phone,
  Mail,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Trash2,
  Pencil
} from 'lucide-react';

export default function MobileLeadDetailsSheet({
  lead,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onConvertToDeal,
  onStatusChange
}) {
  const [activeSubTab, setActiveSubTab] = useState('overview');

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div onClick={onClose} className="flex-1" />

      <div className="bg-white rounded-t-3xl max-h-[90vh] flex flex-col shadow-2xl border-t border-slate-200 animate-in slide-in-from-bottom duration-250">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900">{lead.name}</h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0070ba] text-[10px] font-bold">
                {lead.status || 'New'}
              </span>
            </div>
            <p className="text-xs text-slate-500">{lead.company || 'Enterprise Client'}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Action Bar */}
        <div className="grid grid-cols-4 gap-2 p-3 bg-slate-50 border-b border-slate-100 text-center">
          {lead.phone ? (
            <a
              href={`tel:${lead.phone}`}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 flex flex-col items-center justify-center text-[10px] font-bold shadow-xs active:bg-blue-50"
            >
              <Phone className="w-4 h-4 text-[#0070ba] mb-1" />
              <span>Call</span>
            </a>
          ) : (
            <div className="p-2 rounded-xl bg-slate-100 text-slate-400 flex flex-col items-center justify-center text-[10px]">
              <Phone className="w-4 h-4 mb-1" />
              <span>No Phone</span>
            </div>
          )}

          {lead.phone ? (
            <a
              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 flex flex-col items-center justify-center text-[10px] font-bold shadow-xs active:bg-emerald-50"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 mb-1" />
              <span>WhatsApp</span>
            </a>
          ) : null}

          {lead.email ? (
            <a
              href={`mailto:${lead.email}`}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 flex flex-col items-center justify-center text-[10px] font-bold shadow-xs active:bg-blue-50"
            >
              <Mail className="w-4 h-4 text-blue-600 mb-1" />
              <span>Email</span>
            </a>
          ) : null}

          <button
            onClick={() => onConvertToDeal(lead)}
            className="p-2 rounded-xl bg-purple-600 text-white flex flex-col items-center justify-center text-[10px] font-bold shadow-xs active:bg-purple-700"
          >
            <TrendingUp className="w-4 h-4 mb-1" />
            <span>Convert</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-4 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`py-2.5 px-3 border-b-2 transition-colors ${
              activeSubTab === 'overview' ? 'border-[#0070ba] text-[#0070ba]' : 'border-transparent text-slate-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSubTab('timeline')}
            className={`py-2.5 px-3 border-b-2 transition-colors ${
              activeSubTab === 'timeline' ? 'border-[#0070ba] text-[#0070ba]' : 'border-transparent text-slate-400'
            }`}
          >
            SLA & History
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
          {activeSubTab === 'overview' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Estimated Value</span>
                  <div className="text-sm font-black text-slate-900 font-mono mt-0.5">
                    ₹{Number(lead.deal_value || 0).toLocaleString('en-IN')}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Lead Score</span>
                  <div className="text-sm font-black text-purple-700 font-mono mt-0.5">
                    {lead.score || 85}/100
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between p-2 rounded-xl bg-slate-50">
                  <span className="text-slate-500">Service Interest:</span>
                  <strong className="text-slate-900">{lead.service_interest || lead.service || 'Full-Stack & Cloud'}</strong>
                </div>
                <div className="flex justify-between p-2 rounded-xl bg-slate-50">
                  <span className="text-slate-500">Email:</span>
                  <strong className="text-slate-900 font-mono">{lead.email || 'N/A'}</strong>
                </div>
                <div className="flex justify-between p-2 rounded-xl bg-slate-50">
                  <span className="text-slate-500">Phone:</span>
                  <strong className="text-slate-900 font-mono">{lead.phone || 'N/A'}</strong>
                </div>
                <div className="flex justify-between p-2 rounded-xl bg-slate-50">
                  <span className="text-slate-500">Created:</span>
                  <strong className="text-slate-900 font-mono">
                    {lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-IN') : 'Recent'}
                  </strong>
                </div>
              </div>

              {lead.message && (
                <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Requirement Scope</span>
                  <p className="text-xs text-slate-700 leading-relaxed">{lead.message}</p>
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'timeline' && (
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">2-Hour SLA Discovery Call Triggered</div>
                  <div className="text-[10px] text-slate-500">Auto-assigned to Senior Solutions Engineer</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0070ba] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">WhatsApp Welcome Dispatched</div>
                  <div className="text-[10px] text-slate-500">Sent automated onboarding message</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 flex gap-2">
          <button
            onClick={() => {
              onEdit(lead);
              onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit Lead</span>
          </button>

          <button
            onClick={() => {
              onDelete(lead.id);
              onClose();
            }}
            className="py-3 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
