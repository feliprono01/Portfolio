"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useWebGL } from "@/hooks/useWebGL";
import { useSkinColors } from "@/hooks/useSkinColors";
import MonitorFallback from "./MonitorFallback";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });
const RetroMonitor = dynamic(() => import("./RetroMonitor"), { ssr: false });

/**
 * Hero's 3D scene: WebGL support, reduced-motion and low-end devices all
 * fall back to a static SVG with the same silhouette (MonitorFallback) so
 * the hero never depends on the canvas to make sense.
 */
export default function HeroCanvasClient() {
  const { shouldRender, isMobile } = useWebGL();
  const colors = useSkinColors();

  // Same footprint either way, so swapping the fallback for the real
  // canvas (once WebGL support is confirmed and the browser is idle)
  // never shifts the layout.
  return (
    <div className="h-[320px] sm:h-[380px] lg:h-[440px] w-full flex items-center justify-center" aria-hidden="true">
      {shouldRender ? (
        <Suspense fallback={<MonitorFallback />}>
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 45 }}
            dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 4, 5]} intensity={1.1} />
            <directionalLight position={[-3, -2, -4]} intensity={0.25} />
            <RetroMonitor colors={colors} autoRotate={!isMobile} />
          </Canvas>
        </Suspense>
      ) : (
        <MonitorFallback />
      )}
    </div>
  );
}
