import React, { useState, useEffect } from 'react';

export function Preloader({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1000);

    const completeTimer = setTimeout(() => {
      try {
        sessionStorage.setItem('neuorzin_preloaded', 'true');
      } catch (e) {}
      if (onComplete) onComplete();
    }, 1400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      id="preloader"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white transition-opacity duration-400 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-6">
        <img
          src="/assets/images/neuorzin-logo.png"
          alt="NeuOrzin"
          className="h-12 sm:h-16 w-auto object-contain drop-shadow-sm animate-pulse"
        />

        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#0070ba] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
            Loading NeuOrzin...
          </span>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
