import { HTMLAttributes, ReactNode } from "react";

type Accent = "none" | "primary" | "secondary" | "border";

interface ChamferBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  accent?: Accent;
  elevated?: boolean;
  size?: "sm" | "md";
}

const accentBorder: Record<Accent, string> = {
  none: "border-transparent",
  primary: "border-accent-primary/60",
  secondary: "border-accent-secondary/60",
  border: "border-border-default",
};

/**
 * Card/box with diagonally cut corners (top-left and bottom-right),
 * the recurring "arcade hardware" motif across the site.
 */
export default function ChamferBox({
  children,
  accent = "border",
  elevated = false,
  size = "md",
  className = "",
  ...rest
}: ChamferBoxProps) {
  return (
    <div
      className={`relative border ${accentBorder[accent]} ${
        elevated ? "bg-bg-elevated" : "bg-bg-secondary"
      } ${size === "sm" ? "chamfer-sm" : "chamfer"} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
