import React, { useState } from 'react';
import {
  Receipt,
  FileText,
  CreditCard,
  PlusCircle,
  Download,
  Pencil,
  Trash2
} from 'lucide-react';

export default function MobileFinanceView({
  subTab = 'quotations',
  onSubTabChange,
  quotations = [],
  invoices = [],
  payments = [],
  onAddNewQuote,
  onAddNewInvoice,
  onRecordPayment,
  onDownloadQuotePdf,
  onDownloadInvoicePdf,
  onEditQuote,
  onEditInvoice,
  onDeleteQuote,
  onDeleteInvoice
}) {
  const totalInvoiced = invoices.reduce((acc, i) => acc + (parseFloat(i.total_amount) || 0), 0);
  const totalPaid = invoices.filter(i => i.status === 'Paid').reduce((acc, i) => acc + (parseFloat(i.total_amount) || 0), 0);
  const totalOutstanding = totalInvoiced - totalPaid;

  return (
    <div className="space-y-4 pb-20 md:hidden animate-in fade-in duration-150">
      
      {/* Financial Summary Card */}
      <div className="bg-gradient-to-br from-[#0a2540] via-[#0070ba] to-cyan-900 rounded-3xl p-5 text-white shadow-md space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-200">Financial Ledger</span>
            <h3 className="text-xl font-black font-display mt-0.5">₹{(totalPaid / 100000).toFixed(2)}L Collected</h3>
            <p className="text-[11px] text-cyan-100">Outstanding: ₹{(totalOutstanding / 100000).toFixed(2)} Lakhs</p>
          </div>
          <button
            onClick={() => {
              if (subTab === 'quotations') onAddNewQuote();
              else if (subTab === 'invoices') onAddNewInvoice();
              else onRecordPayment();
            }}
            className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white text-[#0070ba] text-xs font-bold shadow-md cursor-pointer active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>
              {subTab === 'quotations' ? 'New Quote' : subTab === 'invoices' ? 'New Invoice' : 'Record Pay'}
            </span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between text-[10px] text-cyan-200 font-semibold">
            <span>Payment Collection</span>
            <span>{totalInvoiced > 0 ? Math.round((totalPaid / totalInvoiced) * 100) : 100}%</span>
          </div>
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${totalInvoiced > 0 ? Math.min(100, Math.round((totalPaid / totalInvoiced) * 100)) : 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Segmented Sub-tabs */}
      <div className="bg-slate-100 p-1 rounded-2xl flex text-xs font-bold">
        <button
          onClick={() => onSubTabChange('quotations')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            subTab === 'quotations' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
          }`}
        >
          Quotations ({quotations.length})
        </button>
        <button
          onClick={() => onSubTabChange('invoices')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            subTab === 'invoices' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
          }`}
        >
          Invoices ({invoices.length})
        </button>
        <button
          onClick={() => onSubTabChange('payments')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            subTab === 'payments' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
          }`}
        >
          Ledger ({payments.length})
        </button>
      </div>

      {/* 1. Quotations List */}
      {subTab === 'quotations' && (
        <div className="space-y-3">
          {quotations.map(q => (
            <div key={q.id} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#0070ba]">{q.quote_number}</span>
                  <h4 className="text-sm font-black text-slate-900 mt-0.5">{q.customer_name || 'Enterprise Client'}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{q.service_title || 'Enterprise AI Architecture'}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  q.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700' : q.status === 'Sent' ? 'bg-blue-50 text-[#0070ba]' : 'bg-slate-100 text-slate-700'
                }`}>
                  {q.status || 'Draft'}
                </span>
              </div>

              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Total (Incl. 18% GST)</span>
                  <div className="text-base font-black text-slate-900 font-mono">
                    ₹{Number(q.total_amount || 0).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onDownloadQuotePdf(q)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 active:bg-slate-200 text-slate-800 text-xs font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                  <button
                    onClick={() => onEditQuote(q)}
                    className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteQuote(q.id)}
                    className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Invoices List */}
      {subTab === 'invoices' && (
        <div className="space-y-3">
          {invoices.map(inv => (
            <div key={inv.id} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700">{inv.invoice_number}</span>
                  <h4 className="text-sm font-black text-slate-900 mt-0.5">{inv.customer_name || 'Enterprise Client'}</h4>
                  <p className="text-xs text-slate-500">Due: {inv.due_date ? new Date(inv.due_date).toLocaleDateString('en-IN') : 'Net 30'}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : inv.status === 'Overdue' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-[#0070ba]'
                }`}>
                  {inv.status || 'Sent'}
                </span>
              </div>

              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Amount Due</span>
                  <div className="text-base font-black text-slate-900 font-mono">
                    ₹{Number(inv.total_amount || 0).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onDownloadInvoicePdf(inv)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 active:bg-slate-200 text-slate-800 text-xs font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                  <button
                    onClick={() => onEditInvoice(inv)}
                    className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteInvoice(inv.id)}
                    className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Payments Ledger List */}
      {subTab === 'payments' && (
        <div className="space-y-3">
          {(payments.length > 0 ? payments : [
            { id: 1, receipt_number: 'REC-2026-0009', customer_name: 'Dr. Anand Mahindra', amount: 1356000, payment_method: 'HDFC Bank Wire', date: new Date() }
          ]).map(p => (
            <div key={p.id} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-700">{p.receipt_number || `REC-${p.id}`}</span>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">{p.customer_name || 'Customer Wire'}</h4>
                <div className="text-[10px] text-slate-400">{p.payment_method || 'NEFT/RTGS'} • {p.date ? new Date(p.date).toLocaleDateString('en-IN') : 'Recent'}</div>
              </div>
              <div className="text-right font-mono font-black text-emerald-700 text-sm">
                +₹{Number(p.amount || 0).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
