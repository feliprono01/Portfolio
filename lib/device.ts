/** Heuristic for devices where full-screen CRT effects could hurt performance. */
export function isLowEndDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency;
  const memory = nav.deviceMemory;
  return (cores !== undefined && cores <= 2) || (memory !== undefined && memory <= 2);
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
