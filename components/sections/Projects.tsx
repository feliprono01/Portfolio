"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { m, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ─── Types ───────────────────────────────────────────────────── */

type Category = "Todas" | "Frontend" | "Backend" | "FullStack";

interface Project {
  title: string;
  category: Category;
  description: string;
  badges: string[];
  tags: string[];
  repo: string | null;
  demo: string | null;
  featured: boolean;
}

/* ─── Data ────────────────────────────────────────────────────── */

const categories: Category[] = ["Todas", "Frontend", "Backend", "FullStack"];

const projects: Project[] = [
  {
    title: "Sistema de Almuerzo para Empresas",
    category: "FullStack",
    description:
      "Sistema integral para la gestión de almuerzos corporativos. Plataforma web y aplicación mobile consumiendo la misma API REST, permitiendo a empleados realizar pedidos y a administradores gestionar menús y reportes.",
    badges: ["CLIENT/UI", "REST API", "MOBILE"],
    tags: ["HTML", "CSS", "JavaScript", "Spring Boot", "React Native", "Expo Go"],
    repo: null,
    demo: null,
    featured: true,
  },
  {
    title: "Historias Clínicas — Psiquiatría",
    category: "FullStack",
    description:
      "Sistema para almacenar y gestionar pacientes del área psiquiátrica junto con su evolución clínica. Implementación de seguridad robusta para protección de datos sensibles de salud mental.",
    badges: ["CLIENT/UI", "REST API", "AUTH"],
    tags: ["React", "Tailwind CSS", "Spring Boot", "Spring Security", "MySQL"],
    repo: null,
    demo: null,
    featured: true,
  },
  {
    title: "RDAM",
    category: "FullStack",
    description:
      "Sistema RDAM para el Poder Judicial de la provincia de Santa Fe. Permite la solicitud de certificados por parte de los ciudadanos y la carga de los mismos por parte de los operadores. Arquitectura fullstack con autenticación, roles y deploy containerizado.",
    badges: ["CLIENT/UI", "REST API", "AUTH"],
    tags: ["React", "Tailwind CSS", "Spring Boot", "Spring Security", "MySQL", "Docker"],
    repo: null,
    demo: null,
    featured: true,
  },
  {
    title: "Portfolio Personal",
    category: "Frontend",
    description:
      "Portfolio profesional para mostrar capacidades, experiencia y proyectos. Diseño moderno con animaciones, modo oscuro y rendimiento optimizado.",
    badges: ["CLIENT/UI", "SSG"],
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    repo: null,
    demo: null,
    featured: true,
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

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.97,
    transition: { duration: 0.3, ease },
  },
};

/* ─── Badge color map ─────────────────────────────────────────── */

const badgeColors: Record<string, string> = {
  "CLIENT/UI":
    "bg-white/[0.06] text-gray-300 border-white/10",
  "REST API":
    "bg-white/[0.06] text-gray-300 border-white/10",
  MOBILE:
    "bg-amber-500/10 text-amber-300 border-amber-500/25",
  AUTH:
    "bg-rose-500/10 text-rose-300 border-rose-500/25",
  SSG:
    "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
};

/* ─── Component ──────────────────────────────────────────────── */

export default function Projects() {
  const [active, setActive] = useState<Category>("Todas");

  const filtered =
    active === "Todas"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <SectionWrapper id="projects" className="bg-bg-secondary/50">
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
            Portafolio
          </m.p>
          <m.h2 className="section-heading" variants={headingVariants}>
            Proyectos{" "}
            <span className="gradient-text">destacados</span>
          </m.h2>
          <m.p
            className="text-text-secondary mt-4 max-w-xl mx-auto"
            variants={headingVariants}
          >
            Soluciones reales donde apliqué cada parte del stack, de punta a
            punta.
          </m.p>
        </m.div>

        {/* ── Category Filters ────────────────────────────── */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 border ${
                active === cat
                  ? "text-text-primary border-white/30 bg-white/[0.08]"
                  : "text-text-muted border-bg-muted/60 hover:text-text-secondary hover:border-bg-muted"
              }`}
            >
              {active === cat && (
                <m.span
                  className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/15"
                  layoutId="filterPill"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* ── Project Cards Grid ──────────────────────────── */}
        <m.div className="grid md:grid-cols-2 gap-6" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <m.article
                key={project.title}
                className="glass-card p-6 lg:p-8 group relative overflow-hidden flex flex-col"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                whileHover={{
                  y: -6,
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  boxShadow:
                    "0 0 30px rgba(255, 255, 255, 0.04), 0 8px 32px rgba(0, 0, 0, 0.5)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                {/* Top row: badges + featured */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
                  {/* Architecture badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.badges.map((badge) => (
                      <span
                        key={badge}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          badgeColors[badge] ??
                          "bg-zinc-500/10 text-zinc-300 border-zinc-500/25"
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {project.featured && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/25">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      Destacado
                    </span>
                  )}
                </div>

                {/* Category pill */}
                <span className="pill self-start text-[10px] mb-3">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="font-display font-bold text-xl mb-2 text-text-primary group-hover:text-white transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-5">
                  {project.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />

                {/* Tech tags */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                    Stack tecnológico
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 text-[12px] font-medium rounded-full border transition-all duration-300 bg-white/[0.04] border-white/10 text-gray-300 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_0_18px_rgba(255,255,255,0.04)] cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-auto">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm py-2 px-4"
                    >
                      Demo
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-sm py-2 px-4"
                    >
                      GitHub
                    </a>
                  )}
                  {!project.demo && !project.repo && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-text-muted border border-bg-muted/60">
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Proyecto privado
                    </span>
                  )}
                </div>
              </m.article>
            ))}
          </AnimatePresence>
        </m.div>

        {/* ── Empty state for filters ─────────────────────── */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <m.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-text-muted text-lg">
                No hay proyectos en esta categoría aún.
              </p>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
