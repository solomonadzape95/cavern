"use client";

import { useEffect, useMemo, type ReactNode } from "react";
import { GrungeButton } from "@/components/ui/GrungeButton";
import { RaggedPanel } from "@/components/ui/RaggedPanel";
import { gameAccent, gameStatus, type GameAccent } from "@/db/schema";
import { coverArt } from "@/lib/art";
import { LivePreview, PreviewChrome } from "./LivePreview";
import { PreviewBackdrop } from "./PreviewBackdrop";

/** Live object URL for a freshly-picked file; revoked when it changes. */
function useObjectUrl(file: File | null) {
  const url = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  // Revoke the previous URL when it changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);
  return url;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * A contained facsimile of the public game page (`/games/[slug]`) — banner
 * header plus the article + ragged side panel — wired to the Game form's
 * current values so editors see their changes in context.
 */
function GamePreview({
  title,
  slug,
  year,
  genre,
  status,
  accent,
  tagline,
  description,
  platforms,
  features,
  storeUrl,
  imageFile,
  existingImage,
}: {
  title: string;
  slug: string;
  year: string;
  genre: string;
  status: string;
  accent: string;
  tagline: string;
  description: string[];
  platforms: string[];
  features: string[];
  storeUrl: string;
  imageFile: File | null;
  existingImage: string | null;
}) {
  const uploaded = useObjectUrl(imageFile);
  const safeAccent: GameAccent = (
    gameAccent.enumValues as readonly string[]
  ).includes(accent)
    ? (accent as GameAccent)
    : gameAccent.enumValues[0];
  const safeStatus = status || gameStatus.enumValues[0];
  const pageSlug = slug || slugify(title) || "your-game";

  const imageSrc =
    uploaded ??
    existingImage ??
    coverArt({ slug: pageSlug, accent: safeAccent });

  return (
    <div>
      <PreviewChrome url={`/games/${pageSlug}`} />

      {/* banner — mirrors <PageHeader> */}
      <div className="relative flex aspect-16/10 flex-col items-center justify-center overflow-hidden px-6 text-center">
        <PreviewBackdrop variant="header" imageSrc={imageSrc} />
        <div className="relative z-10 mx-auto flex w-full flex-col items-center">
          <p className="label mb-3 text-sage">
            {year || "Year"} · {genre || "Genre"}
          </p>
          <h2 className="font-display text-4xl leading-[0.95] text-paper sm:text-5xl">
            {title || "Untitled game"}
          </h2>
          {tagline && (
            <p className="mt-4 max-w-[40ch] text-base text-sage">
              “{tagline}”
            </p>
          )}
        </div>
      </div>

      {/* body — mirrors the article + RaggedPanel sidebar */}
      <div className="space-y-6 px-5 py-8">
        <div>
          <span className="label text-olive">{safeStatus}</span>
          {description.length > 0 ? (
            description.map((p, i) => (
              <p
                key={i}
                className="mt-4 text-sm leading-relaxed text-paper/90 first:mt-4"
              >
                {p}
              </p>
            ))
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-paper/40">
              Your description paragraphs appear here.
            </p>
          )}
          <div className="pointer-events-none mt-6 flex flex-wrap gap-3">
            {storeUrl && (
              <GrungeButton size="sm">
                {safeStatus === "Released" ? "Get it" : "View on store"}
              </GrungeButton>
            )}
            <GrungeButton tone="sage" size="sm">
              All games
            </GrungeButton>
          </div>
        </div>

        <RaggedPanel surface="deep" bodyClassName="p-5">
          <p className="label text-sage">Platforms</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {platforms.length > 0 ? (
              platforms.map((p) => (
                <li
                  key={p}
                  className="border border-sage/30 px-3 py-1 text-xs text-paper/90"
                >
                  {p}
                </li>
              ))
            ) : (
              <li className="text-xs text-paper/40">No platforms yet</li>
            )}
          </ul>
          <div className="rule my-5" />
          <p className="label text-sage">Highlights</p>
          <ul className="mt-3 space-y-2">
            {features.length > 0 ? (
              features.map((f) => (
                <li
                  key={f}
                  className="flex items-baseline gap-2 text-sm text-paper/90"
                >
                  <span className="text-moss">▸</span>
                  {f}
                </li>
              ))
            ) : (
              <li className="text-sm text-paper/40">No highlights yet</li>
            )}
          </ul>
        </RaggedPanel>
      </div>
    </div>
  );
}

/** Drops the Game form into a two-column layout with a live game-page preview. */
export function GamePreviewPane({
  existingImage = null,
  children,
}: {
  existingImage?: string | null;
  children: ReactNode;
}) {
  return (
    <LivePreview
      title="Game page preview"
      note="updates as you type"
      render={(read) => (
        <GamePreview
          title={read.text("title")}
          slug={read.text("slug")}
          year={read.text("year")}
          genre={read.text("genre")}
          status={read.text("status")}
          accent={read.text("accent")}
          tagline={read.text("tagline")}
          description={read.list("description")}
          platforms={read.list("platforms")}
          features={read.list("features")}
          storeUrl={read.text("storeUrl")}
          imageFile={read.file("imageFile")}
          existingImage={existingImage}
        />
      )}
    >
      {children}
    </LivePreview>
  );
}
