import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data/site";
import { PageHeader } from "@/components/chrome/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/anim/Reveal";
import { GrungeEdge } from "@/components/ui/GrungeEdge";

export const metadata: Metadata = {
  title: "Contact & Sponsorships",
  description:
    "Reach Cavern Studios — pitches, partnerships, sponsorships, and press.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const REASONS = [
    {
      title: "Sponsorships & partnerships",
      body: "Brands and platforms who want to back hand-made games. Tell us what you have in mind.",
    },
    {
      title: "Co-development",
      body: "Studios who need our hands on gameplay, art, or audio for a stretch.",
    },
    {
      title: "Press",
      body: (
        <>
          Journalists and creators — the{" "}
          <a
            href="/press"
            className="text-paper underline decoration-moss decoration-2 underline-offset-4"
          >
            press kit
          </a>{" "}
          has assets, or write to {settings.pressEmail}.
        </>
      ),
    },
  ];

  return (
    <main className="relative">
      <PageHeader
        eyebrow="Say hello"
        title={"Get in\ntouch"}
        lead="Pitches, partnerships, sponsorships, or a plain hello — it all lands in the same inbox, and we read it."
      />

      <section className="mx-auto max-w-350 px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div>
            <Reveal className="flex flex-col gap-1">
              <a
                href={`mailto:${settings.email}`}
                className="font-heading text-3xl text-paper transition-colors hover:text-moss"
              >
                {settings.email}
              </a>
              <span className="text-sage">{settings.location}</span>
            </Reveal>

            <div className="mt-10 flex flex-col divide-y divide-sage/15 border-y border-sage/15">
              {REASONS.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.06} className="py-5">
                  <h3 className="font-heading text-2xl text-paper">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-sage">{r.body}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {settings.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="label text-sage transition-colors hover:text-moss"
                >
                  {s.label}
                </a>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm variant="full" />
          </Reveal>
        </div>
      </section>
      <GrungeEdge color="var(--color-paper)" className="translate-y-10" />
    </main>
  );
}
