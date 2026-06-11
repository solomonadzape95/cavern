import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JOBS, getJob } from "@/content/jobs";
import { SITE } from "@/content/site";
import { PageHeader } from "@/components/chrome/PageHeader";
import { GrungeButton } from "@/components/ui/GrungeButton";
import { RaggedPanel } from "@/components/ui/RaggedPanel";
import { Reveal } from "@/components/anim/Reveal";
import { GrungeEdge } from "@/components/ui/GrungeEdge";

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "Role not found" };
  return { title: `${job.title} — Jobs`, description: job.blurb };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <main className="relative">
      <PageHeader
        eyebrow={`${job.discipline} · ${job.type} · ${job.location}`}
        title={job.title}
        lead={job.blurb}
      />

      <article className="mx-auto max-w-350 px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr] md:gap-20">
          <Reveal className="max-w-[66ch]">
            <h2 className="font-heading text-2xl text-paper">
              What you&apos;ll do
            </h2>
            <ul className="mt-4 space-y-3">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex items-baseline gap-3 text-paper/90">
                  <span className="text-moss">▸</span>
                  {r}
                </li>
              ))}
            </ul>

            <h2 className="font-heading mt-10 text-2xl text-paper">
              What we&apos;re after
            </h2>
            <ul className="mt-4 space-y-3">
              {job.requirements.map((r) => (
                <li key={r} className="flex items-baseline gap-3 text-paper/90">
                  <span className="text-moss">▸</span>
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <RaggedPanel surface="deep">
              <p className="font-heading text-2xl text-paper">Apply</p>
              <p className="mt-3 text-sage">
                Fill a form and show your work. No cover-letter theatrics, show
                us something you&apos;re proud of.
              </p>
              <div className="mt-6">
                <GrungeButton
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                    `Application — ${job.title}`,
                  )}`}
                  size="md"
                >
                  Continue
                </GrungeButton>
              </div>
              <div className="rule my-6" />
              <p className="text-sm text-sage/80">
                Cavern is remote-first and hires across time zones. We read
                every application ourselves.
              </p>
            </RaggedPanel>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-sage/20 pt-8">
          <Link
            href="/jobs"
            className="label text-sage transition-colors hover:text-moss"
          >
            ← All openings
          </Link>
        </div>
      </article>
      <GrungeEdge color="var(--color-paper)" className="translate-y-10" />
    </main>
  );
}
