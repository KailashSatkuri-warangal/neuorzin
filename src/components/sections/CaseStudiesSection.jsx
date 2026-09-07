import React from 'react';

const cases = [
  { img: '/assets/img/portfolio/1.jpg', title: 'Cyber Security', tag: 'Technology / Cloud' },
  { img: '/assets/img/portfolio/2.jpg', title: 'IT Consultancy', tag: 'Architecture / Fintech' },
  { img: '/assets/img/portfolio/4.jpg', title: 'Analysis of Security', tag: 'DevSecOps / AI' },
  { img: '/assets/img/portfolio/3.jpg', title: 'Social Media App', tag: 'Scalability / Web3' }
];

export function CaseStudiesSection({ onSelectProject }) {
  return (
    <div className="case-studies-area half-bg default-padding-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4>Case Studies</h4>
              <h2 className="title">Our Work Showcase</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {cases.map((cs, idx) => (
            <div key={idx} className="col-lg-3 col-md-6 mb-4">
              <div className="item rounded-2xl overflow-hidden shadow-md group relative bg-slate-900 cursor-pointer" onClick={() => onSelectProject && onSelectProject(cs)}>
                <div className="thumb aspect-[4/5] overflow-hidden">
                  <img src={cs.img} alt={cs.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="info p-4 bg-white dark:bg-[#111424] flex items-center justify-between">
                  <div className="left-info">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{cs.title}</h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{cs.tag}</span>
                  </div>
                  <div className="right-info">
                    <span className="w-7 h-7 rounded-full bg-[#0070ba] text-white flex items-center justify-center text-xs">
                      <i className="fas fa-plus"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default CaseStudiesSection;
