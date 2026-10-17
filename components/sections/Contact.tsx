"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import ChamferBox from "@/components/ui/ChamferBox";
import OctaIcon from "@/components/ui/OctaIcon";
import Typewriter from "@/components/ui/Typewriter";
import { m, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, type ComponentType } from "react";
import {
  Mail,
  Phone,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { CONTACT_LINKS, CONTACT_DIALOGUE, type ContactIcon } from "@/content/contact";

// Brand icons (not available in lucide-react)
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const CONTACT_ICONS: Record<ContactIcon, ComponentType<{ className?: string }>> = {
  email: Mail,
  phone: Phone,
  linkedin: LinkedinIcon,
  github: GithubIcon,
};

// ─── Schema ──────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(3, "Mínimo 3 caracteres"),
  message: z.string().min(10, "Mínimo 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─── Animations ──────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const formVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 } },
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputClasses =
    "w-full bg-bg-elevated border border-border-default chamfer-sm px-4 py-2.5 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-all duration-200";

  return (
    <SectionWrapper id="contact">
      <div className="container-main">
        {/* ── Header ──────────────────────────────────────────────── */}
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-2">
            <SectionTitle>Contacto</SectionTitle>
          </div>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            Ya sea para un proyecto nuevo, una consulta técnica o simplemente
            para conectar. Estoy disponible y respondo rápido.
          </p>
        </m.div>

        {/* ── Two columns ─────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left — Contact info */}
          <div className="space-y-6">
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-display font-semibold uppercase text-xl mb-2">
                Información de contacto
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Podés contactarme por cualquiera de estos medios. Generalmente
                respondo en menos de 24 horas.
              </p>
            </m.div>

            <m.div className="space-y-3" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {CONTACT_LINKS.map((link, i) => {
                const Icon = CONTACT_ICONS[link.icon];
                return (
                  <m.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    variants={cardVariants}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  >
                    <ChamferBox
                      elevated
                      accent="border"
                      className="flex items-center gap-4 p-4 hover:border-accent-secondary transition-colors duration-300"
                    >
                      <OctaIcon size="sm" accent={i % 2 === 0 ? "primary" : "secondary"}>
                        <Icon className="w-5 h-5" />
                      </OctaIcon>
                      <div>
                        <p className="text-xs text-text-muted uppercase tracking-wider font-mono font-medium">
                          {link.label}
                        </p>
                        <p className="text-text-secondary text-sm">{link.value}</p>
                      </div>
                    </ChamferBox>
                  </m.a>
                );
              })}
            </m.div>

            {/* Availability note */}
            <m.div
              className="flex items-center gap-3 pt-4 border-t border-border-subtle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <span className="status-dot" />
              <p className="text-text-muted text-sm font-mono">
                Disponible para proyectos freelance
              </p>
            </m.div>
          </div>

          {/* Right — Form */}
          <m.form
            onSubmit={handleSubmit(onSubmit)}
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ChamferBox elevated accent="primary" className="p-6 sm:p-8 space-y-5">
              <h3 className="font-display font-semibold uppercase text-lg mb-1">
                Enviame un mensaje
              </h3>

              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-sm text-text-secondary font-medium">
                  Nombre
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Tu nombre"
                  className={`${inputClasses} ${errors.name ? "border-red-500/60 focus:border-red-500/60" : ""}`}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-sm text-text-secondary font-medium">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="tu@email.com"
                  className={`${inputClasses} ${errors.email ? "border-red-500/60 focus:border-red-500/60" : ""}`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-sm text-text-secondary font-medium">
                  Asunto
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="¿Sobre qué querés hablar?"
                  className={`${inputClasses} ${errors.subject ? "border-red-500/60 focus:border-red-500/60" : ""}`}
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-sm text-text-secondary font-medium">
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Contame sobre tu proyecto..."
                  className={`${inputClasses} resize-none ${errors.message ? "border-red-500/60 focus:border-red-500/60" : ""}`}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <m.button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={status === "idle" ? { scale: 1.02 } : {}}
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
              >
                {status === "idle" && (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar mensaje
                  </>
                )}
                {status === "sending" && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                )}
                {status === "sent" && (
                  <m.span
                    className="flex items-center gap-2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    ¡Mensaje enviado!
                  </m.span>
                )}
                {status === "error" && (
                  <m.span className="flex items-center gap-2" initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                    <AlertCircle className="w-4 h-4" />
                    Error — intentá de nuevo
                  </m.span>
                )}
              </m.button>

              {/* RPG-style dialogue box for the confirmation/error message */}
              <AnimatePresence>
                {(status === "sent" || status === "error") && (
                  <m.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChamferBox
                      elevated
                      accent={status === "error" ? "border" : "secondary"}
                      className="p-4 flex gap-3"
                      role="status"
                    >
                      <OctaIcon size="sm" accent={status === "error" ? "primary" : "secondary"}>
                        <MessageSquare className="w-4 h-4" />
                      </OctaIcon>
                      <div className="min-w-0">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
                          Sistema
                        </p>
                        <Typewriter text={CONTACT_DIALOGUE[status]} className="text-sm text-text-secondary leading-relaxed" />
                      </div>
                    </ChamferBox>
                  </m.div>
                )}
              </AnimatePresence>
            </ChamferBox>
          </m.form>
        </div>
      </div>
    </SectionWrapper>
  );
}
