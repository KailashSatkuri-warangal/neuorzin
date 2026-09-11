import React from 'react';

const brands = [
  { name: 'Global Tech 1', logo: '/assets/images/clients/1.png', fallback: 'GLOBAL 01' },
  { name: 'Enterprise Hub', logo: '/assets/images/clients/2.png', fallback: 'ENTERPRISE' },
  { name: 'NextWave Cloud', logo: '/assets/images/clients/3.png', fallback: 'NEXTWAVE' },
  { name: 'Apex Systems', logo: '/assets/images/clients/4.png', fallback: 'APEX SYS' },
  { name: 'Vanguard AI', logo: '/assets/images/clients/5.png', fallback: 'VANGUARD' },
  { name: 'Quantum Core', logo: '/assets/images/clients/6.png', fallback: 'QUANTUM' },
  { name: 'Starlight Media', logo: '/assets/images/clients/01.png', fallback: 'STARLIGHT' },
  { name: 'Matrix Logic', logo: '/assets/images/clients/02.png', fallback: 'MATRIX' },
];

export function BrandMarquee() {
  return (
    <section className="py-8 sm:py-10 bg-slate-50 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
          We worked with global largest brands & scaling startups
        </h4>
      </div>

      <div className="relative w-full flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <div className="flex items-center gap-12 sm:gap-16 animate-marquee shrink-0 whitespace-nowrap pr-12">
          {brands.concat(brands).map((b, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 px-4 py-2"
            >
              <img
                src={b.logo}
                alt={b.name}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'inline-block';
                }}
                className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-all"
              />
              <span className="hidden text-sm font-extrabold tracking-widest text-slate-400 font-display">
                {b.fallback}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
