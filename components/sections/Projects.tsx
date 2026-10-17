"use client";

import { useId, useRef, useState, type MouseEvent } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import Chip from "@/components/ui/Chip";
import OctaPattern from "@/components/ui/OctaPattern";
import Dialog from "@/components/ui/Dialog";
import { m, AnimatePresence } from "framer-motion";
import { Star, Lock, ExternalLink } from "lucide-react";
import { PROJECT_CATEGORIES, PROJECTS, BADGE_ACCENT, type Project, type ProjectCategory } from "@/content/projects";

const GOLD = "#e0b030";

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

/* ─── Cartridge — a project tile with a CSS 3D tilt that tracks
   the pointer, like picking it off a shelf. Reduced motion gets a
   flat hover instead. ──────────────────────────────────────────── */

function Cartridge({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--ry", `${px * 14}deg`);
    el.style.setProperty("--rx", `${py * -14}deg`);
  };

  const resetTilt = () => {
    ref.current?.style.setProperty("--ry", "0deg");
    ref.current?.style.setProperty("--rx", "0deg");
  };

  const gold = project.featured;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      aria-haspopup="dialog"
      className="group text-left w-full"
      style={{
        transform: "perspective(700px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        transition: "transform 150ms ease-out",
      }}
    >
      {/* Connector tab — the part that would slide into the console */}
      <div
        className="relative z-10 mx-7 h-3.5 chamfer-sm flex items-end justify-center gap-[2px] px-2 pb-0.5 transition-colors duration-200"
        style={{ backgroundColor: gold ? GOLD : "var(--color-border-strong)" }}
        aria-hidden="true"
      >
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} className="w-full h-1" style={{ backgroundColor: "var(--color-bg)", opacity: 0.4 }} />
        ))}
      </div>

      {/* Cartridge body */}
      <div
        className="relative -mt-1 flex flex-col h-full border-2 chamfer-cartridge transition-colors duration-200"
        style={{
          backgroundColor: "var(--color-surface-elevated)",
          borderColor: gold ? GOLD : "var(--color-border)",
          boxShadow: gold ? `0 0 18px rgb(224 176 48 / 0.3)` : undefined,
        }}
      >
        {gold && (
          <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-bg-primary chamfer-sm" style={{ backgroundColor: GOLD }}>
            <Star className="w-2.5 h-2.5" fill="currentColor" strokeWidth={0} />
            Edición especial
          </span>
        )}

        {/* Printed label — inset, like a sticker glued to the shell */}
        <div className="m-3 mb-0">
          <div
            className="relative h-28 border overflow-hidden flex items-center justify-center chamfer-sm"
            style={{
              backgroundColor: "var(--color-bg)",
              borderColor: gold ? GOLD : "var(--color-border-default)",
            }}
          >
            <OctaPattern className="absolute -top-4 -right-4 opacity-40" />
            <span
              className="font-display font-semibold uppercase text-base tracking-wide text-center px-4"
              style={{ color: gold ? GOLD : "var(--color-text-secondary)" }}
            >
              {project.title}
            </span>
          </div>
        </div>

        <div className="p-4 pt-3 flex flex-col flex-1">
          <span className="pill self-start text-[10px] font-mono mb-2">{project.category}</span>
          <h3 className="font-display font-semibold uppercase text-base text-text-primary mb-1">
            {project.title}
          </h3>
          <p className="text-text-muted text-xs font-mono mt-auto pt-3">Ver detalle →</p>
        </div>
      </div>
    </button>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory>("Todas");
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const titleId = useId();

  const filtered =
    active === "Todas" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

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
            Un estante de cartuchos — elegí uno para ver el detalle completo.
          </m.p>
        </m.div>

        {/* ── Category Filters ────────────────────────────── */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {PROJECT_CATEGORIES.map((cat) => (
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

        {/* ── Cartridge shelf ──────────────────────────────── */}
        <m.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <m.div
                key={project.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                transition={{ duration: 0.3 }}
              >
                <Cartridge project={project} onOpen={() => setOpenProject(project)} />
              </m.div>
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

      {/* ── Detail dialog ──────────────────────────────────── */}
      <Dialog
        open={openProject !== null}
        onClose={() => setOpenProject(null)}
        titleId={titleId}
        title={openProject?.title ?? ""}
      >
        {openProject && (
          <>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {openProject.badges.map((badge) => (
                <span
                  key={badge}
                  className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border chamfer-sm ${
                    BADGE_ACCENT[badge] === "primary"
                      ? "text-accent-primary border-accent-primary/50"
                      : "text-accent-secondary border-accent-secondary/50"
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>

            <span className="pill text-[10px] font-mono mb-4 inline-flex">{openProject.category}</span>

            <p className="text-text-secondary text-sm leading-relaxed mb-5">{openProject.description}</p>

            <div className="h-px bg-border-subtle mb-5" />

            <p className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider mb-3">
              Stack tecnológico
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {openProject.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>

            <div className="flex gap-3">
              {openProject.demo && (
                <a href={openProject.demo} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2 px-4">
                  Demo
                  <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />
                </a>
              )}
              {openProject.repo && (
                <a href={openProject.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm py-2 px-4">
                  GitHub
                </a>
              )}
              {!openProject.demo && !openProject.repo && (
                <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono text-text-muted border border-border-subtle chamfer-sm">
                  <Lock className="w-4 h-4" strokeWidth={1.75} />
                  Proyecto privado
                </span>
              )}
            </div>
          </>
        )}
      </Dialog>
    </SectionWrapper>
  );
}
