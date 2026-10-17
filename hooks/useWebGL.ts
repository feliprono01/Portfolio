"use client";

import { useEffect, useState } from "react";
import { isWebGLSupported } from "@/lib/webgl";
import { isLowEndDevice, prefersReducedMotion } from "@/lib/device";

/**
 * Gates the 3D hero scene. Renders only on desktop/tablet, with WebGL
 * support, a device that isn't low-end, and no reduced-motion preference —
 * everyone else gets the static SVG fallback, which still carries the same
 * content.
 *
 * Mobile is excluded outright: measured against this build, the three.js +
 * @react-three/fiber chunk (~225KB) cost ~18 Lighthouse performance points
 * and ~1.5s of LCP on throttled mobile even when its *execution* was
 * deferred past the window `load` event via requestIdleCallback — the extra
 * bytes alone were enough to compete with fonts/CSS for bandwidth on a slow
 * connection. The brief is explicit that mobile perf can't regress, so the
 * monitor is a desktop/tablet-only flourish.
 */
export function useWebGL() {
  const [shouldRender, setShouldRender] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);

    if (mobile || !isWebGLSupported() || isLowEndDevice() || prefersReducedMotion()) return;

    const ric = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => setTimeout(cb, 500));
    const cic = window.cancelIdleCallback ?? clearTimeout;
    let idleId: number | undefined;

    // Don't even fetch the three.js chunk until the rest of the page (fonts,
    // critical CSS/JS) has finished loading — otherwise it competes for
    // bandwidth on a throttled connection and delays everything else's LCP.
    const startIdleWait = () => {
      idleId = ric(() => setShouldRender(true), { timeout: 2000 }) as number;
    };

    if (document.readyState === "complete") {
      startIdleWait();
    } else {
      window.addEventListener("load", startIdleWait, { once: true });
    }

    return () => {
      window.removeEventListener("load", startIdleWait);
      if (idleId !== undefined) cic(idleId);
    };
  }, []);

  return { shouldRender, isMobile };
}
