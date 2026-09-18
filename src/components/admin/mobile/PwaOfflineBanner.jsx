import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';

export default function PwaOfflineBanner({ onRetry }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) return null;

  return (
    <div className="sticky top-0 z-40 px-3 py-1.5 text-xs font-bold flex items-center justify-between transition-all duration-300">
      {!isOnline ? (
        <div className="w-full bg-amber-500 text-slate-900 px-3 py-1.5 rounded-2xl shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 shrink-0 animate-pulse" />
            <span className="text-[11px]">You're offline. Viewing cached CRM database.</span>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-2 py-0.5 rounded-lg bg-white text-slate-900 text-[10px] font-black shrink-0 cursor-pointer shadow-xs"
            >
              Retry
            </button>
          )}
        </div>
      ) : (
        <div className="w-full bg-emerald-500 text-white px-3 py-1.5 rounded-2xl shadow-md flex items-center gap-2 animate-in fade-in">
          <Wifi className="w-4 h-4 shrink-0" />
          <span className="text-[11px]">Back online! Live synchronization restored.</span>
        </div>
      )}
    </div>
  );
}
