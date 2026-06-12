"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IconType } from "react-icons";
import {
  LuGamepad2,
  LuCode,
  LuPalette,
  LuArrowRight,
} from "react-icons/lu";
import type { Service } from "@/lib/data/services";
import { GrungeButton } from "@/components/ui/GrungeButton";
import { GrungeEdge } from "../ui/GrungeEdge";

const ICONS: IconType[] = [LuGamepad2, LuCode, LuPalette];

const cell = "relative bg-canvas-deep p-7 md:p-8 flex flex-col";

export function ServicesSection({ services }: { services: Service[] }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // On phones the bento is taller than the viewport, so skip the pin/mask
    // and let it flow normally.
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (reduce || isMobile) {
        gsap.set([".svc-shape", ".svc-content"], {
          clipPath: "inset(0% 0% 0% 0%)",
        });
        return;
      }
      // Drive the reveal as the section ENTERS (no pin) so it starts well
      // before the previous section is fully gone.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".svc-pin",
          start: "top 78%",
          end: "top 18%",
          scrub: 0.5,
        },
      });
      // a torn dark-green panel grows from the center, the bento content
      // revealing in lockstep through the same window
      tl.fromTo(
        [".svc-shape", ".svc-content"],
        { clipPath: "inset(42% 42% 42% 42%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="services"
      className="relative z-20 bg-paper"
      aria-label="Services"
    >
      <GrungeEdge color="var(--color-paper)" className="-translate-y-10" top/>
      <div className="svc-pin relative flex min-h-svh items-center justify-center overflow-hidden py-24 md:py-0">
        {/* dark-green panel revealed by the clip-path */}
        <div
          aria-hidden
          className="svc-shape absolute inset-0 bg-canvas-deep"
          style={{ willChange: "clip-path" }}
        />

        {/* crisp bento content, clipped to the same shape so it appears
            "inside" the reveal */}
        <div className="svc-content relative z-10 mx-auto w-full max-w-350 px-5 md:absolute md:inset-0 md:mx-0 md:flex md:max-w-none md:items-center md:justify-center md:px-10">
          <div className="mx-auto w-11/12 max-w-[90vw] border border-red-500">
            <div className="grid auto-rows-[minmax(168px,1fr)] grid-cols-1 gap-px border border-sage/25 bg-sage/25 sm:grid-cols-2 md:grid-cols-4">
              {/* intro cell */}
              <div
                className={`${cell} sm:col-span-2 md:row-span-2 justify-between`}
              >
                <div>
                  <p className="label text-olive">02 — What we do</p>
                  <h2 className="font-display mt-4 text-(length:--text-title) leading-[0.95] text-paper">
                    We make worlds, and help others make theirs.
                  </h2>
                </div>
                <div className="mt-8">
                  <GrungeButton href="/contact" size="md">
                    Start a project
                  </GrungeButton>
                </div>
              </div>

              {/* service cells */}
              {services.map((s, i) => {
                const Icon = ICONS[i] ?? LuGamepad2;
                return (
                  <div key={s.no} className={`${cell} sm:col-span-2`}>
                    <div className="flex items-start justify-between">
                      <Icon className="text-4xl md:text-6xl text-moss" aria-hidden />
                      <span className="font-body text-4xl text-olive/90">
                        {s.no}
                      </span>
                    </div>
                    <h3 className="font-heading mt-4 text-3xl text-paper">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sage">{s.body}</p>
                  </div>
                );
              })}

              {/* CTA cell */}
              <Link
                href="/games"
                className={`${cell} group justify-end bg-olive/15 transition-colors hover:bg-moss/25 sm:col-span-2`}
              >
                <p className="font-heading text-3xl text-paper">See the work</p>
                <span className="mt-2 inline-flex items-center gap-2 text-sage transition-colors group-hover:text-paper">
                  Browse games <LuArrowRight aria-hidden />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <GrungeEdge color="var(--color-paper)" className="translate-y-10" />
    </section>
  );
}
