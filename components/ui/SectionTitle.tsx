"use client";

import { m } from "framer-motion";

interface SectionTitleProps {
  children: string;
  className?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

const bracketLeft = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

const bracketRight = {
  hidden: { opacity: 0, x: 14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.1 } },
};

/**
 * Section header styled like a code tag: < TITLE />
 * Brackets slide in from either side, the text fades up between them.
 */
export default function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <m.h2
      className={`section-heading flex items-center gap-2 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <m.span className="accent-text-secondary" variants={bracketLeft} aria-hidden="true">
        {"<"}
      </m.span>
      <m.span variants={textVariants}>{children}</m.span>
      <m.span className="accent-text-secondary" variants={bracketRight} aria-hidden="true">
        {"/>"}
      </m.span>
    </m.h2>
  );
}
