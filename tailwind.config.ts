import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Gold palette
        gold: {
          DEFAULT: '#EEA800',
          light: '#FFB820',
          dark: '#CC8E00',
        },
        // Teal palette
        teal: {
          DEFAULT: '#00D4AA',
          light: '#1FFFDB',
          dark: '#00A885',
        },
        // Dark palette
        black: {
          DEFAULT: '#000000',
          900: '#0A0A0F',
          800: '#13131A',
          700: '#1C1C26',
          600: '#252533',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': `
          radial-gradient(at 20% 30%, rgba(238, 168, 0, 0.1) 0px, transparent 50%),
          radial-gradient(at 80% 70%, rgba(0, 212, 170, 0.08) 0px, transparent 50%),
          radial-gradient(at 50% 50%, rgba(0, 0, 0, 1) 0px, transparent 100%)
        `,
        'gradient-gold': 'radial-gradient(circle at 30% 50%, rgba(238, 168, 0, 0.15) 0%, transparent 50%)',
        'gradient-teal': 'radial-gradient(circle at 70% 50%, rgba(0, 212, 170, 0.12) 0%, transparent 50%)',
      },
      backdropBlur: {
        glass: '20px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'glass-gold': '0 8px 32px rgba(238, 168, 0, 0.2), inset 0 1px 0 rgba(238, 168, 0, 0.1)',
        'glass-teal': '0 8px 32px rgba(0, 212, 170, 0.15)',
        'glow-gold': '0 0 20px rgba(238, 168, 0, 0.5), 0 0 40px rgba(238, 168, 0, 0.3)',
        'glow-teal': '0 0 25px rgba(0, 212, 170, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 20px rgba(238, 168, 0, 0.6)) drop-shadow(0 0 40px rgba(238, 168, 0, 0.3))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 30px rgba(238, 168, 0, 0.8)) drop-shadow(0 0 60px rgba(238, 168, 0, 0.4))',
          },
        },
        shimmer: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
