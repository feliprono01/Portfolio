"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { m, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── Data ────────────────────────────────────────────────────── */

const personalInfo = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Ubicación",
    value: "Santa Fe, Argentina",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    label: "Formación",
    value: "IES — Tec. Desarrollo de Software",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Disponibilidad",
    value: "Full-time · Sin restricción horaria",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    label: "Idiomas",
    value: "Español nativo · Inglés avanzado",
  },
];

const education = [
  {
    institution: "IES (Instituto de Educación Superior)",
    career: "Tecnicatura Superior en Desarrollo de Software",
    dates: "2024 — 2026",
    progress: 70,
    status: "En curso",
    statusColor: "green" as const,
    description:
      "Formación técnica superior en algoritmos, estructuras de datos, POO, bases de datos y arquitectura de software. Inglés técnico B2 integrado.",
  },
  {
    institution: "ISPC (Instituto Superior Politécnico de Córdoba)",
    career: "Tecnicatura Superior en Desarrollo Web y Aplicaciones Móviles",
    dates: "2022 — 2026",
    progress: 80,
    status: "En pausa",
    statusColor: "yellow" as const,
    description:
      "Formación técnica en desarrollo web y aplicaciones móviles. 9 materias de 14 aprobadas.",
  },
];

const statusStyles = {
  green: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    ping: "bg-emerald-400",
    dot: "bg-emerald-500",
  },
  yellow: {
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    ping: "bg-amber-400",
    dot: "bg-amber-500",
  },
};

/* ─── Animation Variants ──────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ─── Progress Bar Component ──────────────────────────────────── */

function ProgressBar({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-text-secondary font-medium">{label}</span>
        <span className="gradient-text font-semibold">{value}%</span>
      </div>
      <div className="h-2.5 bg-bg-muted rounded-full overflow-hidden">
        <m.div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #888888 0%, #d4d4d4 100%)",
          }}
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
            <m.p className="overline mb-4" variants={fadeUp}>
              Sobre mí
            </m.p>
            <m.h2 className="section-heading mb-6" variants={fadeUp}>
              Formación{" "}
              <span className="gradient-text">Académica</span>
            </m.h2>

            {/* Main philosophy paragraph */}
            <m.div
              className="space-y-5 text-text-secondary leading-relaxed"
              variants={fadeUp}
            >
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
                <span className="text-text-primary font-medium">
                  Frontend moderno
                </span>{" "}
                hasta la lógica de negocio en el{" "}
                <span className="text-text-primary font-medium">Backend</span>,
                garantizando la integración perfecta de APIs y bases de datos.
                Aplico metodologías asistidas por IA para maximizar la calidad
                del código y la velocidad de entrega.
              </p>
            </m.div>

            {/* CTA */}
            <m.a
              href="/CV_Felipe_Prono.pdf"
              download
              className="btn-ghost inline-flex mt-8"
              variants={fadeUp}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Descargar CV
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
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
            <div className="glass-card p-6 space-y-1">
              {/* Status */}
              <m.div
                className="flex items-center gap-2 mb-5"
                variants={scaleIn}
              >
                <span className="status-dot" />
                <span className="text-sm text-emerald-400 font-medium">
                  Disponible para trabajar
                </span>
              </m.div>

              {/* Info rows */}
              {personalInfo.map((item, i) => (
                <m.div
                  key={item.label}
                  className="flex items-start gap-3 py-3 border-b border-bg-muted/60 last:border-b-0"
                  variants={fadeLeft}
                  custom={i}
                >
                  <div className="mt-0.5 p-2 rounded-lg bg-white/[0.06] text-gray-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider font-medium">
                      {item.label}
                    </p>
                    <p className="text-sm text-text-primary mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
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
          <m.h3
            className="font-display text-xl font-bold mb-8 flex items-center gap-3"
            variants={fadeUp}
          >
            <span className="inline-block w-8 h-[2px] bg-gray-400 rounded-full" />
            Educación
          </m.h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent hidden md:block" />

            <div className="space-y-6">
              {education.map((edu, i) => (
                <m.div
                  key={edu.career}
                  className="relative md:pl-12"
                  variants={fadeUp}
                  custom={i}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[9px] top-6 w-[13px] h-[13px] rounded-full border-2 border-white bg-bg-primary hidden md:block">
                    <div className="absolute inset-1 rounded-full bg-white" />
                  </div>

                  <m.div
                    className="glass-card p-6 lg:p-8 group"
                    whileHover={{
                      borderColor: "rgba(255, 255, 255, 0.12)",
                      boxShadow:
                        "0 0 30px rgba(255, 255, 255, 0.04), 0 4px 24px rgba(0, 0, 0, 0.5)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div>
                        <h4 className="font-display text-lg font-bold text-text-primary group-hover:text-white transition-colors">
                          {edu.career}
                        </h4>
                        <p className="text-sm text-gray-400 font-medium mt-1">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="pill">{edu.dates}</span>
                        {edu.status && (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[edu.statusColor].badge}`}>
                            <span className="relative flex h-2 w-2">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${statusStyles[edu.statusColor].ping} opacity-75`} />
                              <span className={`relative inline-flex rounded-full h-2 w-2 ${statusStyles[edu.statusColor].dot}`} />
                            </span>
                            {edu.status}
                          </span>
                        )}
                      </div>
                    </div>

                    {edu.description && (
                      <p className="text-text-secondary text-sm leading-relaxed mb-5">
                        {edu.description}
                      </p>
                    )}

                    {/* Progress */}
                    <ProgressBar
                      value={edu.progress}
                      label="Progreso de la carrera"
                    />
                  </m.div>
                </m.div>
              ))}
            </div>
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
              document
                .getElementById("certifications")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer group"
            whileHover={{ x: 4 }}
          >
            Ver certificaciones
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </m.a>
        </m.div>
      </div>
    </SectionWrapper>
  );
}
