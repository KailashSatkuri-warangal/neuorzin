import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  Tag, 
  Plus, 
  Trash2, 
  Edit2, 
  RefreshCw, 
  AlertCircle, 
  Check, 
  X, 
  Hash, 
  Layers, 
  FileText,
  Search,
  Sparkles,
  Zap,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { crmApi } from '../../../data/crmApi';
import { NEUORZIN_SERVICE_CATEGORIES } from '../../../data/serviceCategories';

export default function TaxonomyManagementView({ onShowToast }) {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('categories');
  const [isSyncingServices, setIsSyncingServices] = useState(false);
  const [selectedTopicCategory, setSelectedTopicCategory] = useState(null);

  // Category Form
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [isSubmittingCat, setIsSubmittingCat] = useState(false);

  // Tag Form
  const [tagName, setTagName] = useState('');
  const [tagSlug, setTagSlug] = useState('');
  const [isSubmittingTag, setIsSubmittingTag] = useState(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [catsRes, tagsRes, blogsRes] = await Promise.allSettled([
        crmApi.getCategories(),
        crmApi.getTags(),
        crmApi.getBlogs()
      ]);
      if (catsRes.status === 'fulfilled' && Array.isArray(catsRes.value)) {
        setCategories(catsRes.value);
      }
      if (tagsRes.status === 'fulfilled' && Array.isArray(tagsRes.value)) {
        setTags(tagsRes.value);
      }
      if (blogsRes.status === 'fulfilled' && Array.isArray(blogsRes.value)) {
        setBlogs(blogsRes.value);
      }
    } catch (err) {
      console.warn('Error loading taxonomy:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Auto-fill & Sync Categories from NeuOrzin Service Offerings
  const handleAutoFillFromServices = async () => {
    setIsSyncingServices(true);
    let addedCount = 0;
    try {
      // Loop through defined service categories and add missing ones
      const existingNames = new Set(categories.map(c => (c.name || '').toLowerCase().trim()));
      const existingTags = new Set(tags.map(t => (t.name || '').toLowerCase().trim()));

      for (const service of NEUORZIN_SERVICE_CATEGORIES) {
        if (!existingNames.has(service.name.toLowerCase().trim())) {
          try {
            const createdCat = await crmApi.createCategory({
              name: service.name,
              slug: service.slug,
              description: service.description
            });
            setCategories(prev => [...prev, createdCat]);
            addedCount++;
          } catch (e) {
            console.warn('Category sync note:', e.message);
          }
        }

        // Also add suggested tags for each service
        if (Array.isArray(service.suggestedTags)) {
          for (const sTag of service.suggestedTags) {
            if (!existingTags.has(sTag.toLowerCase().trim())) {
              try {
                const createdTag = await crmApi.createTag({
                  name: sTag,
                  slug: sTag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                });
                setTags(prev => [...prev, createdTag]);
                existingTags.add(sTag.toLowerCase().trim());
              } catch (e) {
                // Ignore duplicate tags
              }
            }
          }
        }
      }

      await loadData();
      if (onShowToast) {
        if (addedCount > 0) {
          onShowToast(`Successfully auto-filled ${addedCount} service categories & corresponding tags!`, 'success');
        } else {
          onShowToast('All NeuOrzin service categories are already in sync!', 'info');
        }
      }
    } catch (err) {
      if (onShowToast) onShowToast('Failed to auto-fill categories from services.', 'error');
    } finally {
      setIsSyncingServices(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!catName.trim()) return;
    setIsSubmittingCat(true);
    try {
      const slug = catSlug.trim() || catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const created = await crmApi.createCategory({
        name: catName.trim(),
        slug,
        description: catDesc.trim()
      });
      setCategories(prev => [...prev, created]);
      setCatName('');
      setCatSlug('');
      setCatDesc('');
      if (onShowToast) onShowToast(`Category "${created.name}" created!`, 'success');
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Failed to create category.', 'error');
    } finally {
      setIsSubmittingCat(false);
    }
  };

  const handleDeleteCategory = async (id, name) => {
    const postCount = blogs.filter(b => b.category?.toLowerCase() === name?.toLowerCase()).length;
    if (postCount > 0) {
      if (onShowToast) onShowToast(`Cannot delete category "${name}" because it is currently assigned to ${postCount} article(s).`, 'warning');
      return;
    }
    try {
      await crmApi.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      if (onShowToast) onShowToast(`Category "${name}" deleted.`, 'info');
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Failed to delete category.', 'error');
    }
  };

  const handleCreateTag = async (e) => {
    e.preventDefault();
    if (!tagName.trim()) return;
    setIsSubmittingTag(true);
    try {
      const slug = tagSlug.trim() || tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const created = await crmApi.createTag({
        name: tagName.trim(),
        slug
      });
      setTags(prev => [...prev, created]);
      setTagName('');
      setTagSlug('');
      if (onShowToast) onShowToast(`Tag "#${created.name}" created!`, 'success');
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Failed to create tag.', 'error');
    } finally {
      setIsSubmittingTag(false);
    }
  };

  const handleDeleteTag = async (id, name) => {
    try {
      await crmApi.deleteTag(id);
      setTags(prev => prev.filter(t => t.id !== id));
      if (onShowToast) onShowToast(`Tag "#${name}" removed.`, 'info');
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Failed to delete tag.', 'error');
    }
  };

  // Compute category usage counts
  const categoryWithCounts = categories.map(cat => {
    const count = blogs.filter(b => b.category?.toLowerCase() === cat.name?.toLowerCase()).length;
    // Check if matched to service pillar
    const matchedService = NEUORZIN_SERVICE_CATEGORIES.find(s => s.name.toLowerCase() === cat.name?.toLowerCase());
    return { ...cat, count, pillar: matchedService?.pillar, recommendations: matchedService?.recommendedTopics };
  });

  // Filtered lists
  const filteredCats = categoryWithCounts.filter(c => 
    !searchQuery.trim() || c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTags = tags.filter(t => 
    !searchQuery.trim() || t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                Categories & Taxonomy
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Organize blog content hierarchies, filter groups, and sync automatically from NeuOrzin service offerings.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Auto-Fill From Services Button */}
            <button
              onClick={handleAutoFillFromServices}
              disabled={isSyncingServices}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              title="Populate categories with NeuOrzin Service Pillars automatically"
            >
              <Zap className={`w-3.5 h-3.5 ${isSyncingServices ? 'animate-spin' : ''}`} />
              <span>{isSyncingServices ? 'Syncing...' : '⚡ Auto-Fill from Services'}</span>
            </button>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('categories')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'categories'
                    ? 'bg-white text-[#0070ba] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Folder className="w-3.5 h-3.5" />
                <span>Categories ({categories.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('tags')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'tags'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Tags ({tags.length})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Create on Left, List on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CREATE COLUMN */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4 sticky top-24">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Plus className="w-4 h-4 text-[#0070ba]" />
              <h3 className="text-sm font-black text-slate-900">
                {activeTab === 'categories' ? 'Add New Category' : 'Add New Tag'}
              </h3>
            </div>

            {activeTab === 'categories' ? (
              <form onSubmit={handleCreateCategory} className="space-y-3.5">
                {/* Service Auto-Fill Selector */}
                <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-[#0070ba] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Quick Pick from NeuOrzin Services:
                  </span>
                  <select
                    onChange={(e) => {
                      const selected = NEUORZIN_SERVICE_CATEGORIES.find(s => s.name === e.target.value);
                      if (selected) {
                        setCatName(selected.name);
                        setCatSlug(selected.slug);
                        setCatDesc(selected.description);
                      }
                    }}
                    defaultValue=""
                    className="w-full bg-white border border-blue-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0070ba] cursor-pointer"
                  >
                    <option value="" disabled>Select service offering to auto-fill...</option>
                    {NEUORZIN_SERVICE_CATEGORIES.map(s => (
                      <option key={s.slug} value={s.name}>
                        {s.pillar}: {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Enterprise Data Operations"
                    value={catName}
                    onChange={(e) => {
                      setCatName(e.target.value);
                      if (!catSlug) {
                        setCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0070ba] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    placeholder="enterprise-data-operations"
                    value={catSlug}
                    onChange={(e) => setCatSlug(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0070ba] focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Brief description for SEO archive..."
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0070ba] focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingCat || !catName.trim()}
                  className="w-full py-2.5 rounded-xl bg-[#0070ba] hover:bg-[#005a96] disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmittingCat ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span>Save Category</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleCreateTag} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tag Name *
                  </label>
                  <div className="relative">
                    <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g., AutonomousAgents"
                      value={tagName}
                      onChange={(e) => {
                        setTagName(e.target.value);
                        if (!tagSlug) {
                          setTagSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    placeholder="autonomous-agents"
                    value={tagSlug}
                    onChange={(e) => setTagSlug(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingTag || !tagName.trim()}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmittingTag ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span>Save Tag</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* LIST COLUMN */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={activeTab === 'categories' ? 'Search categories...' : 'Search tags...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0070ba] focus:bg-white"
              />
            </div>

            {/* Content Lists */}
            {activeTab === 'categories' ? (
              <div className="space-y-2.5">
                {filteredCats.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs">
                    No categories found. Click "⚡ Auto-Fill from Services" above to instantly populate all service categories!
                  </div>
                ) : (
                  filteredCats.map((cat) => (
                    <div
                      key={cat.id || cat.slug || cat.name}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all flex items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0070ba] flex items-center justify-center font-bold shrink-0 mt-0.5">
                          <Folder className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-900 text-xs truncate">
                              {cat.name}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#0070ba] font-mono text-[10px] font-bold">
                              /{cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}
                            </span>
                            {cat.pillar && (
                              <span className="px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[9px] font-bold uppercase tracking-wider">
                                {cat.pillar}
                              </span>
                            )}
                          </div>
                          {cat.description && (
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {cat.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1">
                            <div className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              <span>{cat.count} article{cat.count !== 1 ? 's' : ''} assigned</span>
                            </div>
                            {cat.recommendations && cat.recommendations.length > 0 && (
                              <button
                                onClick={() => setSelectedTopicCategory(cat)}
                                className="text-purple-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Sparkles className="w-3 h-3" />
                                <span>{cat.recommendations.length} Recommended Topics</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteCategory(cat.id, cat.name)}
                        title={cat.count > 0 ? "Cannot delete category in active use" : "Delete category"}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${
                          cat.count > 0
                            ? 'text-slate-300 hover:text-slate-400'
                            : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {filteredTags.length === 0 ? (
                  <div className="w-full text-center py-10 text-slate-400 text-xs">
                    No tags found.
                  </div>
                ) : (
                  filteredTags.map((tag) => (
                    <div
                      key={tag.id || tag.slug || tag.name}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/40 transition-all group"
                    >
                      <Hash className="w-3 h-3 text-indigo-500" />
                      <span className="font-bold text-slate-900">{tag.name}</span>
                      <button
                        onClick={() => handleDeleteTag(tag.id, tag.name)}
                        className="text-slate-400 hover:text-rose-600 p-0.5 rounded transition-colors ml-1"
                        title="Delete tag"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOPIC RECOMMENDATIONS PREVIEW MODAL */}
      {selectedTopicCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    AI Topic Recommendations: {selectedTopicCategory.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Pre-architected topics designed to rank for commercial intent in this service area.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTopicCategory(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {(selectedTopicCategory.recommendations || []).map((topic, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    {topic.title}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {topic.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/60 text-[10px] text-slate-500 font-medium">
                    <div className="flex flex-wrap gap-1">
                      {topic.keywords.map((k, ki) => (
                        <span key={ki} className="px-2 py-0.5 rounded bg-blue-50 text-[#0070ba] font-semibold">
                          #{k}
                        </span>
                      ))}
                    </div>
                    <span className="text-purple-600 font-bold">{topic.length}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTopicCategory(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
