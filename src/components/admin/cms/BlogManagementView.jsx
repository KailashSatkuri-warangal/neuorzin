import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileText, 
  Plus, 
  Sparkles, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Archive, 
  Globe, 
  Calendar, 
  User, 
  Tag, 
  Folder, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw,
  AlertCircle,
  ExternalLink,
  MoreVertical,
  Check,
  X,
  Lightbulb,
  Zap
} from 'lucide-react';
import { crmApi } from '../../../data/crmApi';
import BlogEditorModal from './BlogEditorModal';
import GeminiBlogGeneratorModal from './GeminiBlogGeneratorModal';
import BlogPreviewModal from './BlogPreviewModal';
import { getAllRecommendedTopics } from '../../../data/serviceCategories';

export default function BlogManagementView({ onShowToast, currentUser }) {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search, Filter & Pagination States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modals
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedBlogForEdit, setSelectedBlogForEdit] = useState(null);
  const [geminiModalOpen, setGeminiModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewBlog, setPreviewBlog] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Load Data
  const loadData = async (showRefreshToast = false) => {
    try {
      setIsRefreshing(true);
      const [blogsRes, catsRes, tagsRes] = await Promise.allSettled([
        crmApi.getBlogs(),
        crmApi.getCategories(),
        crmApi.getTags()
      ]);

      if (blogsRes.status === 'fulfilled' && Array.isArray(blogsRes.value)) {
        setBlogs(blogsRes.value);
      }
      if (catsRes.status === 'fulfilled' && Array.isArray(catsRes.value)) {
        setCategories(catsRes.value);
      }
      if (tagsRes.status === 'fulfilled' && Array.isArray(tagsRes.value)) {
        setTags(tagsRes.value);
      }
      if (showRefreshToast && onShowToast) {
        onShowToast('Blog articles refreshed successfully!', 'success');
      }
    } catch (err) {
      console.warn('Error loading blogs:', err);
      if (onShowToast) onShowToast('Failed to refresh blogs from server.', 'error');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter and Sort
  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => {
      const matchesSearch = 
        !searchQuery.trim() ||
        (b.title && b.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (b.excerpt && b.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (b.category && b.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (b.author && b.author.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = 
        statusFilter === 'All' || 
        (b.status && b.status.toLowerCase() === statusFilter.toLowerCase());

      const matchesCategory = 
        categoryFilter === 'All' || 
        (b.category && b.category.toLowerCase() === categoryFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at || b.published_date || 0) - new Date(a.created_at || a.published_date || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.created_at || a.published_date || 0) - new Date(b.created_at || b.published_date || 0);
      }
      if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '');
      }
      if (sortBy === 'views') {
        return (Number(b.views) || 0) - (Number(a.views) || 0);
      }
      return 0;
    });
  }, [blogs, searchQuery, statusFilter, categoryFilter, sortBy]);

  // Pagination Slice
  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / pageSize));
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredBlogs.slice(start, start + pageSize);
  }, [filteredBlogs, currentPage, pageSize]);

  // Status Metrics
  const stats = useMemo(() => {
    const published = blogs.filter(b => b.status === 'Published').length;
    const drafts = blogs.filter(b => b.status === 'Draft').length;
    const archived = blogs.filter(b => b.status === 'Archived').length;
    const totalViews = blogs.reduce((acc, b) => acc + (Number(b.views) || 0), 0);
    return { total: blogs.length, published, drafts, archived, totalViews };
  }, [blogs]);

  // Handlers
  const handleOpenCreate = () => {
    setSelectedBlogForEdit(null);
    setEditorOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setSelectedBlogForEdit(blog);
    setEditorOpen(true);
  };

  const handleOpenPreview = (blog) => {
    setPreviewBlog(blog);
    setPreviewModalOpen(true);
  };

  const handleSaveBlog = async (savedBlog, isEdit) => {
    try {
      if (isEdit && savedBlog.id) {
        await crmApi.updateBlog(savedBlog.id, savedBlog);
      } else {
        await crmApi.createBlog(savedBlog);
      }
      setEditorOpen(false);
      setSelectedBlogForEdit(null);
      await loadData();
      if (onShowToast) onShowToast(isEdit ? 'Article updated successfully!' : 'New article saved to database!', 'success');
    } catch (err) {
      console.error('Error saving blog article:', err);
      if (onShowToast) onShowToast('Failed to save article: ' + err.message, 'error');
      throw err;
    }
  };

  const handleApplyAiGenerated = (generatedData) => {
    setGeminiModalOpen(false);
    setSelectedBlogForEdit(generatedData);
    setEditorOpen(true);
    if (onShowToast) onShowToast('AI Generated content loaded into Editor!', 'success');
  };

  const handleTogglePublish = async (blog) => {
    const isCurrentlyPublished = blog.status === 'Published';
    try {
      if (isCurrentlyPublished) {
        await crmApi.unpublishBlog(blog.id);
        if (onShowToast) onShowToast(`"${blog.title}" unpublished & moved to Drafts.`, 'info');
      } else {
        await crmApi.publishBlog(blog.id);
        if (onShowToast) onShowToast(`"${blog.title}" is now LIVE on the website!`, 'success');
      }
      await loadData();
    } catch (err) {
      if (onShowToast) onShowToast('Failed to update blog publish status.', 'error');
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await crmApi.deleteBlog(id);
      setDeleteConfirmId(null);
      if (onShowToast) onShowToast('Article deleted successfully.', 'success');
      await loadData();
    } catch (err) {
      if (onShowToast) onShowToast('Failed to delete blog article.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#0070ba]/10 text-[#0070ba] flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                  Blog & Content CMS
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Author, edit, schedule, and optimize SEO-rich blogs with server-side Gemini AI integration.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => loadData(true)}
              disabled={isRefreshing}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#0070ba]' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setGeminiModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Generate with Gemini</span>
            </button>

            <button
              onClick={handleOpenCreate}
              className="px-4 py-2.5 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Article</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Total Articles</span>
              <FileText className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">{stats.total}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Across all categories</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800">Published Live</span>
              <Globe className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-700 mt-1">{stats.published}</div>
            <div className="text-[10px] text-emerald-600/80 mt-0.5">Visible on /blog page</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800">Drafts & Review</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-700 mt-1">{stats.drafts}</div>
            <div className="text-[10px] text-amber-600/80 mt-0.5">Ready for publication</div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0070ba]">Total Readers</span>
              <Eye className="w-4 h-4 text-[#0070ba]" />
            </div>
            <div className="text-2xl font-black text-[#0070ba] mt-1">{stats.totalViews.toLocaleString()}</div>
            <div className="text-[10px] text-blue-600/80 mt-0.5">Estimated post impressions</div>
          </div>
        </div>

        {/* AI Recommendations Quick Strip */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Recommended Topics by NeuOrzin Service Pillars:</span>
            </div>
            <button
              onClick={() => setGeminiModalOpen(true)}
              className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Open AI Generator</span>
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {getAllRecommendedTopics().slice(0, 4).map((rec, ri) => (
              <div
                key={ri}
                onClick={() => setGeminiModalOpen(true)}
                className="shrink-0 max-w-xs p-3 rounded-2xl bg-purple-50/50 border border-purple-100/80 hover:border-purple-300 hover:bg-purple-100/60 transition-all cursor-pointer group space-y-1"
              >
                <div className="flex items-center justify-between text-[9px]">
                  <span className="px-2 py-0.2 rounded-full bg-purple-200 text-purple-900 font-bold uppercase">
                    {rec.pillar}
                  </span>
                  <span className="text-purple-600 font-medium">1-Click AI Draft</span>
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                  {rec.title}
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-1">
                  {rec.excerpt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter, Search & Table Toolbar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title, excerpt, category, author..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters and Sorting */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Status Filter */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {['All', 'Published', 'Draft', 'Archived'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    statusFilter === status
                      ? 'bg-white text-[#0070ba] shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Category Dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#0070ba] cursor-pointer"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c.id || c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#0070ba] cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Alphabetical (A-Z)</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>

        {/* Blogs Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Article</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Published Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#0070ba] mb-2" />
                    <span>Loading blog database...</span>
                  </td>
                </tr>
              ) : paginatedBlogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-slate-700 text-sm">No articles found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {searchQuery || statusFilter !== 'All' ? 'Try adjusting your search or filters' : 'Create your first blog post to get started!'}
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedBlogs.map((blog) => {
                  const isPublished = blog.status === 'Published';
                  const isDraft = blog.status === 'Draft';
                  const isArchived = blog.status === 'Archived';

                  return (
                    <tr key={blog.id} className="hover:bg-slate-50/60 transition-colors group">
                      {/* Title & Featured Image */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3 min-w-[240px] max-w-[380px]">
                          {blog.image ? (
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80";
                              }}
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#0070ba] flex items-center justify-center shrink-0 font-bold">
                              <FileText className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 group-hover:text-[#0070ba] transition-colors truncate">
                              {blog.title}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {blog.excerpt || 'No summary excerpt provided.'}
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                              <span>Slug: /{blog.slug || blog.id}</span>
                              {blog.read_time && <span>• {blog.read_time}</span>}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]">
                          <Folder className="w-3 h-3 text-slate-400" />
                          <span>{blog.category || 'General'}</span>
                        </span>
                      </td>

                      {/* Author */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{blog.author || 'NeuOrzin Editorial'}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isPublished
                              ? 'bg-emerald-100 text-emerald-800'
                              : isDraft
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {isPublished ? (
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                          ) : isDraft ? (
                            <Clock className="w-3 h-3 text-amber-600" />
                          ) : (
                            <Archive className="w-3 h-3 text-slate-500" />
                          )}
                          <span>{blog.status || 'Draft'}</span>
                        </span>
                      </td>

                      {/* Published Date */}
                      <td className="py-3.5 px-4 text-slate-500 text-[11px] font-mono">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{blog.published_date || blog.created_at?.split('T')[0] || 'Unpublished'}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Live Preview */}
                          <button
                            onClick={() => handleOpenPreview(blog)}
                            title="Preview Article"
                            className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#0070ba] transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick Publish / Unpublish Toggle */}
                          <button
                            onClick={() => handleTogglePublish(blog)}
                            title={isPublished ? 'Unpublish & Draft' : 'Publish Live to Website'}
                            className={`p-2 rounded-lg transition-colors cursor-pointer ${
                              isPublished
                                ? 'bg-amber-50 hover:bg-amber-100 text-amber-700'
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {isPublished ? <Clock className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => handleOpenEdit(blog)}
                            title="Edit Article"
                            className="p-2 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Confirmation */}
                          {deleteConfirmId === blog.id ? (
                            <div className="flex items-center gap-1 bg-rose-50 p-1 rounded-lg border border-rose-200">
                              <button
                                onClick={() => handleDeleteBlog(blog.id)}
                                title="Confirm Permanent Delete"
                                className="p-1 rounded bg-rose-600 text-white hover:bg-rose-700 text-[10px] font-bold"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="p-1 rounded text-slate-500 hover:text-slate-800"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(blog.id)}
                              title="Delete Article"
                              className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
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

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-3 text-xs text-slate-500">
            <div>
              Showing <span className="font-bold text-slate-900">{(currentPage - 1) * pageSize + 1}</span> to{' '}
              <span className="font-bold text-slate-900">
                {Math.min(currentPage * pageSize, filteredBlogs.length)}
              </span>{' '}
              of <span className="font-bold text-slate-900">{filteredBlogs.length}</span> articles
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === page
                      ? 'bg-[#0070ba] text-white shadow-xs'
                      : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      {/* 1. Blog Editor Modal */}
      <BlogEditorModal
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        initialData={selectedBlogForEdit}
        categories={categories}
        tags={tags}
        onSave={handleSaveBlog}
        onOpenGemini={() => {
          setEditorOpen(false);
          setGeminiModalOpen(true);
        }}
      />

      {/* 2. Gemini AI Generator Modal */}
      <GeminiBlogGeneratorModal
        isOpen={geminiModalOpen}
        onClose={() => setGeminiModalOpen(false)}
        onApplyContent={handleApplyAiGenerated}
        categories={categories}
      />

      {/* 3. User-Facing Compatible Preview Modal */}
      <BlogPreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        blog={previewBlog}
        onPublishLive={async (id) => {
          await crmApi.publishBlog(id);
          if (onShowToast) onShowToast('Article published live to website!', 'success');
          setPreviewModalOpen(false);
          await loadData();
        }}
      />
    </div>
  );
}
