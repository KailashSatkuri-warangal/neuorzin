import React, { useState } from 'react';

const team = [
  { img: '/assets/img/team/1.jpg', name: 'Sporia Deko', role: 'Marketing Lead' },
  { img: '/assets/img/team/6.jpg', name: 'Adhom Jonam', role: 'Project Manager' },
  { img: '/assets/img/team/3.jpg', name: 'Turka Pruda', role: 'CEO, Co-Founder' }
];

export function TeamSection() {
  const [activeShare, setActiveShare] = useState(null);

  return (
    <div className="team-area default-padding py-16 sm:py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h5 className="text-[#0070ba] font-bold text-xs uppercase tracking-widest mb-2">Expert Team</h5>
          <h2 className="title text-3xl sm:text-4xl font-black text-slate-900 font-display">
            Meet Our Leadership
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => {
            const isShared = activeShare === idx;
            return (
              <div key={idx} className="group">
                <div className="rounded-3xl bg-white border border-slate-100 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  
                  {/* Photo with Social Overlay */}
                  <div className="relative aspect-[4/4.5] overflow-hidden bg-slate-100">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="social absolute top-4 right-4 z-20 flex flex-col items-center gap-2">
                      <button
                        onClick={() => setActiveShare(isShared ? null : idx)}
                        className="w-9 h-9 rounded-full bg-[#0070ba] text-white flex items-center justify-center text-xs shadow-md hover:bg-[#005a96] transition-colors cursor-pointer"
                        aria-label="Toggle social share"
                      >
                        <i className={`fas ${isShared ? 'fa-times' : 'fa-plus'}`}></i>
                      </button>
                      {isShared && (
                        <div className="flex flex-col gap-2 animate-fade-in">
                          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shadow-md">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs shadow-md">
                            <i className="fab fa-twitter"></i>
                          </a>
                          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs shadow-md">
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Info - generous padding so no text is clipped */}
                  <div className="p-6 text-center bg-white">
                    <h4 className="font-bold text-lg text-slate-900 font-display">{member.name}</h4>
                    <span className="text-xs font-bold text-[#0070ba] uppercase tracking-wider mt-1 block">
                      {member.role}
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default TeamSection;
