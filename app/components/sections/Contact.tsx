'use client';

import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

export default function Contact() {
  return (
    <section className="px-6 w-full min-h-screen flex items-center justify-center relative" style={{ paddingTop: '220px', paddingBottom: '60px' }}>
      {/* Section Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
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
            Get in Touch
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mx-auto leading-loose text-center" style={{ maxWidth: '100%' }}>
            Ready to start your journey? Contact us today
          </p>
        </motion.div>

        <div style={{ marginTop: '50px' }}>
        <GlassCard variant="default" className="" style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '36px', paddingBottom: '36px' }}>
          <div className="grid md:grid-cols-2 gap-16" style={{ paddingLeft: '4px', paddingRight: '4px' }}>
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <h3 className="text-2xl font-bold mb-8 text-white">Contact Information</h3>

              <div className="space-y-8">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Email</div>
                  <a
                    href="mailto:info@money247.com"
                    className="text-white hover:text-gradient-gold transition-colors text-lg"
                  >
                    info@money247.com
                  </a>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-2">Phone</div>
                  <a
                    href="tel:+420775001055"
                    className="text-white hover:text-gradient-gold transition-colors text-lg"
                  >
                    +420 775-001-055
                  </a>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-2">Location</div>
                  <p className="text-white text-lg leading-relaxed">Sokolovská 87/95</p>
                  <p className="text-white text-lg leading-relaxed">Karlín, 186 00 Prague</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="flex flex-col justify-center items-center text-center"
            >
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-6 text-white leading-relaxed">Ready to Start?</h3>
                <p className="text-gray-400 leading-loose text-base px-2">
                  Join thousands of users worldwide who trust Money 24/7 for their financial needs.
                </p>
              </div>

              <div className="flex flex-col gap-5 w-full">
                <motion.a
                  href="https://t.me/Exchange1913"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl font-bold text-center flex items-center justify-center gap-3 transition-all duration-300 border-2 border-gold text-white hover:bg-gold/10"
                  style={{
                    padding: '14px 20px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    boxShadow: '0 2px 8px rgba(238, 168, 0, 0.15)'
                  }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.53 3.67-.52.36-.99.54-1.42.53-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.03-.74 4.04-1.76 6.74-2.92 8.09-3.49 3.85-1.61 4.65-1.89 5.18-1.9.11 0 .37.03.54.17.14.12.18.27.2.38.02.08.04.29.02.45z" />
                  </svg>
                  Message on Telegram
                </motion.a>
              </div>
            </motion.div>
          </div>
        </GlassCard>
        </div>
      </div>
    </section>
  );
}
