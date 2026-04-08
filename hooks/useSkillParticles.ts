"use client";

import { useRef, useEffect, useCallback, type RefObject } from "react";

/* ─── Types ──────────────────────────────────────────────────── */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
};

/* ─── Constants ──────────────────────────────────────────────── */

const COLORS = [
  "rgba(255,255,255",
  "rgba(200,200,200",
  "rgba(170,170,170",
  "rgba(220,220,220",
];

const MAX_PARTICLES = 200;
const GRAVITY = 0.12;
const AIR_FRICTION = 0.97;

/* ─── Hook ───────────────────────────────────────────────────── */

export function useSkillParticles(sectionRef: RefObject<HTMLElement | null>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafId = useRef<number>(0);
  const prefersReducedMotion = useRef(false);

  /* ── Check reduced-motion preference ───────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── emitAt: spawn burst of particles ──────────────────────── */
  const emitAt = useCallback((x: number, y: number) => {
    if (prefersReducedMotion.current) return;

    const count = 14 + Math.floor(Math.random() * 5); // 14-18
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
      const speed = 1.5 + Math.random() * 2.5;

      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1, // upward impulse
        life: 0,
        maxLife: 35 + Math.floor(Math.random() * 21), // 35-55
        size: 2 + Math.random() * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    // Limit total particles
    const all = [...particles.current, ...newParticles];
    particles.current = all.length > MAX_PARTICLES
      ? all.slice(all.length - MAX_PARTICLES)
      : all;
  }, []);

  /* ── Animation loop + resize sync ──────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Sync canvas size */
    const syncSize = () => {
      const rect = section.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    syncSize();

    const ro = new ResizeObserver(syncSize);
    ro.observe(section);

    /* Render loop */
    const tick = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      for (const p of particles.current) {
        p.vy += GRAVITY;
        p.vx *= AIR_FRICTION;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const progress = p.life / p.maxLife;
        const alpha = (1 - progress) * (1 - progress); // quadratic ease-out
        const radius = p.size * (1 - progress * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}, ${alpha})`;
        ctx.fill();
      }

      // Remove dead particles
      particles.current = particles.current.filter((p) => p.life < p.maxLife);

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      ro.disconnect();
    };
  }, [sectionRef]);

  return { canvasRef, emitAt };
}
