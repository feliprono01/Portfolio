"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import ChamferBox from "@/components/ui/ChamferBox";
import Chip from "@/components/ui/Chip";
import OctaPattern from "@/components/ui/OctaPattern";
import { m, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Star, Lock, ExternalLink } from "lucide-react";

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } },
  exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.3, ease } },
};

/* ─── Badge accent map — alternates the two palette accents ───── */

const badgeAccent: Record<string, "primary" | "secondary"> = {
  "CLIENT/UI": "secondary",
  "REST API": "secondary",
  MOBILE: "primary",
  AUTH: "primary",
  SSG: "secondary",
};

/* ─── Component ──────────────────────────────────────────────── */

export default function Projects() {
  const [active, setActive] = useState<Category>("Todas");

  const filtered =
    active === "Todas" ? projects : projects.filter((p) => p.category === active);

  return (
    <SectionWrapper id="projects" className="bg-bg-secondary/40">
      <div className="container-main">
        {/* ── Header ──────────────────────────────────────── */}
        <m.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <m.div variants={headingVariants} className="flex justify-center">
            <SectionTitle>Proyectos</SectionTitle>
          </m.div>
          <m.p className="text-text-secondary mt-4 max-w-xl mx-auto" variants={headingVariants}>
            Soluciones reales donde apliqué cada parte del stack, de punta a punta.
          </m.p>
        </m.div>

        {/* ── Category Filters ────────────────────────────── */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <Chip
              key={cat}
              as="button"
              active={active === cat}
              onClick={() => setActive(cat)}
              className="text-sm uppercase"
            >
              {cat}
            </Chip>
          ))}
        </div>

        {/* ── Project Cards Grid ──────────────────────────── */}
        <m.div className="grid md:grid-cols-2 gap-6" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <m.article
                key={project.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                transition={{ duration: 0.3 }}
              >
                <ChamferBox
                  elevated
                  accent="border"
                  className="flex flex-col h-full group transition-all duration-300 hover:-translate-y-1 hover:border-accent-secondary/60"
                >
                  {/* Placeholder visual — swap for a screenshot once available */}
                  <div className="relative h-36 border-b border-border-subtle bg-bg-primary/40 flex items-center justify-center overflow-hidden">
                    <OctaPattern className="absolute -top-4 -right-4 opacity-40" />
                    <span className="font-display font-semibold uppercase text-text-muted/70 text-lg tracking-wide text-center px-4">
                      {project.title}
                    </span>
                    {project.featured && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-semibold bg-accent-primary text-bg-primary chamfer-sm">
                        <Star className="w-3 h-3" fill="currentColor" strokeWidth={0} />
                        Destacado
                      </span>
                    )}
                  </div>

                  <div className="p-6 lg:p-8 flex flex-col flex-1">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.badges.map((badge) => (
                        <span
                          key={badge}
                          className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border chamfer-sm ${
                            badgeAccent[badge] === "primary"
                              ? "text-accent-primary border-accent-primary/50"
                              : "text-accent-secondary border-accent-secondary/50"
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    <span className="pill self-start text-[10px] font-mono mb-3">{project.category}</span>

                    <h3 className="font-display font-semibold uppercase text-xl mb-2 text-text-primary">
                      {project.title}
                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-5">
                      {project.description}
                    </p>

                    <div className="h-px bg-border-subtle mb-5" />

                    <div className="mb-5">
                      <p className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider mb-3">
                        Stack tecnológico
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Chip key={tag}>{tag}</Chip>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-auto">
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2 px-4">
                          Demo
                          <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </a>
                      )}
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm py-2 px-4">
                          GitHub
                        </a>
                      )}
                      {!project.demo && !project.repo && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono text-text-muted border border-border-subtle chamfer-sm">
                          <Lock className="w-4 h-4" strokeWidth={1.75} />
                          Proyecto privado
                        </span>
                      )}
                    </div>
                  </div>
                </ChamferBox>
              </m.article>
            ))}
          </AnimatePresence>
        </m.div>

        {/* ── Empty state for filters ─────────────────────── */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <m.div className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-text-muted text-lg">No hay proyectos en esta categoría aún.</p>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
