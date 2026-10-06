import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Save, Sparkles, Upload, Image as ImageIcon, Plus, Trash2, Check, Globe, Eye,
  Sliders, FileText, Tag, Hash, Link as LinkIcon, AlertCircle, ArrowRight
} from 'lucide-react';
import { crmApi } from '../../../data/crmApi';
import { GeminiBlogGeneratorModal } from './GeminiBlogGeneratorModal';
import { NEUORZIN_SERVICE_CATEGORIES } from '../../../data/serviceCategories';

export function BlogEditorModal({ isOpen, onClose, blog, initialData, onSave, onShowToast, categories = [], tags: propTags = [], onOpenGemini }) {
  const currentBlog = blog || initialData;
  const isEdit = Boolean(currentBlog && (currentBlog.id || currentBlog.slug));

  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'sections' | 'seo' | 'publishing'
  const [showAiModal, setShowAiModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Digital Marketing');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [intro, setIntro] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('Rajesh Varma');
  const [authorRole, setAuthorRole] = useState('Head of Growth Marketing');
  const [readTime, setReadTime] = useState('5 min read');
  const [status, setStatus] = useState('Draft');
  const [isFeatured, setIsFeatured] = useState(false);
  
  // Tags
  const [tags, setTags] = useState(['Digital Marketing']);
  const [tagInput, setTagInput] = useState('');

  // Structured Sections State
  const [sections, setSections] = useState([]);

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');

  // Loading state
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (currentBlog) {
      setTitle(currentBlog.title || '');
      setSlug(currentBlog.slug || currentBlog.id || '');
      setCategory(currentBlog.category || categories[0]?.name || 'Digital Marketing');
      setExcerpt(currentBlog.excerpt || '');
      setContent(currentBlog.content || '');
      setIntro(currentBlog.intro || '');
      setConclusion(currentBlog.conclusion || '');
      setImage(currentBlog.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80');
      setAuthor(currentBlog.author || 'Rajesh Varma');
      setAuthorRole(currentBlog.authorRole || currentBlog.author_role || 'Head of Growth Marketing');
      setReadTime(currentBlog.readTime || currentBlog.read_time || '5 min read');
      setStatus(currentBlog.status || 'Draft');
      setIsFeatured(Boolean(currentBlog.is_featured));
      setTags(Array.isArray(currentBlog.tags) ? currentBlog.tags : (currentBlog.tags ? [currentBlog.tags] : ['Digital Marketing']));
      setSections(Array.isArray(currentBlog.sections) ? currentBlog.sections : []);
      setSeoTitle(currentBlog.seo_title || currentBlog.title || '');
      setSeoDescription(currentBlog.seo_description || currentBlog.excerpt || '');
      setSeoKeywords(currentBlog.seo_keywords || '');
    } else {
      // New Blog Defaults
      setTitle('');
      setSlug('');
      setCategory(categories[0]?.name || 'Digital Marketing');
      setExcerpt('');
      setContent('');
      setIntro('');
      setConclusion('');
      setImage('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80');
      setAuthor('Rajesh Varma');
      setAuthorRole('Head of Growth Marketing');
      setReadTime('5 min read');
      setStatus('Draft');
      setIsFeatured(false);
      setTags(['Digital Marketing', 'Growth']);
      setSections([
        { heading: '1. The Core Problem & Context', paragraphs: ['Describe the business or technical friction point in detail...'], callout: 'A bold, memorable insight from real client experience.' },
        { heading: '2. The Engineering Strategy', paragraphs: ['Explain the exact architecture, methodology, and configuration steps...'], list: ['Actionable benchmark 1', 'Architectural rule 2', 'Implementation safeguard 3'] },
        { heading: '3. Measurable Business Outcomes', paragraphs: ['Share quantifiable results: latency reductions, CAC improvements, or conversion uplift...'] }
      ]);
      setSeoTitle('');
      setSeoDescription('');
      setSeoKeywords('');
    }
  }, [currentBlog, categories, isOpen]);

  // Auto-generate slug when title changes in Create mode
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!isEdit) {
      const generatedSlug = val.toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '');
      setSlug(generatedSlug);
      if (!seoTitle || seoTitle === title) {
        setSeoTitle(val ? `${val} | NeuOrzin` : '');
      }
    }
  };

  const handleAddTag = (e) => {
    if (e) e.preventDefault();
    const clean = tagInput.trim().replace(/^#/, '');
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tToRemove) => {
    setTags(tags.filter(t => t !== tToRemove));
  };

  // Section manipulation
  const handleAddSection = () => {
    const nextNum = sections.length + 1;
    setSections([...sections, {
      heading: `${nextNum}. Section Heading`,
      paragraphs: ['Write section insight here...']
    }]);
  };

  const handleRemoveSection = (index) => {
    setSections(sections.filter((_, idx) => idx !== index));
  };

  const handleUpdateSection = (index, field, value) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const handleParagraphChange = (secIdx, pIdx, val) => {
    const updated = [...sections];
    const paras = [...(updated[secIdx].paragraphs || [''])];
    paras[pIdx] = val;
    updated[secIdx].paragraphs = paras;
    setSections(updated);
  };

  const handleAddParagraph = (secIdx) => {
    const updated = [...sections];
    const paras = [...(updated[secIdx].paragraphs || []), ''];
    updated[secIdx].paragraphs = paras;
    setSections(updated);
  };

  const handleRemoveParagraph = (secIdx, pIdx) => {
    const updated = [...sections];
    const paras = updated[secIdx].paragraphs.filter((_, idx) => idx !== pIdx);
    updated[secIdx].paragraphs = paras;
    setSections(updated);
  };

  // Image Upload Handler
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // If server upload fails, fallback to local FileReader data URL
      try {
        const res = await crmApi.uploadImage(file);
        if (res && res.url) {
          setImage(res.url);
          if (onShowToast) onShowToast('Image uploaded successfully!', 'success');
          return;
        }
      } catch (uploadErr) {
        console.warn('[Upload] Backend direct upload notice, falling back to data URL:', uploadErr);
      }

      const reader = new FileReader();
      reader.onload = (uploadEvt) => {
        setImage(uploadEvt.target.result);
        if (onShowToast) onShowToast('Featured image attached.', 'success');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Image processing failed', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Apply Gemini generated draft
  const handleApplyAiBlog = (aiData) => {
    if (!aiData) return;
    setTitle(aiData.title || title);
    if (aiData.slug) setSlug(aiData.slug);
    if (aiData.excerpt) setExcerpt(aiData.excerpt);
    if (aiData.intro) setIntro(aiData.intro);
    if (aiData.conclusion) setConclusion(aiData.conclusion);
    if (aiData.readTime) setReadTime(aiData.readTime);
    if (Array.isArray(aiData.tags) && aiData.tags.length > 0) setTags(aiData.tags);
    if (aiData.category) setCategory(aiData.category);
    if (Array.isArray(aiData.sections) && aiData.sections.length > 0) setSections(aiData.sections);
    if (aiData.seo_title) setSeoTitle(aiData.seo_title);
    if (aiData.seo_description) setSeoDescription(aiData.seo_description);
    if (aiData.seo_keywords) setSeoKeywords(aiData.seo_keywords);
    if (onShowToast) onShowToast('AI draft populated in editor! Review and save.', 'success');
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      if (onShowToast) onShowToast('Please enter an article title', 'error');
      return;
    }

    const targetSlug = slug.trim() || title.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
    const payload = {
      id: currentBlog?.id || ('blog-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7)),
      slug: targetSlug || ('article-' + Date.now()),
      title: title.trim(),
      category,
      section: category,
      excerpt: excerpt.trim(),
      content: content.trim(),
      intro: intro.trim(),
      conclusion: conclusion.trim(),
      sections,
      image,
      author,
      authorRole,
      author_role: authorRole,
      readTime,
      read_time: readTime,
      tags,
      status,
      is_featured: isFeatured ? 1 : 0,
      seo_title: seoTitle.trim() || title.trim(),
      seo_description: seoDescription.trim() || excerpt.trim(),
      seo_keywords: seoKeywords.trim(),
      published_at: status === 'Published' ? (currentBlog?.published_at || new Date().toISOString()) : null
    };

    setIsSaving(true);
    try {
      await onSave(payload, isEdit);
      onClose();
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Failed to save blog post', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-5 bg-[#0070ba]/5 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0070ba] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white font-display">
                  {isEdit ? 'Edit Blog Article' : 'Create New Article'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isEdit ? `Editing /blog/${slug}` : 'Author high-impact engineering, data & marketing insights'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAiModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0070ba] to-cyan-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Generate with Gemini</span>
                <span className="sm:hidden">AI Write</span>
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 sm:px-6 gap-2 sm:gap-4 shrink-0 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'content'
                  ? 'border-[#0070ba] text-[#0070ba] dark:text-cyan-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              1. Title & Intro
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sections')}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'sections'
                  ? 'border-[#0070ba] text-[#0070ba] dark:text-cyan-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              2. Structured Sections ({sections.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('seo')}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'seo'
                  ? 'border-[#0070ba] text-[#0070ba] dark:text-cyan-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              3. SEO & Metadata
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('publishing')}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'publishing'
                  ? 'border-[#0070ba] text-[#0070ba] dark:text-cyan-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              4. Media & Publishing
            </button>
          </div>

          {/* Form Form Body */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 text-left">
            {/* TAB 1: TITLE & INTRO */}
            {activeTab === 'content' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Article Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. How We Grew Organic Pipeline in 2026: The New B2B Playbook"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba] focus:bg-white dark:focus:bg-slate-900 shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      URL Slug <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 overflow-hidden px-3">
                      <span className="text-xs text-slate-400 font-mono">/blog/</span>
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full py-2.5 px-1 bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none font-mono"
                        placeholder="article-slug"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Category (Aligned with NeuOrzin Services)
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-bold focus:outline-none focus:border-[#0070ba] cursor-pointer"
                    >
                      <optgroup label="NeuOrzin Service Pillars">
                        {NEUORZIN_SERVICE_CATEGORIES.map(s => (
                          <option key={s.name} value={s.name}>{s.name} ({s.pillar})</option>
                        ))}
                      </optgroup>
                      {categories.filter(c => !NEUORZIN_SERVICE_CATEGORIES.some(s => s.name.toLowerCase() === c.name?.toLowerCase())).length > 0 && (
                        <optgroup label="Custom Taxonomy Categories">
                          {categories.filter(c => !NEUORZIN_SERVICE_CATEGORIES.some(s => s.name.toLowerCase() === c.name?.toLowerCase())).map(c => (
                            <option key={c.id || c.name} value={c.name}>{c.name}</option>
                          ))}
                        </optgroup>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Excerpt / Short Description (Displays on Blog Cards)
                  </label>
                  <textarea
                    rows={2}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Short punchy summary explaining the core takeaway..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Lead Intro Callout (Highlighted Opening Section)
                  </label>
                  <textarea
                    rows={3}
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                    placeholder="Engaging opening paragraphs introducing the context..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba]"
                  />
                </div>

                {/* Freeform Content Fallback */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Freeform Article Body (Alternative to Structured Sections)
                  </label>
                  <textarea
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Optional markdown or full body text if you prefer a continuous document..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba] font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: STRUCTURED SECTIONS */}
            {activeTab === 'sections' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Structured Content Chapters
                    </h4>
                    <p className="text-xs text-slate-500">
                      Build modular sections with headings, paragraphs, bold callout quotes, and checklists.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0070ba] border border-blue-200 dark:border-blue-900 text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Chapter</span>
                  </button>
                </div>

                {sections.length === 0 ? (
                  <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 text-xs space-y-2">
                    <p>No structured chapters yet.</p>
                    <button
                      type="button"
                      onClick={handleAddSection}
                      className="px-4 py-2 rounded-xl bg-[#0070ba] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Chapter 1
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {sections.map((sec, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <input
                            type="text"
                            value={sec.heading || ''}
                            onChange={(e) => handleUpdateSection(sIdx, 'heading', e.target.value)}
                            placeholder={`Chapter ${sIdx + 1} Heading...`}
                            className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba]"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSection(sIdx)}
                            className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors cursor-pointer"
                            title="Remove Chapter"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Paragraphs */}
                        <div className="space-y-2">
                          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                            Paragraphs
                          </label>
                          {(sec.paragraphs || ['']).map((p, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2">
                              <textarea
                                rows={2}
                                value={p}
                                onChange={(e) => handleParagraphChange(sIdx, pIdx, e.target.value)}
                                placeholder="Paragraph text..."
                                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#0070ba]"
                              />
                              {(sec.paragraphs || []).length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveParagraph(sIdx, pIdx)}
                                  className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => handleAddParagraph(sIdx)}
                            className="text-[11px] font-bold text-[#0070ba] hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Paragraph
                          </button>
                        </div>

                        {/* Optional Callout */}
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Pull Quote / Callout Box (Optional)
                          </label>
                          <input
                            type="text"
                            value={sec.callout || ''}
                            onChange={(e) => handleUpdateSection(sIdx, 'callout', e.target.value)}
                            placeholder="e.g. Traffic volume is a vanity metric; pipeline velocity is what matters."
                            className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 italic focus:outline-none focus:border-[#0070ba]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Conclusion Key Takeaway */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Conclusion & Key Takeaway
                  </label>
                  <textarea
                    rows={3}
                    value={conclusion}
                    onChange={(e) => setConclusion(e.target.value)}
                    placeholder="Concluding summary for executive readers..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba]"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: SEO & METADATA */}
            {activeTab === 'seo' && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-slate-800/50 border border-blue-200/80 dark:border-slate-700">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0070ba] mb-1 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Search Engine Snippet Preview</span>
                  </h4>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 truncate">
                      https://neuorzin.com/blog/{slug || 'article-slug'}
                    </div>
                    <div className="text-sm font-bold text-blue-800 dark:text-blue-300 leading-snug truncate">
                      {seoTitle || title || 'Article Title'}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {seoDescription || excerpt || 'Article excerpt and meta description designed for search engine snippets...'}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    SEO Meta Title (Recommended: &lt; 60 characters)
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Custom Google Search Title | NeuOrzin"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    SEO Meta Description (Recommended: 140 - 160 characters)
                  </label>
                  <textarea
                    rows={3}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="Meta description displayed on Google search results..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Keywords (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    placeholder="e.g. B2B SEO, Revenue Operations, AI Marketing, Snowflake"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba]"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: MEDIA & PUBLISHING */}
            {activeTab === 'publishing' && (
              <div className="space-y-6">
                {/* Featured Image */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Featured Photography Image
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                    <div className="sm:col-span-5">
                      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center">
                        {image ? (
                          <img
                            src={image}
                            alt="Featured Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'; }}
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-slate-400" />
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-7 space-y-3">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                          Direct Image URL
                        </span>
                        <input
                          type="url"
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba]"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                          Or Upload Image File (JPG, PNG, WEBP &lt; 5MB)
                        </span>
                        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isUploading ? 'Uploading...' : 'Choose File'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags Chip Manager */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Article Tags ({tags.length})
                  </label>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0070ba] dark:text-cyan-400 text-xs font-mono font-semibold"
                      >
                        #{t}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 max-w-sm">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add tag (e.g. Snowflake, RevOps)..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba]"
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3 py-1.5 rounded-lg bg-[#0070ba] text-white text-xs font-bold hover:bg-[#005c99] transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Author Info & Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Author Role / Title
                    </label>
                    <input
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Estimated Read Time
                    </label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="e.g. 6 min read"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba]"
                    />
                  </div>
                </div>

                {/* Publication Status & Featured Flag */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Publication Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#0070ba]"
                    >
                      <option value="Draft">Draft (Hidden from Public)</option>
                      <option value="Published">Published (Live on Public Website)</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0070ba] focus:ring-0 cursor-pointer"
                    />
                    <span>Highlight as Featured Article</span>
                  </label>
                </div>
              </div>
            )}

            {/* Modal Bottom Save Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0070ba] to-[#00a8ff] text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving Article...' : (isEdit ? 'Update Article' : 'Save Article')}</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Embedded Gemini AI Generator Modal */}
      <GeminiBlogGeneratorModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onApplyGeneratedBlog={handleApplyAiBlog}
        onShowToast={onShowToast}
        categories={categories}
      />
    </>
  );
}

export default BlogEditorModal;
