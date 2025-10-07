'use client';

import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

const partners = [
  {
    name: 'FC Dynamo Kyiv',
    logo: '/FC_Dynamo_Kyiv_logo.svg.png',
    description: 'Official Financial Partner'
  },
  {
    name: 'FK Jablonec',
    logo: '/FK_Jablonec_logo.png',
    description: 'Strategic Partner'
  }
];

export default function Partnership() {
  return (
    <section className="pt-8 pb-40 px-6 w-full min-h-screen flex items-center justify-center relative">
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
          className="text-center mb-4"
          style={{ marginTop: '-48px' }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-white">
            Our Partners
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mx-auto leading-loose text-center">
            Trusted by leading organizations worldwide
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="flex flex-wrap justify-center gap-12 max-w-5xl mx-auto" style={{ marginTop: '100px', paddingLeft: '140px' }}>
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ y: -8 }}
              style={{ width: '380px' }}
            >
              <GlassCard
                variant="default"
                className="h-full"
                style={{
                  paddingLeft: '48px',
                  paddingRight: '48px',
                  paddingTop: '48px',
                  paddingBottom: '48px'
                }}
              >
                <div className="flex flex-col items-center h-full">
                  {/* Logo Container */}
                  <div
                    className="relative mb-8 flex items-center justify-center"
                    style={{
                      width: '100%',
                      height: '140px'
                    }}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain pointer-events-none"
                      style={{
                        filter: 'drop-shadow(0 4px 20px rgba(238, 168, 0, 0.15))',
                      }}
                    />
                  </div>

                  {/* Partner Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                      {partner.name}
                    </h3>
                    <p className="text-base text-gray-400 leading-relaxed">
                      {partner.description}
                    </p>
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
