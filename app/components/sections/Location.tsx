'use client';

import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

export default function Location() {
  const googleMapsUrl = 'https://www.google.com/maps/place/Sokolovská+87%2F95,+186+00+Karlín,+Czechia/@50.0930661,14.4520823,17z';
  const googleMapsEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.4537623534825!2d14.449893!3d50.093066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94c2b8c6c8c9%3A0x5c5c5c5c5c5c5c5c!2zU29rb2xvdnNrw6EgODcvOTUsIDE4NiAwMCBLYXJsw61u!5e0!3m2!1sen!2scz!4v1234567890123!5m2!1sen!2scz';

  return (
    <section className="px-6 w-full min-h-screen flex items-center justify-center relative" style={{ paddingTop: '220px', paddingBottom: '60px' }}>
      {/* Section Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-transparent" />

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
            Visit Us
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mx-auto leading-loose text-center">
            Find us in the heart of Prague
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8" style={{ marginTop: '50px' }}>
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <GlassCard
              variant="default"
              className="relative overflow-hidden"
              style={{ paddingLeft: '0', paddingRight: '0', paddingTop: '0', paddingBottom: '0', minHeight: '500px' }}
            >
              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="500"
                style={{ border: 0, display: 'block', filter: 'grayscale(30%) brightness(0.9)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Money 24/7 Location Map"
              />
            </GlassCard>
          </motion.div>

          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GlassCard variant="default" style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '40px', paddingBottom: '40px', height: '500px', display: 'flex', flexDirection: 'column' }}>
              <h3 className="text-3xl font-bold mb-8 text-white">Our Office</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Address */}
                <div className="glass-card rounded-xl" style={{ padding: '20px', height: '96px' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Address</p>
                      <p className="text-lg font-semibold text-white mb-1">Sokolovská 87/95</p>
                      <p className="text-sm text-gray-300">Karlín, 186 00 Prague</p>
                    </div>
                  </div>
                </div>

                {/* Transit Info */}
                <div className="glass-card rounded-xl" style={{ padding: '20px', height: '96px' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Metro Station</p>
                      <p className="text-lg font-semibold text-white mb-1">Křižíkova (Line B)</p>
                      <p className="text-sm text-gray-300">5 minute walk</p>
                    </div>
                  </div>
                </div>

                {/* Open Hours */}
                <div className="glass-card rounded-xl" style={{ padding: '20px', height: '96px' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Open Hours</p>
                      <p className="text-sm font-semibold text-white mb-1">Mon - Fri 9:00 - 19:00</p>
                      <p className="text-sm text-gray-300">Saturday 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>

                {/* Directions Button */}
                <motion.a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                  style={{ marginTop: '16px' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-full rounded-xl bg-gold text-white font-bold text-center flex items-center justify-center gap-3" style={{ padding: '16px 20px' }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Get Directions
                  </div>
                </motion.a>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
