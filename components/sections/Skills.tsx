"use client";

import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import ChamferBox from "@/components/ui/ChamferBox";
import OctaIcon from "@/components/ui/OctaIcon";
import Chip from "@/components/ui/Chip";
import { m } from "framer-motion";
import { useSkillParticles } from "@/hooks/useSkillParticles";
import { Monitor, Server, Database, GitBranch } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────── */

const skillCategories = [
  {
    title: "Frontend & Mobile",
    icon: <Monitor className="w-5 h-5" strokeWidth={1.75} />,
    skills: ["React", "React Native (Expo Go)", "JavaScript (ES6+)", "HTML5", "CSS3", "WebGL (Basic)"],
  },
  {
    title: "Backend & APIs",
    icon: <Server className="w-5 h-5" strokeWidth={1.75} />,
    skills: ["Java (POO)", "Spring Boot", "Python (Basics)", "RESTful APIs"],
  },
  {
    title: "Database & DevOps",
    icon: <Database className="w-5 h-5" strokeWidth={1.75} />,
    skills: ["MySQL", "Docker", "Modelado de Datos", "SQL"],
  },
  {
    title: "Tools & Workflow",
    icon: <GitBranch className="w-5 h-5" strokeWidth={1.75} />,
    skills: ["Git/GitHub", "AI-Assisted Development (Copilot/Cursor)", "Metodologías Ágiles"],
  },
];

/* ─── Animation Variants ─────────────────────────────────────── */

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ─── Component ──────────────────────────────────────────────── */

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { canvasRef, emitAt } = useSkillParticles(sectionRef);

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
          className="text-center mb-16 relative"
          style={{ zIndex: 2 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <m.div variants={headingVariants} className="flex justify-center">
            <SectionTitle>Mis tecnologías</SectionTitle>
          </m.div>
          <m.p className="text-text-secondary mt-4 max-w-xl mx-auto" variants={headingVariants}>
            Las herramientas y tecnologías con las que trabajo a diario para
            construir productos de calidad.
          </m.p>
        </m.div>

        {/* ── Category Grid ──────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-6 relative" style={{ zIndex: 2 }}>
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

                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill, si) => (
                    <m.div
                      key={skill}
                      custom={ci * 4 + si}
                      variants={badgeVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
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
                      <Chip>{skill}</Chip>
                    </m.div>
                  ))}
                </div>
              </ChamferBox>
            </m.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
