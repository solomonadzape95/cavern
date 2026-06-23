"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "motion/react";
import { avatar } from "@/lib/art";
import type { Member } from "@/lib/data/team";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GrungeFrame } from "@/components/ui/GrungeFrame";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function TeamSection({ team }: { team: Member[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const items = reduce ? team : [...team, ...team];

  useLayoutEffect(() => {
    if (reduce || !trackRef.current) return;
    const track = trackRef.current;
    const tween = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: team.length * 6,
      repeat: -1,
    });
    const pause = () => tween.pause();
    const resume = () => tween.resume();
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    return () => {
      tween.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, [reduce, team.length]);

  return (
    <section
      id="team"
      className="relative z-20 overflow-hidden bg-paper px-5 pt-28 pb-24 text-canvas-deep md:px-10 md:pt-36 md:pb-32"
    >
      <div className="mx-auto max-w-350">
        <SectionHeader
          index="03"
          eyebrow="Meet the team"
          title={"The crew"}
          layout="split"
          tone="light"
          lead="A small, hands-on team. Hover a face to find them online."
        />
      </div>

      {/* full-bleed marquee, breaks the section's side padding */}
      <div className="mt-16 -mx-5 overflow-x-hidden md:-mx-10">
        <div
          ref={trackRef}
          className="flex w-max gap-4 md:gap-6 h-125 sm:h-125 md:h-170"
        >
          {items.map((m, i) => (
            <div
              key={`${m.name}-${i}`}
              className="w-72 shrink-0 sm:w-80 md:w-96"
            >
              <GrungeFrame
                className="h-105 sm:h-120 md:h-140"
                frameClassName="bg-transparent"
                fillFilter="torn-soft"
                frameFilter="torn-rough"
                frameInset={14}
                media={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.image || avatar(m.name)}
                    alt={m.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-90"
                  />
                }
                mediaOverlay={
                  <>
                    {/* resting scrim — keeps name + role legible at the base */}
                    <div className="absolute inset-0 bg-linear-to-t from-canvas-deep via-canvas-deep/40 to-transparent" />
                    {/* hover expands the bio upward — dim the whole photo so it stays readable */}
                    {/* <div className="absolute inset-0 bg-canvas-deep/0 transition-colors duration-300 group-hover:bg-canvas-deep/70" /> */}
                  </>
                }
                contentClassName="absolute inset-x-0 bottom-0 p-4 md:p-6"
              >
                {/* <div className="mt-2 grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-1 text-lg md:text-2xl text-paper/90 italic">
                      {m.bio}
                    </p>
                  </div>
                </div> */}
              </GrungeFrame>

              <div className="mt-2 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold text-canvas-deep">{m.name}</p>
                  <p className="text-md text-canvas-deep/70">{m.role}</p>
                </div>
                <div className="flex items-center gap-3">
                  {m.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={l.label}
                      className="text-moss transition-colors hover:text-canvas-deep"
                    >
                      <SocialIcon label={l.label} className="text-2xl" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
