"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { ScrollText, Package, Map, Trophy, Disc3, MessageSquare, CheckCircle2 } from "lucide-react";
import ChamferBox from "@/components/ui/ChamferBox";
import OctaIcon from "@/components/ui/OctaIcon";
import SectionTitle from "@/components/ui/SectionTitle";
import { SECTIONS, type SectionId } from "@/content/sections";
import { useAppStore } from "@/lib/store";

const SECTION_ICONS: Record<SectionId, ReactNode> = {
  about: <ScrollText className="w-6 h-6" strokeWidth={1.75} />,
  skills: <Package className="w-6 h-6" strokeWidth={1.75} />,
  experience: <Map className="w-6 h-6" strokeWidth={1.75} />,
  certifications: <Trophy className="w-6 h-6" strokeWidth={1.75} />,
  projects: <Disc3 className="w-6 h-6" strokeWidth={1.75} />,
  contact: <MessageSquare className="w-6 h-6" strokeWidth={1.75} />,
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/**
 * Level-select grid for the hub. Each tile is a real <Link> (Tab + Enter
 * already works with zero extra code); arrow keys are layered on top as a
 * grid-navigation enhancement, reading the live column count from the
 * computed grid so it stays correct across breakpoints.
 */
export default function LevelSelect() {
  const gridRef = useRef<HTMLDivElement>(null);
  const achievements = useAppStore((s) => s.achievements);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const grid = gridRef.current;
    if (!grid) return;
    const tiles = Array.from(grid.querySelectorAll<HTMLAnchorElement>("a[data-level-tile]"));
    const currentIndex = tiles.indexOf(document.activeElement as HTMLAnchorElement);
    if (currentIndex === -1) return;

    const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    let next = currentIndex;

    switch (e.key) {
      case "ArrowRight":
        next = Math.min(currentIndex + 1, tiles.length - 1);
        break;
      case "ArrowLeft":
        next = Math.max(currentIndex - 1, 0);
        break;
      case "ArrowDown":
        next = Math.min(currentIndex + columns, tiles.length - 1);
        break;
      case "ArrowUp":
        next = Math.max(currentIndex - columns, 0);
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = tiles.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    tiles[next]?.focus();
  };

  return (
    <section className="container-main pb-24">
      <div className="flex justify-center mb-10">
        <SectionTitle>Elegí un nivel</SectionTitle>
      </div>

      <div
        ref={gridRef}
        onKeyDown={handleKeyDown}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        role="group"
        aria-label="Selección de nivel"
      >
        {SECTIONS.map((section, i) => {
          const visited = achievements.includes(section.id);
          return (
            <m.div
              key={section.id}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <Link
                href={section.path}
                data-level-tile
                className="group block h-full outline-none"
              >
                <ChamferBox
                  elevated
                  accent={i % 2 === 0 ? "primary" : "secondary"}
                  className="p-6 h-full flex items-center gap-4 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-accent-primary group-focus-visible:-translate-y-1 group-focus-visible:border-accent-primary group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-accent-primary group-focus-visible:outline-offset-2"
                >
                  <OctaIcon accent={i % 2 === 0 ? "primary" : "secondary"}>
                    {SECTION_ICONS[section.id]}
                  </OctaIcon>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold uppercase text-base text-text-primary">
                        {section.label}
                      </h3>
                      {visited && (
                        <CheckCircle2
                          className="w-3.5 h-3.5 accent-text-secondary shrink-0"
                          strokeWidth={2}
                          aria-label="Explorado"
                        />
                      )}
                    </div>
                    <p className="text-xs font-mono text-text-muted mt-0.5 truncate">{section.tagline}</p>
                  </div>
                </ChamferBox>
              </Link>
            </m.div>
          );
        })}
      </div>
    </section>
  );
}
