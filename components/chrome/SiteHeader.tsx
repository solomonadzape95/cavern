"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { IconType } from "react-icons";
import {
  LuGamepad2,
  LuTentTree,
  LuPickaxe,
  LuNewspaper,
  LuMegaphone,
  LuMail,
  LuArrowUpRight,
} from "react-icons/lu";
import type { SiteSettings } from "@/lib/data/site";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { GrungeFrame } from "@/components/ui/GrungeFrame";
import { cn } from "@/lib/cn";
import { isActiveLink } from "@/lib/isActiveLink";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV_ICONS: Record<string, IconType> = {
  "/games": LuGamepad2,
  "/about": LuTentTree,
  "/jobs": LuPickaxe,
  "/news": LuNewspaper,
  "/press": LuMegaphone,
  "/contact": LuMail,
};

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const { name, email, nav, socials } = settings;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // hide when scrolling down past the hero, show when scrolling up
      if (y > lastY && y > 160) setHidden(true);
      else if (y < lastY - 4) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-(--banner-h) z-50 transition-[transform,background-color,backdrop-filter,top] duration-500",
          scrolled && !open
            ? "bg-canvas/80 backdrop-blur-sm"
            : "bg-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className=" mx-auto flex max-w-350 items-center justify-between px-5 py-4 md:px-10 md:py-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label={name}
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo-cavern.svg"
              alt={name}
              width={799}
              height={334}
              priority
              className="block h-14 w-auto invert md:hidden"
            />
            <Image
              src="/logo-cavern.svg"
              alt={name}
              width={799}
              height={334}
              priority
              className="hidden h-16 w-auto invert md:block"
            />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="group flex items-center gap-3 focus-visible:outline-none cursor-pointer"
          >
            <span className="uppercase text-xl text-paper transition-colors group-hover:text-moss">
              {open ? "Close" : "Menu"}
            </span>
            <span className="flex flex-col gap-1.25">
              <span
                className={cn(
                  "block h-0.5 w-7 bg-paper transition-all duration-300 group-hover:bg-moss",
                  open && "translate-y-1.75 rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-7 bg-paper transition-all duration-300 group-hover:bg-moss",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-7 bg-paper transition-all duration-300 group-hover:bg-moss",
                  open && "-translate-y-1.75 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-canvas-deep"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav className="mt-(--banner-h) mx-auto flex h-full max-w-[90svw] flex-col justify-center px-5 pt-24 pb-10 md:px-10">
              {/* nav cards */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                {nav.map((item, i) => {
                  const Icon = NAV_ICONS[item.href] ?? LuArrowUpRight;
                  const active = isActiveLink(pathname, item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{
                        opacity: 0,
                        y: 30,
                        rotate: i % 2 ? 1.5 : -1.5,
                      }}
                      animate={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.55,
                        ease: EASE,
                        delay: 0.12 + i * 0.05,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block h-full"
                      >
                        <GrungeFrame
                          className="h-full transition-transform duration-300 transform-gpu hover:scale-105"
                          contentClassName="flex h-full flex-col justify-between p-5 md:p-7"
                          frameClassName={cn(
                            "transition-colors duration-300",
                            active ? "" : "bg-canvas-deep",
                          )}
                          fillClassName={cn(
                            "transition-colors duration-300",
                            active ? "bg-moss/15" : "bg-canvas",
                          )}
                          frameFilter="torn-rough"
                          fillFilter="torn-rough"
                          frameInset={10}
                        >
                          <div className="flex items-start justify-between">
                            <Icon
                              className="text-3xl text-moss md:text-5xl"
                              aria-hidden
                            />
                            <span className="label text-olive scale-200">
                              0{i + 1}
                            </span>
                          </div>
                          <div className="mt-8">
                            <span
                              className={cn(
                                "font-heading block text-2xl uppercase tracking-wide transition-colors group-hover:text-moss md:text-3xl",
                                active ? "text-moss" : "text-paper",
                              )}
                            >
                              {item.label}
                            </span>
                            <span className="mt-1 block text-sage/80">
                              {item.note}
                            </span>
                          </div>
                        </GrungeFrame>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* wordmark + socials */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-auto pt-10"
              >
                <h2 className="font-display text-paper text-center text-[4rem] sm:text-[8rem] md:text-[11.5rem] leading-tight uppercase">
                  {name}.
                </h2>
                <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-sage/20 pt-5 mb-(--banner-h)">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="text-sage transition-colors hover:text-moss"
                    >
                      <SocialIcon label={s.label} className="text-2xl" />
                    </a>
                  ))}
                  <span className="cursor-pointer hover:text-sage text-2xl font-semibold ml-auto text-sage/60">
                    {email}
                  </span>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
