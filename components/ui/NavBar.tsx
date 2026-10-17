"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { m, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import SkinSelector from "@/components/ui/SkinSelector";

// ─── Nav config ────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Habilidades", href: "#skills" },
  { label: "Experiencia", href: "#experience" },
  { label: "Certificaciones", href: "#certifications" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

const socials = [
  { label: "GitHub", href: "https://github.com/feliprono01" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/felipe-prono-5b0886173/" },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const { scrollY } = useScroll();

  // ── Scroll-aware background ──────────────────────────────────────────────
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  // ── Intersection Observer for active section ─────────────────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-40% 0px -55% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Lock body scroll when mobile menu is open ────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ── Close mobile menu on resize to desktop ───────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const handleNavClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <m.header
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 border-b ${
        scrolled
          ? "bg-bg-primary/90 backdrop-blur-xl border-border-subtle"
          : "bg-transparent border-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="container-main flex items-center justify-between h-[4.25rem]">
        {/* ── Logo ────────────────────────────────────────────────────── */}
        <Link href="#hero" className="group select-none" onClick={handleNavClick}>
          <span className="font-display font-bold text-sm sm:text-base tracking-wider uppercase">
            <span className="accent-text">Felipe</span>{" "}
            <span className="text-text-primary">Prono</span>
          </span>
        </Link>

        {/* ── Desktop Navigation ──────────────────────────────────────── */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-xs font-mono font-medium uppercase tracking-wide transition-colors duration-200 pb-1 ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                  style={
                    isActive
                      ? {
                          textDecoration: "underline wavy var(--color-accent-primary)",
                          textUnderlineOffset: "6px",
                          textDecorationThickness: "1.5px",
                        }
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Theme toggle + CTA (desktop) ─────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-4">
          <SkinSelector />
          <a href="#contact" className="btn-primary !px-4 !py-2 text-xs">
            Contactar
          </a>
        </div>

        {/* ── Mobile: toggle + hamburger ───────────────────────────────── */}
        <div className="flex items-center gap-3 lg:hidden">
          <SkinSelector />
          <button
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="relative w-10 h-10 flex items-center justify-center border border-border-default chamfer-sm"
          >
            <div className="w-5 h-3.5 relative flex flex-col justify-between">
              <m.span
                className="block w-full h-[2px] bg-text-primary origin-center"
                animate={
                  menuOpen
                    ? { rotate: 45, y: 6, width: "100%" }
                    : { rotate: 0, y: 0, width: "100%" }
                }
                transition={{ duration: 0.25, ease: "easeInOut" }}
              />
              <m.span
                className="block h-[2px] bg-text-primary"
                animate={
                  menuOpen
                    ? { opacity: 0, width: 0, x: 8 }
                    : { opacity: 1, width: "70%", x: 0 }
                }
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
              <m.span
                className="block w-full h-[2px] bg-text-primary origin-center"
                animate={
                  menuOpen
                    ? { rotate: -45, y: -6, width: "100%" }
                    : { rotate: 0, y: 0, width: "100%" }
                }
                transition={{ duration: 0.25, ease: "easeInOut" }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu (slide from top) ────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            className="lg:hidden fixed inset-0 top-[4.25rem] z-50"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
              closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
            }}
          >
            <m.div
              className="absolute inset-0 bg-bg-primary/97 backdrop-blur-xl"
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              transition={{ duration: 0.3 }}
            />

            <div className="relative flex flex-col items-center justify-center h-full gap-3 px-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <m.div
                    key={link.href}
                    variants={{
                      open: { opacity: 1, y: 0, filter: "blur(0px)" },
                      closed: { opacity: 0, y: -16, filter: "blur(4px)" },
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleNavClick}
                      className={`block text-2xl font-display font-semibold uppercase py-1 transition-colors duration-200 ${
                        isActive ? "accent-text" : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </m.div>
                );
              })}

              <m.div
                className="mt-6"
                variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: -16 } }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <a href="#contact" onClick={handleNavClick} className="btn-primary">
                  Contactar
                </a>
              </m.div>

              <m.div
                className="flex gap-5 mt-8"
                variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: -16 } }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono uppercase tracking-wide text-text-muted hover:text-[var(--color-accent-primary)] transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
