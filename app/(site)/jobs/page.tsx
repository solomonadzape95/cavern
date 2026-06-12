import type { Metadata } from "next";
import Link from "next/link";
import { getJobs } from "@/lib/data/jobs";
import { getSiteSettings } from "@/lib/data/site";
import { PageHeader } from "@/components/chrome/PageHeader";
import { Reveal } from "@/components/anim/Reveal";
import { GrungeEdge } from "@/components/ui/GrungeEdge";

export const metadata: Metadata = {
  title: "Jobs",
  description: "Open roles at Cavern Studios.",
};

export default async function JobsPage() {
  const [jobs, settings] = await Promise.all([getJobs(), getSiteSettings()]);

  return (
    <main className="relative">
      <PageHeader
        eyebrow="Join Us"
        title={"We're\nhiring"}
        lead={`${jobs.length} open roles across engineering, art, audio, and marketing. Remote-first, ${settings.location.split(" · ")[0]}-rooted.`}
      />

      <section className="mx-auto max-w-350 px-5 py-20 md:px-10 md:py-28">
        <ul className="border-t border-sage/20">
          {jobs.map((job, i) => (
            <li key={job.slug} className="border-b border-sage/20">
              <Reveal delay={(i % 3) * 0.05}>
                <Link
                  href={`/jobs/${job.slug}`}
                  className="group grid grid-cols-1 items-baseline gap-3 py-7 md:grid-cols-[1fr_auto_auto] md:gap-8"
                >
                  <span className="font-heading text-(length:--text-heading) leading-tight text-paper transition-colors group-hover:text-moss">
                    {job.title}
                  </span>
                  <span className="label text-olive">{job.discipline}</span>
                  <span className="flex items-center gap-4 text-sm text-sage">
                    {job.type} · {job.location}
                    <span className="label text-paper opacity-0 transition-opacity group-hover:opacity-100">
                      Apply →
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-16 max-w-[55ch] text-sage">
          Don&apos;t see your role but think you&apos;d be a good fit? Send
          your work to{" "}
          <a
            href={`mailto:${settings.email}`}
            className="text-paper underline decoration-moss decoration-2 underline-offset-4"
          >
            {settings.email}
          </a>
          .
        </Reveal>
      </section>
      <GrungeEdge color="var(--color-paper)" className="translate-y-10" />
    </main>
  );
}
