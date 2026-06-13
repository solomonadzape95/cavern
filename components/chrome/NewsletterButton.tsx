"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuMail, LuX } from "react-icons/lu";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function NewsletterButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Subscribe to the Cavern newsletter"
        className="bg-moss text-paper hover:bg-olive fixed bottom-6 right-6 z-40 flex h-14 w-14 cursor-pointer items-center justify-center shadow-lg transition-colors"
      >
        <LuMail className="text-2xl" aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="bg-canvas-deep/80 fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Subscribe to the newsletter"
              className="bg-canvas-deep border-sage/20 relative w-full max-w-10/12 md:max-w-1/2 border p-8"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-sage/70 hover:text-paper absolute right-4 top-4 transition-colors"
              >
                <LuX className="text-xl" aria-hidden />
              </button>

              <p className="label text-olive">Newsletter</p>
              <h2 className="font-heading mt-1 text-2xl text-paper">Stay in the loop</h2>
              <p className="mt-2 text-sage">
                Devlogs, releases, and studio news — straight to your inbox.
              </p>

              <NewsletterForm className="mt-6" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
