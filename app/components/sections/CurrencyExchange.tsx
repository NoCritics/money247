'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  buyRate: number;
  sellRate: number;
  vipBuyRate: number;
  vipSellRate: number;
}

const currencyRates: CurrencyRate[] = [
  { code: 'EUR', name: 'Euro', symbol: '€', buyRate: 23.90, sellRate: 24.60, vipBuyRate: 24.23, vipSellRate: 24.39 },
  { code: 'USD', name: 'US Dollar', symbol: '$', buyRate: 20.40, sellRate: 21.25, vipBuyRate: 20.75, vipSellRate: 21.05 },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', buyRate: 5.50, sellRate: 5.90, vipBuyRate: 5.55, vipSellRate: 5.85 },
  { code: 'GBP', name: 'British Pound', symbol: '£', buyRate: 27.00, sellRate: 28.60, vipBuyRate: 27.40, vipSellRate: 28.20 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', buyRate: 25.20, sellRate: 26.60, vipBuyRate: 25.40, vipSellRate: 26.40 },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', buyRate: 5.90, sellRate: 6.50, vipBuyRate: 6.00, vipSellRate: 6.40 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', buyRate: 12.90, sellRate: 14.80, vipBuyRate: 13.00, vipSellRate: 14.00 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', buyRate: 14.00, sellRate: 16.00, vipBuyRate: 14.40, vipSellRate: 15.80 },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', buyRate: 0.36, sellRate: 0.60, vipBuyRate: 0.40, vipSellRate: 0.55 },
];

