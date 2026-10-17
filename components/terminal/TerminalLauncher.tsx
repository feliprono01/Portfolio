"use client";

import { useEffect, useRef, useState } from "react";
import { TerminalSquare } from "lucide-react";
import Terminal from "./Terminal";
import { useAppStore } from "@/lib/store";

/**
 * Persistent, visible entry point for the terminal — a real labeled button,
 * not a hidden easter egg, so it's discoverable via keyboard/screen reader
 * from day one. The backtick shortcut is a bonus for people who expect it,
 * guarded so it never fires while typing in a form field.
 */
export default function TerminalLauncher() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const unlock = useAppStore((s) => s.unlock);

  const openTerminal = () => {
    setOpen(true);
    unlock("terminal");
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "`") return;
      const target = e.target as HTMLElement | null;
      const typing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if (typing) return;
      e.preventDefault();
      setOpen((o) => {
        if (!o) unlock("terminal");
        return !o;
      });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [unlock]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={openTerminal}
        aria-label="Abrir terminal (atajo: tecla ` )"
        className="fixed bottom-6 left-6 z-[9960] flex items-center justify-center w-11 h-11 border border-border-strong bg-bg-elevated text-text-muted hover:text-accent-primary hover:border-accent-primary transition-colors chamfer-sm"
      >
        <TerminalSquare className="w-5 h-5" strokeWidth={1.75} />
      </button>

      <Terminal open={open} onClose={() => setOpen(false)} returnFocusRef={buttonRef} />
    </>
  );
}
