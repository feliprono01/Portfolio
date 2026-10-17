"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import ChamferBox from "@/components/ui/ChamferBox";
import { m } from "framer-motion";
import { ShieldCheck, Clock, Calendar, Download, Star } from "lucide-react";
import { CERTIFICATIONS } from "@/content/certifications";

/* ─── Animation Variants ──────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
};

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
          <m.div variants={headingVariants} className="flex justify-center">
            <SectionTitle>Certificaciones</SectionTitle>
          </m.div>
          <m.p className="text-text-secondary mt-4 max-w-xl mx-auto" variants={headingVariants}>
            Títulos oficiales y certificados que respaldan mis conocimientos técnicos.
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
          {CERTIFICATIONS.map((cert) => (
            <m.div key={cert.title} variants={cardVariants}>
              <ChamferBox elevated accent={cert.accent} className="p-6 lg:p-8 relative h-full">
                {cert.featured && (
                  <span className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-accent-primary text-bg-primary chamfer-sm">
                    <Star className="w-4 h-4" fill="currentColor" strokeWidth={0} />
                  </span>
                )}

                <div className="mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider border chamfer-sm ${
                      cert.accent === "primary"
                        ? "text-accent-primary border-accent-primary"
                        : "text-accent-secondary border-accent-secondary"
                    }`}
                  >
                    {cert.official && <ShieldCheck className="w-3 h-3" strokeWidth={2} />}
                    {cert.badgeLabel}
                  </span>
                </div>

                <h3 className="font-display text-lg lg:text-xl font-semibold uppercase text-text-primary mb-2">
                  {cert.title}
                </h3>

                <p className={`text-sm font-medium mb-1 ${cert.accent === "primary" ? "accent-text" : "accent-text-secondary"}`}>
                  {cert.institution}
                </p>
                {cert.issuer && <p className="text-xs text-text-muted mb-4">{cert.issuer}</p>}
                {!cert.issuer && <div className="mb-4" />}

                <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-mono text-text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
                    {cert.hours} horas
                  </span>
                  <span className="w-1 h-1 bg-border-strong" />
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />
                    {cert.date}
                  </span>
                </div>

                <m.a
                  href={cert.file}
                  download
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-mono font-medium border chamfer-sm transition-all duration-200 ${
                    cert.accent === "primary"
                      ? "text-accent-primary border-accent-primary hover:bg-accent-primary hover:text-bg-primary"
                      : "text-accent-secondary border-accent-secondary hover:bg-accent-secondary hover:text-bg-primary"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Download className="w-4 h-4" strokeWidth={1.75} />
                  Descargar certificado
                </m.a>
              </ChamferBox>
            </m.div>
          ))}
        </m.div>
      </div>
    </SectionWrapper>
  );
}
