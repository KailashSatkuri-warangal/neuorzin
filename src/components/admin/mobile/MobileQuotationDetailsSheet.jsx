import React from 'react';
import { X, Download, MessageSquare, Mail, FileText, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';

export default function MobileQuotationDetailsSheet({
  quotation,
  isOpen,
  onClose,
  onDownloadPdf,
  onStatusChange
}) {
  if (!isOpen || !quotation) return null;

  const items = Array.isArray(quotation.items) ? quotation.items : (typeof quotation.items === 'string' ? JSON.parse(quotation.items || '[]') : []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div onClick={onClose} className="flex-1" />

      <div className="bg-white rounded-t-3xl max-h-[92vh] flex flex-col shadow-2xl border-t border-slate-200 animate-in slide-in-from-bottom duration-250">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0070ba] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#0070ba]">{quotation.quote_number}</span>
              <h3 className="text-sm font-black text-slate-900">{quotation.customer_name || 'Enterprise Client'}</h3>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Digital Document Preview Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
          
          {/* Document Banner */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Commercial Proposal</span>
                <div className="font-bold text-slate-800 text-sm mt-0.5">{quotation.service_title || 'Enterprise AI Solution'}</div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                quotation.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-[#0070ba]'
              }`}>
                {quotation.status || 'Draft'}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">{quotation.scope_of_work || 'Architecture, microservices deployment and telemetry integration.'}</p>
          </div>

          {/* Line Items Table */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Scope Deliverables</div>
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white overflow-hidden">
              {(items.length > 0 ? items : [
                { description: 'Enterprise Telemetry Architecture', qty: 1, unit_price: quotation.subtotal || 250000, total: quotation.subtotal || 250000 }
              ]).map((it, idx) => (
                <div key={idx} className="p-3 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-slate-900">{it.description}</div>
                    <div className="text-[10px] text-slate-400">Qty: {it.qty || 1} • ₹{Number(it.unit_price || 0).toLocaleString('en-IN')}</div>
                  </div>
                  <div className="font-mono font-bold text-slate-900">₹{Number(it.total || it.amount || 0).toLocaleString('en-IN')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals & 18% GST */}
          <div className="bg-slate-50 p-3.5 rounded-2xl space-y-1.5 text-xs font-medium">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span className="font-mono text-slate-900">₹{Number(quotation.subtotal || (quotation.total_amount ? quotation.total_amount / 1.18 : 0)).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>GST (18.0%):</span>
              <span className="font-mono text-slate-900">₹{Number(quotation.gst_amount || (quotation.total_amount ? quotation.total_amount * 0.18 / 1.18 : 0)).toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
              <span>Total Quotation:</span>
              <span className="font-mono text-[#0070ba]">₹{Number(quotation.total_amount || 0).toLocaleString('en-IN')}</span>
            </div>
          </div>

        </div>

        {/* Actions Toolbar */}
        <div className="p-4 border-t border-slate-100 flex gap-2">
          <button
            onClick={() => onDownloadPdf(quotation)}
            className="flex-1 py-3 rounded-xl bg-[#0070ba] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Official PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
}
