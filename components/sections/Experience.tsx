"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import ChamferBox from "@/components/ui/ChamferBox";
import Chip from "@/components/ui/Chip";
import { m } from "framer-motion";
import { Calendar, MapPinned, CheckCircle2 } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────── */

const experience = {
  role: "Desarrollador Full Stack",
  context: "Proyectos Independientes",
  modality: "Independiente · Remoto",
  period: "2024 — Presente",
  description:
    "Desarrollo end-to-end de sistemas web y mobile para clientes de distintos rubros. Gestión autónoma del ciclo completo: relevamiento de requerimientos, diseño de arquitectura, desarrollo, seguridad y puesta en producción.",
  achievements: [
    {
      text: "Desarrollé un sistema de gestión de historias clínicas para el área psiquiátrica, implementando arquitectura MVC con Spring Security (Java) para garantizar confidencialidad de datos sensibles de pacientes. Frontend en React + Tailwind, persistencia en MySQL.",
      inProgress: false,
    },
    {
      text: "Construí una solución multiplataforma de gestión de almuerzos corporativos: aplicación mobile con React Native + Expo y versión web en HTML/CSS/JS, ambas consumiendo la misma API REST desarrollada en Spring Boot con base de datos MySQL.",
      inProgress: false,
    },
    {
      text: "Arquitecté e implementé el sistema RDAM para i2t, plataforma de emisión de certificados digitales con autenticación por email, integración de pasarela de pagos, sistema de roles (administrador / operador) y panel de gestión de usuarios. Stack: React + Tailwind, Spring Boot, MySQL. Deploy containerizado con Docker.",
      inProgress: false,
    },
    {
      text: "Actualmente en fase de análisis y diseño de un sistema de facturación para PyME del sector agropecuario, con cálculo automático de impuestos y percepciones. Trabajo colaborativo con el cliente para definición de requerimientos y elección de stack.",
      inProgress: true,
    },
  ],
  technologies: [
    "React", "React Native", "Expo", "Tailwind CSS", "HTML/CSS/JS", "Spring Boot",
    "Java", "Spring Security", "API REST", "MySQL", "Arquitectura MVC", "Docker", "Pasarela de pagos",
  ],
};

/* ─── Animation Variants ─────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.35, ease },
  }),
};

/* ─── Component ──────────────────────────────────────────────── */

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <div className="container-main">
        {/* ── Header ──────────────────────────────────────── */}
        <m.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <m.div variants={headingVariants} className="flex justify-center">
            <SectionTitle>Experiencia</SectionTitle>
          </m.div>
          <m.p className="text-text-secondary mt-4 max-w-xl mx-auto" variants={headingVariants}>
            Proyectos reales donde apliqué cada parte del stack, de punta a punta.
          </m.p>
        </m.div>

        {/* ── Main Card ─────────────────────────────────── */}
        <div className="max-w-3xl mx-auto">
          <m.div
            className="mb-4 flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="pill font-mono gap-2">
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />
              {experience.period}
            </span>
          </m.div>

          <m.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            <ChamferBox elevated accent="primary" className="p-6 md:p-8">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-display font-semibold uppercase text-xl md:text-2xl text-text-primary">
                    {experience.role}
                  </h3>
                  <p className="text-text-muted text-sm mt-1">{experience.context}</p>
                </div>

                <span className="pill font-mono gap-2 shrink-0">
                  <MapPinned className="w-3.5 h-3.5" strokeWidth={1.75} />
                  {experience.modality}
                </span>
              </div>

              <p className="text-text-secondary text-sm md:text-[0.9375rem] leading-relaxed mb-6">
                {experience.description}
              </p>

              <div className="h-px bg-border-subtle mb-6" />

              {/* Achievements */}
              <m.ul
                className="space-y-4 mb-8"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {experience.achievements.map((achievement, i) => (
                  <m.li key={i} className="flex gap-3 text-sm md:text-[0.9375rem] leading-relaxed" variants={itemVariants}>
                    <span className="shrink-0 mt-1">
                      {achievement.inProgress ? (
                        <span className="status-dot" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 accent-text-secondary" strokeWidth={1.75} />
                      )}
                    </span>

                    <span className="text-text-secondary">
                      {achievement.inProgress && (
                        <span className="inline-flex items-center gap-1.5 mr-2 px-2 py-0.5 text-[11px] font-mono font-semibold uppercase tracking-wider bg-accent-secondary text-bg-primary chamfer-sm">
                          En progreso
                        </span>
                      )}
                      {achievement.text}
                    </span>
                  </m.li>
                ))}
              </m.ul>

              <div className="h-px bg-border-subtle mb-6" />

              {/* Technologies */}
              <div>
                <p className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider mb-3">
                  Stack tecnológico
                </p>
                <m.div className="flex flex-wrap gap-2" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  {experience.technologies.map((tech, i) => (
                    <m.div key={tech} custom={i} variants={chipVariants}>
                      <Chip>{tech}</Chip>
                    </m.div>
                  ))}
                </m.div>
              </div>
            </ChamferBox>
          </m.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
