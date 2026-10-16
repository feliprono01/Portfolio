import { ReactNode } from "react";

interface OctaIconProps {
  children: ReactNode;
  accent?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

const sizes: Record<NonNullable<OctaIconProps["size"]>, string> = {
  sm: "w-9 h-9",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

const accentBg: Record<NonNullable<OctaIconProps["accent"]>, string> = {
  primary: "bg-accent-primary text-bg-primary",
  secondary: "bg-accent-secondary text-bg-primary",
};

/**
 * Octagon-clipped icon badge, alternating mustard/sage across a grid.
 */
export default function OctaIcon({ children, accent = "primary", size = "md" }: OctaIconProps) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${sizes[size]} ${accentBg[accent]}`}
      style={{
        clipPath:
          "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
      }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
