'use client';

import { motion } from 'framer-motion';
import InfinitySymbol from '../ui/InfinitySymbol';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ paddingBottom: '120px' }}>
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1] // Custom cubic bezier for smooth ease-out
          }}
          className="flex justify-center mb-12"
        >
          <img
            src="/logo.png"
            alt="Money 24/7 Logo"
            className="w-[400px] md:w-[500px] h-auto glow-gold"
            style={{ filter: 'brightness(2.5) contrast(1.2)' }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] // Smooth ease-out
          }}
          className="text-2xl md:text-3xl text-gray-300 mb-10 tracking-wide leading-relaxed"
        >
          IN MONEY WE TRUST
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.9,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-xl md:text-2xl text-gray-400 mb-20 max-w-3xl mx-auto leading-relaxed"
        >
          Your Gateway to Financial Freedom
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button variant="gold" size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 1.6,
            ease: "easeOut"
          }}
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{ bottom: '-52px' }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-6 h-10 border-2 border-gold rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              className="w-1.5 h-1.5 bg-gold rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
