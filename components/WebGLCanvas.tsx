'use client';

import { Suspense, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { useWebGL } from '@/hooks/useWebGL';

/**
 * Dynamically imported Canvas from @react-three/fiber.
 * SSR is disabled because Three.js relies on browser APIs.
 */
const R3FCanvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

interface WebGLCanvasProps {
  children: ReactNode;
  /** Optional fallback UI shown when WebGL is not available or reduced-motion is preferred */
  fallback?: ReactNode;
}

/**
 * Wrapper around the R3F Canvas.
 * - Renders nothing on the server.
 * - Shows `fallback` (or nothing) when WebGL is unsupported or the user prefers reduced motion.
 * - Caps DPR at 2 to save GPU on high-density screens.
 */
export default function WebGLCanvas({ children, fallback }: WebGLCanvasProps) {
  const { shouldRender } = useWebGL();

  if (!shouldRender) {
    return <>{fallback ?? null}</>;
  }

  return (
    <Suspense fallback={null}>
      <R3FCanvas
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
        gl={{ antialias: true, alpha: true }}
        dpr={Math.min(
          typeof window !== 'undefined' ? window.devicePixelRatio : 1,
          2
        )}
      >
        {children}
      </R3FCanvas>
    </Suspense>
  );
}
