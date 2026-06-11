import type { ReactNode } from "react";
import { CavernTexture } from "@/components/ui/CavernTexture";
import { MaskReveal, Reveal } from "@/components/anim/Reveal";

/**
 * Peripheral-page header: 75vh textured banner carrying the page name,
 * with a torn bottom edge that bleeds into the page body.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  imageSrc = "/peripheral-hero.jpg",
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  imageSrc?: string;
}) {
  return (
    <header className="relative flex h-[75vh] min-h-120 flex-col items-center justify-center overflow-hidden text-center">
      <CavernTexture variant="header" imageSrc={imageSrc} priority />

      <div className="relative z-10 mx-auto flex w-full max-w-275 flex-col items-center px-5 md:px-10">
        <Reveal className="label mb-4 text-sage">{eyebrow}</Reveal>
        <MaskReveal
          lines={title.split("\n")}
          className="font-display text-paper text-center text-(length:--text-mega-lg)"
          lineClassName="text-center"
        />
        {lead && (
          <Reveal
            delay={0.15}
            className="mt-6 max-w-[58ch] text-lg text-sage md:text-2xl"
          >
            {lead}
          </Reveal>
        )}
      </div>

      {/* torn bottom edge — canvas strip displaced into the header */}
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-px z-10 h-16 bg-canvas-deep translate-y-10"
        style={{ filter: "url(#torn-banner)" }}
      />
    </header>
  );
}
