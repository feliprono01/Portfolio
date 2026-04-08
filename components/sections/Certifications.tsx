"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { m, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── Data ────────────────────────────────────────────────────── */

const certifications = [
  {
    title: "Desarrollador Full Stack Junior",
    institution: "Instituto Superior Politécnico Córdoba (ISPC)",
    issuer: "Ministerio de Educación — Provincia de Córdoba",
    hours: 300,
    date: "Agosto 2023",
    badgeLabel: "Título oficial del Estado",
    file: "/certs/fullstack-junior-ispc.pdf",
    accent: {
      bg: "bg-white/[0.06]",
      border: "border-white/10",
      hoverBorder: "rgba(255, 255, 255, 0.15)",
      text: "text-gray-300",
      badgeBg: "bg-white/[0.06]",
      badgeBorder: "border-white/10",
      badgeText: "text-gray-300",
      bar: "linear-gradient(90deg, #888888 0%, #d4d4d4 100%)",
      glow: "0 0 30px rgba(255, 255, 255, 0.06), 0 4px 24px rgba(0, 0, 0, 0.5)",
    },
    featured: true,
  },
  {
    title: "Programador",
    institution: "Instituto Superior Politécnico Córdoba (ISPC)",
    issuer: "Ministerio de Educación — Provincia de Córdoba",
    hours: 364,
    date: "Agosto 2023",
    badgeLabel: "Título oficial del Estado",
    file: "/certs/programador-ispc.pdf",
    accent: {
      bg: "bg-white/[0.06]",
      border: "border-white/10",
      hoverBorder: "rgba(255, 255, 255, 0.15)",
      text: "text-gray-300",
      badgeBg: "bg-white/[0.06]",
      badgeBorder: "border-white/10",
      badgeText: "text-gray-300",
      bar: "linear-gradient(90deg, #888888 0%, #d4d4d4 100%)",
      glow: "0 0 30px rgba(255, 255, 255, 0.06), 0 4px 24px rgba(0, 0, 0, 0.5)",
    },
    featured: false,
  },
  {
    title: "Desarrollo Web",
    institution: "Coderhouse",
    issuer: "Certificado por PedidosYa",
    hours: 38,
    date: "Julio 2023",
    badgeLabel: "Certificado",
    file: "/certs/desarrollo-web-coderhouse.png",
    accent: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      hoverBorder: "rgba(16, 185, 129, 0.5)",
      text: "text-emerald-300",
      badgeBg: "bg-emerald-500/15",
      badgeBorder: "border-emerald-500/30",
      badgeText: "text-emerald-300",
      bar: "linear-gradient(90deg, #059669 0%, #34d399 100%)",
      glow: "0 0 30px rgba(16, 185, 129, 0.15), 0 4px 24px rgba(0, 0, 0, 0.5)",
    },
    featured: false,
  },
  {
    title: "Programming Essentials in Python",
    institution: "Instituto Superior Politécnico Córdoba / Cisco",
    issuer: null,
    hours: 75,
    date: "Abril 2023",
    badgeLabel: "Certificado oficial",
    file: "/certs/python-essentials-ispc.pdf",
    accent: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      hoverBorder: "rgba(245, 158, 11, 0.5)",
      text: "text-amber-300",
      badgeBg: "bg-amber-500/15",
      badgeBorder: "border-amber-500/30",
      badgeText: "text-amber-300",
      bar: "linear-gradient(90deg, #d97706 0%, #fbbf24 100%)",
      glow: "0 0 30px rgba(245, 158, 11, 0.15), 0 4px 24px rgba(0, 0, 0, 0.5)",
    },
    featured: false,
  },
];

/* ─── Animation Variants ──────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

/* ─── Progress Bar ────────────────────────────────────────────── */

function CertProgressBar({
  gradient,
  label,
}: {
  gradient: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-text-muted font-medium">{label}</span>
        <span className="text-text-secondary font-semibold">100%</span>
      </div>
      <div className="h-2 bg-bg-muted rounded-full overflow-hidden">
        <m.div
          className="h-full rounded-full"
          style={{ background: gradient }}
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */

export default function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <div className="container-main">
        {/* ── Header ──────────────────────────────────────── */}
        <m.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <m.p
            className="overline mb-4 justify-center"
            variants={headingVariants}
          >
            Formación verificada
          </m.p>
          <m.h2 className="section-heading" variants={headingVariants}>
            Mis{" "}
            <span className="gradient-text">certificaciones</span>
          </m.h2>
          <m.p
            className="text-text-secondary mt-4 max-w-xl mx-auto"
            variants={headingVariants}
          >
            Títulos oficiales y certificados que respaldan mis conocimientos
            técnicos.
          </m.p>
        </m.div>

        {/* ── Cards Grid ─────────────────────────────────── */}
        <m.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {certifications.map((cert) => (
            <m.div
              key={cert.title}
              className={`glass-card p-6 lg:p-8 group relative transition-all duration-300 ${
                cert.featured
                  ? "ring-1 ring-white/10 shadow-[0_0_40px_rgba(255,255,255,0.03)]"
                  : ""
              }`}
              variants={cardVariants}
              whileHover={{
                y: -4,
                borderColor: cert.accent.hoverBorder,
                boxShadow: cert.accent.glow,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Featured star */}
              {cert.featured && (
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              )}

              {/* Badge */}
              <div className="mb-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${cert.accent.badgeBg} ${cert.accent.badgeBorder} ${cert.accent.badgeText} border`}
                >
                  {cert.badgeLabel === "Título oficial del Estado" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  )}
                  {cert.badgeLabel}
                </span>
              </div>

              {/* Title */}
              <h3
                className={`font-display text-lg lg:text-xl font-bold text-text-primary mb-2 group-hover:${cert.accent.text} transition-colors`}
              >
                {cert.title}
              </h3>

              {/* Institution & issuer */}
              <p className={`text-sm font-medium ${cert.accent.text} mb-1`}>
                {cert.institution}
              </p>
              {cert.issuer && (
                <p className="text-xs text-text-muted mb-4">{cert.issuer}</p>
              )}
              {!cert.issuer && <div className="mb-4" />}

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-3 mb-5 text-xs text-text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {cert.hours} horas
                </span>
                <span className="w-1 h-1 rounded-full bg-text-muted/40" />
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  {cert.date}
                </span>
              </div>

              {/* Progress bar */}
              <CertProgressBar
                gradient={cert.accent.bar}
                label="Completado"
              />

              {/* Download button */}
              <m.a
                href={cert.file}
                download
                className={`inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${cert.accent.bg} ${cert.accent.border} ${cert.accent.text} hover:brightness-125`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
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
                Descargar certificado
              </m.a>
            </m.div>
          ))}
        </m.div>
      </div>
    </SectionWrapper>
  );
}
