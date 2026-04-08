'use client';

import { useCursorTrail } from '@/hooks/useCursorTrail';

export default function CursorTrail() {
  const { canvasRef } = useCursorTrail();

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      aria-hidden="true"
    />
  );
}
