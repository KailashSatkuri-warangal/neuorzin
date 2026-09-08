import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export function ParallaxLayer({
  children,
  className = '',
  speed = 0.2, // -1 to 1: negative moves counter, positive moves with scroll
  offset = 40,
  direction = 'vertical'
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const range = offset * speed * 2;
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);
  const x = useTransform(scrollYProgress, [0, 1], [-range, range]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative will-change-transform ${className}`}>
      <motion.div
        style={{
          y: direction === 'vertical' ? y : 0,
          x: direction === 'horizontal' ? x : 0
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Parallax({ children, className = '', speed = 0.2, offset = 30 }) {
  return (
    <ParallaxLayer speed={speed} offset={offset} className={className}>
      {children}
    </ParallaxLayer>
  );
}
export default ParallaxLayer;
