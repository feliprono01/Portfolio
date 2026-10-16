"use client";

import { useMemo, useRef, useCallback } from "react";

interface PixelStripProps {
  bars?: number;
  className?: string;
}

/**
 * Animated strip of bars — a lightweight CSS stand-in for the pixel/
 * equalizer strip under the hero and above the footer. Idle, each bar
 * runs its own randomized keyframe wave. On pointer move, nearby bars
 * are pushed taller imperatively (no React state) so the wave tracks
 * the cursor without a re-render per frame.
 */
export default function PixelStrip({ bars = 48, className = "" }: PixelStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const items = useMemo(
    () =>
      Array.from({ length: bars }, (_, i) => ({
        delay: `${(i * 0.045) % 1.6}s`,
        duration: `${1.2 + ((i * 7) % 9) / 10}s`,
      })),
    [bars]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const pointerX = e.clientX - rect.left;
      const step = rect.width / bars;

      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        const barCenter = (i + 0.5) * step;
        const distance = Math.abs(pointerX - barCenter);
        const influence = Math.max(0, 1 - distance / 90);
        bar.style.setProperty("--pointer-scale", (1 + influence * 1.8).toFixed(2));
      });
    },
    [bars]
  );

  const handlePointerLeave = useCallback(() => {
    barRefs.current.forEach((bar) => bar?.style.removeProperty("--pointer-scale"));
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex items-end gap-[3px] h-6 ${className}`}
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {items.map((item, i) => (
        // Outer wrapper: pointer-driven scale only (no keyframe animation,
        // so it won't fight the inner bar's own transform animation).
        <span
          key={i}
          ref={(el) => {
            barRefs.current[i] = el;
          }}
          className="w-[3px] h-full origin-bottom transition-transform duration-150 ease-out"
          style={{ transform: "scaleY(var(--pointer-scale, 1))" }}
        >
          <span
            className="block w-full h-full origin-bottom animate-pixel-wave"
            style={{
              backgroundColor: i % 3 === 0 ? "var(--color-accent-secondary)" : "var(--color-accent-primary)",
              animationDelay: item.delay,
              animationDuration: item.duration,
            }}
          />
        </span>
      ))}
    </div>
  );
}
