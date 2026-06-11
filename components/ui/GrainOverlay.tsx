/**
 * Full-page grain + vignette. Fixed, non-interactive, sits above content but
 * below modals. This is the "rough texture" that unifies every surface.
 */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function GrainOverlay() {
  return (
    <>
      {/* grain — desaturated turbulence, overlay blend reads on both paper and canvas */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay"
        style={{ backgroundImage: NOISE, opacity: 0.4 }}
      />
      {/* vignette for cavern depth */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[59]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 12%, transparent 45%, rgba(20,26,19,0.45) 100%)",
        }}
      />
    </>
  );
}
