"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { games, gameStatus, gameAccent } from "@/db/schema";
import { requirePermission } from "@/lib/auth/dal";
import { getStringList, getSlug } from "@/lib/forms";
import { uploadImage } from "@/lib/storage";

const gameSchema = z.object({
  slug: z
    .string()
    .min(1, "Add a title or page URL so we can build a link"),
  title: z.string().trim().min(1, "Title is required"),
  year: z.string().trim().min(1, "Year is required"),
  status: z.enum(gameStatus.enumValues),
  genre: z.string().trim().min(1, "Genre is required"),
  accent: z.enum(gameAccent.enumValues),
  tagline: z.string().trim().min(1, "Tagline is required"),
  blurb: z.string().trim().min(1, "Blurb is required"),
  storeUrl: z
    .string()
    .trim()
    .url("Enter a full link, e.g. https://…")
    .optional()
    .or(z.literal("")),
});

function parseGame(formData: FormData) {
  const fields = gameSchema.parse({
    slug: getSlug(formData),
    title: formData.get("title"),
    year: formData.get("year"),
    status: formData.get("status"),
    genre: formData.get("genre"),
    accent: formData.get("accent"),
    tagline: formData.get("tagline"),
    blurb: formData.get("blurb"),
    storeUrl: formData.get("storeUrl") ?? "",
  });

  return {
    ...fields,
    // Normalize empty input to null so the column stays clean.
    storeUrl: fields.storeUrl ? fields.storeUrl : null,
    description: getStringList(formData, "description"),
    platforms: getStringList(formData, "platforms"),
    features: getStringList(formData, "features"),
  };
}

async function uploadGameImage(formData: FormData): Promise<string | undefined> {
  const file = formData.get("imageFile");
  if (!(file instanceof File) || file.size === 0) return undefined;
  return uploadImage(file, "games");
}

function revalidateGames(slug?: string) {
  revalidatePath("/games");
  revalidatePath("/");
  if (slug) revalidatePath(`/games/${slug}`);
  updateTag("games");
}

export async function createGame(formData: FormData) {
  await requirePermission("games");
  const data = parseGame(formData);
  const image = await uploadGameImage(formData);

  await db.insert(games).values({ ...data, image });

  revalidateGames(data.slug);
  redirect("/admin/games");
}

export async function updateGame(id: string, formData: FormData) {
  await requirePermission("games");
  const data = parseGame(formData);
  const image = await uploadGameImage(formData);

  await db
    .update(games)
    .set({ ...data, ...(image && { image }) })
    .where(eq(games.id, id));

  revalidateGames(data.slug);
  redirect("/admin/games");
}

export async function deleteGame(id: string) {
  await requirePermission("games");

  const [existing] = await db.select().from(games).where(eq(games.id, id)).limit(1);
  await db.delete(games).where(eq(games.id, id));

  revalidateGames(existing?.slug);
  redirect("/admin/games");
}
