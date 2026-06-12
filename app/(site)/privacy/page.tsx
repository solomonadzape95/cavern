import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data/site";
import { PageHeader } from "@/components/chrome/PageHeader";
import { Reveal } from "@/components/anim/Reveal";
import { GrungeEdge } from "@/components/ui/GrungeEdge";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Privacy Policy",
    description: `How ${settings.name} collects and uses information from this website.`,
  };
}

const LAST_UPDATED = "11 June 2026";

function buildSections(email: string): { title: string; body: React.ReactNode }[] {
  return [
  {
    title: "1. What we collect",
    body: (
      <>
        <p>
          We collect information you choose to give us — for example your
          name, email address, and message when you use a contact or job
          application form.
        </p>
        <p>
          We don&apos;t run ad trackers or analytics cookies on this Site.
          The Site uses your browser&apos;s local session storage purely to
          remember things like whether you&apos;ve already seen the loading
          intro on this visit — nothing is sent anywhere, and it&apos;s
          cleared when you close the tab.
        </p>
      </>
    ),
  },
  {
    title: "2. How we use it",
    body: (
      <p>
        We use the information you send us to reply to your message,
        evaluate a job application, or follow up about a partnership or
        press request — and for nothing else. We don&apos;t sell or rent your
        information to anyone.
      </p>
    ),
  },
  {
    title: "3. Job applicants",
    body: (
      <p>
        If you apply for a role, we use your application materials (CV,
        portfolio, cover letter, and anything else you send) to assess your
        candidacy and to contact you about the process. We keep applications
        only as long as needed to fill the role and for a reasonable period
        afterwards in case the role reopens, then delete them.
      </p>
    ),
  },
  {
    title: "4. Third-party services",
    body: (
      <p>
        Some images on the Site (such as placeholder team avatars) are loaded
        from third-party services. Visiting a page that includes them may
        share standard request information (like your IP address) with that
        service, the same as loading an image from any external site. We link
        out to storefronts and social platforms — once you leave our Site,
        their own privacy policies apply.
      </p>
    ),
  },
  {
    title: "5. Data retention",
    body: (
      <p>
        We keep messages and applications only as long as we need them for
        the purpose you sent them for, then delete or anonymise them.
      </p>
    ),
  },
  {
    title: "6. Your rights",
    body: (
      <p>
        You can ask us what information we hold about you, ask us to correct
        it, or ask us to delete it, at any time — just email us at the
        address below and we&apos;ll sort it out.
      </p>
    ),
  },
  {
    title: "7. Children's privacy",
    body: (
      <p>
        This Site isn&apos;t directed at children, and we don&apos;t
        knowingly collect information from anyone under 13.
      </p>
    ),
  },
  {
    title: "8. Changes to this policy",
    body: (
      <p>
        If this policy changes, we&apos;ll update the &ldquo;Last
        updated&rdquo; date below. Significant changes will be noted
        prominently on this page.
      </p>
    ),
  },
  {
    title: "9. Contact",
    body: (
      <p>
        Questions about this policy, or about your information? Reach us at{" "}
        <a
          href={`mailto:${email}`}
          className="text-paper underline decoration-moss decoration-2 underline-offset-4"
        >
          {email}
        </a>
        .
      </p>
    ),
  },
  ];
}

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  const SECTIONS = buildSections(settings.email);

  return (
    <main className="relative bg-canvas-deep">
      <PageHeader
        eyebrow="Legal"
        title={"Privacy\npolicy"}
        lead="What we collect when you visit, why, and how to ask us about it."
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
