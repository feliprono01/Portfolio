"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage unavailable — theme still applies for this session
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? theme === "dark"
            ? "Cambiar a tema claro"
            : "Cambiar a tema oscuro"
          : "Cambiar tema"
      }
      aria-pressed={mounted ? theme === "light" : undefined}
      className="relative inline-flex h-7 w-14 items-center border border-border-default bg-bg-elevated px-1 transition-colors chamfer-sm"
    >
      <span
        className="inline-block h-5 w-5 bg-accent-primary transition-transform duration-300 chamfer-sm"
        style={{
          transform: mounted && theme === "light" ? "translateX(26px)" : "translateX(0)",
        }}
      />
      <span className="sr-only">{mounted && theme === "dark" ? "Oscuro" : "Claro"}</span>
    </button>
  );
}
