"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import OctaIcon from "@/components/ui/OctaIcon";
import { m, useInView } from "framer-motion";
import { useSkillParticles } from "@/hooks/useSkillParticles";
import { Monitor, Server, Database, GitBranch, Check } from "lucide-react";
import { SKILL_CATEGORIES, LEVEL_LABEL, type SkillLevel, type SkillCategoryIcon, type Skill } from "@/content/skills";

const CATEGORY_ICONS: Record<SkillCategoryIcon, ReactNode> = {
  frontend: <Monitor className="w-5 h-5" strokeWidth={1.75} />,
  backend: <Server className="w-5 h-5" strokeWidth={1.75} />,
  database: <Database className="w-5 h-5" strokeWidth={1.75} />,
  tools: <GitBranch className="w-5 h-5" strokeWidth={1.75} />,
};

const ease = [0.22, 1, 0.36, 1] as const;

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const branchVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease },
  }),
};

const NODE_CLIP =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

// Deterministic "organic" jitter — fixed per index so server/client match
// (no Math.random here) but it reads as hand-placed, not a grid.
const X_JITTER = [0, 10, -6, 16, -4, 8, -10, 4];
const Y_JITTER = [0, -8, 6, -4, 10, -6, 4, -10];

/** Legend chip — one filled node + the level it represents. */
function LevelLegend({ level }: { level: SkillLevel }) {
  const fill = level === 3 ? 1 : level === 2 ? 0.55 : 0;
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="inline-block w-3 h-3 border"
        style={{
          clipPath: NODE_CLIP,
          borderColor: "var(--color-accent-primary)",
          backgroundColor: fill > 0 ? `rgb(var(--color-accent-primary-rgb) / ${fill})` : "transparent",
        }}
        aria-hidden="true"
      />
      {LEVEL_LABEL[level]}
    </span>
  );
}

/**
 * One skill tree node: starts dim, "unlocks" (fills in, proportional to
 * level) the first time it scrolls into view. A level-3 node gets a solid
 * fill and a checkmark; level 2 a half-fill; level 1 stays an outline.
 * Nudged off-grid by a small deterministic jitter so the branch reads as
 * organically placed rather than a perfectly ruled list.
 */
function SkillNode({
  skill,
  index,
  inView,
  delay,
  onHover,
  nodeRef,
}: {
  skill: Skill;
  index: number;
  inView: boolean;
  delay: number;
  onHover: (e: React.MouseEvent<HTMLDivElement>) => void;
  nodeRef: (el: HTMLDivElement | null) => void;
}) {
  const fill = skill.level === 3 ? 1 : skill.level === 2 ? 0.55 : 0;
  const dx = X_JITTER[index % X_JITTER.length];

  return (
    <m.div
      className="relative z-10 flex items-center gap-4"
      style={{ marginLeft: dx }}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay, ease }}
      onMouseEnter={onHover}
    >
      <div ref={nodeRef} className="w-10 flex justify-center shrink-0">
        <m.span
          className="relative flex items-center justify-center w-7 h-7 border-2"
          style={{ clipPath: NODE_CLIP, borderColor: "var(--color-accent-primary)" }}
          initial={{ scale: 0.5, backgroundColor: "transparent" }}
          animate={
            inView
              ? { scale: 1, backgroundColor: fill > 0 ? `rgb(var(--color-accent-primary-rgb) / ${fill})` : "transparent" }
              : {}
          }
          transition={{ duration: 0.4, delay: delay + 0.1, ease }}
        >
          {skill.level === 3 && <Check className="w-3.5 h-3.5 text-bg-primary" strokeWidth={3} />}
        </m.span>
      </div>
      <div className="min-w-0">
        <p className="text-sm text-text-secondary truncate">{skill.name}</p>
        <p className="text-[10px] font-mono uppercase text-text-muted">{LEVEL_LABEL[skill.level]}</p>
      </div>
    </m.div>
  );
}

/**
 * One category branch: a root node (the category) with curved SVG paths
 * reaching out to each skill node — measured from real DOM positions
 * (post-jitter) so the branches actually connect root → node, not a
 * straight ruler line down a column.
 */
