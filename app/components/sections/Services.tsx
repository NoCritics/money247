'use client';

import { useState, useRef, MouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ServiceFeature {
  title: string;
  description: string;
}

interface Service {
  title: string;
  description: string;
  link: string;
  expandedContent: ServiceFeature[];
}

const services: Service[] = [
  {
    title: 'Currency Exchange',
    description: 'Competitive exchange rates for world currencies with 30-minute rate lock protection.',
    link: 'https://money24.kiev.ua/',
    expandedContent: [
      {
        title: 'Wide Currency Selection',
        description: 'Exchange world currencies at competitive market rates.'
      },
      {
        title: 'Fixed Rate',
        description: '30-minute rate lock to protect against sharp fluctuations.'
      },
      {
        title: 'Individual Rates',
        description: 'Special conditions provided for large transactions.'
      },
      {
        title: 'Secure Operations',
        description: 'Every transaction processed with the highest level of security and comfort.'
      }
    ]
  },
  {
    title: 'Money Transfers and Payments',
    description: 'Instant worldwide transfers with transparent fees and full auction support.',
    link: 'https://money24.kiev.ua/uslugi/mezhdunarodnye-perevody/',
    expandedContent: [
      {
        title: 'Instant Transfers',
        description: 'Send money worldwide in minutes.'
      },
      {
        title: 'SWIFT Payments',
        description: 'International settlements for goods, transport, and services.'
      },
      {
        title: 'Auction Payments',
        description: 'Complete support for transactions at foreign auto and goods auctions.'
      },
      {
        title: 'Transparent Fees',
        description: 'Clear pricing with no hidden charges.'
      }
    ]
  },
  {
    title: 'Collection and Cash Transportation',
    description: 'Reliable 24/7 cash collection across Ukraine and Europe with insured storage.',
    link: 'https://money24.kiev.ua/uslugi/perevody-po-ukraine/',
    expandedContent: [
      {
        title: 'Cash Collection',
        description: 'Reliable cash transportation across Ukraine and Europe 24/7.'
      },
      {
        title: 'Responsible Storage',
        description: 'Insured solutions for money, documents, and valuables.'
      },
      {
        title: 'Confidential Logistics',
        description: 'Discreet service for private and corporate clients.'
      },
      {
        title: 'Full Insurance',
        description: 'Complete protection for all transported assets.'
      }
    ]
  },
  {
    title: 'Deposits and Financing',
    description: 'High-yield deposits in multiple currencies with flexible withdrawal and global business financing.',
    link: 'https://money24.kiev.ua/',
    expandedContent: [
      {
        title: 'High-Yield Deposits',
        description: 'Accounts in national and foreign currency with top rates.'
      },
      {
        title: 'Flexible Withdrawal',
        description: 'Access your funds anytime without penalties.'
      },
      {
        title: 'Business Financing',
        description: 'Global solutions to support company growth and operations.'
      },
      {
        title: 'ManagerChecks (UAE)',
        description: 'Specialized instruments for real estate investments in Dubai and Abu Dhabi.'
      }
    ]
  },
  {
    title: 'Legal and Business Support',
    description: 'Comprehensive legal support for fund legalization and international business operations.',
    link: 'https://money24.kiev.ua/',
    expandedContent: [
      {
        title: 'Fund Legalization',
        description: 'Official channels for moving and protecting capital in Europe.'
      },
      {
        title: 'Regulatory Compliance',
        description: 'Consultations on taxes, finance, and legal requirements.'
      },
      {
        title: 'Corporate Support',
        description: 'Assistance for companies in Ukraine, EU, and UAE.'
      },
      {
        title: 'Individual Business Solutions',
        description: 'Comprehensive support for international operations.'
      }
    ]
  },
  {
    title: 'Cryptocurrency Services',
    description: 'Secure crypto trading with cold storage and full exchange integration support.',
    link: 'https://crypto-money24.com/',
    expandedContent: [
      {
        title: 'Buy and Sell Cryptocurrency',
        description: 'Reliable operations with leading digital assets.'
      },
      {
        title: 'Cold Storage',
        description: 'Maximum protection for long-term digital asset storage.'
      },
      {
        title: 'Exchange Integration',
        description: 'Full support for Binance, Coinbase, Kraken, KuCoin, and other platforms.'
      },
      {
        title: 'Expert Consultations',
        description: 'Legal and practical support for cryptocurrency transactions.'
      }
    ]
  }
];

interface ServiceCardProps {
  service: Service;
  index: number;
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

function ServiceCard({ service, index, isExpanded, onExpand, onCollapse }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30
  });

  // Reset rotation when card expands or collapses
  useEffect(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [isExpanded, mouseX, mouseY]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isExpanded) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(percentX);
    mouseY.set(percentY);
  };

  const handleMouseLeave = () => {
    if (!isExpanded) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleClick = () => {
    if (isExpanded) {
      // Reset rotation before collapsing
      mouseX.set(0);
      mouseY.set(0);
      onCollapse();
    } else {
      // Reset rotation before expanding
      mouseX.set(0);
      mouseY.set(0);
      onExpand();
    }
  };

  const expandedCardContent = isExpanded && mounted && (
    <>
      {/* Backdrop Overlay - appears first */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        style={{ zIndex: 99998 }}
        onClick={handleClick}
      />

      {/* Expanded Card Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="fixed inset-0 flex items-center justify-center p-8"
        style={{ pointerEvents: 'none', zIndex: 99999 }}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="glass-card rounded-2xl cursor-pointer relative overflow-hidden w-full max-w-4xl"
          style={{
            pointerEvents: 'auto',
            willChange: 'transform, opacity',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(238, 168, 0, 0.3)'
          }}
          onClick={handleClick}
        >
          {/* Expanded State - No opacity animation */}
          <div style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '40px', paddingBottom: '40px' }}>
            {/* Header */}
            <div className="flex items-start justify-between mb-10 pb-8">
              <div className="flex-1" style={{ paddingRight: '32px' }}>
                <h3 className="text-3xl md:text-4xl font-bold text-gold mb-4" style={{ paddingLeft: '8px', paddingRight: '8px' }}>
                  {service.title}
                </h3>
                <p className="text-gray-400 text-base md:text-lg leading-loose" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
                  {service.description}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-gold transition-colors flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onCollapse();
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Expanded Content - No staggered delays */}
            <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '40px' }}>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
                {service.expandedContent.map((feature) => (
                  <div
                    key={feature.title}
                    className="glass-card rounded-xl"
                    style={{ paddingLeft: '28px', paddingRight: '28px', paddingTop: '24px', paddingBottom: '24px' }}
                  >
                    <h4 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug" style={{ paddingLeft: '4px', paddingRight: '4px' }}>
                      {feature.title}
                    </h4>
                    <p className="text-gray-300 text-sm md:text-base leading-loose" style={{ paddingLeft: '8px', paddingRight: '8px' }}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Link - No delay */}
            <div className="pt-8 flex justify-center">
              <a
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 glass-card-gold rounded-xl text-white font-semibold hover:shadow-glow-gold transition-all duration-300"
                style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '16px', paddingBottom: '16px' }}
                onClick={(e) => e.stopPropagation()}
              >
                Visit Service Page
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );

  return (
    <>
      {/* Expanded card - rendered via portal at document body */}
      {mounted && createPortal(
        <AnimatePresence>
          {expandedCardContent}
        </AnimatePresence>,
        document.body
      )}

      {/* Collapsed card - rendered in grid */}
      <motion.div
        ref={cardRef}
        className="relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        animate={{
          opacity: isExpanded ? 0 : 1,
          scale: isExpanded ? 0.95 : 1,
          y: 0
        }}
        transition={{
          opacity: {
            delay: isExpanded ? 0 : index * 0.08,
            duration: isExpanded ? 0.25 : 0.6,
            ease: [0.22, 1, 0.36, 1]
          },
          scale: {
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1]
          },
          y: {
            delay: index * 0.08,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
        style={{
          zIndex: 1,
          perspective: 1000,
          pointerEvents: isExpanded ? 'none' : 'auto'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="glass-card rounded-2xl cursor-pointer relative overflow-hidden h-full"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
          whileHover={!isExpanded ? {
            y: -12,
            transition: {
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1]
            }
          } : {}}
          onClick={handleClick}
        >
          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 pointer-events-none"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Collapsed State */}
          <div className="flex flex-col h-full" style={{ transform: 'translateZ(50px)', paddingLeft: '32px', paddingRight: '32px', paddingTop: '36px', paddingBottom: '36px' }}>
            <div className="flex-1 flex flex-col">
              <div className="min-h-[80px] flex items-center justify-center mb-6">
                <h3 className="text-2xl font-bold leading-relaxed text-center text-gold" style={{ paddingLeft: '8px', paddingRight: '8px' }}>
                  {service.title}
                </h3>
              </div>

              <div className="min-h-[120px] mb-8">
                <p className="text-gray-300 text-base leading-loose text-center" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
                  {service.description}
                </p>
              </div>

              <div className="mt-auto pt-6 flex items-center justify-center">
                <span className="text-white font-semibold hover:text-gray-300 transition-colors inline-flex items-center gap-2">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default function Services() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <section className="px-6 w-full min-h-screen flex items-center justify-center relative" style={{ paddingTop: '220px', paddingBottom: '60px' }}>
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-white">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mx-auto leading-loose text-center">
            Everything you need for financial freedom
          </p>
        </motion.div>

        {/* Grid layout for cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr justify-items-center md:justify-items-stretch"
          style={{ marginTop: '40px' }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isExpanded={expandedCard === index}
              onExpand={() => setExpandedCard(index)}
              onCollapse={() => setExpandedCard(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
