"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import { runCommand, getCompletions, type TerminalLine } from "@/lib/terminal";

interface HistoryEntry {
  id: number;
  cmd: string;
  lines: TerminalLine[];
}

const TONE_CLASS: Record<NonNullable<TerminalLine["tone"]>, string> = {
  error: "text-red-400",
  accent: "accent-text",
  muted: "text-text-muted",
};

const WELCOME: HistoryEntry = {
  id: -1,
  cmd: "",
  lines: [
    { text: "Terminal de Felipe Prono — escribí `help` para ver los comandos.", tone: "accent" },
    { text: "Es una vista alternativa del mismo contenido del sitio, no un easter egg aislado.", tone: "muted" },
  ],
};

interface TerminalProps {
  open: boolean;
  onClose: () => void;
  returnFocusRef?: React.RefObject<HTMLElement>;
}

/**
 * Full CLI navigation mode: `cat sobre-mi.txt`, `ls proyectos`, `cd
 * <nivel>`, etc. all read the same content/*.ts modules the visual
 * sections render, so nothing is duplicated between the two views.
 */
export default function Terminal({ open, onClose, returnFocusRef }: TerminalProps) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<Element | null>(null);

  const [history, setHistory] = useState<HistoryEntry[]>([WELCOME]);
  const [value, setValue] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const cmdHistoryIndex = useRef(-1);
  const idRef = useRef(0);

  // ── Open/close plumbing: focus trap, Escape, body scroll lock ─────────
  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const returnTarget = returnFocusRef?.current as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>("input, button");
      if (!focusable || focusable.length === 0) return;
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

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const execute = (raw: string) => {
    const result = runCommand(raw);
    idRef.current += 1;
    const entry: HistoryEntry = { id: idRef.current, cmd: raw, lines: result.lines };

    if (result.action?.type === "clear") {
      setHistory([]);
    } else {
      setHistory((h) => [...h, entry]);
    }

    if (raw.trim()) {
      setCmdHistory((h) => [...h, raw]);
      cmdHistoryIndex.current = -1;
    }

    if (result.action?.type === "navigate") {
      router.push(result.action.path);
      onClose();
    } else if (result.action?.type === "close") {
      onClose();
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    execute(value);
    setValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex =
        cmdHistoryIndex.current === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIndex.current - 1);
      cmdHistoryIndex.current = nextIndex;
      setValue(cmdHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistoryIndex.current === -1) return;
      const nextIndex = cmdHistoryIndex.current + 1;
      if (nextIndex >= cmdHistory.length) {
        cmdHistoryIndex.current = -1;
        setValue("");
      } else {
        cmdHistoryIndex.current = nextIndex;
        setValue(cmdHistory[nextIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const completions = getCompletions(value);
      if (completions.length === 1) {
        const parts = value.split(" ");
        parts[parts.length - 1] = completions[0];
        setValue(parts.join(" ") + " ");
      } else if (completions.length > 1) {
        idRef.current += 1;
        setHistory((h) => [...h, { id: idRef.current, cmd: value, lines: [{ text: completions.join("  "), tone: "muted" }] }]);
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <m.div className="absolute inset-0 bg-bg-primary/90 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Terminal del portfolio"
            className="relative z-10 w-full max-w-2xl h-[70vh] max-h-[560px] flex flex-col border border-accent-primary bg-bg-primary chamfer outline-none"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle shrink-0">
              <span className="font-mono text-xs text-text-muted">felipe@portfolio: ~</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar terminal"
                className="p-1 text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            <div ref={scrollRef} aria-live="polite" className="flex-1 overflow-y-auto px-4 py-3 font-mono text-sm space-y-2">
              {history.map((entry) => (
                <div key={entry.id}>
                  {entry.id !== -1 && (
                    <p className="text-text-primary">
                      <span className="accent-text-secondary">felipe@portfolio</span>
                      <span className="text-text-muted">:~$ </span>
                      {entry.cmd}
                    </p>
                  )}
                  {entry.lines.map((l, i) => (
                    <p key={i} className={`whitespace-pre-wrap ${l.tone ? TONE_CLASS[l.tone] : "text-text-secondary"}`}>
                      {l.text || " "}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-border-subtle shrink-0">
              <span className="font-mono text-sm accent-text-secondary shrink-0">felipe@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Comando"
                className="flex-1 bg-transparent font-mono text-sm text-text-primary outline-none"
              />
            </form>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
