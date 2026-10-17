"use client";

import { useEffect, useMemo, useRef } from "react";

const ARROW = [
  "X........",
  "XX.......",
  "XXX......",
  "XXXX.....",
  "XXXXX....",
  "XXXXXX...",
  "XXXXXXX..",
  "XXXXXXXX.",
  "XXXXX....",
  "XX.XXX...",
  "X..XXX...",
  "....XXX..",
  "....XXX..",
];

const HAND = [
  "....XX.....",
  "....XX.....",
  "....XX.....",
  "....XX.....",
  "....XXXXX..",
  "....XXXXXXX",
  "XX..XXXXXXX",
  "XXX.XXXXXXX",
  ".XXXXXXXXXX",
  "..XXXXXXXXX",
  "..XXXXXXXX.",
  "...XXXXXXX.",
  "...XXXXXX..",
  "...XXXXXX..",
];

const PX = 2;
const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

/** Fill pixels plus a one-pixel outline, so the sprite reads on any background. */
function buildSprite(rows: string[]) {
  const h = rows.length;
  const w = rows[0].length;
  const filled = (x: number, y: number) => rows[y]?.[x] === "X";
  const fill: [number, number][] = [];
  const outline: [number, number][] = [];

  for (let y = -1; y <= h; y++) {
    for (let x = -1; x <= w; x++) {
      if (filled(x, y)) {
        fill.push([x, y]);
      } else if (
        filled(x - 1, y) || filled(x + 1, y) || filled(x, y - 1) || filled(x, y + 1)
      ) {
        outline.push([x, y]);
      }
    }
  }
  return { fill, outline, width: (w + 2) * PX, height: (h + 2) * PX };
}

function Sprite({ rows, className }: { rows: string[]; className: string }) {
  const sprite = useMemo(() => buildSprite(rows), [rows]);
  return (
    <svg
      className={className}
      width={sprite.width}
      height={sprite.height}
      viewBox={`-1 -1 ${rows[0].length + 2} ${rows.length + 2}`}
      shapeRendering="crispEdges"
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      {sprite.outline.map(([x, y]) => (
        <rect key={`o${x},${y}`} x={x} y={y} width={1} height={1} fill="var(--color-bg)" />
      ))}
      {sprite.fill.map(([x, y]) => (
        <rect key={`f${x},${y}`} x={x} y={y} width={1} height={1} fill="var(--color-accent-primary)" />
      ))}
    </svg>
  );
}

/**
 * 8-bit sprite cursor. Only activates for fine pointers (mouse/trackpad);
 * touch devices and anyone without JS keep the native cursor.
 */
export default function PixelCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = document.documentElement;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      root.classList.add("pixel-cursor-on");
      const target = e.target instanceof Element ? e.target : null;
      const isHand = !!target?.closest(INTERACTIVE);
      el.dataset.hand = isHand ? "true" : "false";
      // Hotspot: arrow tip at the sprite corner, fingertip near the top of the hand.
      const hx = isHand ? 5 * PX : PX;
      el.style.transform = `translate3d(${e.clientX - hx}px, ${e.clientY - PX}px, 0)`;
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      root.classList.remove("pixel-cursor-on");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-hand="false"
      className="group/cursor pointer-events-none fixed left-0 top-0 z-[10000] opacity-0 transition-opacity duration-150"
    >
      <div className="relative group-data-[hand=true]/cursor:hidden" style={{ width: 11 * PX, height: 15 * PX }}>
        <Sprite rows={ARROW} className="" />
      </div>
      <div className="relative hidden group-data-[hand=true]/cursor:block" style={{ width: 13 * PX, height: 16 * PX }}>
        <Sprite rows={HAND} className="" />
      </div>
    </div>
  );
}
