import React from 'react';
import { Link } from 'react-router-dom';

export function FeaturesSection({ onOpenBooking, onOpenVideo }) {
  return (
    <div className="features-area overflow-hidden bg-gray default-padding">
      <div className="fixed-shape shape left bottom">
        <img src="/assets/img/shape/3.png" alt="Shape" />
      </div>
      <div className="container">
        <div className="row align-center">
          <div className="col-lg-5 why-us">
            <h5 className="text-[#0070ba] font-bold text-xs uppercase tracking-wider mb-2">why choose us</h5>
            <h2 className="title text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight font-display mb-4">
              Custom IT Solutions for Your Business
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
              We eliminate technical debt and architect enterprise-grade systems with high execution velocity. From sovereign AI agent swarms to petabyte data lakes, our solutions ensure uptime, compliance, and ROI.
            </p>
            <button
              onClick={onOpenVideo || onOpenBooking}
              className="popup-youtube relative theme video-play-button cursor-pointer flex items-center gap-3"
            >
              <i className="fa fa-play"></i> <span>Video Showcase</span>
            </button>
          </div>
          <div className="col-lg-7 features-box text-center">
            <div className="row">
              <div className="col-lg-6 col-md-6 item-grid">
                <div className="item">
                  <i className="flaticon-cogwheel"></i>
                  <h5><Link to="/services">IT Consultancy</Link></h5>
                  <p>Strategic systems modernization and technology stack audits.</p>
                </div>
                <div className="item">
                  <i className="flaticon-globe-grid"></i>
                  <h5><Link to="/services">Cyber Security</Link></h5>
                  <p>Zero-trust perimeters and automated vulnerability mitigation.</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 item-grid">
                <div className="item">
                  <i className="flaticon-cloud-storage"></i>
                  <h5><Link to="/services">Cloud Computing</Link></h5>
                  <p>Multi-region AWS/GCP deployments and FinOps cost tuning.</p>
                </div>
                <div className="item">
                  <i className="flaticon-backup"></i>
                  <h5><Link to="/services">Backup & Recovery</Link></h5>
                  <p>Instant failover mechanisms and disaster recovery SLA.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FeaturesSection;
