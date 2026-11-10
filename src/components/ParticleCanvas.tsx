import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  mode: 'angel' | 'realist';
}

interface MinimalParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return () => window.removeEventListener('resize', handleResize);
    }

    // Strictly limited to 6-7 petals in Angel mode, 8-9 micro dust specks in Realist mode
    const count = mode === 'angel' ? 7 : 9;
    const particles: MinimalParticle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: mode === 'angel' ? Math.random() * 5 + 4 : Math.random() * 1.5 + 1,
        speedX: mode === 'angel' ? Math.random() * 0.4 - 0.1 : Math.random() * 0.2 - 0.1,
        speedY: mode === 'angel' ? Math.random() * 0.5 + 0.3 : Math.random() * 0.2 - 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        opacity: mode === 'angel' ? Math.random() * 0.35 + 0.25 : Math.random() * 0.25 + 0.15,
        color:
          mode === 'angel'
            ? 'rgba(233, 196, 201, 0.65)' // #E9C4C9 delicate muted cherry blossom
            : 'rgba(217, 120, 62, 0.45)'  // #D9783E subtle sunset dust
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (mode === 'angel') {
          if (p.y > height + 15) {
            p.y = -15;
            p.x = Math.random() * width;
          }
          if (p.x > width + 15) p.x = -15;
          if (p.x < -15) p.x = width + 15;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;

          // Subtle organic petal shape
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.7, p.size * 0.7, p.size * 0.6, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.6, -p.size * 0.7, -p.size * 0.7, 0, -p.size);
          ctx.fill();
          ctx.restore();
        } else {
          // Minimalist micro dust specks
          if (p.y > height + 5) p.y = -5;
          if (p.y < -5) p.y = height + 5;
          if (p.x > width + 5) p.x = -5;
          if (p.x < -5) p.x = width + 5;

          ctx.save();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
      aria-hidden="true"
    />
  );
};
