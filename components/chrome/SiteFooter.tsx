"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { NAV, SITE, SOCIALS } from "@/content/site";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { cn } from "@/lib/cn";
import { isActiveLink } from "@/lib/isActiveLink";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  return (
    <footer className="relative z-20 flex min-h-svh flex-col justify-between overflow-hidden bg-paper px-5 pt-28 pb-12 text-canvas-deep md:px-10 md:pt-32 md:pb-16">
      {/* top: contact + link list */}
      <div className="mx-auto grid w-full max-w-350 gap-10 border-canvas-deep/15 pb-12 md:grid-cols-2 md:gap-12">
        <div>
          <p className="font-heading max-w-[20ch] text-3xl leading-tight md:text-4xl">
            We&apos;d love to hear from you. Reaching us is easy.
          </p>
          <Link
            href="/contact"
            className="group relative mt-7 inline-flex"
            aria-label="Get in touch"
          >
            <span
              aria-hidden
              className="absolute inset-0 bg-canvas-deep transition-colors group-hover:bg-moss"
              style={{ filter: "url(#torn-rough)" }}
            />
            <span className="font-heading relative z-10 px-8 py-4 text-base uppercase tracking-[0.12em] text-paper sm:px-9 sm:text-lg">
              Get in touch
            </span>
          </Link>
        </div>

        <nav className="w-full md:max-w-md md:justify-self-center">
          <ul className="divide-y divide-canvas-deep/15 border-canvas-deep/15">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "block py-3 text-2xl transition-colors hover:text-moss md:py-3.5 md:text-3xl",
                    isActiveLink(pathname, l.href)
                      ? "text-moss"
                      : "text-canvas-deep/90",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* massive wordmark with the gem mark, scales up into view */}
      <div className="mx-auto w-full max-w-350 py-10">
        <h2 className="font-display flex flex-wrap items-center justify-center gap-x-[0.22em] gap-y-1 text-canvas-deep text-(length:--text-mega) leading-[0.82]">
          <span>Let&apos;s forge</span>
          <motion.img
            src="/loading.svg"
            alt=""
            aria-hidden
            className="inline-block h-[0.7em] w-auto"
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <span>games</span>
        </h2>
      </div>

      {/* baseline: socials + legal + copyright */}
      <div className="mx-auto flex w-full max-w-350 flex-col gap-4 border-canvas-deep/15 pt-6 text-sm text-canvas-deep/70 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="text-canvas-deep transition-colors hover:text-moss"
            >
              <SocialIcon label={s.label} className="text-xl md:text-2xl" />
            </a>
          ))}
          <span className="text-canvas-deep/30">·</span>
          <Link href="/privacy" className="transition-colors hover:text-moss md:text-xl">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-moss md:text-xl">
            Terms
          </Link>
        </div>
        <span className="md:text-xl">
          © {year} {SITE.name}. All rights reserved. Some wrongs corrected.
        </span>
      </div>
    </footer>
  );
}
