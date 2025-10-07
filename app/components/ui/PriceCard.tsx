'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatPrice, formatPercentage } from '@/app/lib/utils/formatters';

interface PriceCardProps {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  sparkline?: number[];
  volume: number;
  marketCap: number;
  fdv: number | null;
  circulatingSupply: number;
  totalSupply: number | null;
}

export default function PriceCard({
  symbol,
  name,
  price,
  change24h,
  sparkline,
  volume,
  marketCap,
  fdv,
  circulatingSupply,
  totalSupply
}: PriceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isPositive = change24h >= 0;

  const formatLargeNumber = (num: number | null) => {
    if (num === null) return 'N/A';
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatSupply = (num: number | null) => {
    if (num === null) return 'N/A';
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(2);
  };

  return (
    <div
      className="w-[182px] md:w-[240px] h-[162px] md:h-[200px]"
      style={{ perspective: '1500px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.8,
          ease: [0.23, 1, 0.32, 1]
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 glass-card rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '16px',
            paddingBottom: '16px'
          }}
        >
          <div className="flex flex-col gap-3 md:gap-5" style={{ paddingLeft: '2px', paddingRight: '2px' }}>
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-bold leading-tight" style={{ color: '#EEA800' }}>{symbol.toUpperCase()}</h3>
              <div style={{ color: isPositive ? '#00D4AA' : '#EF4444' }}>
                <p className="text-xs font-semibold leading-tight">{formatPercentage(change24h)}</p>
              </div>
            </div>

            {/* Price */}
            <div className="py-0.5 md:py-1">
              <motion.p
                className="text-base md:text-lg font-bold text-white leading-tight"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                key={price}
              >
                {formatPrice(price)}
              </motion.p>
            </div>

            {/* Mini Sparkline */}
            {sparkline && sparkline.length > 0 && (
              <div className="h-12 md:h-16 relative mt-1 md:mt-2 overflow-hidden">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <polyline
                    points={sparkline
                      .map((price, i) => {
                        const x = (i / (sparkline.length - 1)) * 100;
                        const min = Math.min(...sparkline);
                        const max = Math.max(...sparkline);
                        const y = 100 - ((price - min) / (max - min)) * 100;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke={isPositive ? '#00D4AA' : '#EF4444'}
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 glass-card-teal rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            padding: '14px 16px'
          }}
        >
          <div className="flex flex-col h-full justify-center items-center">
            {/* Header */}
            <motion.div
              className="text-center mb-2 md:mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : -10 }}
              transition={{
                duration: 0.5,
                delay: isFlipped ? 0.3 : 0,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              <h3 className="text-xs md:text-sm font-bold text-white leading-tight">{name}</h3>
              <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">{symbol.toUpperCase()}</p>
            </motion.div>

            {/* Stats */}
            <div className="flex flex-col gap-2 md:gap-3 w-full">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 10 }}
                transition={{
                  duration: 0.5,
                  delay: isFlipped ? 0.35 : 0,
                  ease: [0.23, 1, 0.32, 1]
                }}
              >
                <p className="text-[10px] md:text-xs text-gray-400 mb-0.5 md:mb-1">Volume 24h</p>
                <p className="text-sm md:text-base font-bold text-teal leading-tight">{formatLargeNumber(volume)}</p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 10 }}
                transition={{
                  duration: 0.5,
                  delay: isFlipped ? 0.4 : 0,
                  ease: [0.23, 1, 0.32, 1]
                }}
              >
                <p className="text-[10px] md:text-xs text-gray-400 mb-0.5 md:mb-1">Market Cap</p>
                <p className="text-sm md:text-base font-bold text-gold leading-tight">{formatLargeNumber(marketCap)}</p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 10 }}
                transition={{
                  duration: 0.5,
                  delay: isFlipped ? 0.45 : 0,
                  ease: [0.23, 1, 0.32, 1]
                }}
              >
                <p className="text-[10px] md:text-xs text-gray-400 mb-0.5 md:mb-1">Fully Diluted Value</p>
                <p className="text-sm md:text-base font-bold text-white leading-tight">{formatLargeNumber(fdv)}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
