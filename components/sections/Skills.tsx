"use client";

import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import ChamferBox from "@/components/ui/ChamferBox";
import OctaIcon from "@/components/ui/OctaIcon";
import { m, useInView } from "framer-motion";
import { useSkillParticles } from "@/hooks/useSkillParticles";
import { Monitor, Server, Database, GitBranch } from "lucide-react";

/* ─── Levels ─────────────────────────────────────────────────────
   Qualitative, not self-rated: derived from how often each
   technology actually shows up across the Experience/Projects
   sections, not a made-up percentage.
   ──────────────────────────────────────────────────────────────── */

type Level = 1 | 2 | 3;

const LEVEL_LABEL: Record<Level, string> = {
  1: "Novato",
  2: "Intermedio",
  3: "Avanzado",
};

interface Skill {
  name: string;
  level: Level;
}

const skillCategories: { title: string; icon: React.ReactNode; skills: Skill[] }[] = [
  {
    title: "Frontend & Mobile",
    icon: <Monitor className="w-5 h-5" strokeWidth={1.75} />,
    skills: [
      { name: "React", level: 3 },
      { name: "JavaScript (ES6+)", level: 3 },
      { name: "HTML5 / CSS3", level: 3 },
      { name: "React Native (Expo)", level: 2 },
      { name: "WebGL (Basic)", level: 1 },
    ],
  },
  {
    title: "Backend & APIs",
    icon: <Server className="w-5 h-5" strokeWidth={1.75} />,
    skills: [
      { name: "Java (POO)", level: 3 },
      { name: "Spring Boot", level: 3 },
      { name: "RESTful APIs", level: 3 },
      { name: "Spring Security", level: 2 },
      { name: "Python (Basics)", level: 1 },
    ],
  },
  {
    title: "Database & DevOps",
    icon: <Database className="w-5 h-5" strokeWidth={1.75} />,
    skills: [
      { name: "MySQL / SQL", level: 3 },
      { name: "Modelado de Datos", level: 2 },
      { name: "Docker", level: 2 },
    ],
  },
  {
    title: "Tools & Workflow",
    icon: <GitBranch className="w-5 h-5" strokeWidth={1.75} />,
    skills: [
      { name: "Git / GitHub", level: 3 },
      { name: "Metodologías Ágiles", level: 2 },
      { name: "AI-Assisted Development", level: 2 },
    ],
  },
];

/* ─── Animation Variants ─────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease },
  }),
};

/* ─── Level pips — 3 blocks, filled up to the skill's level ───── */

function LevelPips({
  level,
  inView,
  delay,
  static: isStatic = false,
}: {
  level: Level;
  inView: boolean;
  delay: number;
  static?: boolean;
}) {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <m.span
          key={n}
          className={`h-2.5 w-4 border ${
            n <= level ? "bg-accent-primary border-accent-primary" : "bg-transparent border-border-default"
          }`}
          initial={isStatic ? false : { scaleX: 0 }}
          animate={isStatic || inView ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.3, delay: delay + n * 0.08, ease }}
        />
      ))}
    </span>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { canvasRef, emitAt } = useSkillParticles(sectionRef);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="skills" className="bg-bg-secondary/40">
      <div ref={sectionRef} className="container-main relative overflow-hidden">
        {/* ── Particle canvas (behind content) ────────────── */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* ── Header ──────────────────────────────────────── */}
        <m.div
          className="text-center mb-4 relative"
          style={{ zIndex: 2 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <m.div variants={headingVariants} className="flex justify-center">
            <SectionTitle>Mis tecnologías</SectionTitle>
          </m.div>
          <m.p className="text-text-secondary mt-4 max-w-xl mx-auto" variants={headingVariants}>
            Ficha de personaje: el nivel de cada tecnología sale de cuánto la usé
            en proyectos reales, no de una autoevaluación.
          </m.p>
          <m.p
            className="font-mono text-xs text-text-muted mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5"
            variants={headingVariants}
          >
            <span className="flex items-center gap-1.5">
              <LevelPips level={1} inView={false} delay={0} static /> Novato
            </span>
            <span className="flex items-center gap-1.5">
              <LevelPips level={2} inView={false} delay={0} static /> Intermedio
            </span>
            <span className="flex items-center gap-1.5">
              <LevelPips level={3} inView={false} delay={0} static /> Avanzado
            </span>
          </m.p>
        </m.div>

        {/* ── Category Grid ──────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-6 relative mt-12" style={{ zIndex: 2 }}>
          {skillCategories.map((cat, ci) => (
            <m.div
              key={cat.title}
              custom={ci}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <ChamferBox elevated accent={ci % 2 === 0 ? "primary" : "secondary"} className="p-6 lg:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <OctaIcon accent={ci % 2 === 0 ? "primary" : "secondary"}>{cat.icon}</OctaIcon>
                  <div>
                    <h3 className="font-display font-semibold uppercase text-lg text-text-primary">
                      {cat.title}
                    </h3>
                    <span className="text-xs font-mono text-text-muted">
                      {cat.skills.length} tecnologías
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5">
                  {cat.skills.map((skill, si) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between gap-4"
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const sectionRect = sectionRef.current?.getBoundingClientRect();
                        if (!sectionRect) return;
                        emitAt(
                          rect.left - sectionRect.left + 16,
                          rect.top - sectionRect.top + rect.height / 2
                        );
                      }}
                    >
                      <span className="text-sm text-text-secondary">{skill.name}</span>
                      <span className="flex items-center gap-2 shrink-0">
                        <span className="hidden sm:inline text-[10px] font-mono uppercase text-text-muted">
                          {LEVEL_LABEL[skill.level]}
                        </span>
                        <LevelPips level={skill.level} inView={isInView} delay={ci * 0.1 + si * 0.05} />
                      </span>
                    </li>
                  ))}
                </ul>
              </ChamferBox>
            </m.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
