import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export function CountUp({
  end,
  start = 0,
  duration = 1.4,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}) {
  const spanRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10px" });
  
  const numericEnd = typeof end === 'string' ? parseFloat(end.replace(/[^0-9.]/g, '')) || 0 : Number(end) || 0;
  const numericStart = Number(start) || 0;

  const formatVal = (val) => {
    if (decimals > 0) {
      return val.toFixed(decimals);
    }
    return Math.round(val).toLocaleString();
  };

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    if (!isInView) {
      el.textContent = `${prefix}${formatVal(numericStart)}${suffix}`;
      return;
    }

    let startTime = null;
    let animId;

    // Smooth cubic easing (glides smoothly from start to finish)
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      const eased = easeOutCubic(progress);
      
      const currentVal = numericStart + (numericEnd - numericStart) * eased;
      el.textContent = `${prefix}${formatVal(currentVal)}${suffix}`;

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        el.textContent = `${prefix}${formatVal(numericEnd)}${suffix}`;
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isInView, numericEnd, numericStart, duration, decimals, prefix, suffix]);

  return (
    <span ref={containerRef} className="inline-block">
      <span ref={spanRef} className={`tabular-nums font-inherit transition-colors ${className}`}>
        {prefix}{formatVal(numericStart)}{suffix}
      </span>
    </span>
  );
}

export default CountUp;
