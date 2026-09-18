import React, { useState } from 'react';
import { ShieldCheck, Clock, User, Search, Filter, Layers, Database } from 'lucide-react';

export default function MobileAuditView({ auditLogs = [] }) {
  const [search, setSearch] = useState('');

  const filtered = auditLogs.filter(l => {
    const q = search.toLowerCase();
    return (
      (l.action && l.action.toLowerCase().includes(q)) ||
      (l.entity_type && l.entity_type.toLowerCase().includes(q)) ||
      (l.user_name && l.user_name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900">Audit Trail & Logs</h2>
              <p className="text-[11px] text-slate-500">Tamper-evident system activity ledger</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0070ba] text-[10px] font-bold">
            Immutable
          </span>
        </div>

        {/* Search */}
        <div className="relative mt-3">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search audit actions, entities, users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0070ba]"
          />
        </div>
      </div>

      {/* Logs Stream */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
            <Database className="w-8 h-8 text-slate-300 mx-auto" />
            <div className="text-xs font-bold text-slate-700">No Logs Matching Search</div>
          </div>
        ) : (
          filtered.map((log, idx) => (
            <div
              key={log.id || idx}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#0070ba] text-[10px] font-mono font-bold">
                    {log.action || 'SYSTEM_OP'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600">
                    {log.entity_type || 'Entity'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {log.timestamp ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                  <User className="w-3 h-3" />
                </div>
                <span>{log.user_name || 'Super Admin'} &bull; ID: <span className="font-mono text-slate-500">{log.entity_id || 'N/A'}</span></span>
              </div>

              {log.changes && (
                <pre className="p-2 rounded-xl bg-slate-50 text-[10px] font-mono text-slate-600 overflow-x-auto whitespace-pre-wrap border border-slate-100">
                  {typeof log.changes === 'string' ? log.changes : JSON.stringify(log.changes, null, 2)}
                </pre>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
