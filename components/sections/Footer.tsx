"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, ArrowUp } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import PixelStrip from "@/components/ui/PixelStrip";

// Brand icons (not available in lucide-react)
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─── Nav links (same as NavBar) ──────────────────────────────────────────────
const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Habilidades", href: "#skills" },
  { label: "Experiencia", href: "#experience" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/feliprono01", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/felipe-prono-5b0886173/", icon: LinkedinIcon },
  { label: "Email", href: "mailto:felipeprono@gmail.com", icon: Mail },
  { label: "Teléfono", href: "tel:+5493424787555", icon: Phone },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer className="relative border-t border-border-subtle bg-bg-secondary/40">
      <div className="container-main pt-10">
        <PixelStrip bars={64} className="h-4" />
      </div>

      <div className="container-main py-14">
        {/* ── Top: Logo + Nav + Social ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <m.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="#hero" className="inline-block">
              <span className="font-display font-semibold text-lg tracking-wider uppercase">
                <span className="accent-text">Felipe</span>{" "}
                <span className="text-text-primary">Prono</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Felipe Prono
              <br />
              <span className="text-text-muted">
                Desarrollador de Software & Entusiasta de IA
              </span>
            </p>
          </m.div>

          {/* Navigation */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-text-muted mb-4">
              Navegación
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Social */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-text-muted mb-4">
              Redes
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2.5 border border-border-default text-text-muted hover:text-text-primary hover:border-accent-secondary transition-all duration-300 chamfer-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </m.div>
        </div>

        {/* ── Divider ─────────────────────────────────────────────── */}
        <div className="border-t border-border-subtle mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs font-mono text-center sm:text-left">
            © 2026 Felipe Prono. Todos los derechos reservados.
          </p>
          <p className="text-text-muted/60 text-xs font-mono">
            Diseñado y desarrollado por Felipe Prono
          </p>
        </div>
      </div>

      {/* ── Scroll to top button ───────────────────────────────────── */}
      <m.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 bg-accent-primary text-bg-primary chamfer-sm hover:brightness-110 transition-[filter] duration-200"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={
          showScrollTop
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.8, y: 20, pointerEvents: "none" as const }
        }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5" />
      </m.button>
    </footer>
  );
}
