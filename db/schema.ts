import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Enums — mirror the literal unions from the old content/*.ts types so the
// admin forms can render fixed dropdowns.
// ---------------------------------------------------------------------------
export const gameStatus = pgEnum("game_status", [
  "Released",
  "In development",
  "Announced",
]);
export const gameAccent = pgEnum("game_accent", ["moss", "olive", "sage", "deep"]);
export const newsKind = pgEnum("news_kind", ["Devlog", "Release", "Studio"]);

export const adminRole = pgEnum("admin_role", ["superadmin", "admin"]);
export const adminResource = pgEnum("admin_resource", [
  "games",
  "news",
  "jobs",
  "team",
  "site",
]);

// Shared shapes for jsonb columns.
type Link = { label: string; href: string };
type NavLink = { label: string; href: string; note?: string };
type Social = { label: string; href: string; handle: string };

const timestamps = {
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

// ---------------------------------------------------------------------------
// Content tables
// ---------------------------------------------------------------------------
export const games = pgTable("games", {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  year: text().notNull(),
  status: gameStatus().notNull(),
  genre: text().notNull(),
  accent: gameAccent().notNull(),
  tagline: text().notNull(),
  blurb: text().notNull(),
  description: jsonb().$type<string[]>().notNull().default([]),
  platforms: jsonb().$type<string[]>().notNull().default([]),
  features: jsonb().$type<string[]>().notNull().default([]),
  sortOrder: integer().notNull().default(0),
  ...timestamps,
});

export const news = pgTable("news", {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  date: text().notNull(), // "YYYY-MM-DD"
  kind: newsKind().notNull(),
  excerpt: text().notNull(),
  sortOrder: integer().notNull().default(0),
  ...timestamps,
});

export const jobs = pgTable("jobs", {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  discipline: text().notNull(),
  type: text().notNull(),
  location: text().notNull(),
  blurb: text().notNull(),
  responsibilities: jsonb().$type<string[]>().notNull().default([]),
  requirements: jsonb().$type<string[]>().notNull().default([]),
  // External application form (e.g. Google Form) opened by the "Continue" button.
  formLink: text(),
  sortOrder: integer().notNull().default(0),
  ...timestamps,
});

export const team = pgTable("team", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  role: text().notNull(),
  seed: text().notNull(),
  bio: text().notNull(),
  links: jsonb().$type<Link[]>().notNull().default([]),
  // Photo URL — falls back to a generated avatar (keyed by `seed`) when unset.
  image: text(),
  sortOrder: integer().notNull().default(0),
  ...timestamps,
});

export const services = pgTable("services", {
  id: uuid().primaryKey().defaultRandom(),
  no: text().notNull(),
  title: text().notNull(),
  body: text().notNull(),
  points: jsonb().$type<string[]>().notNull().default([]),
  sortOrder: integer().notNull().default(0),
  ...timestamps,
});

// Single-row table for global site/contact configuration.
export const siteSettings = pgTable("site_settings", {
  id: text().primaryKey().default("default"),
  name: text().notNull(),
  short: text().notNull(),
  tagline: text().notNull(),
  blurb: text().notNull(),
  email: text().notNull(),
  pressEmail: text().notNull(),
  location: text().notNull(),
  founded: integer().notNull(),
  nav: jsonb().$type<NavLink[]>().notNull().default([]),
  socials: jsonb().$type<Social[]>().notNull().default([]),
  ...timestamps,
});

// ---------------------------------------------------------------------------
// Admin / auth tables
// ---------------------------------------------------------------------------
export const adminUsers = pgTable("admin_users", {
  id: uuid().primaryKey().defaultRandom(),
  // Null until the invited person first signs in with Clerk (linked by email).
  clerkUserId: text().unique(),
  // Stored lowercased so invites can be matched case-insensitively.
  email: text().notNull().unique(),
  name: text(),
  role: adminRole().notNull().default("admin"),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const adminPermissions = pgTable("admin_permissions", {
  id: uuid().primaryKey().defaultRandom(),
  adminUserId: uuid()
    .notNull()
    .references(() => adminUsers.id, { onDelete: "cascade" }),
  resource: adminResource().notNull(),
});

// ---------------------------------------------------------------------------
// Inferred types — used across the data layer, forms, and public pages.
// ---------------------------------------------------------------------------
export type Game = typeof games.$inferSelect;
export type Post = typeof news.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type Member = typeof team.$inferSelect;
export type Service = typeof services.$inferSelect;
export type SiteSettings = typeof siteSettings.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;
export type AdminPermission = typeof adminPermissions.$inferSelect;

export type GameStatus = (typeof gameStatus.enumValues)[number];
export type GameAccent = (typeof gameAccent.enumValues)[number];
export type NewsKind = (typeof newsKind.enumValues)[number];
export type AdminRole = (typeof adminRole.enumValues)[number];
export type AdminResource = (typeof adminResource.enumValues)[number];
