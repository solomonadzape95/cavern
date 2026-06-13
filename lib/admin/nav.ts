import type { AdminResource } from "@/db/schema";

export const RESOURCE_NAV: { resource: AdminResource; label: string; href: string }[] = [
  { resource: "games", label: "Games", href: "/admin/games" },
  { resource: "news", label: "News", href: "/admin/news" },
  { resource: "jobs", label: "Jobs", href: "/admin/jobs" },
  { resource: "team", label: "Team", href: "/admin/team" },
  { resource: "newsletter", label: "Newsletter", href: "/admin/newsletter" },
  { resource: "site", label: "Site settings", href: "/admin/site" },
];
