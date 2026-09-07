import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-surface/95 text-white border border-primary/40 shadow-2xl backdrop-blur-xl animate-scale-up">
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-accent-emerald shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-accent-amber shrink-0" />
      )}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
