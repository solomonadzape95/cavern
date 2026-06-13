import type { Metadata } from "next";
import { getGames } from "@/lib/data/games";
import { getSiteSettings } from "@/lib/data/site";
import { PageHeader } from "@/components/chrome/PageHeader";
import { GrungeButton } from "@/components/ui/GrungeButton";
import { RaggedPanel } from "@/components/ui/RaggedPanel";
import { Reveal } from "@/components/anim/Reveal";
import { GrungeEdge } from "@/components/ui/GrungeEdge";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Press Kit",
    description: `Facts, assets, and contacts for press covering ${settings.name}.`,
  };
}

const ASSETS = [
  { label: "Logo pack (SVG + PNG)", note: "Light & dark" },
  { label: "Key art & screenshots", note: "Per title, hi-res" },
  { label: "Game fact sheets", note: "PDF" },
  { label: "Team headshots & bios", note: "ZIP" },
];

export default async function PressPage() {
  const [games, settings] = await Promise.all([getGames(), getSiteSettings()]);

  const FACTS: { k: string; v: string }[] = [
    { k: "Founded", v: String(settings.founded) },
    { k: "Based", v: settings.location },
    { k: "Team size", v: "6" },
    { k: "Titles", v: String(games.length) },
    { k: "Press contact", v: settings.pressEmail },
  ];

  return (
    <main className="relative bg-canvas-deep">
      <PageHeader
        eyebrow="Kit & assets"
        title={"Press\nkit"}
        lead="Everything you need to write about Cavern. Grab assets, lift the boilerplate, or reach a human."
      />

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:gap-20">
          {/* fact sheet */}
          <Reveal>
            <h2 className="label text-olive">Fact sheet</h2>
            <dl className="mt-5 divide-y divide-sage/15 border-y border-sage/15">
              {FACTS.map((f) => (
                <div
                  key={f.k}
                  className="flex items-baseline justify-between gap-4 py-4"
                >
                  <dt className="label text-sage">{f.k}</dt>
                  <dd className="text-right text-paper">{f.v}</dd>
                </div>
              ))}
            </dl>

            <h2 className="label mt-12 text-olive">Boilerplate</h2>
            <p className="mt-4 max-w-[60ch] leading-relaxed text-paper/90">
              {settings.name} is a small, remote-first game studio founded in{" "}
              {settings.founded}, making atmospheric, hand-made games with rough
              edges and a lot of heart. From the light-starved descent of Hollow
              Lantern to the growing ruins of Moss Cathedral, Cavern builds
              worlds you feel as much as play.
            </p>
          </Reveal>

          {/* assets */}
          <Reveal delay={0.12}>
            <RaggedPanel surface="deep">
              <h2 className="font-heading text-2xl text-paper">
                Download assets
              </h2>
              <ul className="mt-5 divide-y divide-sage/15">
                {ASSETS.map((a) => (
                  <li
                    key={a.label}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <span className="text-paper/90">
                      {a.label}
                      <span className="ml-2 text-sm text-sage/60">
                        {a.note}
                      </span>
                    </span>
                    <a
                      href="#"
                      className="label text-moss transition-colors hover:text-paper"
                    >
                      Get →
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-4">
                <GrungeButton href="#" size="md">
                  Download full kit
                </GrungeButton>
                <GrungeButton
                  href={`mailto:${settings.pressEmail}`}
                  tone="sage"
                  size="md"
                >
                  {settings.pressEmail}
                </GrungeButton>
              </div>
            </RaggedPanel>
          </Reveal>
        </div>

        {/* newsletter */}
        <Reveal className="mt-14 md:mt-20">
          <RaggedPanel surface="olive" bodyClassName="p-8 md:p-12">
            <div className="md:flex md:items-end md:justify-between md:gap-12">
              <div>
                <p className="label text-canvas-deep/70">Press &amp; studio updates</p>
                <h2 className="font-heading mt-2 max-w-[24ch] text-3xl text-paper md:text-4xl">
                  Get the newsletter for announcements before anyone else.
                </h2>
              </div>
              <NewsletterForm tone="sage" className="mt-6 md:mt-0 md:w-1/2" />
            </div>
          </RaggedPanel>
        </Reveal>
      </section>
      <GrungeEdge color="var(--color-paper)" className="translate-y-10" />
    </main>
  );
}
