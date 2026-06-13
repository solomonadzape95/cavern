import type { Metadata } from "next";
import Link from "next/link";
import { unsubscribeByToken } from "@/lib/data/newsletter";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const success = token ? await unsubscribeByToken(token) : false;

  return (
    <main className="bg-canvas-deep flex min-h-screen items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <p className="label text-olive">Newsletter</p>
        <h1 className="font-heading mt-2 text-3xl text-paper md:text-4xl">
          {success ? "You're unsubscribed." : "We couldn't find that subscription."}
        </h1>
        <p className="mt-4 text-sage">
          {success
            ? "You won't receive any more emails from the Cavern newsletter. You can resubscribe any time from the news or press pages."
            : "This link may have expired or already been used."}
        </p>
        <Link href="/" className="label mt-8 inline-block text-moss transition-colors hover:text-paper">
          ← Back to Cavern
        </Link>
      </div>
    </main>
  );
}
