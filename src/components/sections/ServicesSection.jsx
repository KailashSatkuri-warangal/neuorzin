import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  { icon: 'flaticon-target', title: 'Sales & Marketing Growth', desc: 'Performance funnels, programmatic SEO, lead generation, and CRM revenue automation.', href: '/services/sales-marketing' },
  { icon: 'flaticon-cogwheel', title: 'IT Design & Engineering', desc: 'Scalable web and mobile applications designed with modular micro-frontends.', href: '/services/product-engineering' },
  { icon: 'flaticon-analysis-1', title: 'Analytic Solutions', desc: 'Snowflake data warehousing, dbt transform models, and real-time dashboarding.', href: '/services/data-engineering' },
  { icon: 'flaticon-reduction', title: 'Cyber Security & Risk', desc: 'Comprehensive threat modeling, zero-trust enforcement, and compliance.', href: '/services/cloud-performance' },
  { icon: 'flaticon-interview', title: 'AI & Autonomous Swarms', desc: 'Production multi-agent workflows, vector pipelines, and sovereign LLMs.', href: '/services/ai-automation' },
  { icon: 'flaticon-sketch', title: 'Infrastructure & FinOps', desc: 'High-availability multi-region cloud tuning and Kubernetes clusters.', href: '/services/cloud-performance' }
];

export function ServicesSection() {
  return (
    <div className="services-area carousel-shadow default-padding-top bg-cover relative">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4>Services</h4>
              <h2 className="title">What we do</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {services.map((srv, idx) => (
            <div key={idx} className="col-lg-4 col-md-6 mb-4">
              <div className="item p-8 rounded-3xl bg-white dark:bg-[#111424] border border-slate-200 dark:border-slate-800 text-center shadow-sm hover:shadow-xl transition-all">
                <div className="icon mb-4">
                  <i className={srv.icon}></i>
                </div>
                <div className="info">
                  <h4 className="font-bold text-lg mb-2">
                    <Link to={srv.href} className="text-slate-900 dark:text-white hover:text-[#0070ba]">{srv.title}</Link>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{srv.desc}</p>
                  <Link to={srv.href} className="text-[#0070ba] font-bold"><i className="fas fa-angle-right"></i></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed-shape-bottom">
        <img src="/assets/img/shape/1.svg" alt="Shape" />
      </div>
    </div>
  );
}
export default ServicesSection;
