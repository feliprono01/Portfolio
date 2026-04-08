"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  /** Delay before the animation starts (seconds). Default: 0 */
  delay?: number;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function SectionWrapper({
  id,
  className = "",
  children,
  delay = 0,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <m.section
      ref={ref}
      id={id}
      className={`section-padding ${className}`}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </m.section>
  );
}
