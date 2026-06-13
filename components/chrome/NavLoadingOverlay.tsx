"use client";

import { usePathname } from "next/navigation";
import { Loader } from "@/components/ui/Loader";
import { useEffect, useRef, useState } from "react";

/**
 * Client-side overlay that appears immediately when the app router is
 * navigating. This prevents visible layout content (like the footer)
 * from briefly appearing before the route-level `loading.tsx` mounts.
 */
export default function NavLoadingOverlay() {
  // Try to use Next's `useNavigation()` if available; some environments
  // (Turbopack / certain Next versions) may not expose it, causing a
  // runtime TypeError. Wrap the call in a try/catch and fall back to a
  // pathname-change based overlay when it's unavailable.
  let navState: string | null = null;
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - dynamic availability across Next versions
    // Attempt to call `useNavigation` if present on the module.
    // We import it dynamically to avoid bundling errors in environments
    // where it's not available.
    // Note: calling an undefined import throws; that's why this is wrapped.
    // Importing statically at top can still yield undefined, so guard here.
    // The `require` approach isn't available in ESM here, so this try/catch
    // will protect against the TypeError seen in your runtime.
    // @ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigation: any =
      require("next/navigation").useNavigation?.() || null;
    navState = navigation?.state ?? null;
  } catch (e) {
    navState = null;
  }

  const pathname = usePathname();
  const prev = useRef(pathname);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (navState) {
      setVisible(navState === "loading");
      return;
    }

    // Fallback: show overlay briefly when the pathname changes.
    if (pathname !== prev.current) {
      prev.current = pathname;
      setVisible(true);
      const t = window.setTimeout(() => setVisible(false), 700);
      return () => window.clearTimeout(t);
    }
  }, [navState, pathname]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-canvas-deep">
      <Loader
        label="Loading"
        className="[--loader-size:4.5rem] md:[--loader-size:6rem]"
      />
    </div>
  );
}
