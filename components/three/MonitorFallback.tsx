/**
 * Static SVG stand-in for the 3D monitor — same silhouette, no motion.
 * Shown when WebGL is unavailable, the device is low-end, or the visitor
 * prefers reduced motion. Colors are plain CSS vars, so it already matches
 * the active skin without any JS.
 */
export default function MonitorFallback() {
  return (
    <svg
      viewBox="0 0 320 300"
      className="w-full max-w-sm mx-auto"
      role="img"
      aria-label="Ilustración de un monitor retro encendido"
    >
      <rect x="40" y="20" width="240" height="190" rx="4" fill="var(--color-border-strong)" />
      <rect x="60" y="38" width="200" height="140" fill="var(--color-surface-elevated)" />
      <rect x="72" y="50" width="176" height="116" fill="var(--color-accent-primary)" opacity="0.9" />
      <circle cx="248" cy="188" r="4" fill="var(--color-accent-secondary)" />
      <rect x="140" y="210" width="40" height="45" fill="var(--color-border-strong)" />
      <rect x="95" y="255" width="130" height="14" rx="3" fill="var(--color-surface-elevated)" />
    </svg>
  );
}
