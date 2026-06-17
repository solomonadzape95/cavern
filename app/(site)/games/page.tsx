import type { Metadata } from "next";
import Link from "next/link";
import { getGames } from "@/lib/data/games";
import { getSiteSettings } from "@/lib/data/site";
import { PageHeader } from "@/components/chrome/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/anim/Reveal";
import { GrungeEdge } from "@/components/ui/GrungeEdge";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Games",
    description: `Everything ${settings.name} has made so far.`,
  };
}

const accentText: Record<string, string> = {
  moss: "text-moss",
  olive: "text-olive",
  sage: "text-sage",
  deep: "text-sage",
};

export default async function GamesPage() {
  const games = await getGames();

  return (
    <main className="relative bg-canvas-deep">
      <PageHeader
        eyebrow="Our games"
        title={"Games"}
        lead="Atmospheric worlds, hand-made front to back. Released, building, and barely announced."
      />

      <section className="mx-auto max-w-350 px-5 py-20 md:px-10 md:py-28">
        {games.length === 0 ? (
          <EmptyState title="No games to show yet">
            Our first worlds are still in the forge. Check back soon — or follow
            along on the news page.
          </EmptyState>
        ) : (
          <ul className="border-t border-sage/20">
          {games.map((game, i) => (
            <li key={game.slug} className="border-b border-sage/20">
              <Reveal delay={(i % 3) * 0.05}>
                <Link
                  href={`/games/${game.slug}`}
                  className="group grid grid-cols-1 items-baseline gap-2 py-8 md:grid-cols-[auto_1fr_auto] md:gap-8"
                >
                  <span className="label text-olive md:w-16">0{i + 1}</span>
                  <span className="flex flex-col">
                    <span className="font-heading text-(length:--text-title) leading-[0.95] text-paper transition-colors duration-200 group-hover:text-moss">
                      {game.title}
                    </span>
                    <span className="mt-2 text-sage italic">
                      “{game.tagline}”
                    </span>
                  </span>
                  <span className="flex flex-col items-start gap-1 md:items-end">
                    <span className={`label ${accentText[game.accent]}`}>
                      {game.status}
                    </span>
                    <span className="text-md text-sage/80">
                      {game.year} · {game.genre}
                    </span>
                    <span className="label mt-2 text-paper opacity-0 transition-opacity group-hover:opacity-100">
                      View →
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
          </ul>
        )}
      </section>
      <GrungeEdge color="var(--color-paper)" className="translate-y-10" />
    </main>
  );
}
