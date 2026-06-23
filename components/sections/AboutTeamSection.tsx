import { avatar } from "@/lib/art";
import type { Member } from "@/lib/data/team";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GrungeFrame } from "@/components/ui/GrungeFrame";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Reveal } from "@/components/anim/Reveal";

/**
 * Static "roster" variant of the homepage team marquee — a fixed grid with
 * every bio visible up front, for the about page's slower-paced read.
 */
export function AboutTeamSection({ team }: { team: Member[] }) {
  return (
    <div className="mt-24">
      <SectionHeader
        eyebrow="Meet the team"
        title={"The crew"}
        layout="split"
        lead={`${team.length} people, one small team. Here's everyone behind the games.`}
      />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={(i % 3) * 0.06}>
            <div
             
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
                  <p className="text-xl font-semibold text-paper">
                    {m.name}
                  </p>
                  <p className="text-md text-paper/70">{m.role}</p>
                </div>
                <div className="flex items-center gap-3">
                  {m.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={l.label}
                      className="text-paper transition-colors hover:text-paper/70"
                    >
                      <SocialIcon label={l.label} className="text-2xl" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
