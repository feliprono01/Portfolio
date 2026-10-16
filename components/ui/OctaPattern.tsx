interface OctaPatternProps {
  className?: string;
}

/**
 * Thin-line octagon grid used as a decorative corner accent on sections
 * and cards, echoing the hexagon corner flourish from the reference.
 */
export default function OctaPattern({ className = "" }: OctaPatternProps) {
  return (
    <svg
      className={className}
      width="140"
      height="140"
      viewBox="0 0 140 140"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="var(--color-border)" strokeWidth="1" opacity="0.6">
        {Array.from({ length: 4 }, (_, row) =>
          Array.from({ length: 4 }, (_, col) => {
            const x = col * 36 + 10;
            const y = row * 36 + 10;
            const r = 14;
            const points = [
              [x + r * 0.4, y],
              [x + r, y],
              [x + r * 1.4, y + r * 0.4],
              [x + r * 1.4, y + r],
              [x + r, y + r * 1.4],
              [x + r * 0.4, y + r * 1.4],
              [x, y + r],
              [x, y + r * 0.4],
            ]
              .map(([px, py]) => `${px},${py}`)
              .join(" ");
            return <polygon key={`${row}-${col}`} points={points} />;
          })
        )}
      </g>
    </svg>
  );
}
