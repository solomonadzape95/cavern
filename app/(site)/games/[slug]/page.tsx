import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGames, getGame } from "@/lib/data/games";
import { coverArt } from "@/lib/art";
import { PageHeader } from "@/components/chrome/PageHeader";
import { GrungeButton } from "@/components/ui/GrungeButton";
import { RaggedPanel } from "@/components/ui/RaggedPanel";
import { Reveal } from "@/components/anim/Reveal";
import { GrungeEdge } from "@/components/ui/GrungeEdge";

export async function generateStaticParams() {
  const games = await getGames();
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGame(slug);
  if (!game) return { title: "Game not found" };
  return { title: game.title, description: game.blurb };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = await getGame(slug);
  if (!game) notFound();

  return (
    <main className="relative">
      <PageHeader
        eyebrow={`${game.year} · ${game.genre}`}
        title={game.title}
        lead={`“${game.tagline}”`}
        imageSrc={game.image || coverArt(game)}
        backHref="/games"
        backLabel="All games"
      />

      <article className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr] md:gap-20">
          <Reveal className="max-w-[68ch]">
            <span className="label text-olive">{game.status}</span>
            {game.description.map((p, i) => (
              <p
                key={i}
                className="mt-5 text-lg leading-relaxed text-paper/90 first:mt-6"
              >
                {p}
              </p>
            ))}
            <div className="mt-10 flex flex-wrap gap-4">
              <GrungeButton href="#" size="md">
                {game.status === "Released" ? "Buy now" : "Wishlist"}
              </GrungeButton>
              <GrungeButton href="/games" tone="sage" size="md">
                All games
              </GrungeButton>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <RaggedPanel surface="deep">
              <p className="label text-sage">Platforms</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {game.platforms.map((p) => (
                  <li
                    key={p}
                    className="border border-sage/30 px-3 py-1 text-sm text-paper/90"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <div className="rule my-6" />
              <p className="label text-sage">Highlights</p>
              <ul className="mt-3 space-y-2">
                {game.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-baseline gap-2 text-paper/90"
                  >
                    <span className="text-moss">▸</span>
                    {f}
                  </li>
                ))}
              </ul>
            </RaggedPanel>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-sage/20 pt-8">
          <Link
            href="/games"
            className="label text-sage transition-colors hover:text-moss"
          >
            ← Back to the shelf
          </Link>
        </div>
      </article>
      <GrungeEdge color="var(--color-paper)" className="translate-y-10" />
    </main>
  );
}
