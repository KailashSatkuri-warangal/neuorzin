import React from 'react';
import { Modal } from './Modal';
import { Calendar, Clock, User, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export function ArticleModal({ article, isOpen, onClose, onOpenBooking }) {
  if (!article) return null;

  const imgSrc = article.image || '/assets/img/blog/1.jpg';
  const categoryText = article.category || 'Digital Marketing';
  const dateText = article.date || 'March 2026';
  const authorText = article.author || 'NeuOrzin Editorial';
  const authorRoleText = article.authorRole || 'Growth & Marketing Lead';
  const introText = article.intro || article.excerpt;
  const sections = article.sections || [];
  const conclusionText = article.conclusion;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={article.title} maxWidth="max-w-3xl">
      <div className="space-y-6 text-slate-900 dark:text-white">
        
        {/* Author & Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0070ba] dark:text-cyan-400 font-bold uppercase tracking-wider text-[10px]">
              {categoryText}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#0070ba]" /> {dateText}
            </span>
            {article.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#0070ba]" /> {article.readTime}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200">
            <User className="w-3.5 h-3.5 text-[#0070ba]" /> {authorText} • <span className="text-slate-500">{authorRoleText}</span>
          </div>
        </div>

        {/* Real Photography Banner */}
        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <img
            src={imgSrc}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Lead Intro Callout */}
        {introText && (
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm sm:text-base font-medium leading-relaxed">
            {introText}
          </div>
        )}

        {/* Human-Written Sections with Semantic HTML */}
        <div className="space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          {sections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-3 pt-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display border-b border-slate-100 dark:border-slate-800 pb-1.5">
                {sec.heading}
              </h3>
              
              {sec.paragraphs && sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {p}
                </p>
              ))}

              {sec.callout && (
                <div className="my-3 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border-l-4 border-[#0070ba] text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 italic">
                  "{sec.callout}"
                </div>
              )}

              {sec.list && (
                <ul className="space-y-2 pt-1 pl-1">
                  {sec.list.map((item, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#0070ba] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Conclusion */}
          {conclusionText && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Key Takeaway
              </h4>
              <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {conclusionText}
              </p>
            </div>
          )}
        </div>

        {/* Action Bottom Bar */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Written by <strong>{authorText}</strong> • NeuOrzin Growth Engineering
          </div>
          <button
            onClick={() => {
              onClose();
              if (onOpenBooking) onOpenBooking();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0070ba] hover:bg-[#005c99] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>Consult with Our Strategy Pod</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </Modal>
  );
}

export default ArticleModal;
