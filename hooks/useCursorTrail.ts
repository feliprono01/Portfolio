'use client';

import { useRef, useEffect } from 'react';

/* ─── Types ───────────────────────────────────────────────────────────────── */
type TrailPoint = { x: number; y: number; age: number; maxAge: number };

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export function useCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailPoints = useRef<TrailPoint[]>([]);
  const rafId = useRef<number>(0);
  const isTouch = useRef(false);

  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return;

    // Skip on touch devices
    isTouch.current = 'ontouchstart' in window;
    if (isTouch.current) return;

    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* ── Resize handler ──────────────────────────────────────────────── */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Mouse move ──────────────────────────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      const points = trailPoints.current;
      points.push({ x: e.clientX, y: e.clientY, age: 0, maxAge: 28 });
      // Ring buffer: keep max 24 points
      if (points.length > 24) {
        points.shift();
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── Animation loop ──────────────────────────────────────────────── */
    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const points = trailPoints.current;

      // Age and filter
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age++;
        if (points[i].age > points[i].maxAge) {
          points.splice(i, 1);
        }
      }

      // Draw connecting lines first (behind dots)
      if (points.length >= 2) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 1;
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }

      // Draw each point
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const progress = p.age / p.maxAge;
        const radius = lerp(5, 0.5, progress);
        const opacity = lerp(0.7, 0, progress) * (1 - progress * progress);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 220, 220, ${opacity})`;
        ctx.fill();
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    /* ── Cleanup ─────────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return { canvasRef };
}
