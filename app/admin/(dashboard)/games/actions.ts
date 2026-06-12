"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { games, gameStatus, gameAccent } from "@/db/schema";
import { requirePermission } from "@/lib/auth/dal";
import { getStringList } from "@/lib/forms";

const gameSchema = z.object({
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only"),
  title: z.string().trim().min(1, "Title is required"),
  year: z.string().trim().min(1, "Year is required"),
  status: z.enum(gameStatus.enumValues),
  genre: z.string().trim().min(1, "Genre is required"),
  accent: z.enum(gameAccent.enumValues),
  tagline: z.string().trim().min(1, "Tagline is required"),
  blurb: z.string().trim().min(1, "Blurb is required"),
});

function parseGame(formData: FormData) {
  const fields = gameSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    year: formData.get("year"),
    status: formData.get("status"),
    genre: formData.get("genre"),
    accent: formData.get("accent"),
    tagline: formData.get("tagline"),
    blurb: formData.get("blurb"),
  });

  return {
    ...fields,
    description: getStringList(formData, "description"),
    platforms: getStringList(formData, "platforms"),
    features: getStringList(formData, "features"),
  };
}

function revalidateGames(slug?: string) {
  revalidatePath("/games");
  revalidatePath("/");
  if (slug) revalidatePath(`/games/${slug}`);
}

export async function createGame(formData: FormData) {
  await requirePermission("games");
  const data = parseGame(formData);

  await db.insert(games).values(data);

  revalidateGames(data.slug);
  redirect("/admin/games");
}

export async function updateGame(id: string, formData: FormData) {
  await requirePermission("games");
  const data = parseGame(formData);

  await db.update(games).set(data).where(eq(games.id, id));

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
