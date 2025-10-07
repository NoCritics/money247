'use client';

import { motion } from 'framer-motion';

interface InfinitySymbolProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function InfinitySymbol({
  size = 200,
  className = '',
  animate = true
}: InfinitySymbolProps) {
  return (
    <motion.svg
      width={size}
      height={size * 0.4}
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animate ? 'animate-pulse-glow' : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <path
        d="M50 40C50 51.0457 41.0457 60 30 60C18.9543 60 10 51.0457 10 40C10 28.9543 18.9543 20 30 20C41.0457 20 50 28.9543 50 40Z"
        stroke="url(#gradient-gold)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M150 40C150 51.0457 141.046 60 130 60C118.954 60 110 51.0457 110 40C110 28.9543 118.954 20 130 20C141.046 20 150 28.9543 150 40Z"
        stroke="url(#gradient-teal)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M50 40C50 40 70 20 100 40C130 60 150 40 150 40"
        stroke="url(#gradient-center)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <linearGradient id="gradient-gold" x1="10" y1="40" x2="50" y2="40">
          <stop offset="0%" stopColor="#EEA800" />
          <stop offset="100%" stopColor="#FFB820" />
        </linearGradient>
        <linearGradient id="gradient-teal" x1="110" y1="40" x2="150" y2="40">
          <stop offset="0%" stopColor="#00D4AA" />
          <stop offset="100%" stopColor="#1FFFDB" />
        </linearGradient>
        <linearGradient id="gradient-center" x1="50" y1="40" x2="150" y2="40">
          <stop offset="0%" stopColor="#EEA800" />
          <stop offset="50%" stopColor="#00D4AA" />
          <stop offset="100%" stopColor="#1FFFDB" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}
