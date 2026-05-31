'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

type Particle = { x: number; y: number; vx: number; vy: number; s: number; a: number };

/**
 * Performance-conscious ambient canvas: slow floating pixel particles only.
 * Pauses when offscreen / reduced-motion, caps DPR, and uses a single rAF
 * loop. Strictly behind content (z-0), pointer-events none.
 */
export function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let running = true;
    let t = 0;

    const accent = '143, 188, 255'; // --accent-text rgb

    const resize = () => {      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(70, Math.floor((w * h) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        s: Math.random() < 0.85 ? 1.5 : 2.5,
        a: 0.15 + Math.random() * 0.4,
      }));
    };

    const frame = () => {
      if (!running) return;
      t += 16;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        const flick = 0.85 + 0.15 * Math.sin((t + p.x * 8) * 0.002);
        ctx.fillStyle = `rgba(${accent}, ${p.a * flick})`;
        ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      raf = requestAnimationFrame(frame);
    };

    const drawStaticFrame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.fillStyle = `rgba(${accent}, ${p.a})`;
        ctx.fillRect(p.x, p.y, p.s, p.s);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    if (reduced) {
      drawStaticFrame();
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onVisibility = () => {
      running = !document.hidden && !reduced;
      if (running) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
