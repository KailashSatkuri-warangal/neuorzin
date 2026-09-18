import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShieldCheck, Mail, LogOut, Key, User, Home, Globe } from 'lucide-react';

export default function MobileProfileModal({
  isOpen,
  onClose,
  onLogout
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div onClick={onClose} className="flex-1" />

      <div className="bg-white rounded-t-3xl p-5 shadow-2xl border-t border-slate-200 space-y-4 animate-in slide-in-from-bottom duration-250">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0070ba] to-indigo-600 text-white font-black text-sm flex items-center justify-center">
              SA
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Super Admin Profile</h3>
              <p className="text-[10px] text-slate-500 font-mono">admin@neuorzin.com</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between p-2.5 rounded-2xl bg-slate-50">
            <span className="text-slate-500">Security Role:</span>
            <strong className="text-[#0070ba] font-bold">SUPER_ADMIN (Full RBAC)</strong>
          </div>
          <div className="flex justify-between p-2.5 rounded-2xl bg-slate-50">
            <span className="text-slate-500">Token Status:</span>
            <strong className="text-emerald-700 font-bold">JWT Signed Session</strong>
          </div>
          <div className="flex justify-between p-2.5 rounded-2xl bg-slate-50">
            <span className="text-slate-500">Environment:</span>
            <strong className="text-slate-900 font-mono">Production Engine v2.0</strong>
          </div>
        </div>

        <div className="pt-2 space-y-2">
          {/* Return to Main Website Home Button */}
          <Link
            to="/"
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-[#0070ba] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Main Website Home</span>
          </Link>

          {/* Sign Out Button */}
          <button
            onClick={() => {
              onClose();
              if (onLogout) onLogout();
            }}
            className="w-full py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