export default function CurrencyExchange() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyRate>(currencyRates[0]);
  const [amountCZK, setAmountCZK] = useState<string>('25000');
  const [isVIP, setIsVIP] = useState(false);
  const [operation, setOperation] = useState<'buy' | 'sell'>('buy');

  const calculateExchange = () => {
    const amount = parseFloat(amountCZK) || 0;
    const rate = operation === 'buy'
      ? (isVIP ? selectedCurrency.vipBuyRate : selectedCurrency.buyRate)
      : (isVIP ? selectedCurrency.vipSellRate : selectedCurrency.sellRate);

    if (operation === 'buy') {
      // Buying foreign currency with CZK
      return (amount / rate).toFixed(2);
    } else {
      // Selling foreign currency for CZK
      return (amount * rate).toFixed(2);
    }
  };

  return (
    <section className="px-6 w-full min-h-screen flex items-center justify-center relative" style={{ paddingTop: '220px', paddingBottom: '60px' }}>
      {/* Section Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent" />

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
          className="mt-16 md:-mt-12 text-center mb-4"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-white">
            Currency Exchange
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mx-auto leading-loose text-center">
            VIP rates for amounts from 25,000 CZK
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8" style={{ marginTop: '100px' }}>
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard variant="default" style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '40px', paddingBottom: '40px', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <h3 className="text-2xl font-bold text-white" style={{ marginBottom: '32px' }}>Calculate Exchange</h3>

              {/* VIP Toggle */}
              <div className="flex items-center justify-between rounded-xl border border-white/10" style={{ padding: '16px 20px', marginBottom: '24px', background: 'rgba(255, 255, 255, 0.02)' }}>
                <span className="text-white font-semibold text-sm">VIP Rate (25,000+ CZK)</span>
                <button
                  onClick={() => setIsVIP(!isVIP)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    isVIP ? 'bg-gold' : 'bg-gray-600'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                    animate={{ x: isVIP ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Operation Toggle */}
              <div className="flex gap-3" style={{ marginBottom: '24px' }}>
                <button
                  onClick={() => setOperation('buy')}
                  className={`flex-1 rounded-xl font-semibold transition-all duration-300 text-sm border ${
                    operation === 'buy'
                      ? 'bg-gold text-white border-gold'
                      : 'border-white/10 text-gray-400'
                  }`}
                  style={{ padding: '14px 18px', background: operation === 'buy' ? '#EEA800' : 'rgba(255, 255, 255, 0.02)' }}
                >
                  Buy Currency
                </button>
                <button
                  onClick={() => setOperation('sell')}
                  className={`flex-1 rounded-xl font-semibold transition-all duration-300 text-sm border ${
                    operation === 'sell'
                      ? 'bg-gold text-white border-gold'
                      : 'border-white/10 text-gray-400'
                  }`}
                  style={{ padding: '14px 18px', background: operation === 'sell' ? '#EEA800' : 'rgba(255, 255, 255, 0.02)' }}
                >
                  Sell Currency
                </button>
              </div>

              {/* Currency Selection */}
              <div style={{ marginBottom: '24px' }}>
                <label className="block text-xs text-gray-400" style={{ paddingLeft: '4px', marginBottom: '10px' }}>Select Currency</label>
                <select
                  value={selectedCurrency.code}
                  onChange={(e) => setSelectedCurrency(currencyRates.find(c => c.code === e.target.value) || currencyRates[0])}
                  className="w-full rounded-xl text-white font-semibold outline-none cursor-pointer border border-white/10"
                  style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px 18px', fontSize: '15px' }}
                >
                  {currencyRates.map(currency => (
                    <option key={currency.code} value={currency.code} style={{ background: '#0A0A0F' }}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Input */}
              <div style={{ marginBottom: '32px' }}>
                <label className="block text-xs text-gray-400" style={{ paddingLeft: '4px', marginBottom: '10px' }}>
                  {operation === 'buy' ? 'Amount in CZK' : `Amount in ${selectedCurrency.code}`}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amountCZK}
                    onChange={(e) => setAmountCZK(e.target.value)}
                    className="w-full rounded-xl text-white font-bold outline-none border border-white/10"
                    style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px 18px', paddingRight: '60px', fontSize: '20px' }}
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
                    {operation === 'buy' ? 'Kč' : selectedCurrency.symbol}
                  </span>
                </div>
              </div>

              {/* Result */}
              <div className="rounded-xl border border-gold/30" style={{ padding: '20px 24px', background: 'rgba(238, 168, 0, 0.04)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
                <div className="text-xs text-gray-400 mb-2" style={{ paddingLeft: '2px' }}>
                  You {operation === 'buy' ? 'receive' : 'pay'}
                </div>
                <div className="flex items-baseline gap-2" style={{ paddingLeft: '2px', marginBottom: '10px' }}>
                  <span className="text-3xl font-bold text-gold">
                    {calculateExchange()}
                  </span>
                  <span className="text-lg text-gray-300 font-semibold">
                    {operation === 'buy' ? selectedCurrency.symbol : 'Kč'}
                  </span>
                </div>
                <div className="text-xs text-gray-400" style={{ paddingLeft: '2px' }}>
                  Rate: 1 {selectedCurrency.code} = {operation === 'buy'
                    ? (isVIP ? selectedCurrency.vipBuyRate : selectedCurrency.buyRate)
                    : (isVIP ? selectedCurrency.vipSellRate : selectedCurrency.sellRate)
                  } CZK
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Rate Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GlassCard variant="default" style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '32px', paddingBottom: '32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <h3 className="text-2xl font-bold mb-6 text-white">Exchange Rates</h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-gray-400 text-sm font-semibold">Currency</th>
                      <th className="text-right py-3 text-gray-400 text-sm font-semibold">Buy</th>
                      <th className="text-right py-3 text-gray-400 text-sm font-semibold">Sell</th>
                      <th className="text-right py-3 text-gold text-sm font-semibold">VIP Buy</th>
                      <th className="text-right py-3 text-gold text-sm font-semibold">VIP Sell</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currencyRates.map((currency, index) => (
                      <motion.tr
                        key={currency.code}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                          selectedCurrency.code === currency.code ? 'bg-gold/10' : ''
                        }`}
                        onClick={() => setSelectedCurrency(currency)}
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold">{currency.code}</span>
                            <span className="text-gray-500 text-sm">{currency.symbol}</span>
                          </div>
                        </td>
                        <td className="text-right text-white font-semibold">{currency.buyRate.toFixed(2)}</td>
                        <td className="text-right text-white font-semibold">{currency.sellRate.toFixed(2)}</td>
                        <td className="text-right text-gold font-semibold">{currency.vipBuyRate.toFixed(2)}</td>
                        <td className="text-right text-gold font-semibold">{currency.vipSellRate.toFixed(2)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 rounded-xl border border-gold/30" style={{ padding: '20px 24px', background: 'rgba(238, 168, 0, 0.04)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
                <p className="text-sm text-gray-300 leading-relaxed">
                  <span className="text-gold font-semibold">VIP rates</span> are available for transactions of 25,000 CZK and above.
                  Enjoy better exchange rates and premium service.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
