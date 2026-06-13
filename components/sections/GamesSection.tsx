import Link from "next/link";
import { coverArt } from "@/lib/art";
import type { Game } from "@/lib/data/games";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GrungeButton } from "@/components/ui/GrungeButton";
import { GrungeFrame } from "@/components/ui/GrungeFrame";

export function GamesSection({ games }: { games: Game[] }) {
  return (
    <section
      id="games"
      className="relative z-20 overflow-hidden bg-paper px-5 pt-28 pb-14 text-canvas-deep md:px-10 md:pt-36 md:pb-16"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          index="01"
          eyebrow="Our games"
          title={"The shelf"}
          layout="split"
          tone="light"
          lead="Take a look at what we've shipped — and what's still in the works."
        />

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
          {games.map((game) => (
            <Link key={game.slug} href={`/games/${game.slug}`} className="group block">
              <GrungeFrame
                className="aspect-video w-full"
                frameClassName="bg-canvas-deep transition-colors duration-300 group-hover:bg-moss/60"
                fillFilter="torn-soft"
                frameFilter="torn-rough"
                frameInset={10}
                media={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={game.image || coverArt(game)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                }
              />
              <div className="mt-5">
                <p className="label text-olive">
                  {game.year} · {game.status}
                </p>
                <h3 className="font-heading mt-1 text-2xl transition-colors group-hover:text-moss md:text-3xl">
                  {game.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <GrungeButton href="/games" size="md">
            View all games
          </GrungeButton>
        </div>
      </div>
    </section>
  );
}
