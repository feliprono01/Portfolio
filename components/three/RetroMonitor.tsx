"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { SkinColors } from "@/hooks/useSkinColors";

interface RetroMonitorProps {
  colors: SkinColors;
  /** Disabled on mobile to save battery; the power-on flicker still plays either way. */
  autoRotate: boolean;
}

const TEX_W = 256;
const TEX_H = 180;
const LINE_H = 15;
const MAX_LINES = Math.floor((TEX_H - 16) / LINE_H);

/** One fake "line of code": a run of word-width blocks so it reads as text without being legible — the point is motion, not content. */
function randomLineWidths(): number[] {
  const words = 2 + Math.floor(Math.random() * 5);
  return Array.from({ length: words }, () => 8 + Math.random() * 22);
}

/**
 * Draws an animated "coding" screen into an offscreen canvas and feeds it
 * to the monitor's screen material as a texture — scanlines, a handful of
 * typing lines that build up word-by-word, and a blinking cursor. Redrawn
 * on an interval (not every frame) since it's a flat 2D texture, not
 * geometry — cheap enough to leave running continuously.
 */
function useScreenTexture(colors: SkinColors) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const linesRef = useRef<{ words: number[]; revealed: number }[]>([]);
  const cursorOnRef = useRef(true);

  if (!canvasRef.current && typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = TEX_W;
    canvas.height = TEX_H;
    canvasRef.current = canvas;
    textureRef.current = new THREE.CanvasTexture(canvas);
    textureRef.current.colorSpace = THREE.SRGBColorSpace;
  }

  useEffect(() => {
    linesRef.current = [{ words: randomLineWidths(), revealed: 0 }];
  }, [colors]);

  const draw = () => {
    const canvas = canvasRef.current;
    const tex = textureRef.current;
    if (!canvas || !tex) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, TEX_W, TEX_H);
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, TEX_W, TEX_H);

    // Prompt + typed lines
    ctx.fillStyle = colors.accentSecondary;
    ctx.globalAlpha = 0.9;
    const promptY = 14;
    ctx.fillRect(10, promptY - 8, 6, 8);

    let y = promptY + LINE_H;
    ctx.fillStyle = colors.accentPrimary;
    for (const line of linesRef.current) {
      let x = 18;
      for (let i = 0; i < line.words.length; i++) {
        const w = line.words[i];
        ctx.globalAlpha = i < line.revealed ? 0.85 : i === Math.floor(line.revealed) ? 0.85 * (line.revealed % 1) : 0;
        ctx.fillRect(x, y, w, 7);
        x += w + 6;
      }
      y += LINE_H;
    }

    // Blinking cursor at the end of the active (last) line
    const active = linesRef.current[linesRef.current.length - 1];
    if (active && cursorOnRef.current) {
      const typedWidth = active.words.slice(0, Math.floor(active.revealed)).reduce((s, w) => s + w + 6, 0);
      const cursorX = 18 + typedWidth;
      ctx.globalAlpha = 1;
      ctx.fillStyle = colors.accentSecondary;
      ctx.fillRect(cursorX, y - LINE_H, 7, 8);
    }

    ctx.globalAlpha = 1;

    // Scanlines baked into the texture (in addition to the DOM CRT overlay)
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    for (let sy = 0; sy < TEX_H; sy += 3) {
      ctx.fillRect(0, sy, TEX_W, 1);
    }

    tex.needsUpdate = true;
  };

  const tick = (deltaMs: number) => {
    const lines = linesRef.current;
    const active = lines[lines.length - 1];
    if (active) {
      active.revealed += deltaMs / 90;
      if (active.revealed >= active.words.length) {
        if (lines.length >= MAX_LINES) lines.shift();
        lines.push({ words: randomLineWidths(), revealed: 0 });
      }
    }
  };

  return { texture: textureRef, draw, tick, cursorOnRef };
}

/**
 * Low-poly retro monitor built entirely from primitives — no imported
 * models/textures, so it stays light. On mount the screen "powers on":
 * a thin bright line that snaps open with a couple of flicker dips,
 * the classic CRT boot. With reduced motion it just fades in at full size.
 * The screen itself shows a small animated "coding" loop instead of a flat
 * color fill, via a canvas texture redrawn a few times a second.
 */
export default function RetroMonitor({ colors, autoRotate }: RetroMonitorProps) {
  const screenRef = useRef<THREE.Mesh>(null);
  const screenMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  const poweredOn = useRef(false);
  const sinceDraw = useRef(0);
  const sinceBlink = useRef(0);

  const bodyColor = useMemo(() => new THREE.Color(colors.borderStrong), [colors.borderStrong]);
  const bezelColor = useMemo(() => new THREE.Color(colors.elevated), [colors.elevated]);
  const ledColor = useMemo(() => new THREE.Color(colors.accentSecondary), [colors.accentSecondary]);
  const screen = useScreenTexture(colors);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = autoRotate ? Math.sin(state.clock.elapsedTime * 0.3) * 0.18 : 0;
    }

    // Animate the screen content at ~8fps and blink the cursor at ~1.6Hz —
    // both far below frame rate since it's a flat texture redraw, not geometry.
    const deltaMs = delta * 1000;
    sinceDraw.current += deltaMs;
    sinceBlink.current += deltaMs;
    if (sinceBlink.current > 500) {
      screen.cursorOnRef.current = !screen.cursorOnRef.current;
      sinceBlink.current = 0;
    }
    if (sinceDraw.current > 125) {
      screen.tick(sinceDraw.current);
      screen.draw();
      sinceDraw.current = 0;
    }

    if (poweredOn.current || !screenRef.current || !screenMatRef.current) return;

    elapsed.current += delta;
    const t = elapsed.current;
    const screenMesh = screenRef.current;
    const mat = screenMatRef.current;

    if (t < 0.35) {
      // Thin bright horizontal line.
      screenMesh.scale.y = 0.015;
      mat.opacity = Math.min(1, t / 0.15);
    } else if (t < 0.7) {
      // Snap open with a flicker.
      const p = (t - 0.35) / 0.35;
      screenMesh.scale.y = THREE.MathUtils.lerp(0.015, 1, Math.min(1, p * 1.4));
      mat.opacity = p > 0.6 && p < 0.75 ? 0.4 : 1;
    } else {
      screenMesh.scale.y = 1;
      mat.opacity = 1;
      poweredOn.current = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.6, 2.1, 1.6]} />
        <meshStandardMaterial color={bodyColor} roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Bezel */}
      <mesh position={[0, 0.15, 0.81]}>
        <boxGeometry args={[2.2, 1.6, 0.05]} />
        <meshStandardMaterial color={bezelColor} roughness={0.5} />
      </mesh>

      {/* Screen (powers on, shows the animated texture) */}
      <mesh ref={screenRef} position={[0, 0.15, 0.845]}>
        <planeGeometry args={[1.85, 1.3]} />
        <meshBasicMaterial
          ref={screenMatRef}
          map={screen.texture.current}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </mesh>

      {/* Power LED */}
      <mesh position={[0.95, -0.55, 0.84]}>
        <circleGeometry args={[0.04, 12]} />
        <meshBasicMaterial color={ledColor} toneMapped={false} />
      </mesh>

      {/* Stand */}
      <mesh position={[0, -1.25, 0]}>
        <cylinderGeometry args={[0.18, 0.28, 0.5, 8]} />
        <meshStandardMaterial color={bodyColor} roughness={0.6} />
      </mesh>
      <mesh position={[0, -1.52, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.08, 16]} />
        <meshStandardMaterial color={bezelColor} roughness={0.6} />
      </mesh>
    </group>
  );
}
