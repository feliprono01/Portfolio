"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useMotionValue, useTransform, m } from "framer-motion";
import { animate } from "framer-motion";

interface AnimatedCounterProps {
  /** Target number to count up to */
  to: number;
  /** Optional suffix like "+" or "%" */
  suffix?: string;
  /** Optional prefix like "$" */
  prefix?: string;
  /** Duration of the count animation in seconds. Default: 1.8 */
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, to, {
      duration,
      ease: "easeOut",
      onUpdate: (value) => setDisplayValue(Math.floor(value)),
    });

    return controls.stop;
  }, [isInView, to, duration, motionValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
