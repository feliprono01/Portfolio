"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { isLowEndDevice } from "@/lib/device";

/**
 * Full-screen CRT layer (scanlines, vignette, optional flicker/roll). It is
 * pure CSS: html[data-crt] switches it, html[data-motion] gates the moving
 * parts. Low-end devices get no overlay; reduced-motion keeps the static
 * scanlines but drops flicker and roll.
 */
export default function CrtOverlay() {
  const crtEnabled = useAppStore((s) => s.crtEnabled);

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      root.dataset.crt = crtEnabled && !isLowEndDevice() ? "on" : "off";
      root.dataset.motion = mq.matches ? "reduced" : "full";
    };

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [crtEnabled]);

  return <div className="crt-overlay" aria-hidden="true" />;
}
