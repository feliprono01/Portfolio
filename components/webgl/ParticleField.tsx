'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders/particles.glsl';

/* ─── Types ───────────────────────────────────────────────────────────────── */
interface ParticleFieldProps {
  mousePosition: { x: number; y: number };
  isMobile: boolean;
}

/* ─── Constants ───────────────────────────────────────────────────────────── */
const PARTICLE_COUNT_DESKTOP = 180;
const PARTICLE_COUNT_MOBILE = 80;
const MAX_LINES = 300;
const CONNECTION_DISTANCE = 2.5;
const REPULSION_RADIUS = 1.5;
const REPULSION_FACTOR = 0.02;

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function ParticleField({ mousePosition, isMobile }: ParticleFieldProps) {
  const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
  const showLines = !isMobile;

  /* ── Refs ────────────────────────────────────────────────────────────── */
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const positionsRef = useRef<Float32Array | null>(null);

  /* ── Initial geometry (memoised) ────────────────────────────────────── */
  const { geometry, basePosArray } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const basePositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16; // [-8, 8]
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 6;  // [-3, 3]

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;

      scales[i] = 0.3 + Math.random() * 0.7; // [0.3, 1.0]
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    positionsRef.current = positions;

    return { geometry: geo, basePosArray: basePositions };
  }, [count]);

  /* ── Shader material uniforms ───────────────────────────────────────── */
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 3.0 },
    }),
    [],
  );

  /* ── Line geometry (pre-allocated buffer) ───────────────────────────── */
  const lineGeometry = useMemo(() => {
    if (!showLines) return null;
    const geo = new THREE.BufferGeometry();
    // Each line segment = 2 vertices × 3 floats
    const linePositions = new Float32Array(MAX_LINES * 2 * 3);
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [showLines]);

  /* ── Line material ──────────────────────────────────────────────────── */
  const lineMaterial = useMemo(
    () =>
      showLines
        ? new THREE.LineBasicMaterial({
            color: new THREE.Color('#a0b4ff'),
            transparent: true,
            opacity: 0.4,
            depthWrite: false,
          })
        : null,
    [showLines],
  );

  /* ── Cleanup ────────────────────────────────────────────────────────── */
  useEffect(() => {
    return () => {
      geometry.dispose();
      lineGeometry?.dispose();
      lineMaterial?.dispose();
    };
  }, [geometry, lineGeometry, lineMaterial]);

  /* ── Frame loop ─────────────────────────────────────────────────────── */
  useFrame((_state, delta) => {
    // Advance time uniform
    uniforms.uTime.value += delta;

    const positions = positionsRef.current;
    if (!positions) return;

    const time = uniforms.uTime.value;

    // Mouse in scene coordinates
    const mx = mousePosition.x * 8;
    const my = mousePosition.y * 4;

    // Update each particle position (sinusoidal drift + repulsion)
    for (let i = 0; i < count; i++) {
      const bx = basePosArray[i * 3];
      const by = basePosArray[i * 3 + 1];
      const bz = basePosArray[i * 3 + 2];

      // Sinusoidal movement
      let px = bx + Math.sin(time * 0.3 + by * 0.5) * 0.4;
      let py = by + Math.cos(time * 0.25 + bx * 0.4) * 0.35;
      const pz = bz + Math.sin(time * 0.2 + bx * 0.3) * 0.15;

      // Mouse repulsion
      const dx = px - mx;
      const dy = py - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPULSION_RADIUS && dist > 0) {
        const force = (1 - dist / REPULSION_RADIUS) * REPULSION_FACTOR;
        px += (dx / dist) * force * 60; // scale up to visible
        py += (dy / dist) * force * 60;
      }

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;
    }

    // Mark positions for GPU upload
    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.getAttribute('position');
      (attr as THREE.BufferAttribute).needsUpdate = true;
    }

    // Update connection lines
    if (showLines && lineGeometry) {
      const linePositions = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
      const arr = linePositions.array as Float32Array;
      let lineIdx = 0;

      for (let i = 0; i < count && lineIdx < MAX_LINES; i++) {
        for (let j = i + 1; j < count && lineIdx < MAX_LINES; j++) {
          const ddx = positions[i * 3] - positions[j * 3];
          const ddy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const ddz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const d = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);

          if (d < CONNECTION_DISTANCE) {
            const offset = lineIdx * 6;
            arr[offset] = positions[i * 3];
            arr[offset + 1] = positions[i * 3 + 1];
            arr[offset + 2] = positions[i * 3 + 2];
            arr[offset + 3] = positions[j * 3];
            arr[offset + 4] = positions[j * 3 + 1];
            arr[offset + 5] = positions[j * 3 + 2];
            lineIdx++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIdx * 2);
      linePositions.needsUpdate = true;

      // Fade opacity based on average distance
      if (lineMaterial) {
        lineMaterial.opacity = 0.4;
      }
    }
  });

  return (
    <group>
      {/* Particles */}
      <points ref={pointsRef} geometry={geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection lines */}
      {showLines && lineGeometry && lineMaterial && (
        <lineSegments ref={lineRef} geometry={lineGeometry} material={lineMaterial} />
      )}
    </group>
  );
}
