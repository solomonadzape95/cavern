"use client";

import type { ReactNode } from "react";
import { GrungeButton } from "@/components/ui/GrungeButton";
import { LivePreview, PreviewChrome } from "./LivePreview";
import { PreviewBackdrop } from "./PreviewBackdrop";

/**
 * A contained, static facsimile of the landing-page <Hero>. The headline is
 * fixed copy on the real hero, so it stays constant here; the studio name,
 * founding year and tagline track the Site settings form live.
 */
function HeroPreview({
  name,
  founded,
  tagline,
}: {
  name: string;
  founded: string;
  tagline: string;
}) {
  return (
    <div>
      <PreviewChrome url="/" />
      <div className="relative aspect-16/11 overflow-hidden">
        <PreviewBackdrop variant="hero" imageSrc="/hero-cavern.jpg" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="label mb-3 text-sage">
            {name || "Studio name"} · est. {founded || "—"}
          </p>
          <h2 className="font-display text-3xl leading-[0.95] text-paper drop-shadow-[0_2px_24px_rgba(20,26,19,0.6)] sm:text-4xl">
            Let&apos;s forge
            <br />
            games
          </h2>
          <p className="label mt-4 text-sage">{tagline || "Your tagline"}</p>

          <div className="pointer-events-none mt-6 flex flex-wrap justify-center gap-3">
            <GrungeButton size="sm">Explore games</GrungeButton>
            <GrungeButton tone="sage" size="sm">
              The studio
            </GrungeButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Drops the Site settings form into a two-column layout with a live hero. */
export function SitePreviewPane({ children }: { children: ReactNode }) {
  return (
    <LivePreview
      title="Landing hero preview"
      note="updates as you type"
      render={(read) => (
        <HeroPreview
          name={read.text("name")}
          founded={read.text("founded")}
          tagline={read.text("tagline")}
        />
      )}
    >
      {children}
    </LivePreview>
  );
}
