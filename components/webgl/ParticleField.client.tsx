'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useWebGL } from '@/hooks/useWebGL';

/**
 * Dynamically-imported Canvas from @react-three/fiber (no SSR).
 * Three.js relies on browser APIs, so it must not be bundled server-side.
 */
const R3FCanvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

/**
 * Dynamically-imported ParticleField (no SSR).
 */
const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });

/**
 * Client-only wrapper that:
 * 1. Checks WebGL support via useWebGL
 * 2. Tracks mouse position
 * 3. Renders the R3F Canvas + ParticleField
 */
export default function ParticleFieldClient() {
  const { shouldRender, isMobile } = useWebGL();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouse({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -((e.clientY / window.innerHeight) * 2 - 1),
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  if (!shouldRender) return null;

  return (
    <R3FCanvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      frameloop="always"
      camera={{ position: [0, 0, 6], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
      dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
    >
      <ParticleField mousePosition={mouse} isMobile={isMobile} />
    </R3FCanvas>
  );
}
