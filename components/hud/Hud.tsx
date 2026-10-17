"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, Check } from "lucide-react";
import SkinSelector from "@/components/ui/SkinSelector";
import { SECTIONS, type SectionId } from "@/content/sections";
import { useAppStore } from "@/lib/store";

interface HudProps {
  sectionId: SectionId;
}

/**
 * Replaces the old scroll-anchor NavBar on every section page: a back-to-hub
 * link, the current level's name, an XP bar showing how much of the site
 * has been explored (visited.length / total, from the same achievements
 * list the toast system already tracks), and a quick "warp" menu to jump
 * straight to any other level without detouring through the hub.
 */
export default function Hud({ sectionId }: HudProps) {
  const [warpOpen, setWarpOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const warpButtonRef = useRef<HTMLButtonElement>(null);

  const achievements = useAppStore((s) => s.achievements);
  const unlock = useAppStore((s) => s.unlock);
  const hydrated = useAppStore((s) => s.hydrated);

  const current = SECTIONS.find((s) => s.id === sectionId);
  const visitedCount = SECTIONS.filter((s) => achievements.includes(s.id)).length;
  const progressPct = Math.round((visitedCount / SECTIONS.length) * 100);

  // Mark this level as visited once the store has read localStorage.
  useEffect(() => {
    if (hydrated) unlock(sectionId);
  }, [hydrated, sectionId, unlock]);

  // Close the warp menu on outside click / Escape.
  useEffect(() => {
    if (!warpOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setWarpOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setWarpOpen(false);
        warpButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [warpOpen]);

  return (
    <header className="sticky top-0 z-[100] border-b border-border-subtle bg-bg-primary/90 backdrop-blur-xl">
      <div className="container-main h-[4.25rem] flex items-center justify-between gap-3">
        {/* Back to hub */}
        <Link
          href="/"
          aria-label="Volver al hub"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-text-muted hover:text-text-primary transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
          <span className="hidden sm:inline">Hub</span>
        </Link>

        {/* Current level + XP bar */}
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <span className="font-display font-semibold uppercase text-sm text-text-primary truncate">
            {current?.label}
          </span>
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-[200px]">
            <div className="flex-1 h-1.5 bg-bg-elevated border border-border-default overflow-hidden">
              <div className="h-full bg-accent-primary transition-all duration-500" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="font-mono text-[10px] text-text-muted shrink-0">
              {visitedCount}/{SECTIONS.length}
            </span>
          </div>
        </div>

        {/* Warp menu + skin selector */}
        <div ref={rootRef} className="relative flex items-center gap-2 shrink-0">
          <button
            ref={warpButtonRef}
            type="button"
            onClick={() => setWarpOpen((o) => !o)}
            aria-expanded={warpOpen}
            aria-haspopup="true"
            className="inline-flex items-center gap-1.5 h-9 px-3 border border-border-strong bg-bg-elevated text-xs font-mono uppercase tracking-wide text-text-primary chamfer-sm hover:border-accent-primary transition-colors"
          >
            Niveles
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${warpOpen ? "rotate-180" : ""}`} strokeWidth={1.75} />
          </button>

          <AnimatePresence>
            {warpOpen && (
              <m.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                role="menu"
                aria-label="Saltar a otro nivel"
                className="absolute right-0 top-full mt-2 w-60 border border-border-strong bg-bg-secondary p-2 shadow-card-lg chamfer z-10"
              >
                {SECTIONS.map((s) => {
                  const isCurrent = s.id === sectionId;
                  const visited = achievements.includes(s.id);
                  return (
                    <Link
                      key={s.id}
                      href={s.path}
                      role="menuitem"
                      onClick={() => setWarpOpen(false)}
                      className={`flex items-center justify-between gap-2 px-3 py-2 text-sm chamfer-sm transition-colors ${
                        isCurrent
                          ? "bg-bg-elevated text-accent-primary"
                          : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                      }`}
                      aria-current={isCurrent ? "page" : undefined}
                    >
                      {s.label}
                      {visited && !isCurrent && <Check className="w-3.5 h-3.5 accent-text-secondary" strokeWidth={2} />}
                    </Link>
                  );
                })}
              </m.div>
            )}
          </AnimatePresence>

          <SkinSelector />
        </div>
      </div>
    </header>
  );
}
