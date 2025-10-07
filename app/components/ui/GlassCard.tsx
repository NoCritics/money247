'use client';

import { motion } from 'framer-motion';
import { ReactNode, CSSProperties } from 'react';

interface GlassCardProps {
  children: ReactNode;
  variant?: 'default' | 'gold' | 'teal';
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
}

export default function GlassCard({
  children,
  variant = 'default',
  className = '',
  hover = true,
  style
}: GlassCardProps) {
  const baseClass = variant === 'gold'
    ? 'glass-card-gold'
    : variant === 'teal'
      ? 'glass-card-teal'
      : 'glass-card';

  return (
    <motion.div
      className={`${baseClass} rounded-2xl p-10 ${className}`}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={hover ? {
        y: -8,
        transition: {
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }
      } : {}}
    >
      {children}
    </motion.div>
  );
}
