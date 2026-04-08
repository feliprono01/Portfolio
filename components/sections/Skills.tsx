"use client";

import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { m } from "framer-motion";
import { useSkillParticles } from "@/hooks/useSkillParticles";

/* ─── Lucide-style inline icons (24×24 stroke) ──────────────── */

const icons = {
  monitor: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  server: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <path d="M6 6h.01M6 18h.01" />
    </svg>
  ),
  database: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  gitBranch: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 21V9a9 9 0 009 9" />
    </svg>
  ),
};

/* ─── Data ───────────────────────────────────────────────────── */

const skillCategories = [
  {
    title: "Frontend & Mobile",
    icon: icons.monitor,
    accent: "mono" as const,
    skills: [
      "React",
      "React Native (Expo Go)",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "WebGL (Basic)",
    ],
  },
  {
    title: "Backend & APIs",
    icon: icons.server,
    accent: "mono" as const,
    skills: [
      "Java (POO)",
      "Spring Boot",
      "Python (Basics)",
      "RESTful APIs",
    ],
  },
  {
    title: "Database & DevOps",
    icon: icons.database,
    accent: "mono" as const,
    skills: ["MySQL", "Docker", "Modelado de Datos", "SQL"],
  },
  {
    title: "Tools & Workflow",
    icon: icons.gitBranch,
    accent: "mono" as const,
    skills: [
      "Git/GitHub",
      "AI-Assisted Development (Copilot/Cursor)",
      "Metodologías Ágiles",
    ],
  },
];

/* ─── Accent maps ────────────────────────────────────────────── */

const accentStyles = {
  mono: {
    iconBg: "bg-white/[0.06]",
    iconText: "text-gray-400",
    badgeBg:
      "bg-white/[0.04] border-white/10 text-gray-300 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_0_18px_rgba(255,255,255,0.06)]",
    dotBg: "bg-gray-400",
  },
};

/* ─── Animation Variants ─────────────────────────────────────── */

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ─── Component ──────────────────────────────────────────────── */

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { canvasRef, emitAt } = useSkillParticles(sectionRef);

  return (
    <SectionWrapper id="skills" className="bg-bg-secondary/50">
      <div
        ref={sectionRef}
        className="container-main relative overflow-hidden"
      >
        {/* ── Particle canvas (behind content) ────────────── */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* ── Header ──────────────────────────────────────── */}
        <m.div
          className="text-center mb-16 relative"
          style={{ zIndex: 2 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <m.p className="overline mb-4 justify-center" variants={headingVariants}>
            Habilidades
          </m.p>
          <m.h2
            className="section-heading"
            variants={headingVariants}
          >
            Mi{" "}
            <span className="gradient-text">stack técnico</span>
          </m.h2>
          <m.p
            className="text-text-secondary mt-4 max-w-xl mx-auto"
            variants={headingVariants}
          >
            Las herramientas y tecnologías con las que trabajo a diario para
            construir productos de calidad.
          </m.p>
        </m.div>

        {/* ── Category Grid ──────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-6 relative" style={{ zIndex: 2 }}>
          {skillCategories.map((cat, ci) => {
            const styles = accentStyles[cat.accent];

            return (
              <m.div
                key={cat.title}
                className="glass-card p-6 lg:p-8 group"
                custom={ci}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{
                  translateY: -4,
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  boxShadow:
                    "0 0 30px rgba(255, 255, 255, 0.04), 0 4px 24px rgba(0, 0, 0, 0.5)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-2.5 rounded-xl ${styles.iconBg} ${styles.iconText}`}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-text-primary">
                      {cat.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${styles.dotBg}`}
                      />
                      <span className="text-xs text-text-muted">
                        {cat.skills.length} tecnologías
                      </span>
                    </div>
                  </div>
                </div>

                {/* Badge chips */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill, si) => (
                    <m.span
                      key={skill}
                      custom={ci * 4 + si}
                      variants={badgeVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className={`
                        inline-flex items-center px-3.5 py-1.5
                        text-sm font-medium rounded-full
                        border transition-all duration-300 cursor-default
                        ${styles.badgeBg}
                      `}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const sectionRect = sectionRef.current?.getBoundingClientRect();
                        if (!sectionRect) return;
                        emitAt(
                          rect.left - sectionRect.left + rect.width / 2,
                          rect.top - sectionRect.top + rect.height / 2
                        );
                      }}
                    >
                      {skill}
                    </m.span>
                  ))}
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
