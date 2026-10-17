"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
}

/**
 * Types `text` out character by character, RPG-dialogue style. The
 * animation is purely visual (aria-hidden) — a visually-hidden
 * aria-live region carries the complete message immediately, so
 * screen reader users don't have to wait through it. Respects
 * prefers-reduced-motion by showing the full text right away.
 */
export default function Typewriter({ text, speed = 22, className = "" }: TypewriterProps) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      return;
    }

    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span className={className}>
      <span className="typing-cursor" aria-hidden="true">
        {shown}
      </span>
      <span className="sr-only" aria-live="polite">
        {text}
      </span>
    </span>
  );
}
