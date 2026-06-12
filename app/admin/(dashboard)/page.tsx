import Link from "next/link";
import { count } from "drizzle-orm";
import { db } from "@/db";
import { games, news, jobs, team } from "@/db/schema";
import { requireAdmin, canAccess } from "@/lib/auth/dal";
import { RESOURCE_NAV } from "@/lib/admin/nav";
import type { AdminResource } from "@/db/schema";

type CountableTable = typeof games | typeof news | typeof jobs | typeof team;

const TABLES: Partial<Record<AdminResource, CountableTable>> = {
  games,
  news,
  jobs,
  team,
};

export default async function AdminDashboard() {
  const admin = await requireAdmin();
  const items = RESOURCE_NAV.filter((item) => canAccess(admin, item.resource));

  const counts = await Promise.all(
    items.map(async (item) => {
      const table = TABLES[item.resource];
      if (!table) return null;
      const [{ value }] = await db.select({ value: count() }).from(table);
      return value;
    }),
  );

  return (
    <div className="space-y-8">
      <header>
        <p className="label text-canvas/60">Welcome back</p>
        <h1 className="font-display text-(length:--text-title) text-canvas-deep">
          {admin.name ?? admin.email}
        </h1>
        <p className="mt-2 text-canvas/60">Pick a section below to manage your site&rsquo;s content.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="border border-canvas/15 p-6 transition-colors hover:border-moss"
          >
            <p className="label text-canvas/60">{item.label}</p>
            {counts[i] !== null && (
              <p className="font-body mt-2 text-(length:--text-heading) text-canvas-deep">
                {counts[i]}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
