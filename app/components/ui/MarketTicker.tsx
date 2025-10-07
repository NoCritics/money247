'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchCryptoPrices, CryptoPrice } from '@/app/lib/api/coingecko';

export default function MarketTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [commodities, setCommodities] = useState([
    { name: 'GOLD', symbol: 'XAU', price: 2045.50, change: 1.2 },
    { name: 'SILVER', symbol: 'XAG', price: 24.85, change: -0.5 },
    { name: 'OIL', symbol: 'WTI', price: 78.30, change: 2.1 },
    { name: 'PLATINUM', symbol: 'XPT', price: 935.20, change: 0.8 },
  ]);

  const fiatPairs = [
    { pair: 'EUR/USD', rate: 1.0872, change: 0.15 },
    { pair: 'GBP/USD', rate: 1.2654, change: -0.08 },
    { pair: 'USD/JPY', rate: 149.32, change: 0.42 },
    { pair: 'USD/CNY', rate: 7.2455, change: 0.12 },
    { pair: 'USD/CHF', rate: 0.8765, change: -0.22 },
    { pair: 'AUD/USD', rate: 0.6543, change: 0.35 },
    { pair: 'USD/CAD', rate: 1.3542, change: 0.18 },
    { pair: 'USD/INR', rate: 83.25, change: 0.05 },
  ];

  useEffect(() => {
    const loadPrices = async () => {
      const cryptoData = await fetchCryptoPrices([
        'bitcoin', 'ethereum', 'solana', 'cardano', 'polkadot',
        'binancecoin', 'ripple', 'dogecoin', 'chainlink', 'avalanche-2',
        'matic-network', 'litecoin', 'uniswap', 'cosmos'
      ]);
      setPrices(cryptoData);
    };

    loadPrices();
    const interval = setInterval(loadPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  // Combine all assets for the ticker
  const allAssets = [
    ...prices.map(p => ({
      name: p.symbol.toUpperCase(),
      price: p.current_price,
      change: p.price_change_percentage_24h,
      type: 'crypto'
    })),
    ...commodities.map(c => ({
      name: c.symbol,
      price: c.price,
      change: c.change,
      type: 'commodity'
    })),
    ...fiatPairs.map(f => ({
      name: f.pair,
      price: f.rate,
      change: f.change,
      type: 'fiat'
    }))
  ];

  // Duplicate items for seamless loop
  const tickerItems = [...allAssets, ...allAssets];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-white/10 overflow-hidden">
      <div className="relative h-16 flex items-center">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{
            x: [0, '-50%']
          }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {tickerItems.map((asset, index) => (
            <div
              key={`${asset.name}-${index}`}
              className="flex items-center gap-3 px-4 py-2 rounded-lg glass-card-teal"
            >
              <span className="text-sm font-bold text-white">
                {asset.name}
              </span>
              <span className="text-sm font-semibold" style={{ color: '#00D4AA' }}>
                ${typeof asset.price === 'number' ? asset.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }) : '0.00'}
              </span>
              <span
                className={`text-xs font-medium ${
                  asset.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
