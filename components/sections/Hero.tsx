"use client";

import { m } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ParticleFieldClient from "@/components/webgl/ParticleField.client";

/* ─── Animation variants ──────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.25 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

/* ─── Stats data ──────────────────────────────────────────────────────────── */
const stats = [
  { value: 1, suffix: "+", label: "Años de experiencia" },
  { value: 4, suffix: "+", label: "Proyectos completados" },
];

/* ─── Social links ────────────────────────────────────────────────────────── */
const socials = [
  {
    label: "GitHub",
    href: "https://github.com/feliprono01",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/felipe-prono-5b0886173/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── WebGL particle field ───────────────────────────────────────── */}
      <ParticleFieldClient />

      {/* ── Background layers ──────────────────────────────────────────── */}
      {/* Grid pattern */}
      <div
        className="absolute inset-0 bg-hero-grid bg-grid opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial white glow behind content */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-60 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Floating gradient orbs */}
      <div
        className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-white/[0.04] blur-[100px] animate-blob pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/[0.03] blur-[100px] animate-blob-slow pointer-events-none"
        style={{ animationDelay: "3s" }}
        aria-hidden="true"
      />
      {/* Extra subtle orb */}
      <div
        className="absolute top-1/4 right-1/4 w-60 h-60 rounded-full bg-white/[0.03] blur-[80px] animate-blob-slow pointer-events-none"
        style={{ animationDelay: "5s" }}
        aria-hidden="true"
      />

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="container-main relative z-10 pt-28 pb-20">
        <m.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Overline / Status badge */}
          <m.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/[0.06] text-gray-300 border border-white/10">
              <span className="status-dot" />
              Disponible para trabajar
            </span>
          </m.div>

          {/* Heading */}
          <m.h1
            variants={itemVariants}
            className="font-serif font-bold mb-2"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 5.25rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Hola, soy
          </m.h1>

          <m.h1
            variants={itemVariants}
            className="gradient-text font-serif font-bold mb-5"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 5.25rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Felipe Prono
          </m.h1>

          {/* Role with typing cursor */}
          <m.p
            variants={itemVariants}
            className="typing-cursor text-lg sm:text-xl md:text-2xl font-display font-semibold text-gray-300 mb-6"
          >
            Desarrollador de Software
          </m.p>

          {/* Description */}
          <m.p
            variants={itemVariants}
            className="text-text-secondary text-base sm:text-lg max-w-xl leading-relaxed mb-10"
          >
            Desarrollador de Software con visión en innovación tecnológica.
            Integro capacidades de IA en la arquitectura de aplicaciones para
            resolver problemas complejos de forma creativa, priorizando siempre
            la robustez técnica y la entrega de valor real al usuario final.
          </m.p>

          {/* CTA buttons */}
          <m.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a href="#projects" className="btn-primary group">
              Ver proyectos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <a href="#contact" className="btn-ghost">
              Contactar
            </a>
          </m.div>

          {/* Stats strip */}
          <m.div
            variants={itemVariants}
            className="flex flex-wrap gap-8 sm:gap-12 mb-10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-display font-extrabold text-text-primary">
                  <AnimatedCounter
                    to={stat.value}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </span>
                <span className="text-xs sm:text-sm text-text-muted mt-1 tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </m.div>

          {/* Social links */}
          <m.div variants={itemVariants} className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2.5 rounded-lg border border-border-default text-text-muted hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </m.div>
        </m.div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted z-10">
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
          Scroll
        </span>
        <m.div
          className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
}
