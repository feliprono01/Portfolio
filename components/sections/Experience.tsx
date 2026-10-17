"use client";

import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import ChamferBox from "@/components/ui/ChamferBox";
import Chip from "@/components/ui/Chip";
import { m } from "framer-motion";
import { Calendar, MapPinned, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { ROLE, QUESTS } from "@/content/experience";

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

/* ─── Component ──────────────────────────────────────────────── */

export default function Experience() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 320) + 16;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

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
            Un registro de misiones: proyectos reales donde apliqué cada parte del stack.
          </m.p>
        </m.div>

        {/* ── Role summary card ────────────────────────────── */}
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
              {ROLE.period}
            </span>
          </m.div>

          <m.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            <ChamferBox elevated accent="primary" className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-display font-semibold uppercase text-xl md:text-2xl text-text-primary">
                    {ROLE.title}
                  </h3>
                  <p className="text-text-muted text-sm mt-1">{ROLE.context}</p>
                </div>

                <span className="pill font-mono gap-2 shrink-0">
                  <MapPinned className="w-3.5 h-3.5" strokeWidth={1.75} />
                  {ROLE.modality}
                </span>
              </div>

              <p className="text-text-secondary text-sm md:text-[0.9375rem] leading-relaxed">
                {ROLE.description}
              </p>
            </ChamferBox>
          </m.div>
        </div>

        {/* ── Quest log ─────────────────────────────────────── */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4 max-w-3xl mx-auto lg:max-w-none">
            <p className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">
              Registro de misiones
            </p>
            <div className="hidden sm:flex gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Misión anterior"
                className="p-1.5 border border-border-default text-text-muted hover:text-text-primary hover:border-accent-secondary transition-colors chamfer-sm"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Siguiente misión"
                className="p-1.5 border border-border-default text-text-muted hover:text-text-primary hover:border-accent-secondary transition-colors chamfer-sm"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          <ul
            ref={trackRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 px-6 -mx-6 pb-4"
            style={{ scrollbarWidth: "thin" }}
          >
            {QUESTS.map((quest, i) => (
              <m.li
                key={quest.title}
                className="shrink-0 w-[85vw] sm:w-[320px] snap-start"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <ChamferBox
                  elevated
                  accent={quest.status === "En progreso" ? "secondary" : "border"}
                  className="p-5 h-full flex flex-col"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider chamfer-sm ${
                        quest.status === "En progreso"
                          ? "bg-accent-secondary text-bg-primary"
                          : "border border-accent-primary text-accent-primary"
                      }`}
                    >
                      {quest.status === "En progreso" ? (
                        <span className="status-dot" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3" strokeWidth={2} />
                      )}
                      {quest.status}
                    </span>
                  </div>

                  <h4 className="font-display font-semibold uppercase text-base text-text-primary leading-snug mb-1">
                    {quest.title}
                  </h4>
                  <p className="text-xs font-mono text-text-muted mb-3">{quest.client}</p>

                  <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-4">{quest.text}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {quest.tags.map((tag) => (
                      <Chip key={tag} className="text-[11px]">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </ChamferBox>
              </m.li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
