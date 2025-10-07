# Money 24/7 Landing Page

**In Money We Trust** - Your Gateway to Financial Freedom

## 🎨 Design Features

- **Glassmorphism UI** - Modern glass-like effects with blur and transparency
- **Gold & Teal Palette** - Premium color scheme (#EEA800 gold, #00D4AA teal)
- **Dark Theme** - Elegant dark background with animated gradients
- **Smooth Animations** - Framer Motion for premium interactions
- **Live Market Data** - Real-time crypto prices and fiat exchange rates
- **Procedural Backgrounds** - Animated canvas gradients with noise texture

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **CoinGecko API** - Live cryptocurrency prices
- **ExchangeRate API** - Fiat currency exchange rates

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
money247-landing/
├── app/
│   ├── components/
│   │   ├── sections/       # Hero, MarketData, etc.
│   │   ├── ui/            # GlassCard, Button, InfinitySymbol
│   │   ├── animations/    # Reusable animation components
│   │   └── backgrounds/   # MeshGradient, ParticleField
│   ├── lib/
│   │   ├── api/          # CoinGecko, ExchangeRate APIs
│   │   ├── hooks/        # Custom React hooks
│   │   └── utils/        # Formatters, helpers
│   ├── styles/
│   │   └── globals.css   # Global styles & design tokens
│   ├── layout.tsx
│   └── page.tsx
├── public/               # Static assets
└── tailwind.config.ts   # Tailwind configuration
```

## 🎯 Features Implemented

### ✅ Phase 1 - Foundation
- [x] Next.js project setup
- [x] Tailwind CSS with custom design system
- [x] Gold/Teal/Dark color palette
- [x] Glassmorphism utility classes
- [x] Base UI components (Button, GlassCard)

### ✅ Phase 2 - Core Sections
- [x] Hero section with infinity symbol
- [x] Animated text sequences
- [x] Market Data section
- [x] Live crypto price cards
- [x] Fiat exchange rate ticker

### ✅ Phase 3 - Visual Effects
- [x] Animated mesh gradient background
- [x] Glassmorphism effects
- [x] Smooth scroll animations
- [x] Hover interactions
- [x] Glow effects

## 🎨 Design Tokens

### Colors
- **Gold**: `#EEA800` (primary brand)
- **Teal**: `#00D4AA` (modern accent)
- **Black**: `#0A0A0F` (background)

### Typography
- Brand font: ARTEGRA SANS
- Fallback: System fonts

### Effects
- Glass blur: `20px`
- Animations: 300ms transitions
- Glow shadows for CTAs

## 🔄 API Integration

### CoinGecko (Crypto Prices)
- Updates every 30 seconds
- Displays: BTC, ETH, USDT, BNB
- Shows 24h price change
- Mini sparkline charts

### ExchangeRate API (Fiat)
- Updates every hour
- Major pairs: EUR, GBP, JPY, CNY, etc.
- Scrolling ticker animation

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-optimized interactions
- Reduced motion support

## 🌟 Next Steps

### Phase 4 - Additional Sections
- [ ] Service Pillars section
- [ ] Stats Counter section
- [ ] Features Showcase
- [ ] Procedural Animation section
- [ ] CTA Footer

### Phase 5 - Enhancements
- [ ] Particle animation system
- [ ] Advanced chart integration
- [ ] More interactive elements
- [ ] Performance optimizations

### Phase 6 - Production
- [ ] SEO optimization
- [ ] Performance audits
- [ ] Cross-browser testing
- [ ] Deployment to Vercel

## 📄 License

© 2025 Money 24/7. All rights reserved.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
