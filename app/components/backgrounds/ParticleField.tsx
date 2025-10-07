'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  size: number;
  color: string;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  shape: 'circle' | 'square' | 'triangle';
  rotation: number;
  rotationSpeed: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Create particles with reduced count for better performance
    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000); // Reduced density
      particles = [];

      const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
      const colors = ['#EEA800', '#C0C0C8', '#FFB820', '#E8E8F0'];

      for (let i = 0; i < particleCount; i++) {
        const baseSize = Math.random() * 2.5 + 1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          baseSize,
          size: baseSize,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.015 + 0.008,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.015
        });
      }
    };

    createParticles();

    // Mouse move handler with smooth easing
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
      setCanvasSize();
      createParticles();
    });

    // Draw different shapes
    const drawShape = (particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.globalAlpha = particle.opacity;

      if (particle.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      } else if (particle.shape === 'square') {
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
      } else if (particle.shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(0, -particle.size);
        ctx.lineTo(particle.size, particle.size);
        ctx.lineTo(-particle.size, particle.size);
        ctx.closePath();
        ctx.fillStyle = particle.color;
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      time += 0.008;

      // Smooth mouse easing for elegant cursor follow
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      // Clear canvas completely for crisp particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Smooth procedural pulsing size
        particle.pulsePhase += particle.pulseSpeed;
        particle.size = particle.baseSize * (1 + Math.sin(particle.pulsePhase) * 0.25);

        // Smooth procedural rotation
        particle.rotation += particle.rotationSpeed;

        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction - both attraction and repulsion with smooth easing
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const force = (200 - distance) / 200;
          const easedForce = force * force; // Quadratic easing for smoother effect

          if (distance < 80) {
            // Gentle repulsion when very close
            particle.vx -= (dx / distance) * easedForce * 0.1;
            particle.vy -= (dy / distance) * easedForce * 0.1;
          } else {
            // Gentle attraction when medium distance
            particle.vx += (dx / distance) * easedForce * 0.05;
            particle.vy += (dy / distance) * easedForce * 0.05;
          }

          // Smooth enhanced glow near cursor
          const targetOpacity = Math.min(0.85, 0.3 + easedForce * 0.4);
          particle.opacity += (targetOpacity - particle.opacity) * 0.1;
        } else {
          // Smooth fade back to normal
          particle.opacity += (0.4 - particle.opacity) * 0.05;
        }

        // Gentle organic drift
        particle.vx += Math.sin(time + i * 0.1) * 0.008;
        particle.vy += Math.cos(time + i * 0.1) * 0.008;

        // Boundary check - wrap around
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Smooth velocity damping
        particle.vx *= 0.985;
        particle.vy *= 0.985;

        // Max speed limit with smooth capping
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > 1.5) {
          const factor = 1.5 / speed;
          particle.vx *= factor;
          particle.vy *= factor;
        }

        // Draw particle
        drawShape(particle);
      });

      // Draw connections with dynamic attach/detach
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Dynamic connection distance based on proximity to cursor
          const mouseDistParticle = Math.sqrt(
            Math.pow(mouseX - particle.x, 2) + Math.pow(mouseY - particle.y, 2)
          );
          const mouseDistOther = Math.sqrt(
            Math.pow(mouseX - other.x, 2) + Math.pow(mouseY - other.y, 2)
          );

          // Extend connection range near cursor
          const baseDist = 150;
          const cursorBoost = Math.max(
            0,
            (200 - Math.min(mouseDistParticle, mouseDistOther)) / 200
          ) * 100;
          const maxConnectionDist = baseDist + cursorBoost;

          if (distance < maxConnectionDist) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);

            // Gradient line
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              other.x, other.y
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, other.color);
            ctx.strokeStyle = gradient;

            // Dynamic opacity based on distance and cursor proximity
            const proximityFade = 1 - (distance / maxConnectionDist);
            const cursorProximity = Math.max(
              0,
              1 - Math.min(mouseDistParticle, mouseDistOther) / 200
            );
            ctx.globalAlpha = proximityFade * 0.15 + cursorProximity * 0.25;

            // Dynamic line width
            ctx.lineWidth = (proximityFade * 1.5) + (cursorProximity * 1);
            ctx.stroke();
          }
        }
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-5"
    />
  );
}
