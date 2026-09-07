import React from 'react';
import { Modal } from './Modal';
import { Clock, Calendar, User } from 'lucide-react';

export function ArticleModal({ article, isOpen, onClose }) {
  if (!article) return null;

  const imgSrc = article.image || article.img || '/assets/img/blog/1.jpg';
  const categoryText = article.category || article.cat || 'Technology';
  const dateText = article.date || 'August 2026';
  const authorText = article.author || 'NeuOrzin Engineering';
  const excerptText = article.excerpt || article.title || 'Technical insight and engineering methodology.';
  const contentText = article.content || `
    Enterprises today face increasing demands to accelerate time-to-market while reducing operational complexity.
    
    By adopting modern cloud-native architectures, modular microservices, and AI-driven automation workflows, development teams can scale reliably without accumulating technical debt.
    
    Key takeaways from this architecture:
    1. Resilient event-driven streaming with automated failovers.
    2. Zero-trust security perimeters for all external and internal API interactions.
    3. Continuous telemetry and real-time observability across all microservices.
  `;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={article.title} maxWidth="max-w-2xl">
      <div className="space-y-6 text-slate-900">
        <div className="flex items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-3">
          <span className="text-[#0070ba] font-bold uppercase">{categoryText}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#0070ba]" /> {dateText}</span>
          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#0070ba]" /> {authorText}</span>
        </div>

        <div className="relative h-60 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={imgSrc}
            alt={article.title}
            onError={(e) => { e.target.src = '/assets/img/blog/1.jpg'; }}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-none text-slate-600 text-sm leading-relaxed space-y-4 whitespace-pre-line">
          <p className="text-base text-slate-800 font-semibold">{excerptText}</p>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">{contentText}</div>
        </div>
      </div>
    </Modal>
  );
}

export default ArticleModal;
