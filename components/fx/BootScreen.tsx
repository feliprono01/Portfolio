"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "fp-booted";
const AUTO_DISMISS_MS = 1400;

/**
 * First-visit-only "INSERT COIN" splash. It's a pure visual overlay — the
 * real page is already rendered underneath, so it never blocks LCP or
 * crawlers, and it's aria-hidden so screen reader users land straight on
 * the real content instead of waiting through it.
 */
export default function BootScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    setVisible(true);
    document.body.style.overflow = "hidden";

    const dismiss = () => {
      setVisible(false);
      document.body.style.overflow = "";
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // storage unavailable — the boot screen will just replay next visit
      }
    };

    const timer = setTimeout(dismiss, AUTO_DISMISS_MS);
    window.addEventListener("keydown", dismiss);
    window.addEventListener("pointerdown", dismiss);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9980] flex flex-col items-center justify-center gap-6 bg-bg-primary"
      style={{ animation: "boot-fade-out 300ms ease-in 1100ms forwards" }}
    >
      <p className="font-display text-2xl sm:text-3xl uppercase accent-text animate-pulse">
        Insert Coin
      </p>
      <p className="font-mono text-xs text-text-muted tracking-widest uppercase">
        Press any key
      </p>
    </div>
  );
}
