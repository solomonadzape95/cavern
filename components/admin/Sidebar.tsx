"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import type { IconType } from "react-icons";
import {
  LuGamepad2,
  LuNewspaper,
  LuPickaxe,
  LuUsers,
  LuSettings,
  LuShieldCheck,
  LuLogOut,
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuMail,
} from "react-icons/lu";
import type { AdminResource } from "@/db/schema";
import { cn } from "@/lib/cn";
import { isActiveLink } from "@/lib/isActiveLink";

const RESOURCE_ICONS: Record<AdminResource, IconType> = {
  games: LuGamepad2,
  news: LuNewspaper,
  jobs: LuPickaxe,
  team: LuUsers,
  newsletter: LuMail,
  site: LuSettings,
};

export function AdminSidebar({
  links,
  showUsers,
  name,
  email,
  role,
}: {
  links: { resource: AdminResource; label: string; href: string }[];
  showUsers: boolean;
  name: string | null;
  email: string;
  role: string;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-canvas text-paper border-sage/20 flex flex-col gap-6 border-b p-6 transition-[width] duration-300 md:border-b-0 md:border-r",
        collapsed ? "md:w-22" : "md:w-60",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Link href="/admin" className="shrink-0">
          <Image
            src="/cavern-lettermark.svg"
            alt="Cavern"
            width={156}
            height={137}
            className={cn("h-8 w-auto invert", collapsed ? "block" : "block md:hidden")}
          />
          <Image
            src="/logo-cavern.svg"
            alt="Cavern"
            width={699}
            height={234}
            className={cn("h-8 w-auto invert", collapsed ? "hidden" : "hidden md:block")}
          />
        </Link>

        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden shrink-0 cursor-pointer text-sage transition-colors hover:text-moss md:flex"
        >
          {collapsed ? (
            <LuPanelLeftOpen className="text-xl" aria-hidden />
          ) : (
            <LuPanelLeftClose className="text-xl" aria-hidden />
          )}
        </button>
      </div>

      {!collapsed && <p className="label text-sage">Admin</p>}

      <nav className="flex flex-col gap-1">
        {links.map((item) => {
          const Icon = RESOURCE_ICONS[item.resource];
          const active = isActiveLink(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "label flex items-center gap-3 rounded px-2 py-2 text-paper transition-colors hover:bg-canvas-deep hover:text-moss",
                collapsed && "justify-center",
                active && "bg-canvas-deep text-moss",
              )}
            >
              <Icon className="shrink-0 text-lg" aria-hidden />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
        {showUsers && (
          <Link
            href="/admin/users"
            title="Admins"
            className={cn(
              "label flex items-center gap-3 rounded px-2 py-2 text-paper transition-colors hover:bg-canvas-deep hover:text-moss",
              collapsed && "justify-center",
              isActiveLink(pathname, "/admin/users") && "bg-canvas-deep text-moss",
            )}
          >
            <LuShieldCheck className="shrink-0 text-lg" aria-hidden />
            {!collapsed && <span>Admins</span>}
          </Link>
        )}
      </nav>

      <div className="mt-auto flex flex-col gap-4 border-t border-sage/20 pt-4">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <UserButton />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm text-paper">{name ?? email}</p>
              <p className="label text-sage">{role}</p>
            </div>
          )}
        </div>

        <SignOutButton redirectUrl="/admin/sign-in">
          <button
            type="button"
            title="Sign out"
            className={cn(
              "label flex items-center gap-3 rounded px-2 py-2 text-left text-paper transition-colors hover:bg-canvas-deep hover:text-moss cursor-pointer",
              collapsed && "justify-center",
            )}
          >
            <LuLogOut className="shrink-0 text-lg" aria-hidden />
            {!collapsed && <span>Sign out</span>}
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
}
