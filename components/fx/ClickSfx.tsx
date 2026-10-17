"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { playClick } from "@/lib/sfx";

const INTERACTIVE = "a, button, [role='button'], summary";

/**
 * One delegated click listener for the whole page — plays a short blip on
 * any interactive element, instead of wiring a handler into every button
 * and link individually. Off by default (soundEnabled starts false); the
 * toggle lives in the skin selector panel.
 */
export default function ClickSfx() {
  const soundEnabled = useAppStore((s) => s.soundEnabled);

  useEffect(() => {
    if (!soundEnabled) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;
      if (target && !target.hasAttribute("disabled")) playClick();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [soundEnabled]);

  return null;
}
