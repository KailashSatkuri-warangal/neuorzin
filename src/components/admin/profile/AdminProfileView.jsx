import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Lock, 
  Key, 
  Camera, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Clock, 
  Building2, 
  Check, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { crmApi } from '../../../data/crmApi';

export default function AdminProfileView({ onShowToast, currentUser, onUserUpdated }) {
  const [profile, setProfile] = useState({
    name: 'Super Admin',
    email: 'admin@neuorzin.com',
    phone: '+91 98765 43210',
    role: 'Super Admin',
    status: 'Active',
    bio: 'Lead Administrator & Systems Architect overseeing NeuOrzin digital operations.',
    avatar: '',
    created_at: '2025-01-01',
    last_login: new Date().toISOString()
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Load user data if available
  useEffect(() => {
    if (currentUser) {
      setProfile(prev => ({
        ...prev,
        ...currentUser
      }));
    }
  }, [currentUser]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      const updated = await crmApi.updateProfile({
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        avatar: profile.avatar
      });
      if (onShowToast) onShowToast('Profile details updated successfully!', 'success');
      if (onUserUpdated && updated) {
        onUserUpdated(updated);
      }
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Failed to update profile.', 'error');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setIsChangingPassword(true);
    try {
      await crmApi.changePassword(currentPassword, newPassword);
      setPasswordSuccess('Password changed successfully! Keep your credentials secure.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      if (onShowToast) onShowToast('Security credentials updated!', 'success');
    } catch (err) {
      setPasswordError(err.message || 'Failed to change password. Verify your current password.');
      if (onShowToast) onShowToast('Password update failed.', 'error');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show instant preview
    const reader = new FileReader();
    reader.onload = () => {
      setProfile(p => ({ ...p, avatar: reader.result }));
    };
    reader.readAsDataURL(file);

    try {
      const uploadRes = await crmApi.uploadImage(file);
      if (uploadRes && uploadRes.url) {
        setProfile(p => ({ ...p, avatar: uploadRes.url }));
        if (onShowToast) onShowToast('Profile photo uploaded!', 'success');
      }
    } catch (err) {
      console.warn('Avatar server upload note:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0070ba] to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20">
                  {profile.name ? profile.name.slice(0, 2).toUpperCase() : 'AD'}
                </div>
              )}
              <label className="absolute -bottom-1.5 -right-1.5 p-1.5 bg-white rounded-xl border border-slate-200 shadow-xs hover:bg-slate-50 text-slate-600 cursor-pointer">
                <Camera className="w-3.5 h-3.5 text-[#0070ba]" />
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
              </label>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                  {profile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#0070ba] text-[10px] font-bold uppercase tracking-wider">
                  {profile.role || 'Super Admin'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-slate-400 font-medium">Session Status</div>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Authenticated (Active)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-[#0070ba]" />
              <h3 className="text-sm font-black text-slate-900">Personal & Executive Details</h3>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0070ba] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address (Read-only)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={profile.email}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-500 font-mono cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={profile.phone || ''}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0070ba] focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Assigned Role
                  </label>
                  <input
                    type="text"
                    disabled
                    value={profile.role || 'Super Admin'}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-600 font-bold cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Executive Bio & Notes
                </label>
                <textarea
                  rows="3"
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Brief note about your role or specialization..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#0070ba] focus:bg-white resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="px-6 py-2.5 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSavingProfile ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Col: Password & Security */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Lock className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-black text-slate-900">Change Password</h3>
            </div>

            {passwordError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Current Password *
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPwd ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  New Password *
                </label>
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  placeholder="Min 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Confirm New Password *
                </label>
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isChangingPassword ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
                <span>Update Password</span>
              </button>
            </form>
          </div>

          {/* Account Metadata Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
            <div className="font-bold text-slate-700">Account Security Metadata</div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Account Status:</span>
              <span className="font-bold text-emerald-600">{profile.status || 'Active'}</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Member Since:</span>
              <span className="font-mono">{profile.created_at ? new Date(profile.created_at).toLocaleDateString('en-IN') : '2025'}</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Last Login:</span>
              <span className="font-mono">{profile.last_login ? new Date(profile.last_login).toLocaleTimeString() : 'Current Session'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
