'use client';

import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

const partners = [
  {
    name: 'FC Dynamo Kyiv',
    logo: '/FC_Dynamo_Kyiv_logo.svg.png'
  },
  {
    name: 'FK Jablonec',
    logo: '/FK_Jablonec_logo.png'
  },
  {
    name: 'Mayak Kharkiv',
    logo: '/mayak_kharkiv_logo.png'
  }
];

export default function Partnership() {
  return (
    <section className="px-6 w-full min-h-screen flex items-center justify-center relative" style={{ paddingTop: '220px', paddingBottom: '60px' }}>
      {/* Section Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black-700/20 to-transparent" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
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
            Our Partners
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mx-auto leading-loose text-center">
            Trusted by leading organizations worldwide
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="flex flex-wrap justify-center gap-8" style={{ marginTop: '60px', maxWidth: '768px', marginLeft: 'auto', marginRight: 'auto' }}>
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ y: -8 }}
              style={{ width: '340px' }}
            >
              <GlassCard
                variant="default"
                className="h-full"
                style={{
                  paddingLeft: '40px',
                  paddingRight: '40px',
                  paddingTop: '40px',
                  paddingBottom: '40px'
                }}
              >
                <div className="flex flex-col items-center h-full">
                  {/* Logo Container */}
                  <div
                    className="relative flex items-center justify-center"
                    style={{
                      width: '100%',
                      height: '120px'
                    }}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain pointer-events-none"
                    />
                  </div>

                  {/* Partner Info */}
                  <div className="text-center" style={{ marginTop: '24px' }}>
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {partner.name}
                    </h3>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
