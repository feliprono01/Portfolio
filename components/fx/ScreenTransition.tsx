"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { randomTip } from "@/lib/tips";

const MIN_VISIBLE_MS = 650;

/**
 * Intercepts same-origin link clicks, shows a short "old console" loading
 * screen with a random tip, and navigates via the router underneath. Next
 * already prefetches the destination, so without this the jump between
 * levels would be instant — the whole point here is a deliberate minimum
 * display time so the transition actually reads as a loading screen.
 *
 * External links, new-tab clicks, hash links, mailto/tel and downloads are
 * all left alone so they behave normally. If JS never loads, nothing
 * attaches and every link just navigates the regular way.
 */
export default function ScreenTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [tip, setTip] = useState("");
  const shownAt = useRef(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as Element | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === pathname) return;

      e.preventDefault();

      if (reducedMotion.current) {
        router.push(url.pathname + url.search);
        return;
      }

      setTip(randomTip());
      setVisible(true);
      shownAt.current = Date.now();
      router.push(url.pathname + url.search);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router, pathname]);

  // Hide once the destination has actually rendered, but never before the
  // minimum duration — otherwise an instant (prefetched) nav would just flash.
  useEffect(() => {
    if (!visible) return;
    const elapsed = Date.now() - shownAt.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
    const timer = setTimeout(() => setVisible(false), remaining);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          aria-hidden="true"
          className="fixed inset-0 z-[9985] flex flex-col items-center justify-center gap-4 bg-bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <p className="font-display text-lg uppercase accent-text animate-pulse">Cargando nivel…</p>
          <p className="font-mono text-xs text-text-muted max-w-xs text-center px-6">Tip: {tip}</p>
        </m.div>
      )}
    </AnimatePresence>
  );
}
