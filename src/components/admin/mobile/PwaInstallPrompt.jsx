import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if dismissed previously within 7 days
    const dismissed = localStorage.getItem('neuorzin_pwa_install_dismissed');
    if (dismissed && Date.now() - parseInt(dismissed, 10) < 7 * 24 * 60 * 60 * 1000) {
      return;
    }

    // Check if running in standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) {
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // If iOS Safari, show prompt after 3 seconds
    if (isIosDevice) {
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('neuorzin_pwa_install_dismissed', Date.now().toString());
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:hidden max-w-sm mx-auto animate-in slide-in-from-bottom duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-3xl p-4 shadow-2xl border border-slate-700/80 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/neuorzin-icon.png"
              alt="NeuOrzin"
              className="w-10 h-10 rounded-2xl object-contain bg-white/10 p-1 border border-white/20 shrink-0"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/assets/img/logo-icon.png";
              }}
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-black text-white">Install NeuOrzin CRM</h4>
                <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 text-[8px] font-bold">
                  App
                </span>
              </div>
              <p className="text-[10px] text-slate-300 line-clamp-1">
                Fast native experience with offline access
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isIOS ? (
          <div className="text-[10px] text-blue-200 bg-white/10 p-2.5 rounded-2xl border border-white/10 leading-relaxed">
            Tap the <span className="font-bold underline">Share</span> button in Safari, then select <span className="font-bold underline">"Add to Home Screen"</span>.
          </div>
        ) : (
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleInstall}
              className="flex-1 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/30 cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
            <button
              onClick={handleDismiss}
              className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold cursor-pointer"
            >
              Not Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
