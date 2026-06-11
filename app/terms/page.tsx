import type { Metadata } from "next";
import { SITE } from "@/content/site";
import { PageHeader } from "@/components/chrome/PageHeader";
import { Reveal } from "@/components/anim/Reveal";
import { GrungeEdge } from "@/components/ui/GrungeEdge";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that cover using the ${SITE.name} website.`,
};

const LAST_UPDATED = "11 June 2026";

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. Acceptance of these terms",
    body: (
      <p>
        By visiting or using this website (the &ldquo;Site&rdquo;), you agree
        to these Terms of Service. If you don&apos;t agree, please don&apos;t
        use the Site. We may update these terms from time to time — see
        &ldquo;Changes to these terms&rdquo; below.
      </p>
    ),
  },
  {
    title: "2. Using the site",
    body: (
      <p>
        You&apos;re welcome to browse, read, and share what&apos;s here. You
        agree not to misuse the Site — for example, by attempting to disrupt
        it, scraping it at scale, or using it for anything unlawful or
        intended to harm {SITE.name} or other visitors.
      </p>
    ),
  },
  {
    title: "3. Intellectual property",
    body: (
      <>
        <p>
          Unless otherwise noted, everything on this Site — text, art,
          logos, game titles, trailers, and code — is owned by {SITE.name}{" "}
          or used with permission, and is protected by copyright and other
          intellectual property laws.
        </p>
        <p>
          You may view and share pages of the Site for personal,
          non-commercial purposes. Any other use — including reproducing,
          modifying, or distributing our art, branding, or game content —
          requires our prior written permission. Press and content creators
          can find usage guidance on the{" "}
          <a
            href="/press"
            className="text-paper underline decoration-moss decoration-2 underline-offset-4"
          >
            press kit
          </a>{" "}
          page.
        </p>
      </>
    ),
  },
  {
    title: "4. Job applications & submissions",
    body: (
      <p>
        If you apply for a role or send us a message through the Site, you
        confirm that the information you provide is accurate and that
        you&apos;re authorised to share it with us. We&apos;ll use it to
        evaluate your application or respond to your message — see our{" "}
        <a
          href="/privacy"
          className="text-paper underline decoration-moss decoration-2 underline-offset-4"
        >
          Privacy Policy
        </a>{" "}
        for details.
      </p>
    ),
  },
  {
    title: "5. Third-party links",
    body: (
      <p>
        The Site links to third-party platforms — storefronts, social
        networks, and similar — that we don&apos;t control. We&apos;re not
        responsible for their content, policies, or practices, and linking to
        them isn&apos;t an endorsement.
      </p>
    ),
  },
  {
    title: "6. Disclaimers & limitation of liability",
    body: (
      <p>
        The Site and its content are provided &ldquo;as is&rdquo;, without
        warranties of any kind. To the fullest extent permitted by law,{" "}
        {SITE.name} won&apos;t be liable for any indirect, incidental, or
        consequential damages arising from your use of the Site.
      </p>
    ),
  },
  {
    title: "7. Changes to these terms",
    body: (
      <p>
        We may revise these terms occasionally to reflect changes to the Site
        or our practices. The &ldquo;Last updated&rdquo; date below shows
        when these terms last changed. Continuing to use the Site after an
        update means you accept the revised terms.
      </p>
    ),
  },
  {
    title: "8. Contact",
    body: (
      <p>
        Questions about these terms? Reach us at{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="text-paper underline decoration-moss decoration-2 underline-offset-4"
        >
          {SITE.email}
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="relative bg-canvas-deep">
      <PageHeader
        eyebrow="Legal"
        title={`Terms`}
        lead="The fine print covering this website. Plain language, kept short on purpose."
      />

      <section className="mx-auto max-w-350 px-5 py-20 md:px-10 md:py-28 bg-canvas-deep">
        <div className="mx-auto max-w-[68ch]">
          <Reveal>
            <p className="label text-olive">Last updated — {LAST_UPDATED}</p>
          </Reveal>
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <h2 className="font-heading mt-12 text-2xl text-paper md:text-3xl">
                {s.title}
              </h2>
              <div className="mt-3 space-y-4 text-lg leading-relaxed text-sage md:text-xl">
                {s.body}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <GrungeEdge color="var(--color-paper)" className="translate-y-10" />
    </main>
  );
}
