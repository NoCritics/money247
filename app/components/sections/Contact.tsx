'use client';

import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

export default function Contact() {
  return (
    <section className="pt-8 pb-40 px-6 w-full min-h-screen flex items-center justify-center relative">
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
          className="text-center mb-4"
          style={{ marginTop: '-48px' }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-white">
            Get in Touch
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mx-auto leading-loose text-center" style={{ maxWidth: '100%' }}>
            Ready to start your journey? Contact us today
          </p>
        </motion.div>

        <div style={{ marginTop: '100px' }}>
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
                    href="tel:+1234567890"
                    className="text-white hover:text-gradient-gold transition-colors text-lg"
                  >
                    +1 (234) 567-8900
                  </a>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-2">Support</div>
                  <p className="text-white text-lg">24/7 Live Chat Available</p>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-2">Location</div>
                  <p className="text-white text-lg leading-relaxed">Global Operations</p>
                  <p className="text-sm text-gray-400 mt-1">Serving 150+ Countries</p>
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
                <Button variant="gold" size="sm" className="w-full">
                  Get Started Now
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </GlassCard>
        </div>
      </div>
    </section>
  );
}
