"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  titleId: string;
  title: ReactNode;
  children: ReactNode;
  /** Element to return focus to on close (usually the button that opened it). */
  returnFocusRef?: React.RefObject<HTMLElement>;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal: focus trap, Escape to close, backdrop click to close,
 * body scroll lock, and focus returns to whatever opened it. No external
 * dependency — this is the one pattern reused by the project cartridges.
 */
export default function Dialog({ open, onClose, titleId, title, children, returnFocusRef }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    const returnTarget = returnFocusRef?.current as HTMLElement | null;

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(FOCUSABLE);
    (focusable?.[0] ?? panel)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      (returnTarget ?? (openerRef.current as HTMLElement | null))?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <m.div
            className="absolute inset-0 bg-bg-primary/90 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto border border-accent-primary bg-bg-secondary chamfer outline-none"
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 p-5 border-b border-border-subtle sticky top-0 bg-bg-secondary">
              <h3 id={titleId} className="font-display font-semibold uppercase text-lg text-text-primary">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="p-1.5 border border-border-default text-text-muted hover:text-text-primary hover:border-accent-primary transition-colors chamfer-sm shrink-0"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
