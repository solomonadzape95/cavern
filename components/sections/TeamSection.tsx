"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "motion/react";
import { TEAM, avatar } from "@/content/team";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GrungeFrame } from "@/components/ui/GrungeFrame";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function TeamSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const items = reduce ? TEAM : [...TEAM, ...TEAM];

  useLayoutEffect(() => {
    if (reduce || !trackRef.current) return;
    const track = trackRef.current;
    const tween = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: TEAM.length * 6,
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
  }, [reduce]);

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
          className="flex w-max gap-4 md:gap-6 h-125 sm:h-125 md:h-150"
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
                    src={avatar(m.seed)}
                    alt={m.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-90"
                  />
                }
                mediaOverlay={
                  <>
                    <div className="absolute inset-0 bg-linear-to-t from-black  via-canvas-deep/30 to-transparent" />
                    {/* <div className="absolute inset-0 bg-moss/0 transition-colors duration-300 group-hover:bg-moss/10" /> */}
                  </>
                }
                contentClassName="absolute inset-x-0 bottom-0 p-4 md:p-6"
              >
                <p className="font-heading text-2xl leading-tight text-paper md:text-4xl">
                  {m.name}
                </p>
                <p className="uppercase text-lg md:text-xl mt-1 text-sage">{m.role}</p>

                <div className="mt-2 grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-1 text-lg md:text-2xl text-sage italic">{m.bio}</p>
                    <div className="mt-2 flex gap-3">
                      {m.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={l.label}
                          className="text-moss transition-colors hover:text-paper"
                        >
                          <SocialIcon label={l.label} className="text-2xl" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </GrungeFrame>
            </div>
          ))}
        </div>
      </div>

     
    </section>
  );
}
