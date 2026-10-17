"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useKonami } from "@/hooks/useKonami";
import { playUnlock, playPowerUp } from "@/lib/sfx";

interface ToastItem {
  id: string;
  label: string;
}

const LABELS: Record<string, string> = {
  about: "Conociste la historia",
  skills: "Revisaste el inventario",
  experience: "Abriste el registro de misiones",
  certifications: "Encontraste los logros oficiales",
  projects: "Entraste a la sala de cartuchos",
  contact: "Llegaste al final del mapa",
  konami: "Código secreto desbloqueado",
  terminal: "Descubriste la terminal",
};

const TOAST_MS = 3600;

/**
 * Mounted once in the layout. Doesn't decide *when* achievements unlock —
 * that's each caller's job (Hud.tsx calls unlock() when a level page mounts,
 * useKonami below calls it for the secret code, and later the terminal can
 * do the same). This component just diffs the persisted achievements list
 * against what it's already shown a toast for, so any unlock() anywhere
 * surfaces one automatically. Toasts queue instead of overlapping, are
 * role="status" (announced, non-blocking), and never steal focus.
 */
export default function AchievementToast() {
  const hydrated = useAppStore((s) => s.hydrated);
  const unlock = useAppStore((s) => s.unlock);
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const soundRef = useRef(soundEnabled);
  soundRef.current = soundEnabled;

  const [queue, setQueue] = useState<ToastItem[]>([]);
  const current = queue[0] ?? null;
  const seenRef = useRef<Set<string>>(new Set());

  const enqueue = useCallback((id: string, sound: () => void) => {
    const label = LABELS[id];
    if (!label) return;
    setQueue((q) => [...q, { id, label }]);
    if (soundRef.current) sound();
  }, []);

  // ── Diff the achievements list on every change ────────────────────────
  useEffect(() => {
    if (!hydrated) return;
    seenRef.current = new Set(useAppStore.getState().achievements);

    return useAppStore.subscribe((state, prev) => {
      if (state.achievements === prev.achievements) return;
      for (const id of state.achievements) {
        if (!seenRef.current.has(id)) {
          seenRef.current.add(id);
          enqueue(id, id === "konami" ? playPowerUp : playUnlock);
        }
      }
    });
  }, [hydrated, enqueue]);

  // ── Konami code ───────────────────────────────────────────────
  useKonami(() => {
    if (!hydrated) return;
    document.documentElement.classList.add("glitch-burst");
    setTimeout(() => document.documentElement.classList.remove("glitch-burst"), 1600);
    unlock("konami");
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
