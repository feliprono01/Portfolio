"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useKonami } from "@/hooks/useKonami";
import { playUnlock, playPowerUp } from "@/lib/sfx";

interface Achievement {
  id: string;
  label: string;
}

const SECTION_ACHIEVEMENTS: Achievement[] = [
  { id: "about", label: "Conociste la historia" },
  { id: "skills", label: "Revisaste el inventario" },
  { id: "experience", label: "Abriste el registro de misiones" },
  { id: "certifications", label: "Encontraste los logros oficiales" },
  { id: "projects", label: "Entraste a la sala de cartuchos" },
  { id: "contact", label: "Llegaste al final del mapa" },
];

const KONAMI_ACHIEVEMENT: Achievement = { id: "konami", label: "Código secreto desbloqueado" };

const TOAST_MS = 3600;

/**
 * Mounted once in the layout. Watches each main section with an
 * IntersectionObserver and unlocks a one-time achievement the first time a
 * visitor scrolls into it; also wires the Konami code to its own
 * achievement + a glitch burst. Toasts queue instead of overlapping, are
 * role="status" (announced, non-blocking), and never steal focus.
 */
export default function AchievementToast() {
  const hydrated = useAppStore((s) => s.hydrated);
  const unlock = useAppStore((s) => s.unlock);
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const soundRef = useRef(soundEnabled);
  soundRef.current = soundEnabled;

  const [queue, setQueue] = useState<Achievement[]>([]);
  const current = queue[0] ?? null;

  const enqueue = useCallback((achievement: Achievement, sound: () => void) => {
    setQueue((q) => [...q, achievement]);
    if (soundRef.current) sound();
  }, []);

  // ── Section watchers ─────────────────────────────────────────
  useEffect(() => {
    if (!hydrated) return;

    const observers: IntersectionObserver[] = [];
    for (const achievement of SECTION_ACHIEVEMENTS) {
      const el = document.getElementById(achievement.id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && unlock(achievement.id)) {
            enqueue(achievement, playUnlock);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [hydrated, unlock, enqueue]);

  // ── Konami code ───────────────────────────────────────────────
  useKonami(() => {
    if (!hydrated) return;
    document.documentElement.classList.add("glitch-burst");
    setTimeout(() => document.documentElement.classList.remove("glitch-burst"), 1600);
    if (unlock(KONAMI_ACHIEVEMENT.id)) {
      enqueue(KONAMI_ACHIEVEMENT, playPowerUp);
    }
  });

  // ── Advance the queue ────────────────────────────────────────
  useEffect(() => {
    if (!current) return;
    const timer = setTimeout(() => setQueue((q) => q.slice(1)), TOAST_MS);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9970] pointer-events-none w-[calc(100%-2rem)] max-w-sm"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {current && (
          <m.div
            key={current.id}
            role="status"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 border border-accent-primary bg-bg-secondary p-3.5 chamfer-sm shadow-card-lg"
          >
            <span className="flex items-center justify-center w-9 h-9 bg-accent-primary text-bg-primary chamfer-sm shrink-0">
              <Trophy className="w-5 h-5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-wider accent-text">
                Logro desbloqueado
              </p>
              <p className="text-sm text-text-primary leading-snug">{current.label}</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
