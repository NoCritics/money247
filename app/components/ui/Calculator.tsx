'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchExchangeRates } from '@/app/lib/api/exchangeRate';

type Currency = {
  code: string;
  symbol: string;
  name: string;
};

const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
];

export default function Calculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'calculator' | 'currency'>('currency');
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Currency mode state
  const [fromCurrency, setFromCurrency] = useState<Currency>(CURRENCIES[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(CURRENCIES[1]);
  const [exchangeRates, setExchangeRates] = useState<any>(null);
  const [convertedAmount, setConvertedAmount] = useState<string>('0');

  // Fetch exchange rates
  useEffect(() => {
    const loadRates = async () => {
      const rates = await fetchExchangeRates();
      setExchangeRates(rates);
    };
    loadRates();
    const interval = setInterval(loadRates, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Update conversion when display or currencies change
  useEffect(() => {
    if (mode === 'currency' && exchangeRates) {
      const amount = parseFloat(display) || 0;
      const fromRate = fromCurrency.code === 'USD' ? 1 : exchangeRates.rates[fromCurrency.code];
      const toRate = toCurrency.code === 'USD' ? 1 : exchangeRates.rates[toCurrency.code];

      if (fromRate && toRate) {
        const result = (amount / fromRate) * toRate;
        setConvertedAmount(result.toFixed(2));
      }
    }
  }, [display, fromCurrency, toCurrency, exchangeRates, mode]);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        case '%':
          newValue = currentValue % inputValue;
          break;
        default:
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const Button = ({
    children,
    onClick,
    variant = 'default',
    className = ''
  }: {
    children: React.ReactNode;
    onClick: () => void;
    variant?: 'default' | 'operator' | 'equals' | 'clear';
    className?: string;
  }) => {
    const variantStyles = {
      default: {
        background: 'rgba(255, 255, 255, 0.05)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      },
      operator: {
        background: 'linear-gradient(to bottom right, rgba(0, 212, 170, 0.2), rgba(0, 212, 170, 0.1))',
        color: '#00D4AA',
        border: '1px solid rgba(0, 212, 170, 0.3)'
      },
      equals: {
        background: 'linear-gradient(to bottom right, #00D4AA, #00A885)',
        color: '#ffffff',
        border: 'none',
        boxShadow: '0 0 20px rgba(0, 212, 170, 0.4)'
      },
      clear: {
        background: 'rgba(255, 255, 255, 0.05)',
        color: '#EF4444',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }
    };

    return (
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={className}
        style={{
          height: '40px',
          borderRadius: '10px',
          fontWeight: 600,
          fontSize: '14px',
          transition: 'all 0.2s',
          cursor: 'pointer',
          ...variantStyles[variant]
        }}
      >
        {children}
      </motion.button>
    );
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 glass-card-teal border border-teal/30 hover:border-teal/50 transition-all duration-300"
        style={{
          zIndex: 9999,
          bottom: '80px',
          right: '16px',
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-teal"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="9" x2="9" y2="9.01" />
              <line x1="15" y1="9" x2="15" y2="9.01" />
              <line x1="9" y1="15" x2="9" y2="15.01" />
              <line x1="15" y1="15" x2="15" y2="15.01" />
            </>
          )}
        </svg>
      </motion.button>

      {/* Calculator Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
            className="fixed z-50 glass-card rounded-2xl shadow-2xl"
            style={{
              zIndex: 9998,
              bottom: '140px',
              right: '16px',
              width: '280px',
              paddingLeft: '18px',
              paddingRight: '18px',
              paddingTop: '16px',
              paddingBottom: '16px'
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 className="text-base font-bold text-gradient-teal">
                {mode === 'calculator' ? 'Calculator' : 'Currency Exchange'}
              </h3>
              <button
                onClick={() => setMode(mode === 'calculator' ? 'currency' : 'calculator')}
                className="text-[10px] text-teal hover:text-teal-light transition-colors"
                style={{ cursor: 'pointer' }}
              >
                {mode === 'calculator' ? '💱' : '🧮'}
              </button>
            </div>

            {/* Mode Toggle Tabs */}
            <div style={{ marginBottom: '12px', display: 'flex', gap: '6px', padding: '3px', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px' }}>
              <button
                onClick={() => setMode('currency')}
                className="transition-all duration-200"
                style={{
                  flex: 1,
                  padding: '6px 12px',
                  borderRadius: '7px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: mode === 'currency' ? 'rgba(0, 212, 170, 0.2)' : 'transparent',
                  color: mode === 'currency' ? '#00D4AA' : '#9CA3AF',
                  border: mode === 'currency' ? '1px solid rgba(0, 212, 170, 0.3)' : 'none',
                  cursor: 'pointer'
                }}
              >
                Currency
              </button>
              <button
                onClick={() => setMode('calculator')}
                className="transition-all duration-200"
                style={{
                  flex: 1,
                  padding: '6px 12px',
                  borderRadius: '7px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: mode === 'calculator' ? 'rgba(0, 212, 170, 0.2)' : 'transparent',
                  color: mode === 'calculator' ? '#00D4AA' : '#9CA3AF',
                  border: mode === 'calculator' ? '1px solid rgba(0, 212, 170, 0.3)' : 'none',
                  cursor: 'pointer'
                }}
              >
                Calculator
              </button>
            </div>

            {/* Display */}
            {mode === 'currency' ? (
              <motion.div
                className="bg-black/40 rounded-xl border border-white/5"
                style={{
                  marginBottom: '14px',
                  paddingLeft: '14px',
                  paddingRight: '14px',
                  paddingTop: '10px',
                  paddingBottom: '10px'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {/* From Currency */}
                <div style={{ marginBottom: '8px' }}>
                  <select
                    value={fromCurrency.code}
                    onChange={(e) => setFromCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[0])}
                    className="text-[10px] text-gray-400 bg-transparent border-none outline-none"
                    style={{ cursor: 'pointer', marginBottom: '3px' }}
                  >
                    {CURRENCIES.map(curr => (
                      <option key={curr.code} value={curr.code} style={{ background: '#0A0A0F' }}>
                        {curr.code} - {curr.name}
                      </option>
                    ))}
                  </select>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', gap: '3px' }}>
                    <span className="text-sm text-gray-400">{fromCurrency.symbol}</span>
                    <span className="text-lg font-bold text-white">{display}</span>
                  </div>
                </div>

                {/* Exchange Arrow */}
                <div className="flex justify-center" style={{ marginBottom: '8px' }}>
                  <button
                    onClick={() => {
                      const temp = fromCurrency;
                      setFromCurrency(toCurrency);
                      setToCurrency(temp);
                    }}
                    className="text-teal hover:text-teal-light transition-colors"
                    style={{ cursor: 'pointer' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" />
                    </svg>
                  </button>
                </div>

                {/* To Currency */}
                <div>
                  <select
                    value={toCurrency.code}
                    onChange={(e) => setToCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[1])}
                    className="text-xs text-gray-400 bg-transparent border-none outline-none"
                    style={{ cursor: 'pointer', marginBottom: '4px' }}
                  >
                    {CURRENCIES.map(curr => (
                      <option key={curr.code} value={curr.code} style={{ background: '#0A0A0F' }}>
                        {curr.code} - {curr.name}
                      </option>
                    ))}
                  </select>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', gap: '4px' }}>
                    <span className="text-lg text-gray-400">{toCurrency.symbol}</span>
                    <span className="text-2xl font-bold text-gradient-teal">{convertedAmount}</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="bg-black/40 rounded-xl border border-white/5"
                style={{
                  marginBottom: '20px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '18px',
                  paddingBottom: '18px'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-right text-3xl font-bold text-white truncate">
                  {display}
                </div>
                {operation && previousValue !== null && (
                  <div className="text-right text-sm text-gray-400" style={{ marginTop: '8px' }}>
                    {previousValue} {operation}
                  </div>
                )}
              </motion.div>
            )}

            {/* Buttons Grid */}
            <motion.div
              className="grid grid-cols-4"
              style={{ gap: '8px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Row 1 */}
              <Button onClick={clear} variant="clear">C</Button>
              <Button onClick={toggleSign}>+/-</Button>
              <Button onClick={percentage}>%</Button>
              <Button onClick={() => performOperation('÷')} variant="operator">÷</Button>

              {/* Row 2 */}
              <Button onClick={() => inputDigit('7')}>7</Button>
              <Button onClick={() => inputDigit('8')}>8</Button>
              <Button onClick={() => inputDigit('9')}>9</Button>
              <Button onClick={() => performOperation('×')} variant="operator">×</Button>

              {/* Row 3 */}
              <Button onClick={() => inputDigit('4')}>4</Button>
              <Button onClick={() => inputDigit('5')}>5</Button>
              <Button onClick={() => inputDigit('6')}>6</Button>
              <Button onClick={() => performOperation('-')} variant="operator">-</Button>

              {/* Row 4 */}
              <Button onClick={() => inputDigit('1')}>1</Button>
              <Button onClick={() => inputDigit('2')}>2</Button>
              <Button onClick={() => inputDigit('3')}>3</Button>
              <Button onClick={() => performOperation('+')} variant="operator">+</Button>

              {/* Row 5 */}
              <Button onClick={() => inputDigit('0')} style={{ gridColumn: 'span 2' }}>0</Button>
              <Button onClick={inputDecimal}>.</Button>
              <Button onClick={() => performOperation('=')} variant="equals">=</Button>
            </motion.div>

            {/* Footer */}
            <motion.div
              className="text-center text-[10px] text-gray-500"
              style={{ marginTop: '10px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              In Money We Trust
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
