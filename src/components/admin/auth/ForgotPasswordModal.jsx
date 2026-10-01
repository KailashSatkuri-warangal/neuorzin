import React, { useState } from 'react';
import { 
  KeyRound, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  X, 
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { crmApi } from '../../../data/crmApi';

export default function ForgotPasswordModal({ isOpen, onClose, onShowToast, onSuccessLogin }) {
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter token & new pwd, 3: Success
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  if (!isOpen) return null;

  const handleRequestToken = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your administrator email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await crmApi.forgotPassword(email.trim());
      setInfoMsg(res.message || 'If that email is registered, a password recovery code has been generated.');
      if (res.token) {
        // Dev / local demo token helper
        setToken(res.token);
      }
      setStep(2);
      if (onShowToast) onShowToast('Reset instructions issued.', 'info');
    } catch (err) {
      setErrorMsg(err.message || 'Unable to process password reset request.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!token.trim()) {
      setErrorMsg('Please provide the security reset token.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await crmApi.resetPassword(token.trim(), newPassword);
      setStep(3);
      if (onShowToast) onShowToast('Password reset successfully!', 'success');
    } catch (err) {
      setErrorMsg(err.message || 'Invalid or expired reset token. Please request a new one.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail('');
    setToken('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMsg('');
    setInfoMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-md p-6 sm:p-8 shadow-2xl space-y-5 relative">
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0070ba] flex items-center justify-center mx-auto mb-3 shadow-xs">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900 font-display tracking-tight">
            {step === 1 ? 'Password Recovery' : step === 2 ? 'Set New Password' : 'Password Reset Complete'}
          </h2>
          <p className="text-xs text-slate-500">
            {step === 1 
              ? 'Enter your registered email to receive a secure reset authorization token.' 
              : step === 2 
              ? 'Provide the verification token and choose a strong new password.'
              : 'Your master administrative credentials have been successfully updated.'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {infoMsg && step === 2 && (
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700 space-y-1">
            <div className="font-bold text-[#0070ba] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Token Dispatched</span>
            </div>
            <p className="text-[11px] text-slate-600">{infoMsg}</p>
          </div>
        )}

        {/* STEP 1: Request Token */}
        {step === 1 && (
          <form onSubmit={handleRequestToken} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Executive Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@neuorzin.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0070ba] focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              <span>Send Recovery Token</span>
            </button>
          </form>
        )}

        {/* STEP 2: Enter Token & New Password */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Security Reset Token *
              </label>
              <input
                type="text"
                required
                placeholder="Enter 32-character token or paste from email"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-[#0070ba] focus:bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                New Master Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-11 py-3 text-xs text-slate-900 focus:outline-none focus:border-[#0070ba] focus:bg-white font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Confirm New Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-11 py-3 text-xs text-slate-900 focus:outline-none focus:border-[#0070ba] focus:bg-white font-mono"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3.5 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                <span>Set New Password</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Success Screen */}
        {step === 3 && (
          <div className="text-center space-y-4 py-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Credentials Synchronized</h3>
              <p className="text-xs text-slate-500">
                You can now log in using your newly configured password.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              Return to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
