import { HTMLAttributes, ReactNode } from "react";

interface ChipProps extends HTMLAttributes<HTMLButtonElement | HTMLSpanElement> {
  children: ReactNode;
  active?: boolean;
  as?: "button" | "span";
  disabled?: boolean;
}

/**
 * Small chamfered tag used for tech stacks and filters. When `active`,
 * it tilts slightly and fills with the mustard accent — the "selected
 * cartridge" state used on filters.
 */
export default function Chip({
  children,
  active = false,
  as = "span",
  className = "",
  ...rest
}: ChipProps) {
  const base = `inline-flex items-center px-3 py-1 text-xs font-mono font-medium border chamfer-sm transition-all duration-200 ${
    as === "span" ? "cursor-default" : "cursor-pointer"
  } ${
    active
      ? "bg-accent-primary text-bg-primary border-accent-primary -rotate-1"
      : "bg-bg-elevated text-text-secondary border-border-default hover:-translate-y-0.5 hover:rotate-1 hover:border-accent-primary hover:text-text-primary"
  } ${className}`;

  if (as === "button") {
    return (
      <button type="button" className={base} {...(rest as HTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }

  return (
    <span className={base} {...(rest as HTMLAttributes<HTMLSpanElement>)}>
      {children}
    </span>
  );
}
