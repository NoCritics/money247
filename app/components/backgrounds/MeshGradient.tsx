'use client';

import { useEffect, useRef } from 'react';

export default function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Gradient parameters
    let time = 0;
    let lastNoiseUpdate = 0;
    const noiseUpdateInterval = 100; // Update noise every 100ms instead of every frame

    // Create static noise layer once
    let noiseCanvas: HTMLCanvasElement | null = null;
    let noiseCtx: CanvasRenderingContext2D | null = null;

    const createNoiseLayer = () => {
      if (!noiseCanvas) {
        noiseCanvas = document.createElement('canvas');
        noiseCtx = noiseCanvas.getContext('2d');
      }
      if (!noiseCanvas || !noiseCtx) return;

      noiseCanvas.width = canvas.width;
      noiseCanvas.height = canvas.height;

      const imageData = noiseCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
      const data = imageData.data;

      // Apply subtle noise
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 8;
        data[i] = noise;     // R
        data[i + 1] = noise; // G
        data[i + 2] = noise; // B
        data[i + 3] = 255;   // A
      }

      noiseCtx.putImageData(imageData, 0, 0);
    };

    createNoiseLayer();

    const drawGradient = (currentTime: number) => {
      const { width, height } = canvas;

      // Clear canvas with background color
      ctx.fillStyle = '#0A0A0F';
      ctx.fillRect(0, 0, width, height);

      // Main prominent orange gradient - very top left corner
      const gradient1X = width * (0.05 + Math.sin(time * 0.0003) * 0.04);
      const gradient1Y = height * (0.05 + Math.cos(time * 0.0002) * 0.04);

      const gradient1 = ctx.createRadialGradient(
        gradient1X, gradient1Y, 0,
        gradient1X, gradient1Y, width * 0.45
      );
      // More color stops for smoother blending and no banding
      gradient1.addColorStop(0, 'rgba(238, 168, 0, 0.35)');
      gradient1.addColorStop(0.15, 'rgba(238, 168, 0, 0.28)');
      gradient1.addColorStop(0.3, 'rgba(238, 168, 0, 0.22)');
      gradient1.addColorStop(0.45, 'rgba(238, 168, 0, 0.16)');
      gradient1.addColorStop(0.6, 'rgba(238, 168, 0, 0.10)');
      gradient1.addColorStop(0.75, 'rgba(238, 168, 0, 0.05)');
      gradient1.addColorStop(0.88, 'rgba(238, 168, 0, 0.02)');
      gradient1.addColorStop(1, 'rgba(238, 168, 0, 0)');

      ctx.globalCompositeOperation = 'lighten';
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      // Subtle secondary gradient - very faint
      const gradient2X = width * (0.75 + Math.sin(time * 0.00025) * 0.08);
      const gradient2Y = height * (0.65 + Math.cos(time * 0.0004) * 0.08);

      const gradient2 = ctx.createRadialGradient(
        gradient2X, gradient2Y, 0,
        gradient2X, gradient2Y, width * 0.35
      );
      gradient2.addColorStop(0, 'rgba(238, 168, 0, 0.04)');
      gradient2.addColorStop(0.5, 'rgba(238, 168, 0, 0.02)');
      gradient2.addColorStop(1, 'transparent');

      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      // Apply static noise layer with very low opacity
      if (noiseCanvas && currentTime - lastNoiseUpdate > noiseUpdateInterval) {
        createNoiseLayer();
        lastNoiseUpdate = currentTime;
      }

      if (noiseCanvas) {
        ctx.globalAlpha = 0.03;
        ctx.drawImage(noiseCanvas, 0, 0);
        ctx.globalAlpha = 1;
      }

      time++;
      requestAnimationFrame(drawGradient);
    };

    requestAnimationFrame(drawGradient);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      noiseCanvas = null;
      noiseCtx = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ willChange: 'contents' }}
    />
  );
}
