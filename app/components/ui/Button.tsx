'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'gold' | 'teal' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  href?: string;
}

export default function Button({
  children,
  variant = 'gold',
  size = 'md',
  onClick,
  className = '',
  href
}: ButtonProps) {
  const sizeStyles = {
    sm: {
      paddingLeft: '24px',
      paddingRight: '24px',
      paddingTop: '10px',
      paddingBottom: '10px',
      fontSize: '14px',
    },
    md: {
      paddingLeft: '32px',
      paddingRight: '32px',
      paddingTop: '12px',
      paddingBottom: '12px',
      fontSize: '16px',
    },
    lg: {
      paddingLeft: '40px',
      paddingRight: '40px',
      paddingTop: '14px',
      paddingBottom: '14px',
      fontSize: '18px',
    }
  };

  const variantStyles = {
    gold: {
      backgroundColor: '#EEA800',
      color: '#000',
      fontWeight: '600',
      boxShadow: '0 0 20px rgba(238, 168, 0, 0.5), 0 0 40px rgba(238, 168, 0, 0.3)',
    },
    teal: {
      backgroundColor: '#00D4AA',
      color: '#000',
      fontWeight: '600',
      boxShadow: '0 0 25px rgba(0, 212, 170, 0.4)',
    },
    outline: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(20px)',
      border: '1px solid #EEA800',
      color: '#EEA800',
      fontWeight: '600',
    }
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`
        rounded-full
        transition-all
        duration-300
        cursor-pointer
        ${className}
      `}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size]
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.15, ease: "easeOut" }
      }}
    >
      {children}
    </Component>
  );
}
