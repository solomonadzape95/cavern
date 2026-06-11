"use client";

import { motion, useReducedMotion } from "motion/react";

/** The hammer that swings in the middle of "WE FORGE ⚒ GAMES". */
export function ForgeEmoji({ char = "⚒️" }: { char?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className="inline-block origin-bottom"
      style={{ transformOrigin: "70% 80%" }}
      animate={
        reduce
          ? undefined
          : { rotate: [0, -22, 14, -22, 0], y: [0, -4, 0, -4, 0] }
      }
      transition={{
        duration: 1.6,
        repeat: Infinity,
        repeatDelay: 0.6,
        ease: "easeInOut",
      }}
    >
      {char}
    </motion.span>
  );
}
