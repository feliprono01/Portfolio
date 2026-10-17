"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Tv } from "lucide-react";
import { SKINS } from "@/lib/skins";
import { isLowEndDevice } from "@/lib/device";
import { useAppStore } from "@/lib/store";

export default function SkinSelector() {
  const [open, setOpen] = useState(false);
  const [lowEnd, setLowEnd] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const skin = useAppStore((s) => s.skin);
  const setSkin = useAppStore((s) => s.setSkin);
  const crtEnabled = useAppStore((s) => s.crtEnabled);
  const toggleCrt = useAppStore((s) => s.toggleCrt);

  const current = SKINS.find((s) => s.id === skin) ?? SKINS[0];

  useEffect(() => setLowEnd(isLowEndDevice()), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Cambiar skin. Actual: ${current.name}`}
        className="inline-flex h-9 items-center gap-2 border border-border-strong bg-bg-elevated px-3 text-xs font-mono uppercase tracking-wide text-text-primary chamfer-sm transition-colors hover:border-accent-primary"
      >
        <Tv className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        <span className="hidden sm:inline">{current.name}</span>
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Apariencia del sitio"
          className="absolute right-0 top-full z-[110] mt-2 w-72 max-w-[calc(100vw-2rem)] border border-border-strong bg-bg-secondary p-3 shadow-card-lg chamfer"
        >
          <fieldset className="min-w-0">
            <legend className="mb-2 px-1 text-[11px] font-mono uppercase tracking-wider text-text-muted">
              Skin de consola
            </legend>
            <div className="space-y-1.5">
              {SKINS.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-3 border border-border-default p-2 transition-colors chamfer-sm hover:border-accent-secondary has-[:checked]:border-accent-primary has-[:checked]:bg-bg-elevated has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent-primary"
                >
                  <input
                    type="radio"
                    name="skin"
                    value={option.id}
                    checked={skin === option.id}
                    onChange={() => setSkin(option.id)}
                    className="sr-only"
                  />
                  <span className="flex shrink-0" aria-hidden="true">
                    {option.swatches.map((color) => (
                      <span key={color} className="h-6 w-3" style={{ backgroundColor: color }} />
                    ))}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-text-primary">{option.name}</span>
                    <span className="block truncate text-[11px] text-text-muted">{option.tagline}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-3 flex cursor-pointer items-center justify-between gap-3 border-t border-border-default px-1 pt-3 text-sm text-text-secondary has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent-primary">
            <span>
              Efecto CRT
              {lowEnd && (
                <span className="block text-[11px] text-text-muted">Desactivado en este dispositivo</span>
              )}
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={crtEnabled && !lowEnd}
              disabled={lowEnd}
              onChange={toggleCrt}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`flex h-5 w-10 items-center border border-border-strong px-0.5 transition-colors ${
                crtEnabled && !lowEnd ? "bg-accent-primary" : "bg-bg-elevated"
              }`}
            >
              <span
                className="block h-3.5 w-3.5 bg-bg-primary transition-transform"
                style={{ transform: crtEnabled && !lowEnd ? "translateX(18px)" : "translateX(0)", backgroundColor: crtEnabled && !lowEnd ? "var(--color-bg)" : "var(--color-text-muted)" }}
              />
            </span>
          </label>
        </div>
      )}
    </div>
  );
}
