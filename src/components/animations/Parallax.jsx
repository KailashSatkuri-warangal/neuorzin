import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export function Parallax({
  children,
  offset = 20,
  className = '',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  if (shouldReduceMotion) {
    return <div className={className} {...props}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative ${className}`} {...props}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
export default Parallax;
