import MeshGradient from './components/backgrounds/MeshGradient';
import ParticleField from './components/backgrounds/ParticleField';
import Hero from './components/sections/Hero';
import MarketData from './components/sections/MarketData';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Partnership from './components/sections/Partnership';
import Contact from './components/sections/Contact';
import SectionSeparator from './components/ui/SectionSeparator';
import MarketTicker from './components/ui/MarketTicker';
import Calculator from './components/ui/Calculator';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Animated Backgrounds */}
      <MeshGradient />
      <ParticleField />

      {/* Sections */}
      <div className="relative z-10">
      <Hero />

      <SectionSeparator />

      <About />

      <SectionSeparator />

      <Services />

      <SectionSeparator />

      <MarketData />

      <SectionSeparator />

      <Partnership />

      <SectionSeparator />

      <Contact />
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 pb-24 text-center text-gray-500 text-sm mt-20">
        <p>© 2025 Money 24/7. All rights reserved.</p>
        <p className="mt-2">In Money We Trust</p>
      </footer>

      {/* Market Ticker */}
      <MarketTicker />

      {/* Calculator */}
      <Calculator />
    </main>
  );
}
