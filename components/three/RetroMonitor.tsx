"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { SkinColors } from "@/hooks/useSkinColors";

interface RetroMonitorProps {
  colors: SkinColors;
  /** Disabled on mobile to save battery; the power-on flicker still plays either way. */
  autoRotate: boolean;
}

/**
 * Low-poly retro monitor built entirely from primitives — no imported
 * models/textures, so it stays light. On mount the screen "powers on":
 * a thin bright line that snaps open with a couple of flicker dips,
 * the classic CRT boot. With reduced motion it just fades in at full size.
 */
export default function RetroMonitor({ colors, autoRotate }: RetroMonitorProps) {
  const screenRef = useRef<THREE.Mesh>(null);
  const screenMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  const poweredOn = useRef(false);

  const bodyColor = useMemo(() => new THREE.Color(colors.borderStrong), [colors.borderStrong]);
  const bezelColor = useMemo(() => new THREE.Color(colors.elevated), [colors.elevated]);
  const screenColor = useMemo(() => new THREE.Color(colors.accentPrimary), [colors.accentPrimary]);
  const ledColor = useMemo(() => new THREE.Color(colors.accentSecondary), [colors.accentSecondary]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = autoRotate ? Math.sin(state.clock.elapsedTime * 0.3) * 0.18 : 0;
    }

    if (poweredOn.current || !screenRef.current || !screenMatRef.current) return;

    elapsed.current += delta;
    const t = elapsed.current;
    const screen = screenRef.current;
    const mat = screenMatRef.current;

    if (t < 0.35) {
      // Thin bright horizontal line.
      screen.scale.y = 0.015;
      mat.opacity = Math.min(1, t / 0.15);
    } else if (t < 0.7) {
      // Snap open with a flicker.
      const p = (t - 0.35) / 0.35;
      screen.scale.y = THREE.MathUtils.lerp(0.015, 1, Math.min(1, p * 1.4));
      mat.opacity = p > 0.6 && p < 0.75 ? 0.4 : 1;
    } else {
      screen.scale.y = 1;
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

      {/* Screen (powers on) */}
      <mesh ref={screenRef} position={[0, 0.15, 0.845]}>
        <planeGeometry args={[1.85, 1.3]} />
        <meshBasicMaterial ref={screenMatRef} color={screenColor} transparent opacity={0} toneMapped={false} />
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
