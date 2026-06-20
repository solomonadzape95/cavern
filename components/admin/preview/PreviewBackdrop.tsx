import { cn } from "@/lib/cn";

/**
 * A self-contained clone of `CavernTexture` for admin previews.
 *
 * It mirrors the public site's textured backdrop but paints the artwork with a
 * CSS `background-image` instead of `next/image`, so it happily renders blob:
 * URLs (freshly-picked uploads) and remote placeholder art without tripping
 * over `next/image`'s remote-host / optimisation constraints.
 */
export function PreviewBackdrop({
  imageSrc,
  variant = "hero",
  className,
}: {
  imageSrc?: string;
  variant?: "hero" | "header";
  className?: string;
}) {
  const glow =
    variant === "hero"
      ? "radial-gradient(80% 60% at 28% 18%, rgba(65,114,59,0.55), transparent 60%)"
      : "radial-gradient(90% 80% at 70% 10%, rgba(65,114,59,0.40), transparent 62%)";

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-canvas", className)}>
      <div className="absolute inset-0" style={{ background: glow }} />
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(233,233,221,0.6) 0 1px, transparent 1px 9px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(48deg, rgba(20,26,19,0.7) 0 1px, transparent 1px 6px)",
        }}
      />
      {imageSrc && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${imageSrc}")` }}
          />
          <div className="absolute inset-0 bg-canvas-deep/55" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(20,26,19,0.5) 0%, rgba(20,26,19,0.15) 35%, rgba(20,26,19,0.7) 100%)",
            }}
          />
        </>
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 120%, rgba(20,26,19,0.7), transparent 55%)",
        }}
      />
    </div>
  );
}
