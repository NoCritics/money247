'use client';

import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

export default function About() {
  return (
    <section className="px-6 w-full min-h-screen flex items-center justify-center relative" style={{ paddingTop: '120px', paddingBottom: '160px' }}>
      {/* Section Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black-700/30 to-transparent" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="mt-16 md:-mt-12 text-center mb-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 leading-tight text-white">
            About Money <span style={{ fontFamily: 'Poltab, -apple-system, sans-serif' }}>24/7</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mx-auto leading-loose text-center" style={{ maxWidth: '100%' }}>
            Your trusted gateway to digital finance
          </p>
        </div>

        <div className="max-w-5xl mx-auto" style={{ marginTop: '100px' }}>
          <GlassCard variant="default" className="" style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '36px', paddingBottom: '36px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <p className="text-xl text-gray-300 mb-12 leading-loose" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
              Money 24/7 is an international financial company operating on the principles of speed,
              reliability, and security 24/7. We provide clients with a wide range of solutions: from
              currency exchange and transfers to cryptocurrency operations, deposits, legal support,
              and VIP concierge services.
            </p>
            <p className="text-xl text-gray-300 mb-12 leading-loose" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
              Expanding our presence in Europe and beyond, Money 24/7 combines the stability of
              traditional finance with the innovation of digital assets and premium lifestyle services.
            </p>
            <p className="text-xl text-gray-300 leading-loose" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
              <span className="font-semibold" style={{ color: '#EEA800' }}>Our mission</span> is to make
              financial operations convenient, secure, and stress-free for everyone: private clients,
              businesses, and investors. We create confidence that your money and assets are in reliable
              hands, protected by trust, speed, and professionalism — 24/7.
            </p>
          </motion.div>
          </GlassCard>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8" style={{ marginTop: '64px' }}>
          {[
            { value: '$1.2B+', label: 'Trading Volume' },
            { value: '50K+', label: 'Active Users' },
            { value: '150+', label: 'Countries' },
            { value: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                delay: index * 0.12,
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1] // Bouncy ease for stats
              }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
