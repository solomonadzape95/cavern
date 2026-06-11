import Link from "next/link";
import { CavernTexture } from "@/components/ui/CavernTexture";
import { GrungeButton } from "@/components/ui/GrungeButton";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] items-center overflow-hidden px-5 md:px-10">
      <CavernTexture variant="muted" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <p className="label text-olive">404 — Page not found</p>
        <h1 className="font-display mt-4 text-paper text-[length:var(--text-mega)] leading-[0.85]">
          This page
          <br />
          doesn&apos;t exist.
        </h1>
        <p className="mt-6 max-w-[48ch] text-lg text-sage">
          The page you&apos;re looking for isn&apos;t here — it may have
          moved, been renamed, or never existed.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <GrungeButton href="/" size="lg">
            Back to home
          </GrungeButton>
          <Link
            href="/games"
            className="label self-center text-sage transition-colors hover:text-moss"
          >
            Or see the games →
          </Link>
        </div>
      </div>
    </main>
  );
}
