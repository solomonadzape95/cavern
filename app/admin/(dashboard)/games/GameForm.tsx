import Image from "next/image";
import { Field, TextInput, TextArea, Select, FileInput } from "@/components/admin/fields";
import { RepeatableTextList } from "@/components/admin/RepeatableTextList";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { gameStatus, gameAccent, type Game } from "@/db/schema";
import { coverArt } from "@/lib/art";

export function GameForm({
  game,
  action,
}: {
  game?: Game;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-11/12 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title">
          <TextInput name="title" defaultValue={game?.title} required />
        </Field>
        <Field
          label="Page URL"
          hint="The address for this game's page, e.g. /games/hollow-lantern. Leave blank to generate it from the title — spaces and capitals are tidied automatically."
        >
          <TextInput name="slug" defaultValue={game?.slug} />
        </Field>
        <Field label="Year">
          <TextInput name="year" defaultValue={game?.year} required />
        </Field>
        <Field label="Genre">
          <TextInput name="genre" defaultValue={game?.genre} required />
        </Field>
        <Field label="Status">
          <Select name="status" defaultValue={game?.status ?? gameStatus.enumValues[0]} required>
            {gameStatus.enumValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          label="Accent color"
          hint="The highlight color used on this game's card and page."
        >
          <Select name="accent" defaultValue={game?.accent ?? gameAccent.enumValues[0]} required>
            {gameAccent.enumValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        label="Cover image"
        hint="Optional — falls back to generated placeholder art when unset."
      >
        <div className="flex items-center gap-4">
          <Image
            src={game?.image || coverArt(game ?? { slug: "preview", accent: gameAccent.enumValues[0] })}
            alt=""
            width={64}
            height={64}
            className="size-16 shrink-0 border border-sage/30 object-cover"
            unoptimized
          />
          <FileInput name="imageFile" accept="image/*" className="flex-1" />
        </div>
      </Field>

      <Field
        label="Store link"
        hint="Optional — where the main button points: Play Store, itch.io, Steam, etc. Leave blank to hide the button."
      >
        <TextInput
          name="storeUrl"
          type="url"
          defaultValue={game?.storeUrl ?? ""}
          placeholder="https://store.steampowered.com/app/…"
        />
      </Field>

      <Field label="Tagline" hint="A short line shown under the title.">
        <TextInput name="tagline" defaultValue={game?.tagline} required />
      </Field>

      <Field label="Blurb" hint="A short paragraph describing the game, shown in previews.">
        <TextArea name="blurb" defaultValue={game?.blurb} required />
      </Field>

      <RepeatableTextList
        name="description"
        label="Description"
        initial={game?.description}
        multiline
      />
      <RepeatableTextList name="platforms" label="Platforms" initial={game?.platforms} />
      <RepeatableTextList name="features" label="Features" initial={game?.features} />

      <SubmitButton>{game ? "Save changes" : "Create game"}</SubmitButton>
    </form>
  );
}
