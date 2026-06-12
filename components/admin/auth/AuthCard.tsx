import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export const authInputClass =
  "w-full border border-canvas/20 bg-paper px-3 py-2 text-canvas-deep placeholder:text-canvas/40 focus:border-moss focus:outline-none";

export const authButtonClass =
  "label w-full cursor-pointer bg-moss px-6 py-3 text-paper transition-opacity hover:opacity-90 disabled:opacity-60";

export const authSecondaryButtonClass =
  "label flex w-full cursor-pointer items-center justify-center gap-3 border border-canvas/20 bg-paper px-6 py-3 text-canvas-deep transition-colors hover:border-canvas/40 disabled:opacity-60";

export function AuthDivider() {
  return (
    <div className="flex items-center gap-3 text-sm text-canvas/40">
      <div className="h-px flex-1 bg-canvas/15" />
      <span>or</span>
      <div className="h-px flex-1 bg-canvas/15" />
    </div>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function AuthFieldError({ error }: { error?: { message: string } | null }) {
  if (!error) return null;
  return <p className="mt-1 text-sm text-red-600">{error.message}</p>;
}

export function AuthGlobalError({
  errors,
}: {
  errors: { global: { message: string; longMessage?: string }[] | null };
}) {
  if (!errors.global?.length) return null;
  return (
    <div className="space-y-1 border border-red-600/30 bg-red-600/5 p-3 text-sm text-red-600">
      {errors.global.map((error, i) => (
        <p key={i}>{error.longMessage ?? error.message}</p>
      ))}
    </div>
  );
}

export function AuthCard({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="bg-canvas flex min-h-screen items-center justify-center p-6">
      <div className="bg-paper text-canvas-deep w-full max-w-1/3 space-y-6 p-8">
        <Link href="/" className="block">
          <Image
            src="/logo-cavern.svg"
            alt="Cavern"
            width={699}
            height={234}
            className="h-8 w-auto"
          />
        </Link>

        <div>
          <p className="label text-canvas/60">{eyebrow}</p>
          <h1 className="font-display text-(length:--text-heading) text-canvas-deep">{title}</h1>
          {subtitle && <p className="mt-1 text-canvas/60">{subtitle}</p>}
        </div>

        {children}

        {footer && <p className="text-center text-sm text-canvas/60">{footer}</p>}
      </div>
    </div>
  );
}
