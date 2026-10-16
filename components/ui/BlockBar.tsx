interface BlockBarProps {
  value: number;
  total: number;
  label?: string;
}

/**
 * Block-segmented progress bar (XP-bar style), used for the ISPC career
 * progress (e.g. 9/14 subjects approved).
 */
export default function BlockBar({ value, total, label }: BlockBarProps) {
  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-2 text-xs font-mono">
          <span className="text-text-secondary">{label}</span>
          <span className="accent-text">
            {value}/{total}
          </span>
        </div>
      )}
      <div
        className="flex gap-1"
        role="progressbar"
        aria-label={label ? `${label}: ${value} de ${total}` : `${value} de ${total}`}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-2.5 flex-1 ${i < value ? "bg-accent-primary" : "bg-bg-elevated border border-border-default"}`}
          />
        ))}
      </div>
    </div>
  );
}
