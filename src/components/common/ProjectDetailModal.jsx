import React from 'react';
import { Modal } from './Modal';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function ProjectDetailModal({ project, isOpen, onClose, onBookCall }) {
  if (!project) return null;

  const imgSrc = project.image || project.img || '/assets/img/portfolio/1.jpg';
  const categoryText = project.category || project.tag || 'Cloud Architecture';
  const descriptionText = project.description || 'Enterprise architecture and development blueprint delivered with zero downtime and high execution velocity.';
  const deliverables = project.deliverables || [
    'Cloud-Native Microservices Architecture',
    'Automated CI/CD Deployment Pipeline',
    'Zero-Trust IAM Security Perimeters',
    'Real-Time Observability & Monitoring'
  ];
  const metrics = project.metrics || [
    { value: '+340%', label: 'Throughput' },
    { value: '99.99%', label: 'SLA Uptime' },
    { value: '-45%', label: 'Infra Cost' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.title} maxWidth="max-w-2xl">
      <div className="space-y-6 text-slate-900">
        <div className="relative h-60 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={imgSrc}
            alt={project.title}
            onError={(e) => { e.target.src = '/assets/img/portfolio/1.jpg'; }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4">
            <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#0070ba] px-3 py-1 rounded-md shadow-md">
              {categoryText}
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-base font-bold text-slate-900 font-display mb-2">Executive Summary</h4>
          <p className="text-slate-600 text-sm leading-relaxed">
            {descriptionText}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Key Results & Metrics</h4>
          <div className="grid grid-cols-3 gap-3">
            {metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div className="text-xl font-black text-[#0070ba] font-display">{m.value}</div>
                <div className="text-xs font-semibold text-slate-600 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Delivered Capabilities</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {deliverables.map((d, idx) => (
              <span key={idx} className="inline-flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {d}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">Delivered by NeuOrzin Engineering Pods</span>
          <button
            onClick={() => {
              onClose();
              if (onBookCall) onBookCall();
            }}
            className="px-5 py-2.5 rounded-full bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-[#0070ba]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            Discuss Similar Project <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ProjectDetailModal;
