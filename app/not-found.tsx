"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";

const COUNTDOWN_START = 9;

export default function NotFound() {
  const router = useRouter();
  const [count, setCount] = useState(COUNTDOWN_START);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (count <= 0) {
      router.push("/");
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, paused, router]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div>
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">Error 404</p>
        <h1
          className="font-display uppercase accent-text leading-none mb-3"
          style={{ fontSize: "clamp(2.5rem, 9vw, 5rem)" }}
        >
          Game Over
        </h1>
        <p className="font-mono text-text-secondary mb-8">
          Este nivel no existe. La ruta que pediste no está en el mapa.
        </p>

        <p className="font-display text-xl uppercase text-text-primary mb-2 animate-pulse motion-reduce:animate-none">
          Continue?
        </p>
        <p className="font-mono text-sm text-text-muted mb-8">
          Volviendo al hub en{" "}
          <span className="accent-text-secondary" aria-live="polite">
            {count}
          </span>
          s
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary" onClick={() => setPaused(true)}>
            <LayoutGrid className="w-4 h-4" strokeWidth={1.75} />
            Volver al hub ahora
          </Link>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="btn-ghost"
            aria-pressed={paused}
          >
            {paused ? "Reanudar cuenta regresiva" : "Pausar"}
          </button>
        </div>
      </div>
    </main>
  );
}
