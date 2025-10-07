'use client';

export default function SectionSeparator() {
  return (
    <div className="w-full py-12 flex justify-center">
      <div className="w-full max-w-4xl relative" style={{ height: '3px' }}>
        {/* Base silver/gray line */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(160, 160, 176, 0.3) 30%, rgba(192, 192, 200, 0.5) 50%, rgba(160, 160, 176, 0.3) 70%, transparent 100%)',
            opacity: 0.6
          }}
        />

        {/* Bright white/silver highlight in center */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: '0px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(180, 180, 190, 0.2) 35%, rgba(255, 255, 255, 0.9) 48%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.9) 52%, rgba(180, 180, 190, 0.2) 65%, transparent 100%)',
            opacity: 0.95
          }}
        />

        {/* Outer glow layer - largest, most dissipated */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at center, rgba(192, 192, 200, 0.25) 0%, rgba(160, 160, 176, 0.12) 30%, rgba(128, 128, 144, 0.05) 50%, transparent 75%)',
            filter: 'blur(16px)',
            opacity: 0.65,
            transform: 'scaleY(3.5)',
            transformOrigin: 'center'
          }}
        />

        {/* Mid glow layer - medium spread */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 100% at center, rgba(200, 200, 208, 0.5) 0%, rgba(176, 176, 184, 0.25) 35%, rgba(144, 144, 160, 0.1) 60%, transparent 85%)',
            filter: 'blur(12px)',
            opacity: 0.7,
            transform: 'scaleY(2.5)',
            transformOrigin: 'center'
          }}
        />

        {/* Inner glow layer - tighter, brighter */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 100% at center, rgba(224, 224, 232, 0.7) 0%, rgba(192, 192, 200, 0.35) 40%, rgba(160, 160, 176, 0.12) 70%, transparent 95%)',
            filter: 'blur(8px)',
            opacity: 0.8,
            transform: 'scaleY(2)',
            transformOrigin: 'center'
          }}
        />

        {/* Extra bright center point */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '120px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.6) 70%, transparent 100%)',
            filter: 'blur(2px)',
            opacity: 0.9
          }}
        />

        {/* Center white glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '200px',
            height: '20px',
            background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 30%, transparent 70%)',
            filter: 'blur(12px)',
            opacity: 0.8
          }}
        />
      </div>
    </div>
  );
}
