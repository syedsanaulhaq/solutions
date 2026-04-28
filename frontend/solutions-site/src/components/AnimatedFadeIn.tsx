'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedFadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function AnimatedFadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
}: AnimatedFadeInProps) {
  const prefersReduced = useReducedMotion();

  const offsets = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { y: 0, x: 24 },
    right: { y: 0, x: -24 },
    none: { y: 0, x: 0 },
  };

  const initial = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, ...offsets[direction] };

  const animate = { opacity: 1, y: 0, x: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: prefersReduced ? 0.15 : 0.5,
        delay: prefersReduced ? 0 : delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
