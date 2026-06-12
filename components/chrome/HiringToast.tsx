"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const BANNER_HEIGHT = "2.75rem";
const REPEATS = 4;

/**
 * Fixed marquee banner pinned above the header. Sets --banner-h on
 * <html> while visible so SiteHeader can slide down out of its way
 * (see app/globals.css and SiteHeader.tsx).
 */
export function HiringToast({ jobsCount }: { jobsCount: number }) {
  const [show, setShow] = useState(false);
  const message = `We're hiring — ${jobsCount} open roles across engineering, art, audio & marketing. Come build with us.`;

  useEffect(() => {
    const t = window.setTimeout(() => setShow(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--banner-h",
      show ? BANNER_HEIGHT : "0px",
    );
    return () => {
      document.documentElement.style.setProperty("--banner-h", "0px");
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 top-0 z-[55] overflow-hidden bg-moss text-paper"
          style={{ height: BANNER_HEIGHT }}
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/jobs"
            aria-label={`We're hiring — view ${jobsCount} open roles`}
            className="absolute inset-0 flex items-center overflow-hidden"
          >
            <div className="flex w-max animate-marquee items-center">
              {[0, 1].map((dup) => (
                <span
                  key={dup}
                  aria-hidden={dup === 1}
                  className="flex shrink-0 items-center"
                >
                  {Array.from({ length: REPEATS }).map((_, i) => (
                    <span
                      key={i}
                      className="label mx-6 flex shrink-0 items-center gap-3 whitespace-nowrap"
                    >
                      {message}
                      <span aria-hidden className="text-paper/50">
                        ●
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setShow(false)}
            aria-label="Dismiss"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-paper/70 transition-colors hover:text-paper"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
