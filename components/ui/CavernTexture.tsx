import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Procedural "cavern" backdrop — layered moss gradients + linocut hatching.
 * Looks intentional with no photography; drop in real art later via `imageSrc`
 * (it renders desaturated + moss-tinted over the texture).
 */
export function CavernTexture({
  className,
  variant = "hero",
  imageSrc,
  imageAlt = "",
  priority,
}: {
  className?: string;
  variant?: "hero" | "header" | "muted";
  imageSrc?: string;
  imageAlt?: string;
  priority?: boolean;
}) {
  const glow =
    variant === "hero"
      ? "radial-gradient(80% 60% at 28% 18%, rgba(65,114,59,0.55), transparent 60%)"
      : variant === "header"
        ? "radial-gradient(90% 80% at 70% 10%, rgba(65,114,59,0.40), transparent 62%)"
        : "radial-gradient(90% 80% at 50% 0%, rgba(65,114,59,0.22), transparent 60%)";

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-canvas", className)}>
      {/* moss glow */}
      <div className="absolute inset-0" style={{ background: glow }} />
      {/* linocut diagonal hatching */}
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(233,233,221,0.6) 0 1px, transparent 1px 9px)",
        }}
      />
      {/* second hatch, cross direction, finer */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(48deg, rgba(20,26,19,0.7) 0 1px, transparent 1px 6px)",
        }}
      />
      {/* optional real artwork — already in palette, show it crisp */}
      {imageSrc && (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={priority}
            quality={100}
            sizes="100vw"
            className="object-cover"
          />
          {/* dark scrim for text contrast */}
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
      {/* depth wells */}
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
