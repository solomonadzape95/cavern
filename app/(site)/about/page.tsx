import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data/site";
import { getTeam } from "@/lib/data/team";
import { getGames } from "@/lib/data/games";
import { PageHeader } from "@/components/chrome/PageHeader";
import { GrungeButton } from "@/components/ui/GrungeButton";
import { Reveal } from "@/components/anim/Reveal";
import { GrungeEdge } from "@/components/ui/GrungeEdge";
import { AboutTeamSection } from "@/components/sections/AboutTeamSection";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Studio",
    description: `${settings.name} — who we are and what we're building.`,
  };
}

const VALUES = [
  {
    no: "01",
    title: "Mood over mass",
    body: "We'd rather make one world you can't shake than ten you forget. Atmosphere is the product.",
  },
  {
    no: "02",
    title: "Made by hand",
    body: "Inked frames, recorded foley, hand-built levels. The roughness is the fingerprint.",
  },
  {
    no: "03",
    title: "Small on purpose",
    body: "A tight crew that ships. No committees, no telephone game between idea and screen.",
  },
];

export default async function AboutPage() {
  const [settings, team, games] = await Promise.all([
    getSiteSettings(),
    getTeam(),
    getGames(),
  ]);

  const STATS = [
    { n: String(games.length), l: "Games shipped & building" },
    { n: `${new Date().getFullYear() - settings.founded}`, l: "Years running" },
    { n: String(team.length), l: "People on the team" },
    { n: "1", l: "Cavern" },
  ];

  return (
    <main className="relative bg-canvas-deep">
      <PageHeader
        eyebrow="About us"
        title={"The\nstudio"}
        lead={settings.blurb}
      />

      <section className="mx-auto max-w-350 px-5 py-20 md:px-10 md:py-28">
        <div className="gap-14 md:gap-20">
          <Reveal className="max-w-[92vw] mx-auto">
            <p className="font-heading text-(length:--text-title) leading-normal text-paper text-center">
              We started Cavern in {settings.founded}{" "} with one rule: make the kind
              of games we&apos;d stay up too late playing.
            </p>
            <div className="grid grid-cols-2 gap-px self-start border border-sage/25 bg-sage/25 mt-10">
              {STATS.map((s, i) => {
                const tone = [
                  "bg-olive text-paper",
                  "bg-moss text-paper",
                  "bg-sage text-canvas-deep",
                  "bg-canvas-deep text-paper",
                ][i % 4];
                return (
                  <Reveal
                    key={s.l}
                    delay={i * 0.06}
                    className={`flex flex-col justify-between p-7 md:p-8 ${tone}`}
                  >
                    <p className="font-display text-6xl leading-none md:text-7xl">
                      {s.n}
                    </p>
                    <p className="uppercase text-lg md:text-xl mt-6 opacity-80">{s.l}</p>
                  </Reveal>
                );
              })}
            </div>
            <p className="mt-6 text-lg md:text-2xl leading-relaxed text-sage">
              We&apos;re a small, remote-first studio rooted in{" "}
              {settings.location.split(" · ")[0]}. We build atmospheric worlds —
              moody, hand-made, a little strange — and we sweat the details of
              every frame and every sound until it feels handmade, not
              generated.
            </p>
            <p className="mt-4 text-lg md:text-2xl leading-relaxed text-sage">
              Between our own titles we co-develop with teams who want that same
              hand-made weight in their projects.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <GrungeButton href="/games" size="md">
                See the games
              </GrungeButton>
              <GrungeButton href="/jobs" tone="sage" size="md">
                Join us
              </GrungeButton>
            </div>
          </Reveal>
        </div>

        <div className="mt-24">
          <p className="label text-olive">What we believe</p>
          <div className="mt-8 grid gap-px border border-sage/20 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.no} className="bg-canvas-deep/40 p-8">
                <span className="font-body text-4xl text-moss">{v.no}</span>
                <h3 className="font-heading mt-3 text-2xl text-paper">
                  {v.title}
                </h3>
                <p className="mt-3 text-sage">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        <AboutTeamSection team={team} />
      </section>
      <GrungeEdge color="var(--color-paper)" className="translate-y-10" />
    </main>
  );
}
