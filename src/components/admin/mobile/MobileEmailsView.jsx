import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Inbox, ArrowUpRight, Search, Clock, User, CheckCircle2, X } from 'lucide-react';

export default function MobileEmailsView({ inboundEmails = [], onSelectEmail }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = inboundEmails.filter(e => {
    const q = search.toLowerCase();
    const sender = (e.sender_name || e.sender || e.from || '').toLowerCase();
    const email = (e.sender_email || e.email || '').toLowerCase();
    const subject = (e.subject || '').toLowerCase();
    const body = (e.body || e.preview || e.message || '').toLowerCase();
    return sender.includes(q) || email.includes(q) || subject.includes(q) || body.includes(q);
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900">Email Transactions</h2>
              <p className="text-[11px] text-slate-500">{inboundEmails.length} logged communications</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
            Live Mailbox
          </span>
        </div>

        {/* Search */}
        <div className="relative mt-3">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search emails by subject, sender or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0070ba]"
          />
        </div>
      </div>

      {/* Email List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
            <Inbox className="w-8 h-8 text-slate-300 mx-auto" />
            <div className="text-xs font-bold text-slate-700">No Emails Found</div>
            <div className="text-[10px] text-slate-400">All inbound messages synced.</div>
          </div>
        ) : (
          filtered.map((item, idx) => {
            const sender = item.sender_name || item.sender || item.from || 'Client Partner';
            const email = item.sender_email || item.email || item.from_email || 'client@enterprise.com';
            const subject = item.subject || 'Enterprise Service Consultation';
            const body = item.body || item.preview || item.message || 'Client inquiry logged.';
            const time = item.timestamp || item.time || item.date || 'Today';

            return (
              <div
                key={item.id || idx}
                onClick={() => setSelected(item)}
                className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-sm hover:border-slate-300 transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0">
                      {sender.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black text-slate-900 truncate">
                        {sender}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">{email}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {time}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-800 line-clamp-1">{subject}</div>
                  <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">{body}</div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold">
                    {item.status || 'Delivered'}
                  </span>
                  <span className="text-[#0070ba] font-bold flex items-center gap-0.5">
                    <span>View Thread</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Email Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900">Email Message Detail</h3>
                  <p className="text-[10px] text-slate-400">{selected.timestamp || selected.time || 'Logged Communication'}</p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Subject</div>
                <div className="font-bold text-slate-900">{selected.subject}</div>
                <div className="text-[10px] text-slate-500">From: {selected.sender_name || selected.sender || selected.from} ({selected.sender_email || selected.email || 'client@enterprise.com'})</div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl text-slate-700 leading-relaxed space-y-2 whitespace-pre-wrap">
                {selected.body || selected.preview || selected.message}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelected(null)}
                className="w-full py-2.5 rounded-xl bg-[#0070ba] text-white text-xs font-bold cursor-pointer"
              >
                Close Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
