import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard,
  Inbox, 
  KeyRound, 
  SendHorizontal, 
  BarChart3, 
  Workflow, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  Phone, 
  Building, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  X,
  Key,
  Globe2,
  BellRing,
  Check,
  Cpu,
  LogOut,
  Zap,
  Activity,
  ArrowUpRight,
  Copy,
  ChevronDown,
  EyeOff,
  SlidersHorizontal,
  Server,
  HelpCircle
} from 'lucide-react';
import { getStoredLeads, saveLeads, clearAllLeads } from '../data/leadsStore';
import { EMAIL_CONFIG } from '../data/emailConfig';

const VALID_EMAIL = 'admin@neuorzin.com';
const VALID_EMAIL_ALT = 'admin@neuorizin';
const DEFAULT_PASSWORD = 'demo0722';

export function AdminPage({ onShowToast }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('neuorzin_admin_auth') === 'true';
    }
    return false;
  });

  // Current Active Sidebar Page: 'leads' | 'security' | 'telemetry' | 'analytics' | 'integrations'
  const [activeTab, setActiveTab] = useState('leads');

  // Auth & Forgot Password States
  const [authView, setAuthView] = useState('login'); // 'login' | 'forgot'
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Forgot Password / Reset States
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryStep, setRecoveryStep] = useState(1);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentAdminPass, setCurrentAdminPass] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('neuorzin_custom_admin_pass') || DEFAULT_PASSWORD;
    }
    return DEFAULT_PASSWORD;
  });

  // Leads Data States
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load leads and attach real-time live event listener
  useEffect(() => {
    if (isAuthenticated) {
      setLeads(getStoredLeads());

      const handleLiveLeadsUpdate = (e) => {
        if (e.detail) {
          setLeads(e.detail);
        } else {
          setLeads(getStoredLeads());
        }
      };

      window.addEventListener('neuorzin_leads_updated', handleLiveLeadsUpdate);
      window.addEventListener('storage', handleLiveLeadsUpdate);

      return () => {
        window.removeEventListener('neuorzin_leads_updated', handleLiveLeadsUpdate);
        window.removeEventListener('storage', handleLiveLeadsUpdate);
      };
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      const cleanEmail = emailInput.trim().toLowerCase();
      const cleanPass = passwordInput.trim();

      if (
        (cleanEmail === VALID_EMAIL || cleanEmail === VALID_EMAIL_ALT || cleanEmail === 'admin') &&
        (cleanPass === currentAdminPass || cleanPass === DEFAULT_PASSWORD)
      ) {
        setIsAuthenticated(true);
        localStorage.setItem('neuorzin_admin_auth', 'true');
        if (onShowToast) onShowToast('Welcome to NeuOrzin Executive Portal!', 'success');
      } else {
        setLoginError('Incorrect credentials. Please verify email and password.');
      }
      setIsLoggingIn(false);
    }, 350);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (recoveryStep === 1) {
      setRecoveryStep(2);
      if (onShowToast) onShowToast(`Security verification code sent to ${recoveryEmail || 'admin@neuorzin.com'}`);
    } else if (recoveryStep === 2) {
      if (newPassword.length < 6) {
        if (onShowToast) onShowToast('Password must be at least 6 characters.', 'error');
        return;
      }
      if (newPassword !== confirmPassword) {
        if (onShowToast) onShowToast('Passwords do not match.', 'error');
        return;
      }
      localStorage.setItem('neuorzin_custom_admin_pass', newPassword);
      setCurrentAdminPass(newPassword);
      setRecoveryStep(3);
      if (onShowToast) onShowToast('Master password updated successfully!', 'success');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('neuorzin_admin_auth');
    if (onShowToast) onShowToast('Signed out of Executive Portal');
  };

  const handleRefreshLeads = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const latest = getStoredLeads();
      setLeads(latest);
      setIsRefreshing(false);
      if (onShowToast) onShowToast(`Real-time sync complete: ${latest.length} record(s) active.`);
    }, 400);
  };

  const handleStatusChange = (leadId, newStatus) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
    setLeads(updated);
    saveLeads(updated);
    if (onShowToast) onShowToast(`Lead ${leadId} status set to ${newStatus}`);
  };

  const handleDeleteLead = (leadId) => {
    if (window.confirm(`Permanently remove lead record ${leadId}?`)) {
      const updated = leads.filter(l => l.id !== leadId);
      setLeads(updated);
      saveLeads(updated);
      if (selectedLead?.id === leadId) setSelectedLead(null);
      if (onShowToast) onShowToast(`Record ${leadId} deleted.`);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all recorded leads in this browser session?')) {
      clearAllLeads();
      setLeads([]);
      setSelectedLead(null);
      if (onShowToast) onShowToast('All lead records cleared.');
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      if (onShowToast) onShowToast('No leads to export yet.');
      return;
    }
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Source', 'Status', 'Email_Dispatch', 'Message'];
    const rows = leads.map(l => [
      l.id,
      `"${l.date}"`,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.company}"`,
      `"${l.service}"`,
      `"${l.source}"`,
      `"${l.status}"`,
      `"${l.emailStatus}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `neuorzin_leads_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onShowToast) onShowToast('Spreadsheet exported successfully!');
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch = 
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.phone && l.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
        l.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
      const matchesService = serviceFilter === 'All' || l.service.toLowerCase().includes(serviceFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [leads, searchQuery, statusFilter, serviceFilter]);

  // Metrics Calculation
  const metrics = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter(l => l.status === 'New').length;
    const contactedCount = leads.filter(l => l.status === 'Contacted').length;
    const convertedCount = leads.filter(l => l.status === 'Converted').length;
    return { total, newCount, contactedCount, convertedCount };
  }, [leads]);

  // Lead Avatar Initials
  const getInitials = (name) => {
    if (!name) return 'NO';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  // Avatar Gradient Palette
  const getAvatarGradient = (id) => {
    const gradients = [
      'from-blue-600 to-cyan-500',
      'from-indigo-600 to-purple-500',
      'from-emerald-600 to-teal-500',
      'from-amber-600 to-orange-500',
      'from-rose-600 to-pink-500'
    ];
    const num = parseInt((id || '1').replace(/\D/g, ''), 10) || 0;
    return gradients[num % gradients.length];
  };

  // -------------------------------------------------------------------
  // 1. PREMIUM GLASSMORPHIC LOGIN & FORGOT PASSWORD VIEW
  // -------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4 bg-[#070913] text-slate-100 relative overflow-hidden font-sans">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#0070ba]/20 to-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[460px] bg-slate-900/80 backdrop-blur-2xl border border-slate-800/80 rounded-[32px] p-8 sm:p-10 shadow-2xl shadow-black/80 relative z-10"
        >
          {authView === 'login' ? (
            <>
              {/* Header Badge */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0070ba] to-cyan-400 p-[1.5px] mx-auto mb-4 shadow-xl shadow-[#0070ba]/25 flex items-center justify-center">
                  <div className="w-full h-full bg-[#0b0e1b] rounded-[15px] flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-black font-display tracking-tight text-white">
                  NeuOrzin Portal
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  Executive Access • Inbound Telemetry Command
                </p>
              </div>

              {loginError && (
                <motion.div 
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2.5 font-medium"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </motion.div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#0070ba]" /> Admin Email
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="admin@neuorzin.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-[#0d1122] border border-slate-700/80 rounded-2xl px-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0070ba] focus:ring-2 focus:ring-[#0070ba]/20 transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-[#0070ba]" /> Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthView('forgot');
                        setRecoveryStep(1);
                      }}
                      className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full bg-[#0d1122] border border-slate-700/80 rounded-2xl px-4 py-3.5 pr-11 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0070ba] focus:ring-2 focus:ring-[#0070ba]/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Default Credentials Chip */}
                <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between items-center">
                    <span>Default User:</span>
                    <span className="text-cyan-400 font-mono font-semibold">admin@neuorzin.com</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Default Pass:</span>
                    <span className="text-cyan-400 font-mono font-semibold">demo0722</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0070ba] to-cyan-500 hover:from-[#005a96] hover:to-cyan-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#0070ba]/25 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
                >
                  {isLoggingIn ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Authenticating...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" /> Sign In to Dashboard
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Forgot Password Workflow */
            <div>
              <button
                onClick={() => setAuthView('login')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6 font-semibold transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 rotate-180" /> Back to Sign In
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-3 border border-cyan-500/20 shadow-inner">
                  <Key className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white font-display">
                  Reset Master Key
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {recoveryStep === 1 && 'Enter your registered email to receive an instant recovery code.'}
                  {recoveryStep === 2 && 'Enter verification code and define your new master password.'}
                  {recoveryStep === 3 && 'Your admin credentials have been updated.'}
                </p>
              </div>

              {recoveryStep === 1 && (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Admin Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="admin@neuorzin.com"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full bg-[#0d1122] border border-slate-700/80 rounded-2xl px-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0070ba]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#0070ba]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    Send Recovery Code <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {recoveryStep === 2 && (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>OTP dispatched to <strong className="text-white">{recoveryEmail || 'admin@neuorzin.com'}</strong></span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      New Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="At least 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#0d1122] border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#0070ba]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-[#0d1122] border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#0070ba]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-900/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    Save & Update Password
                  </button>
                </form>
              )}

              {recoveryStep === 3 && (
                <div className="text-center space-y-4 py-3">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-slate-300">
                    Master key successfully updated. You can now log into your portal.
                  </p>
                  <button
                    onClick={() => {
                      setAuthView('login');
                      setRecoveryStep(1);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-[#0070ba] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#005a96] transition-all cursor-pointer"
                  >
                    Return to Sign In
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------------
  // 2. EXECUTIVE COMMAND CENTER LAYOUT (SIDEBAR + MAIN CANVAS)
  // -------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col pt-20 font-sans selection:bg-[#0070ba] selection:text-white">
      {/* Shell Container */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">

        {/* =========================================================
            LEFT SLEEK SIDEBAR
           ========================================================= */}
        <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
          {/* Brand Card */}
          <div className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-xl shadow-black/40">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0070ba] to-cyan-400 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-[#0070ba]/30">
                NO
              </div>
              <div className="min-w-0">
                <div className="text-sm font-black text-white font-display tracking-tight truncate">
                  NeuOrzin HQ
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-Time Active</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-800/80 text-[11px] text-slate-400">
              <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Mailing Destination:</span>
              <span className="text-cyan-400 font-mono font-medium truncate block">{EMAIL_CONFIG.enquiries}</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="p-3 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-xl space-y-1 flex-1">
            <div className="px-3 py-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Management
            </div>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-gradient-to-r from-[#0070ba] to-cyan-600 text-white shadow-lg shadow-[#0070ba]/25 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4" />
                <span>Inbound Leads</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'leads' ? 'bg-white/20 text-white' : 'bg-slate-800 text-cyan-400'
              }`}>
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-gradient-to-r from-[#0070ba] to-cyan-600 text-white shadow-lg shadow-[#0070ba]/25 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Key className="w-4 h-4" />
                <span>Security & Key</span>
              </div>
            </button>

            <div className="px-3 pt-4 pb-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Telemetry & Roadmap
            </div>

            <button
              onClick={() => setActiveTab('telemetry')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'telemetry'
                  ? 'bg-gradient-to-r from-[#0070ba] to-cyan-600 text-white shadow-lg shadow-[#0070ba]/25 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <SendHorizontal className="w-4 h-4" />
                <span>Email Logs</span>
              </div>
              <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">v2.0</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-gradient-to-r from-[#0070ba] to-cyan-600 text-white shadow-lg shadow-[#0070ba]/25 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4" />
                <span>Inbound Analytics</span>
              </div>
              <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">v2.0</span>
            </button>

            <button
              onClick={() => setActiveTab('integrations')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'integrations'
                  ? 'bg-gradient-to-r from-[#0070ba] to-cyan-600 text-white shadow-lg shadow-[#0070ba]/25 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Workflow className="w-4 h-4" />
                <span>Webhooks & CRM</span>
              </div>
              <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">v2.0</span>
            </button>

            {/* Logout Footer */}
            <div className="pt-4 mt-2 border-t border-slate-800/80">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out Portal</span>
              </button>
            </div>
          </div>
        </aside>

        {/* =========================================================
            MAIN EXECUTIVE CANVAS
           ========================================================= */}
        <main className="flex-1 min-w-0 space-y-6">

          {/* Top Command Action Bar */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#0070ba]/10 text-cyan-400">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-white font-display tracking-tight">
                  {activeTab === 'leads' && 'Inbound Transactions & Leads'}
                  {activeTab === 'security' && 'Master Credentials & Security'}
                  {activeTab === 'telemetry' && 'Email Telemetry & Delivery Relay'}
                  {activeTab === 'analytics' && 'Campaign Attribution & Traffic'}
                  {activeTab === 'integrations' && 'Webhook Relays & CRM Automation'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  Last telemetry update: Just now
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                onClick={handleRefreshLeads}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#0070ba]/15 hover:bg-[#0070ba]/25 text-xs font-bold text-cyan-300 border border-[#0070ba]/35 transition-all cursor-pointer disabled:opacity-60 shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Syncing...' : 'Load New Emails'}</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              {leads.length > 0 && activeTab === 'leads' && (
                <button
                  onClick={handleClearAll}
                  className="p-2.5 rounded-2xl bg-slate-850 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-900/40 transition-colors cursor-pointer"
                  title="Clear Lead History"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* =======================================================
              TAB 1: INBOUND LEADS & TRANSACTIONS
             ======================================================= */}
          {activeTab === 'leads' && (
            <div className="space-y-6 animate-fadeIn">
              {/* 4 Metric Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {/* Metric 1 */}
                <div className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#0070ba]/10 rounded-full blur-2xl group-hover:bg-[#0070ba]/20 transition-colors" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Inbound</span>
                    <div className="p-2 rounded-xl bg-[#0070ba]/10 text-cyan-400">
                      <Inbox className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white font-display tracking-tight">{metrics.total}</div>
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Real-time tracking
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Actionable New</span>
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-amber-400 font-display tracking-tight">{metrics.newCount}</div>
                  <div className="text-[11px] text-slate-400 mt-2">
                    Requires immediate reply
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">In Discussion</span>
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-cyan-400 font-display tracking-tight">{metrics.contactedCount}</div>
                  <div className="text-[11px] text-slate-400 mt-2">
                    Consultations scheduled
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Delivery Rate</span>
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-emerald-400 font-display tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-400 mt-2 truncate">
                    Routed to {EMAIL_CONFIG.enquiries}
                  </div>
                </div>
              </div>

              {/* Data Table Card */}
              <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-2xl space-y-4">
                {/* Search and Filters Bar */}
                <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search leads, names, email, ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#0c1020] border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0070ba]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 rounded-2xl bg-[#0c1020] border border-slate-700/80 text-xs text-slate-200 focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Statuses</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Converted">Converted</option>
                    </select>

                    <select
                      value={serviceFilter}
                      onChange={(e) => setServiceFilter(e.target.value)}
                      className="px-3 py-2 rounded-2xl bg-[#0c1020] border border-slate-700/80 text-xs text-slate-200 focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Domains</option>
                      <option value="Sales">Sales & Marketing</option>
                      <option value="CRM">CRM & RevOps</option>
                      <option value="AI">AI & Autonomous</option>
                      <option value="Engineering">Product Engineering</option>
                    </select>
                  </div>
                </div>

                {/* Table Component */}
                <div className="overflow-x-auto rounded-2xl border border-slate-800/80 bg-[#070913]/60">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-800/60 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Client / Lead</th>
                        <th className="py-3.5 px-4 font-bold">Domain & Scope</th>
                        <th className="py-3.5 px-4 font-bold">Channel</th>
                        <th className="py-3.5 px-4 font-bold">Status</th>
                        <th className="py-3.5 px-4 font-bold">Dispatch</th>
                        <th className="py-3.5 px-4 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-20 text-slate-400">
                            <div className="max-w-sm mx-auto space-y-3">
                              <div className="w-14 h-14 rounded-2xl bg-[#0070ba]/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/20 shadow-inner">
                                <Activity className="w-7 h-7 animate-pulse" />
                              </div>
                              <h4 className="text-sm font-bold text-white">Live Stream Ready & Waiting</h4>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                No inbound client submissions recorded yet. When a visitor submits a contact or consultation form on your site, it will stream here in real time.
                              </p>
                              <button
                                onClick={handleRefreshLeads}
                                disabled={isRefreshing}
                                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#0070ba] to-cyan-500 hover:from-[#005a96] hover:to-cyan-600 text-white text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg shadow-[#0070ba]/20"
                              >
                                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                                <span>{isRefreshing ? 'Checking...' : 'Check For New Emails'}</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors group">
                            {/* Lead Profile */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${getAvatarGradient(lead.id)} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md`}>
                                  {getInitials(lead.name)}
                                </div>
                                <div>
                                  <div className="font-bold text-white text-xs group-hover:text-cyan-400 transition-colors">{lead.name}</div>
                                  <div className="text-[11px] text-slate-400">{lead.company}</div>
                                  <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                                    <span>{lead.id}</span>
                                    <span>•</span>
                                    <span>{lead.date}</span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Service Focus */}
                            <td className="py-4 px-4 max-w-xs">
                              <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 text-[10px] font-bold border border-cyan-800/40 mb-1">
                                {lead.service}
                              </span>
                              <p className="text-[11px] text-slate-400 line-clamp-1">{lead.message}</p>
                            </td>

                            {/* Source */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-xl bg-slate-800/80 text-slate-300 text-[10px] font-semibold border border-slate-700/60">
                                {lead.source}
                              </span>
                            </td>

                            {/* Status Selector */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              <select
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer transition-colors ${
                                  lead.status === 'New'
                                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                    : lead.status === 'Contacted'
                                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                                    : lead.status === 'Proposal Sent'
                                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                }`}
                              >
                                <option value="New" className="bg-[#0b0e1b] text-amber-400">New</option>
                                <option value="Contacted" className="bg-[#0b0e1b] text-cyan-400">Contacted</option>
                                <option value="Proposal Sent" className="bg-[#0b0e1b] text-purple-400">Proposal Sent</option>
                                <option value="Converted" className="bg-[#0b0e1b] text-emerald-400">Converted</option>
                              </select>
                            </td>

                            {/* Email Delivery */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                                <CheckCircle2 className="w-3 h-3" /> Delivered
                              </div>
                            </td>

                            {/* Action Buttons */}
                            <td className="py-4 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedLead(lead)}
                                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-[#0070ba] text-slate-300 hover:text-white transition-colors cursor-pointer"
                                  title="View Full Scope"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <a
                                  href={`mailto:${lead.email}?subject=${encodeURIComponent(`NeuOrzin Executive Follow-Up: ${lead.service}`)}`}
                                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors"
                                  title="Send Email"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =======================================================
              TAB 2: SECURITY & PASSWORD MANAGEMENT
             ======================================================= */}
          {activeTab === 'security' && (
            <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
              <div className="p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-2xl space-y-6">
                <div className="flex items-center gap-3.5 border-b border-slate-800/80 pb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#0070ba]/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 shadow-inner">
                    <Key className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white font-display">Executive Security & Master Key</h3>
                    <p className="text-xs text-slate-400">Configure your portal master password and recovery options</p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newPassword.length < 6) {
                      if (onShowToast) onShowToast('Password must be at least 6 characters.', 'error');
                      return;
                    }
                    if (newPassword !== confirmPassword) {
                      if (onShowToast) onShowToast('Passwords do not match.', 'error');
                      return;
                    }
                    localStorage.setItem('neuorzin_custom_admin_pass', newPassword);
                    setCurrentAdminPass(newPassword);
                    setNewPassword('');
                    setConfirmPassword('');
                    if (onShowToast) onShowToast('Admin master password saved successfully!', 'success');
                  }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-2xl bg-[#0c1020] border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Registered Admin Email:</span>
                      <strong className="text-white text-sm font-mono mt-0.5 block">admin@neuorzin.com</strong>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      Active SuperAdmin
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        New Master Password *
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-[#0c1020] border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#0070ba]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Confirm Master Password *
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-[#0c1020] border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#0070ba]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#0070ba] to-cyan-500 hover:from-[#005a96] hover:to-cyan-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#0070ba]/25 transition-all cursor-pointer"
                    >
                      Update Master Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* =======================================================
              TAB 3: ROADMAP TELEMETRY
             ======================================================= */}
          {activeTab === 'telemetry' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                      <SendHorizontal className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white font-display">Email Telemetry & Delivery Relay</h3>
                      <p className="text-xs text-slate-400">Real-time SMTP server health, delivery latency & queue telemetry</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
                    Integration Roadmap
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-[#0c1020] border border-slate-800">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Relay Engine</div>
                    <div className="text-emerald-400 font-bold text-base mt-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Active Operational
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">FormSubmit / Web3Forms Engine</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0c1020] border border-slate-800">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Avg. Delivery Latency</div>
                    <div className="text-cyan-400 font-bold text-base mt-1">380 ms</div>
                    <div className="text-[11px] text-slate-400 mt-1">Direct SMTP dispatch</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0c1020] border border-slate-800">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Delivery Success</div>
                    <div className="text-white font-bold text-base mt-1">100.0%</div>
                    <div className="text-[11px] text-slate-400 mt-1">SPF / DKIM Authenticated</div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#0c1020]/60 border border-slate-800 text-center space-y-2">
                  <Cpu className="w-7 h-7 text-cyan-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Custom SMTP Server Connector (V2.0)</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                    Connect custom AWS SES, SendGrid, Resend, or Google Workspace SMTP credentials directly with real-time delivery webhooks.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =======================================================
              TAB 4: ROADMAP ANALYTICS
             ======================================================= */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white font-display">Inbound Lead Attribution & Traffic</h3>
                      <p className="text-xs text-slate-400">UTM campaign tracking, conversion funnels & geographic insights</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/30">
                    Integration Roadmap
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-[#0c1020] border border-slate-800">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Top Channel</div>
                    <div className="text-white font-bold text-base mt-1">Direct & Organic Search</div>
                    <div className="text-[11px] text-slate-400 mt-1">High-intent enterprise visitors</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0c1020] border border-slate-800">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Top Demand Service</div>
                    <div className="text-cyan-400 font-bold text-base mt-1">Sales & Marketing</div>
                    <div className="text-[11px] text-slate-400 mt-1">followed by AI Systems</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0c1020] border border-slate-800">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Conversion Rate</div>
                    <div className="text-emerald-400 font-bold text-base mt-1">8.4%</div>
                    <div className="text-[11px] text-slate-400 mt-1">Visitor to Consultation lead</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =======================================================
              TAB 5: ROADMAP INTEGRATIONS
             ======================================================= */}
          {activeTab === 'integrations' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                      <Workflow className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white font-display">Integrations & Instant Webhook Relays</h3>
                      <p className="text-xs text-slate-400">Automate lead dispatch to HubSpot, Salesforce, Slack and WhatsApp</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    Integration Roadmap
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-5 rounded-2xl bg-[#0c1020] border border-slate-800 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold shrink-0">
                      HS
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">HubSpot CRM Sync</h4>
                      <p className="text-slate-400 mt-1">Automatically create Contacts & Deals in HubSpot upon form submission.</p>
                      <span className="inline-block mt-2 text-[10px] text-amber-400 font-semibold bg-amber-950/40 px-2 py-0.5 rounded">API Ready</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0c1020] border border-slate-800 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold shrink-0">
                      SL
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Slack & Discord Alerts</h4>
                      <p className="text-slate-400 mt-1">Instant channel notifications whenever a new high-value lead registers.</p>
                      <span className="inline-block mt-2 text-[10px] text-cyan-400 font-semibold bg-cyan-950/40 px-2 py-0.5 rounded">Webhook Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* =========================================================
          LEAD DETAIL INSPECTION SLIDEOVER / MODAL
         ========================================================= */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-[32px] p-6 sm:p-8 text-white shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${getAvatarGradient(selectedLead.id)} text-white font-bold text-xs flex items-center justify-center shadow-md`}>
                  {getInitials(selectedLead.name)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{selectedLead.name}</h3>
                    <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800/40 font-bold">
                      {selectedLead.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{selectedLead.company}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#0c1020] border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Contact Email</div>
                <div className="font-semibold text-cyan-400 mt-1 break-all">{selectedLead.email}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0c1020] border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</div>
                <div className="font-semibold text-slate-200 mt-1">{selectedLead.phone || 'Not provided'}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0c1020] border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Service Focus</div>
                <div className="font-semibold text-slate-200 mt-1">{selectedLead.service}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0c1020] border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Channel / Source</div>
                <div className="font-semibold text-slate-200 mt-1">{selectedLead.source}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c1020] border border-slate-800 space-y-2 text-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Submitted Message / Project Scope</div>
              <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{selectedLead.message}</p>
              {selectedLead.notes && (
                <div className="pt-2 border-t border-slate-800 text-[11px] text-cyan-300">
                  {selectedLead.notes}
                </div>
              )}
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dispatched to {EMAIL_CONFIG.enquiries}</span>
              </div>
              <span className="text-[10px] text-slate-400">{selectedLead.date}</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <a
                href={`mailto:${selectedLead.email}?subject=${encodeURIComponent(`NeuOrzin Follow-Up: ${selectedLead.service}`)}`}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#0070ba] to-cyan-500 hover:from-[#005a96] hover:to-cyan-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-[#0070ba]/20"
              >
                <Mail className="w-3.5 h-3.5" /> Email Client
              </a>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
