"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Generic rise+fade on scroll-into-view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Heading reveal — each line rises out from under a clip mask. */
export function MaskReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.12,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const line: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
  };

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((l, i) => (
          <span key={i} className={`block ${lineClassName ?? ""}`}>
            {l}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            variants={line}
            className={`block ${lineClassName ?? ""}`}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
