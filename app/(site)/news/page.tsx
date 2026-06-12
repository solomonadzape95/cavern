import type { Metadata } from "next";
import { getNews } from "@/lib/data/news";
import { PageHeader } from "@/components/chrome/PageHeader";
import { RaggedPanel } from "@/components/ui/RaggedPanel";
import { Reveal } from "@/components/anim/Reveal";
import { GrungeEdge } from "@/components/ui/GrungeEdge";

export const metadata: Metadata = {
  title: "News",
  description: "Devlogs, releases, and studio notes.",
};

function fmt(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsPage() {
  const [lead, ...rest] = await getNews();
  return (
    <main className="relative">
      <PageHeader
        eyebrow="Latest updates"
        title={"Latest\nnews"}
        lead="Devlogs, releases, and the occasional studio confession."
      />

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        {/* featured */}
        <Reveal>
          <RaggedPanel
            surface="deep"
            filter="torn-banner"
            bodyClassName="p-8 md:p-12"
          >
            <div className="flex items-center gap-4">
              <span className="label text-moss">{lead.kind}</span>
              <span className="text-sm text-sage/70">{fmt(lead.date)}</span>
            </div>
            <h2 className="font-display mt-4 max-w-[18ch] text-[length:var(--text-title)] leading-[0.95] text-paper">
              {lead.title}
            </h2>
            <p className="mt-4 max-w-[60ch] text-lg text-sage">
              {lead.excerpt}
            </p>
          </RaggedPanel>
        </Reveal>

        {/* the rest */}
        <ul className="mt-12 grid gap-px border border-sage/20 md:grid-cols-3">
          {rest.map((post, i) => (
            <li key={post.slug} className="bg-canvas-deep/40">
              <Reveal delay={i * 0.06} className="block h-full p-7">
                <div className="flex items-center gap-3">
                  <span className="label text-olive">{post.kind}</span>
                  <span className="text-xs text-sage/60">{fmt(post.date)}</span>
                </div>
                <h3 className="font-heading mt-3 text-2xl leading-tight text-paper">
                  {post.title}
                </h3>
                <p className="mt-2 text-sage">{post.excerpt}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <GrungeEdge color="var(--color-paper)" className="translate-y-10" />
    </main>
  );
}
