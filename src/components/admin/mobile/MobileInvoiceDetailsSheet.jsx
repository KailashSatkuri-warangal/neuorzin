import React from 'react';
import { X, Download, CreditCard, Receipt, Calendar, CheckCircle2, DollarSign } from 'lucide-react';

export default function MobileInvoiceDetailsSheet({
  invoice,
  isOpen,
  onClose,
  onDownloadPdf,
  onRecordPayment
}) {
  if (!isOpen || !invoice) return null;

  const total = Number(invoice.total_amount || 0);
  const isPaid = invoice.status === 'Paid';
  const paidAmount = isPaid ? total : 0;
  const balance = total - paidAmount;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div onClick={onClose} className="flex-1" />

      <div className="bg-white rounded-t-3xl max-h-[92vh] flex flex-col shadow-2xl border-t border-slate-200 animate-in slide-in-from-bottom duration-250">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-700">{invoice.invoice_number}</span>
              <h3 className="text-sm font-black text-slate-900">{invoice.customer_name || 'Enterprise Client'}</h3>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
          
          {/* Status & Due Date */}
          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Status</span>
              <div className={`text-xs font-bold mt-0.5 ${isPaid ? 'text-emerald-700' : 'text-[#0070ba]'}`}>
                {invoice.status || 'Sent'}
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Due Date</span>
              <div className="text-xs font-mono font-bold text-slate-800 mt-0.5">
                {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('en-IN') : 'Net 30 Days'}
              </div>
            </div>
          </div>

          {/* Payment Progress */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-bold">Payment Status</span>
              <span className="font-mono font-black text-slate-900">
                ₹{paidAmount.toLocaleString('en-IN')} / ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${isPaid ? 'bg-emerald-500' : 'bg-[#0070ba]'}`}
                style={{ width: `${isPaid ? 100 : 0}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Paid: ₹{paidAmount.toLocaleString('en-IN')}</span>
              <span>Balance: ₹{balance.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* GST Commercial Breakdown */}
          <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl text-xs font-medium">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span className="font-mono text-slate-900">₹{(total / 1.18).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>GST @ 18%:</span>
              <span className="font-mono text-slate-900">₹{(total * 0.18 / 1.18).toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
              <span>Total Invoice:</span>
              <span className="font-mono text-emerald-700">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

        </div>

        {/* Actions */}
        <div className="p-4 border-t border-slate-100 flex gap-2">
          {!isPaid && (
            <button
              onClick={() => {
                onRecordPayment(invoice);
                onClose();
              }}
              className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20 active:scale-95 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Record Payment</span>
            </button>
          )}

          <button
            onClick={() => onDownloadPdf(invoice)}
            className="flex-1 py-3 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
}
