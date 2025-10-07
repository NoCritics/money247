'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PriceCard from '../ui/PriceCard';
import { fetchCryptoPrices, CryptoPrice } from '@/app/lib/api/coingecko';
import { fetchExchangeRates, ExchangeRate } from '@/app/lib/api/exchangeRate';

export default function MarketData() {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [crypto, fiat] = await Promise.all([
        fetchCryptoPrices([
          'bitcoin', 'ethereum', 'solana', 'cardano', 'polkadot',
          'matic-network', 'avalanche-2', 'chainlink', 'uniswap', 'litecoin'
        ]),
        fetchExchangeRates()
      ]);
      setCryptoPrices(crypto);
      setExchangeRates(fiat);
      setLoading(false);
    };

    loadData();

    // Update every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-8 pb-40 px-6 w-full min-h-screen flex items-center justify-center relative">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-center mb-4"
          style={{ marginTop: '-48px' }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-white">
            Live Market Data
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mx-auto leading-loose text-center" style={{ maxWidth: '100%' }}>
            Real-time cryptocurrency and fiat exchange rates
          </p>
        </motion.div>

        {/* Crypto Cards */}
        {loading ? (
          <div className="flex justify-center items-center h-64" style={{ marginTop: '100px' }}>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#EEA800' }}></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16 justify-items-center" style={{ marginTop: '100px' }}>
              {cryptoPrices.map((crypto, index) => (
                <motion.div
                  key={crypto.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <PriceCard
                    symbol={crypto.symbol}
                    name={crypto.name}
                    price={crypto.current_price}
                    change24h={crypto.price_change_percentage_24h}
                    sparkline={crypto.sparkline_in_7d?.price.slice(-24)}
                    volume={crypto.total_volume}
                    marketCap={crypto.market_cap}
                    fdv={crypto.fully_diluted_valuation}
                    circulatingSupply={crypto.circulating_supply}
                    totalSupply={crypto.total_supply}
                  />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
