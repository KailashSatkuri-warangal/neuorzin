import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Key, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Mail, 
  Clock, 
  Calendar, 
  User, 
  Lock, 
  ChevronLeft, 
  ChevronRight, 
  ShieldAlert,
  X,
  AlertCircle
} from 'lucide-react';
import { crmApi } from '../../../data/crmApi';

const ROLES = ['Super Admin', 'Admin', 'Editor', 'User'];

export default function UserManagementView({ onShowToast, currentUser }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [resettingUser, setResettingUser] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [deleteConfirmUser, setDeleteConfirmUser] = useState(null);

  // Create User Form State
  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Editor',
    status: 'Active'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadUsers = async (showToast = false) => {
    setIsRefreshing(true);
    try {
      const data = await crmApi.getUsers();
      if (Array.isArray(data)) {
        setUsers(data);
      }
      if (showToast && onShowToast) {
        onShowToast('Users database refreshed!', 'success');
      }
    } catch (err) {
      console.warn('Error fetching users:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = 
        !searchQuery.trim() ||
        (u.name && u.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRole = 
        roleFilter === 'All' || 
        (u.role && u.role.toLowerCase() === roleFilter.toLowerCase());

      const matchesStatus = 
        statusFilter === 'All' || 
        (u.status && u.status.toLowerCase() === statusFilter.toLowerCase());

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  // Handlers
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!createForm.name.trim() || !createForm.email.trim() || !createForm.password.trim()) {
      if (onShowToast) onShowToast('Please fill in all required fields.', 'warning');
      return;
    }
    setIsSubmitting(true);
    try {
      const created = await crmApi.createUser(createForm);
      setUsers(prev => [created, ...prev]);
      setShowCreateModal(false);
      setCreateForm({ name: '', email: '', password: '', role: 'Editor', status: 'Active' });
      if (onShowToast) onShowToast(`User "${created.name}" created successfully!`, 'success');
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Failed to create user.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await crmApi.updateUserRole(userId, newRole);
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      if (onShowToast) onShowToast('User role updated!', 'success');
    } catch (err) {
      if (onShowToast) onShowToast('Failed to update role.', 'error');
    }
  };

  const handleToggleStatus = async (user) => {
    const nextStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    try {
      await crmApi.updateUserStatus(user.id, nextStatus);
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: nextStatus } : u));
      if (onShowToast) onShowToast(`User is now ${nextStatus}.`, 'info');
    } catch (err) {
      if (onShowToast) onShowToast('Failed to update user status.', 'error');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPasswordInput || newPasswordInput.length < 6) {
      if (onShowToast) onShowToast('Password must be at least 6 characters.', 'warning');
      return;
    }
    setIsSubmitting(true);
    try {
      await crmApi.updateUser(resettingUser.id, { password: newPasswordInput });
      if (onShowToast) onShowToast(`Password reset for ${resettingUser.name}!`, 'success');
      setResettingUser(null);
      setNewPasswordInput('');
    } catch (err) {
      if (onShowToast) onShowToast('Failed to reset user password.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (user) => {
    if (user.role === 'Super Admin' || user.email === 'admin@neuorzin.com') {
      if (onShowToast) onShowToast('Cannot delete default Super Administrator account.', 'warning');
      return;
    }
    try {
      await crmApi.deleteUser(user.id);
      setUsers(prev => prev.filter(u => u.id !== user.id));
      setDeleteConfirmUser(null);
      if (onShowToast) onShowToast(`User "${user.name}" removed from database.`, 'info');
    } catch (err) {
      if (onShowToast) onShowToast('Failed to delete user.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#0070ba] flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                User Management & RBAC
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Manage executive administrative accounts, assign granular role permissions, and control portal access.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => loadUsers(true)}
              disabled={isRefreshing}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#0070ba]' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New User</span>
            </button>
          </div>
        </div>

        {/* Roles Legend / Permission Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs">
          <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100">
            <div className="font-bold text-purple-900">Super Admin</div>
            <div className="text-[11px] text-purple-700/80 mt-0.5">Full access: Users, Roles, AI Settings, DB, System.</div>
          </div>
          <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100">
            <div className="font-bold text-[#0070ba]">Admin</div>
            <div className="text-[11px] text-blue-700/80 mt-0.5">Manage Blogs, Taxonomy, Leads, Deals, and CRM records.</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <div className="font-bold text-emerald-900">Editor</div>
            <div className="text-[11px] text-emerald-700/80 mt-0.5">Create, draft, and optimize blog posts with Gemini.</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-800">User</div>
            <div className="text-[11px] text-slate-600 mt-0.5">Standard account with read-only profile access.</div>
          </div>
        </div>
      </div>

      {/* Toolbar & Filter */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0070ba] focus:bg-white"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#0070ba] cursor-pointer"
            >
              <option value="All">All Roles</option>
              {ROLES.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#0070ba] cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Created Date</th>
                <th className="py-3.5 px-4">Last Login</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#0070ba] mb-2" />
                    <span>Loading user accounts...</span>
                  </td>
                </tr>
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    No users matching criteria.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => {
                  const isSuperAdmin = user.role === 'Super Admin';
                  const isActive = user.status === 'Active';

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name & Email */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSuperAdmin 
                              ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white' 
                              : 'bg-blue-50 text-[#0070ba] border border-blue-100'
                          }`}>
                            {user.name ? user.name.slice(0, 2).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {isSuperAdmin && (
                                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={user.role || 'Editor'}
                          onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                          disabled={user.email === 'admin@neuorzin.com'}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            user.role === 'Super Admin'
                              ? 'bg-purple-50 text-purple-800 border-purple-200'
                              : user.role === 'Admin'
                              ? 'bg-blue-50 text-[#0070ba] border-blue-200'
                              : user.role === 'Editor'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {ROLES.map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </td>

                      {/* Status Toggle */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleStatus(user)}
                          disabled={user.email === 'admin@neuorzin.com'}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                            isActive
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          <span>{user.status || 'Active'}</span>
                        </button>
                      </td>

                      {/* Created Date */}
                      <td className="py-3.5 px-4 text-slate-500 text-[11px] font-mono">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN') : 'System Origin'}
                      </td>

                      {/* Last Login */}
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        {user.last_login ? new Date(user.last_login).toLocaleDateString('en-IN') : 'Never'}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Reset Password */}
                          <button
                            onClick={() => {
                              setResettingUser(user);
                              setNewPasswordInput('');
                            }}
                            title="Reset User Password"
                            className="p-2 rounded-lg bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-600 transition-colors cursor-pointer"
                          >
                            <Key className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          {deleteConfirmUser?.id === user.id ? (
                            <div className="flex items-center gap-1 bg-rose-50 p-1 rounded-lg border border-rose-200">
                              <button
                                onClick={() => handleDeleteUser(user)}
                                className="p-1 rounded bg-rose-600 text-white hover:bg-rose-700 text-[10px] font-bold"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setDeleteConfirmUser(null)}
                                className="p-1 rounded text-slate-500 hover:text-slate-800"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmUser(user)}
                              disabled={user.email === 'admin@neuorzin.com'}
                              title={user.email === 'admin@neuorzin.com' ? "Cannot delete primary admin" : "Delete User"}
                              className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-3 text-xs text-slate-500">
            <div>
              Showing page <span className="font-bold text-slate-900">{currentPage}</span> of{' '}
              <span className="font-bold text-slate-900">{totalPages}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CREATE USER MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#0070ba]" />
                <h3 className="text-base font-black text-slate-900">Add Executive User</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sarah Connor"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0070ba] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@neuorzin.com"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0070ba] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0070ba] focus:bg-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Role
                  </label>
                  <select
                    value={createForm.role}
                    onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#0070ba]"
                  >
                    {ROLES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={createForm.status}
                    onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#0070ba]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-2"
                >
                  {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                  <span>Create Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {resettingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-black text-slate-900">Reset Password</h3>
              </div>
              <button
                onClick={() => setResettingUser(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Enter a new password for <span className="font-bold text-slate-900">{resettingUser.name}</span> ({resettingUser.email}).
            </p>

            <form onSubmit={handleResetPassword} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  New Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setResettingUser(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !newPasswordInput}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-2"
                >
                  {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
