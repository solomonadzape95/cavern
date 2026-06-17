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
            <GrungeFrame
              className="h-105 md:h-120"
              frameClassName="bg-canvas-deep"
              fillFilter="torn-soft"
              frameFilter="torn-rough"
              frameInset={12}
              media={
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.image || avatar(m.name)}
                  alt={m.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-90"
                />
              }
              mediaOverlay={
                <div className="absolute inset-0 bg-linear-to-t from-canvas-deep via-canvas-deep/40 to-transparent" />
              }
              contentClassName="absolute inset-x-0 bottom-0 p-5 md:p-6"
            >
              <p className="font-heading text-2xl leading-tight text-paper md:text-3xl">
                {m.name}
              </p>
              <p className="label mt-1 text-sage">{m.role}</p>
              <p className="mt-3 text-sage/90 italic">{m.bio}</p>
              <div className="mt-3 flex gap-3">
                {m.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={l.label}
                    className="text-moss transition-colors hover:text-paper"
                  >
                    <SocialIcon label={l.label} className="text-xl" />
                  </a>
                ))}
              </div>
            </GrungeFrame>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
