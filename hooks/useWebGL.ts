'use client';

import { useState, useEffect } from 'react';
import { isWebGLSupported } from '@/lib/webgl';

interface WebGLStatus {
  /** Whether the browser supports WebGL */
  supported: boolean;
  /** Viewport width < 768px */
  isMobile: boolean;
  /** User prefers reduced motion (a11y) */
  prefersReducedMotion: boolean;
  /** True when WebGL is supported AND the user doesn't prefer reduced motion */
  shouldRender: boolean;
}

/**
 * Hook that exposes WebGL capability info.
 * All values default to `false` on the server and hydrate on mount.
 */
export function useWebGL(): WebGLStatus {
  const [status, setStatus] = useState<WebGLStatus>({
    supported: false,
    isMobile: false,
    prefersReducedMotion: false,
    shouldRender: false,
  });

  useEffect(() => {
    const supported = isWebGLSupported();
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    setStatus({
      supported,
      isMobile,
      prefersReducedMotion,
      shouldRender: supported && !prefersReducedMotion,
    });
  }, []);

  return status;
}
