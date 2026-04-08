"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { m, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

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
          rootMargin: "-40% 0px -55% 0px", // triggers near center of viewport
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
      if (window.innerWidth >= 768 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const handleNavClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <m.header
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-bg-primary/70 backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_1px_20px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="container-main flex items-center justify-between h-[4.25rem]">
        {/* ── Logo ────────────────────────────────────────────────────── */}
        <Link href="#hero" className="relative group" onClick={handleNavClick}>
          <m.div
            className="font-display font-extrabold text-2xl tracking-tight select-none"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="relative">
              <span className="gradient-text">FP</span>
              <span className="text-text-muted/60">.</span>
            </span>
          </m.div>
          {/* Glow on hover */}
          <div className="absolute -inset-2 rounded-lg bg-white/0 group-hover:bg-white/[0.06] transition-colors duration-300 -z-10" />
        </Link>

        {/* ── Desktop Navigation ──────────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-3 py-2 text-[0.8125rem] font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {link.label}

                  {/* Active indicator dot */}
                  {isActive && (
                    <m.span
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                      layoutId="navDot"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 28,
                      }}
                    />
                  )}

                  {/* Hover background pill */}
                  <span className="absolute inset-0 rounded-lg bg-white/[0.04] opacity-0 hover:opacity-100 transition-opacity duration-200 -z-10" />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── CTA Button (desktop) ────────────────────────────────────── */}
        <div className="hidden md:block">
          <m.a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg bg-white text-black hover:bg-gray-100 transition-colors duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Hablemos
          </m.a>
        </div>

        {/* ── Mobile Hamburger ─────────────────────────────────────────── */}
        <button
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/[0.06] transition-colors"
        >
          <div className="w-5 h-3.5 relative flex flex-col justify-between">
            <m.span
              className="block w-full h-[2px] bg-text-primary rounded-full origin-center"
              animate={
                menuOpen
                  ? { rotate: 45, y: 6, width: "100%" }
                  : { rotate: 0, y: 0, width: "100%" }
              }
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
            <m.span
              className="block h-[2px] bg-text-primary rounded-full"
              animate={
                menuOpen
                  ? { opacity: 0, width: 0, x: 8 }
                  : { opacity: 1, width: "70%", x: 0 }
              }
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
            <m.span
              className="block w-full h-[2px] bg-text-primary rounded-full origin-center"
              animate={
                menuOpen
                  ? { rotate: -45, y: -6, width: "100%" }
                  : { rotate: 0, y: 0, width: "100%" }
              }
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
          </div>
        </button>
      </nav>

      {/* ── Mobile Menu (slide from top) ────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            className="md:hidden fixed inset-0 top-[4.25rem] z-50"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
              closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
            }}
          >
            {/* Backdrop */}
            <m.div
              className="absolute inset-0 bg-bg-primary/95 backdrop-blur-2xl"
              variants={{
                open: { opacity: 1 },
                closed: { opacity: 0 },
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Menu content */}
            <div className="relative flex flex-col items-center justify-center h-full gap-2 px-8">
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
                      className={`block text-3xl font-display font-bold py-2 transition-colors duration-200 ${
                        isActive
                          ? "gradient-text"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </m.div>
                );
              })}

              {/* CTA in mobile */}
              <m.div
                className="mt-6"
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -16 },
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href="#contact"
                  onClick={handleNavClick}
                  className="btn-primary text-base px-8 py-3"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Hablemos
                </a>
              </m.div>

              {/* Social links in mobile menu */}
              <m.div
                className="flex gap-4 mt-10"
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -16 },
                }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                {[
                  { label: "GitHub", href: "https://github.com/feliprono01" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/felipe-prono-5b0886173/" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
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
