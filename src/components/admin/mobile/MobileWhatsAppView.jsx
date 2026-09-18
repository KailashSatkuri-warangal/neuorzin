import React, { useState } from 'react';
import { MessageSquare, Send, Search, CheckCheck, Clock, User, Phone } from 'lucide-react';

export default function MobileWhatsAppView({ messages = [], onSendMessage }) {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  const filtered = messages.filter(m => {
    const q = search.toLowerCase();
    return (
      (m.message && m.message.toLowerCase().includes(q)) ||
      (m.to_phone && m.to_phone.toLowerCase().includes(q)) ||
      (m.from_phone && m.from_phone.toLowerCase().includes(q))
    );
  });

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (onSendMessage) onSendMessage(input);
    setInput('');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900">WhatsApp Inbox</h2>
              <p className="text-[11px] text-slate-500">Official API Gateway &bull; +91 77940 45500</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
            Connected
          </span>
        </div>

        {/* Search */}
        <div className="relative mt-3">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search WhatsApp messages or phone numbers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Messages Stream */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
            <div className="text-xs font-bold text-slate-700">No Messages Logged</div>
            <div className="text-[10px] text-slate-400">Automated lead greetings and responses will appear here.</div>
          </div>
        ) : (
          filtered.map((msg, idx) => {
            const isOutbound = msg.direction === 'Outbound';
            return (
              <div
                key={msg.id || idx}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isOutbound
                    ? 'bg-emerald-50/60 border-emerald-200/80 ml-4'
                    : 'bg-white border-slate-200 mr-4'
                }`}
              >
                <div className="flex items-center justify-between pb-1 text-[10px] text-slate-500">
                  <span className="font-bold text-slate-800">
                    {isOutbound ? 'Outbound System Ack' : (msg.from_phone || 'Client')}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today'}</span>
                  </span>
                </div>

                <p className="text-xs text-slate-800 mt-1 leading-relaxed">
                  {msg.message}
                </p>

                <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-200/50 text-[10px] text-slate-400">
                  <span className="font-mono">To: {msg.to_phone || '+91 77940 45500'}</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>{msg.status || 'Delivered'}</span>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
