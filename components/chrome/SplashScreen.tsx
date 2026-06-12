"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Loader } from "@/components/ui/Loader";

const SPLASH_KEY = "cavern:splash-shown";

const emptySubscribe = () => () => {};

/** True once the client has hydrated — lets us read sessionStorage without a hydration mismatch. */
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, 
    () => false,
  );
}

/**
 * Full-screen splash shown once per browser tab — set on the way out so a
 * fresh visit always sees it, but reloads/navigations within the same
 * session don't. Matches the Hero's pre-reveal canvas-deep tile backdrop.
 */
export function SplashScreen() {
  const hydrated = useHydrated();
  const [dismissed, setDismissed] = useState(false);
  const alreadyShown = hydrated && sessionStorage.getItem(SPLASH_KEY) === "1";
  const visible = hydrated && !alreadyShown && !dismissed;

  useEffect(() => {
    if (!visible) return;
    sessionStorage.setItem(SPLASH_KEY, "1");
    const t = window.setTimeout(() => setDismissed(true), 2000);
    return () => window.clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas-deep"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Loader label="Loading" className="[--loader-size:4.5rem] md:[--loader-size:6rem]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