function SkillBranch({
  title,
  icon,
  skills,
  accent,
  index,
  sectionRef,
  emitAt,
}: {
  title: string;
  icon: ReactNode;
  skills: Skill[];
  accent: "primary" | "secondary";
  index: number;
  sectionRef: React.RefObject<HTMLDivElement>;
  emitAt: (x: number, y: number) => void;
}) {
  const branchRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });
  const inView = useInView(branchRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const root = rootRef.current;
      if (!container || !root) return;
      const cRect = container.getBoundingClientRect();
      const rRect = root.getBoundingClientRect();
      const rootPoint = { x: rRect.left + rRect.width / 2 - cRect.left, y: rRect.top + rRect.height / 2 - cRect.top };

      const newPaths = nodeRefs.current.map((el, i) => {
        if (!el) return "";
        const nRect = el.getBoundingClientRect();
        const nodePoint = { x: nRect.left + nRect.width / 2 - cRect.left, y: nRect.top + nRect.height / 2 - cRect.top };
        const bow = Y_JITTER[i % Y_JITTER.length];
        const c1y = rootPoint.y + (nodePoint.y - rootPoint.y) * 0.35 + bow;
        const c2y = rootPoint.y + (nodePoint.y - rootPoint.y) * 0.75 + bow * 0.5;
        return `M ${rootPoint.x} ${rootPoint.y} C ${rootPoint.x} ${c1y}, ${nodePoint.x} ${c2y}, ${nodePoint.x} ${nodePoint.y}`;
      });
      setPaths(newPaths);
      setSvgSize({ w: cRect.width, h: cRect.height });
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [skills.length]);

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const sectionRect = sectionRef.current?.getBoundingClientRect();
    if (!sectionRect) return;
    emitAt(rect.left - sectionRect.left + 24, rect.top - sectionRect.top + rect.height / 2);
  };

  return (
    <m.div ref={branchRef} custom={index} variants={branchVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
      <div className="flex items-center gap-4 mb-6">
        <div ref={rootRef} className="w-10 flex justify-center shrink-0">
          <OctaIcon accent={accent}>{icon}</OctaIcon>
        </div>
        <div>
          <h3 className="font-display font-semibold uppercase text-base text-text-primary">{title}</h3>
          <span className="text-xs font-mono text-text-muted">{skills.length} tecnologías</span>
        </div>
      </div>

      <div ref={containerRef} className="relative">
        <svg
          className="absolute inset-0 pointer-events-none"
          width={svgSize.w}
          height={svgSize.h}
          aria-hidden="true"
        >
          {paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="var(--color-border-strong)"
              strokeWidth={1.5}
              style={{ opacity: inView ? 0.7 : 0, transition: `opacity 0.5s ease ${i * 0.08 + 0.1}s` }}
            />
          ))}
        </svg>

        <div className="space-y-4">
          {skills.map((skill, si) => (
            <SkillNode
              key={skill.name}
              skill={skill}
              index={si}
              inView={inView}
              delay={si * 0.08}
              onHover={handleHover}
              nodeRef={(el) => {
                nodeRefs.current[si] = el;
              }}
            />
          ))}
        </div>
      </div>
    </m.div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { canvasRef, emitAt } = useSkillParticles(sectionRef);

  return (
    <SectionWrapper id="skills" className="bg-bg-secondary/40">
      <div ref={sectionRef} className="container-main relative overflow-hidden">
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

        {/* ── Header ──────────────────────────────────────── */}
        <m.div
          className="text-center mb-4 relative"
          style={{ zIndex: 2 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <m.div variants={headingVariants} className="flex justify-center">
            <SectionTitle>Árbol de habilidades</SectionTitle>
          </m.div>
          <m.p className="text-text-secondary mt-4 max-w-xl mx-auto" variants={headingVariants}>
            Cada nodo se ilumina al llegar a él. El nivel sale de cuánto usé esa
            tecnología en proyectos reales, no de una autoevaluación.
          </m.p>
          <m.p
            className="font-mono text-xs text-text-muted mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5"
            variants={headingVariants}
          >
            <LevelLegend level={1} />
            <LevelLegend level={2} />
            <LevelLegend level={3} />
          </m.p>
        </m.div>

        {/* ── Skill tree ──────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 relative mt-12" style={{ zIndex: 2 }}>
          {SKILL_CATEGORIES.map((cat, ci) => (
            <SkillBranch
              key={cat.title}
              title={cat.title}
              icon={CATEGORY_ICONS[cat.icon]}
              skills={cat.skills}
              accent={ci % 2 === 0 ? "primary" : "secondary"}
              index={ci}
              sectionRef={sectionRef}
              emitAt={emitAt}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
