"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import ChamferBox from "@/components/ui/ChamferBox";
import OctaIcon from "@/components/ui/OctaIcon";
import BlockBar from "@/components/ui/BlockBar";
import { m, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { MapPin, GraduationCap, Clock, Languages, Download, ArrowRight } from "lucide-react";
import {
  CHARACTER,
  PHILOSOPHY_PARAGRAPHS,
  PERSONAL_INFO,
  EDUCATION,
  CERT_SUMMARY,
  type PersonalInfoIcon,
} from "@/content/about";
import { SKILL_CATEGORIES, getAttributes } from "@/content/skills";
import { getSection } from "@/content/sections";

const PERSONAL_ICONS: Record<PersonalInfoIcon, ReactNode> = {
  location: <MapPin className="w-4 h-4" strokeWidth={1.75} />,
  education: <GraduationCap className="w-4 h-4" strokeWidth={1.75} />,
  availability: <Clock className="w-4 h-4" strokeWidth={1.75} />,
  languages: <Languages className="w-4 h-4" strokeWidth={1.75} />,
};

const statusStyles = {
  "En curso": "bg-accent-secondary text-bg-primary border-accent-secondary",
  "En pausa": "border-accent-primary text-accent-primary bg-transparent",
};

/* ─── Animation Variants ──────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ─── Percentage progress bar (for IES, which has no subject count) ─── */

function PercentBar({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <div ref={ref}>
      <div className="flex justify-between text-xs font-mono mb-2">
        <span className="text-text-secondary">{label}</span>
        <span className="accent-text">{value}%</span>
      </div>
      <div className="h-2.5 bg-bg-elevated border border-border-default overflow-hidden">
        <m.div
          className="h-full bg-accent-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </div>
    </div>
  );
}

/** RPG-style attribute bar — score is out of 10, derived from the skill data. */
function AttributeBar({ label, score, inView, delay }: { label: string; score: number; inView: boolean; delay: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-mono mb-1.5">
        <span className="text-text-secondary uppercase tracking-wide">{label}</span>
        <span className="accent-text">{score.toFixed(1)}/10</span>
      </div>
      <div className="h-2 bg-bg-primary border border-border-default overflow-hidden">
        <m.div
          className="h-full bg-accent-primary"
          initial={{ width: 0 }}
          animate={inView ? { width: `${score * 10}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
        />
      </div>
    </div>
  );
}

/** Renders a paragraph, bolding any phrase listed in `strong`. */
function Paragraph({ text, strong = [] }: { text: string; strong?: string[] }) {
  if (strong.length === 0) return <p>{text}</p>;
  const pattern = new RegExp(`(${strong.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts = text.split(pattern);
  return (
    <p>
      {parts.map((part, i) =>
        strong.includes(part) ? (
          <span key={i} className="text-text-primary font-medium">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */

export default function About() {
  const certsSection = getSection("certifications");
  const attributes = getAttributes(SKILL_CATEGORIES);
  const attrsRef = useRef<HTMLDivElement>(null);
  const attrsInView = useInView(attrsRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="about">
      <div className="container-main">
        <m.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <m.div variants={fadeUp}>
            <SectionTitle className="mb-6">Sobre mí</SectionTitle>
          </m.div>
        </m.div>

        {/* ── Character sheet header: class + RPG attribute bars ──── */}
        <m.div
          ref={attrsRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <ChamferBox elevated accent="primary" className="p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 pb-6 border-b border-border-subtle">
              <div>
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1">Ficha de personaje</p>
                <h3 className="font-display text-2xl uppercase text-text-primary">{CHARACTER.name}</h3>
              </div>
              <div className="flex gap-2">
                <span className="pill font-mono">Clase: {CHARACTER.class}</span>
                <span className="pill font-mono">{CHARACTER.origin}</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {attributes.map((attr, i) => (
                <AttributeBar
                  key={attr.label}
                  label={attr.label}
                  score={attr.score}
                  inView={attrsInView}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </ChamferBox>
        </m.div>

        {/* ── Two-Column Layout ───────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Text column (3/5) */}
          <m.div
            className="lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <m.p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-4" variants={fadeUp}>
              Historia
            </m.p>

            <m.div className="space-y-5 text-text-secondary leading-relaxed" variants={fadeUp}>
              {PHILOSOPHY_PARAGRAPHS.map((p, i) => (
                <Paragraph key={i} text={p.text} strong={p.strong} />
              ))}
            </m.div>

            <m.a
              href="/CV_Felipe_Prono.pdf"
              download
              className="btn-ghost inline-flex mt-8"
              variants={fadeUp}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Descargar CV
              <Download className="w-4 h-4" strokeWidth={1.75} />
            </m.a>
          </m.div>

          {/* Right: Personal data sidebar (2/5) */}
          <m.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <ChamferBox elevated className="p-6">
              <m.div className="flex items-center gap-2 mb-5" variants={scaleIn}>
                <span className="status-dot" />
                <span className="text-sm accent-text-secondary font-medium font-mono uppercase tracking-wide">
                  Disponible para trabajar
                </span>
              </m.div>

              {PERSONAL_INFO.map((item, i) => (
                <m.div
                  key={item.label}
                  className="flex items-start gap-3 py-3 border-b border-border-subtle last:border-b-0"
                  variants={fadeLeft}
                  custom={i}
                >
                  <OctaIcon size="sm" accent={i % 2 === 0 ? "primary" : "secondary"}>
                    {PERSONAL_ICONS[item.icon]}
                  </OctaIcon>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider font-mono font-medium">
                      {item.label}
                    </p>
                    <p className="text-sm text-text-primary mt-0.5">{item.value}</p>
                  </div>
                </m.div>
              ))}
            </ChamferBox>
          </m.div>
        </div>

        {/* ── Education Timeline ──────────────────────────────── */}
        <m.div
          className="mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <m.h3 className="font-display text-xl font-semibold uppercase mb-8 flex items-center gap-3" variants={fadeUp}>
            <span className="inline-block w-8 h-[2px] bg-accent-secondary" />
            Educación
          </m.h3>

          <div className="space-y-6">
            {EDUCATION.map((edu, i) => (
              <m.div key={edu.career} variants={fadeUp} custom={i}>
                <ChamferBox elevated accent={i === 0 ? "secondary" : "primary"} className="p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h4 className="font-display text-lg font-semibold uppercase text-text-primary">
                        {edu.career}
                      </h4>
                      <p className="text-sm text-text-secondary font-medium mt-1">{edu.institution}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="pill font-mono">{edu.dates}</span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold border chamfer-sm ${statusStyles[edu.status]}`}
                      >
                        {edu.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-5">{edu.description}</p>

                  {edu.subjectsApproved !== undefined ? (
                    <BlockBar value={edu.subjectsApproved} total={edu.subjectsTotal!} label="Materias aprobadas" />
                  ) : (
                    <PercentBar value={edu.progress!} label="Progreso de la carrera" />
                  )}
                </ChamferBox>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* ── Certifications link ───────────────────────────────── */}
        {certsSection && (
          <m.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-text-secondary text-sm leading-relaxed">
              Además cuento con certificaciones en{" "}
              <span className="text-text-primary font-medium">{CERT_SUMMARY}</span>
            </p>
            <m.a
              href={certsSection.path}
              className="inline-flex items-center gap-1.5 mt-3 text-sm font-mono font-medium text-text-secondary hover:text-[var(--color-accent-primary)] transition-colors cursor-pointer group"
              whileHover={{ x: 4 }}
            >
              Ver certificaciones
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
            </m.a>
          </m.div>
        )}
      </div>
    </SectionWrapper>
  );
}
