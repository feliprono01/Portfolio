"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { Timer, Trophy } from "lucide-react";
import { useAppStore } from "@/lib/store";

function formatMs(ms: number): string {
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60).toFixed(1).padStart(4, "0");
  return `${minutes}:${seconds}`;
}

interface Result {
  elapsedMs: number;
  isNewBest: boolean;
}

/**
 * Speedrun timer: starts the clock every time the hub ("/") loads (so
 * returning to the hub is an explicit restart, like going back to the
 * start line), stops it on reaching /contacto, and keeps the best
 * completion time in the persisted store. The live widget only renders
 * while a run is active, so it never shows up for visitors just reading
 * the site at their own pace.
 */
export default function SpeedrunTimer() {
  const pathname = usePathname();
  const hydrated = useAppStore((s) => s.hydrated);
  const runStartedAt = useAppStore((s) => s.runStartedAt);
  const bestTimeMs = useAppStore((s) => s.bestTimeMs);
  const startRun = useAppStore((s) => s.startRun);
  const finishRun = useAppStore((s) => s.finishRun);

  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const handledPath = useRef<string | null>(null);

  // ── Start/finish on route changes ──────────────────────────────
  useEffect(() => {
    if (!hydrated || handledPath.current === pathname) return;
    handledPath.current = pathname;

    if (pathname === "/") {
      startRun();
      setResult(null);
    } else if (pathname === "/contacto") {
      const outcome = finishRun();
      if (outcome) setResult(outcome);
    }
  }, [hydrated, pathname, startRun, finishRun]);

  // ── Live tick while a run is active ────────────────────────────
  useEffect(() => {
    if (runStartedAt === null) return;
    const id = setInterval(() => setElapsed(Date.now() - runStartedAt), 100);
    return () => clearInterval(id);
  }, [runStartedAt]);

  // ── Auto-dismiss the finish toast ──────────────────────────────
  useEffect(() => {
    if (!result) return;
    const t = setTimeout(() => setResult(null), 5000);
    return () => clearTimeout(t);
  }, [result]);

  return (
    <>
      {runStartedAt !== null && (
        <div
          className="fixed top-20 right-4 z-[9955] flex items-center gap-2 border border-border-strong bg-bg-elevated/90 backdrop-blur px-3 py-1.5 font-mono text-xs text-text-secondary chamfer-sm"
          aria-hidden="true"
        >
          <Timer className="w-3.5 h-3.5 accent-text" strokeWidth={1.75} />
          {formatMs(elapsed)}
        </div>
      )}

      <AnimatePresence>
        {result && (
          <m.div
            role="status"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 right-4 z-[9955] flex items-center gap-3 border border-accent-primary bg-bg-secondary p-3.5 chamfer-sm shadow-card-lg max-w-xs"
          >
            <span className="flex items-center justify-center w-9 h-9 bg-accent-primary text-bg-primary chamfer-sm shrink-0">
              <Trophy className="w-5 h-5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-wider accent-text">
                {result.isNewBest ? "¡Nuevo mejor tiempo!" : "Nivel completado"}
              </p>
              <p className="text-sm text-text-primary font-mono">
                {formatMs(result.elapsedMs)}
                {!result.isNewBest && bestTimeMs !== null && (
                  <span className="text-text-muted"> · mejor: {formatMs(bestTimeMs)}</span>
                )}
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
