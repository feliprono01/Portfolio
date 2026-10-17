"use client";

import { useRef, type ReactNode } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import ChamferBox from "@/components/ui/ChamferBox";
import OctaIcon from "@/components/ui/OctaIcon";
import { m, useInView } from "framer-motion";
import { useSkillParticles } from "@/hooks/useSkillParticles";
import { Monitor, Server, Database, GitBranch } from "lucide-react";
import { SKILL_CATEGORIES, LEVEL_LABEL, type SkillLevel, type SkillCategoryIcon } from "@/content/skills";

const CATEGORY_ICONS: Record<SkillCategoryIcon, ReactNode> = {
  frontend: <Monitor className="w-5 h-5" strokeWidth={1.75} />,
  backend: <Server className="w-5 h-5" strokeWidth={1.75} />,
  database: <Database className="w-5 h-5" strokeWidth={1.75} />,
  tools: <GitBranch className="w-5 h-5" strokeWidth={1.75} />,
};

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
  level: SkillLevel;
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
          {SKILL_CATEGORIES.map((cat, ci) => (
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
                  <OctaIcon accent={ci % 2 === 0 ? "primary" : "secondary"}>{CATEGORY_ICONS[cat.icon]}</OctaIcon>
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
