"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { CavernTexture } from "@/components/ui/CavernTexture";
import { MaskReveal, Reveal } from "@/components/anim/Reveal";
import { GrungeButton } from "@/components/ui/GrungeButton";
import { GrungeEdge } from "@/components/ui/GrungeEdge";

const COLS = 8;
const ROWS = 6;
const TILES = Array.from({ length: COLS * ROWS });

export function Hero({ founded, tagline }: { founded: number; tagline: string }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>(".hero-tile");
      if (reduce) {
        gsap.set(tiles, { autoAlpha: 0 });
        return;
      }
      gsap.set(tiles, { autoAlpha: 1 });
      // diagonal wavefront from the top-left corner to the bottom-right
      gsap.to(tiles, {
        autoAlpha: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: { grid: [ROWS, COLS], from: "start", amount: 1.1 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {/* fixed backdrop — subsequent sections scroll over this */}
      <div className="fixed inset-0 z-0">
        <CavernTexture
          variant="hero"
          priority
          imageSrc="/hero-cavern.jpg"
          imageAlt="A cavern mouth opening onto a green river valley"
        />
        <div
          aria-hidden
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}
        >
          {TILES.map((_, i) => (
            <div key={i} className="hero-tile bg-canvas-deep" />
          ))}
        </div>
      </div>

      <section className="relative z-10 flex h-[105vh] flex-col items-center justify-center px-5 text-center md:px-10">
        <div className="mx-auto flex w-full max-w-275 flex-col items-center">
          <Reveal
            delay={0.9}
            className="text-md uppercase font-semibold mb-6 text-sage"
          >
            Cavern Studios · est. {founded}
          </Reveal>

          <h1 className="font-display text-paper text-(length:--text-mega) drop-shadow-[0_2px_24px_rgba(20,26,19,0.6)]">
            <MaskReveal
              lines={["Let's forge", "games"]}
              delay={0.7}
              stagger={0.14}
            />
          </h1>

          <Reveal delay={1.3} className="mt-6">
            <span className="font-semibold text-md uppercase label text-sage">
              {tagline}
            </span>
          </Reveal>

          <Reveal
            delay={1.5}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <GrungeButton href="/games" size="lg">
              Explore games
            </GrungeButton>
            <GrungeButton href="/about" tone="sage" size="lg">
              The studio
            </GrungeButton>
          </Reveal>
        </div>

        {/* scroll cue */}
        <Reveal
          delay={1.8}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <span className="label flex flex-col items-center gap-2 text-sage/70">
            Scroll
            <span className="block h-10 w-px animate-pulse bg-sage/50" />
          </span>
        </Reveal>

        <GrungeEdge color="var(--color-paper)" className="translate-y-10" />
      </section>
    </div>
  );
}
