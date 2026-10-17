"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";

export interface SkinColors {
  bg: string;
  surface: string;
  elevated: string;
  border: string;
  borderStrong: string;
  accentPrimary: string;
  accentSecondary: string;
}

const VARS: Record<keyof SkinColors, string> = {
  bg: "--color-bg-rgb",
  surface: "--color-surface-rgb",
  elevated: "--color-surface-elevated-rgb",
  border: "--color-border-rgb",
  borderStrong: "--color-border-strong-rgb",
  accentPrimary: "--color-accent-primary-rgb",
  accentSecondary: "--color-accent-secondary-rgb",
};

function readColors(): SkinColors {
  const style = getComputedStyle(document.documentElement);
  const out = {} as SkinColors;
  for (const [key, cssVar] of Object.entries(VARS) as [keyof SkinColors, string][]) {
    const triplet = style.getPropertyValue(cssVar).trim().split(/\s+/).join(", ");
    out[key] = `rgb(${triplet || "0, 0, 0"})`;
  }
  return out;
}

const FALLBACK: SkinColors = {
  bg: "rgb(10, 15, 10)",
  surface: "rgb(14, 21, 14)",
  elevated: "rgb(22, 34, 22)",
  border: "rgb(31, 58, 31)",
  borderStrong: "rgb(52, 120, 52)",
  accentPrimary: "rgb(51, 255, 102)",
  accentSecondary: "rgb(255, 176, 0)",
};

/** Reads the active skin's palette from CSS vars; updates when the skin changes. */
export function useSkinColors(): SkinColors {
  const [colors, setColors] = useState<SkinColors>(FALLBACK);
  const skin = useAppStore((s) => s.skin);

  useEffect(() => {
    // Two rAFs: wait for StoreHydrator's data-skin attribute update to paint.
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setColors(readColors()))
    );
    return () => cancelAnimationFrame(raf);
  }, [skin]);

  return colors;
}
