"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import ChamferBox from "@/components/ui/ChamferBox";
import OctaIcon from "@/components/ui/OctaIcon";
import BlockBar from "@/components/ui/BlockBar";
import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, GraduationCap, Clock, Languages, Download, ArrowRight } from "lucide-react";

/* ─── Data ────────────────────────────────────────────────────── */

const personalInfo = [
  { icon: <MapPin className="w-4 h-4" strokeWidth={1.75} />, label: "Ubicación", value: "Santa Fe, Argentina" },
  { icon: <GraduationCap className="w-4 h-4" strokeWidth={1.75} />, label: "Formación", value: "IES — Tec. Desarrollo de Software" },
  { icon: <Clock className="w-4 h-4" strokeWidth={1.75} />, label: "Disponibilidad", value: "Full-time · Sin restricción horaria" },
  { icon: <Languages className="w-4 h-4" strokeWidth={1.75} />, label: "Idiomas", value: "Español nativo · Inglés avanzado" },
];

interface EducationEntry {
  institution: string;
  career: string;
  dates: string;
  status: "En curso" | "En pausa";
  description: string;
  progress?: number;
  subjectsApproved?: number;
  subjectsTotal?: number;
}

const education: EducationEntry[] = [
  {
    institution: "IES (Instituto de Educación Superior)",
    career: "Tecnicatura Superior en Desarrollo de Software",
    dates: "2024 — 2026",
    progress: 70,
    status: "En curso",
    description:
      "Formación técnica superior en algoritmos, estructuras de datos, POO, bases de datos y arquitectura de software. Inglés técnico B2 integrado.",
  },
  {
    institution: "ISPC (Instituto Superior Politécnico de Córdoba)",
    career: "Tecnicatura Superior en Desarrollo Web y Aplicaciones Móviles",
    dates: "2022 — 2026",
    subjectsApproved: 9,
    subjectsTotal: 14,
    status: "En pausa",
    description:
      "Formación técnica en desarrollo web y aplicaciones móviles. 9 materias de 14 aprobadas.",
  },
];

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

/* ─── Main Component ──────────────────────────────────────────── */

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="container-main">
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
            <m.div variants={fadeUp}>
              <SectionTitle className="mb-6">Sobre mí</SectionTitle>
            </m.div>

            <m.div className="space-y-5 text-text-secondary leading-relaxed" variants={fadeUp}>
              <p>
                Mi filosofía de desarrollo se basa en la convergencia entre la
                ingeniería de software tradicional y la potencia de la
                Inteligencia Artificial. No veo a la IA como un reemplazo, sino
                como un{" "}
                <span className="text-text-primary font-medium">
                  multiplicador de capacidades
                </span>{" "}
                que me permite entregar soluciones robustas en tiempos
                optimizados. Mi enfoque es construir sistemas escalables donde la
                precisión del código y la innovación inteligente trabajen en
                sintonía.
              </p>
              <p>
                Desarrollador Fullstack enfocado en la construcción de
                ecosistemas digitales de alto rendimiento. Mi especialidad abarca
                desde el desarrollo{" "}
                <span className="text-text-primary font-medium">Frontend moderno</span>{" "}
                hasta la lógica de negocio en el{" "}
                <span className="text-text-primary font-medium">Backend</span>,
                garantizando la integración perfecta de APIs y bases de datos.
                Aplico metodologías asistidas por IA para maximizar la calidad
                del código y la velocidad de entrega.
              </p>
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

              {personalInfo.map((item, i) => (
                <m.div
                  key={item.label}
                  className="flex items-start gap-3 py-3 border-b border-border-subtle last:border-b-0"
                  variants={fadeLeft}
                  custom={i}
                >
                  <OctaIcon size="sm" accent={i % 2 === 0 ? "primary" : "secondary"}>
                    {item.icon}
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
            {education.map((edu, i) => (
              <m.div key={edu.career} variants={fadeUp} custom={i}>
                <ChamferBox
                  elevated
                  accent={i === 0 ? "secondary" : "primary"}
                  className="p-6 lg:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h4 className="font-display text-lg font-semibold uppercase text-text-primary">
                        {edu.career}
                      </h4>
                      <p className="text-sm text-text-secondary font-medium mt-1">
                        {edu.institution}
                      </p>
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

                  <p className="text-text-secondary text-sm leading-relaxed mb-5">
                    {edu.description}
                  </p>

                  {edu.subjectsApproved !== undefined ? (
                    <BlockBar
                      value={edu.subjectsApproved}
                      total={edu.subjectsTotal!}
                      label="Materias aprobadas"
                    />
                  ) : (
                    <PercentBar value={edu.progress!} label="Progreso de la carrera" />
                  )}
                </ChamferBox>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* ── Certifications link ───────────────────────────────── */}
        <m.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-text-secondary text-sm leading-relaxed">
            Además cuento con certificaciones en{" "}
            <span className="text-text-primary font-medium">
              Desarrollo Web, Python y Full Stack Junior.
            </span>
          </p>
          <m.a
            href="#certifications"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-mono font-medium text-text-secondary hover:text-[var(--color-accent-primary)] transition-colors cursor-pointer group"
            whileHover={{ x: 4 }}
          >
            Ver certificaciones
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
          </m.a>
        </m.div>
      </div>
    </SectionWrapper>
  );
}
