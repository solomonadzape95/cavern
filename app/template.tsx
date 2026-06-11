"use client";

import { motion } from "motion/react";

/**
 * Route-level transition. `template.tsx` remounts on navigation, so this
 * fades each page in. Opacity-only on purpose: a transform here would create a
 * containing block and break the hero's `position: fixed` backdrop.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
