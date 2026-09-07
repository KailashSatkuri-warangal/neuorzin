import React from 'react';
import { Link } from 'react-router-dom';

export function FeaturedServicesSection() {
  return (
    <div className="featured-services-area pt-md-120 text-center default-padding-bottom bottom-less bg-white dark:bg-[#0b0d18] relative transition-colors">
      <div className="fixed-shape-left-top absolute top-0 left-0 opacity-40 pointer-events-none">
        <img src="/assets/img/shape/7.png" alt="Shape" />
      </div>
      <div className="container relative z-10">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center mb-16">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0070ba] dark:text-cyan-400 mb-2">
                Featured Services
              </h4>
              <h2 className="title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display">
                Engaging Creative <br /> minds via technology
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container relative z-10">
        <div className="row">
          <div className="single-item col-lg-3 col-md-6 mb-6">
            <div className="item p-8 rounded-3xl bg-slate-50 dark:bg-[#111424] border border-slate-200 dark:border-slate-800 text-center shadow-sm hover:shadow-xl hover:border-[#0070ba]/50 transition-all">
              <i className="flaticon-cogwheel text-4xl text-[#0070ba] mb-4 block"></i>
              <h5 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                <Link to="/services">IT Consultancy</Link>
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Astonished set expression solicitude way admiration.
              </p>
            </div>
          </div>
          <div className="single-item col-lg-3 col-md-6 mb-6">
            <div className="item p-8 rounded-3xl bg-slate-50 dark:bg-[#111424] border border-slate-200 dark:border-slate-800 text-center shadow-sm hover:shadow-xl hover:border-[#0070ba]/50 transition-all">
              <i className="flaticon-cloud-storage text-4xl text-[#0070ba] mb-4 block"></i>
              <h5 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                <Link to="/services">Cloud Computing</Link>
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Astonished set expression solicitude way admiration.
              </p>
            </div>
          </div>
          <div className="single-item col-lg-3 col-md-6 mb-6">
            <div className="item p-8 rounded-3xl bg-slate-50 dark:bg-[#111424] border border-slate-200 dark:border-slate-800 text-center shadow-sm hover:shadow-xl hover:border-[#0070ba]/50 transition-all">
              <i className="flaticon-globe-grid text-4xl text-[#0070ba] mb-4 block"></i>
              <h5 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                <Link to="/services">Cyber Security</Link>
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Astonished set expression solicitude way admiration.
              </p>
            </div>
          </div>
          <div className="single-item col-lg-3 col-md-6 mb-6">
            <div className="item p-8 rounded-3xl bg-slate-50 dark:bg-[#111424] border border-slate-200 dark:border-slate-800 text-center shadow-sm hover:shadow-xl hover:border-[#0070ba]/50 transition-all">
              <i className="flaticon-backup text-4xl text-[#0070ba] mb-4 block"></i>
              <h5 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                <Link to="/services">Backup Recovery</Link>
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Astonished set expression solicitude way admiration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FeaturedServicesSection;
