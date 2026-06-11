import Link from "next/link";
import { SITE } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { MaskReveal, Reveal } from "@/components/anim/Reveal";
import { GrungeEdge } from "@/components/ui/GrungeEdge";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-20 overflow-hidden bg-canvas-deep px-5 pt-28 pb-24 md:px-10 md:pt-36 md:pb-32"
    >
      <GrungeEdge color="var(--color-paper)" className="-translate-y-10" top/>
      <div className="mx-auto grid max-w-350 gap-14 md:grid-cols-[1.1fr_1fr] md:gap-20">
        <div>
          <Reveal className="label text-olive">04 — Say hello</Reveal>
          <h2 className="font-display mt-3 text-(length:--text-display) leading-[0.95] text-paper">
            <MaskReveal lines={["Got a project", "worth", "building?"]} />
          </h2>
          <Reveal delay={0.15} className="mt-6 max-w-[42ch] text-lg text-sage">
            Pitches, partnerships, sponsorships, or just a hello — the
            door&apos;s open. For anything bigger, head to the{" "}
            <Link
              href="/contact"
              className="text-paper underline decoration-moss decoration-2 underline-offset-4"
            >
              full contact page
            </Link>
            .
          </Reveal>
          <Reveal delay={0.25} className="mt-8 flex flex-col gap-1">
            <a
              href={`mailto:${SITE.email}`}
              className="font-heading text-2xl text-paper transition-colors hover:text-moss"
            >
              {SITE.email}
            </a>
            <span className="text-sage">{SITE.location}</span>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm variant="compact" />
        </Reveal>
      </div>
      <GrungeEdge color="var(--color-paper)" className="translate-y-10" />
    </section>
  );
}
