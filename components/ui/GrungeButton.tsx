import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "solid" | "sage" | "ghost";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "px-6 py-3 text-base",
  md: "px-9 py-4 text-lg",
  lg: "px-12 py-5 text-xl",
};

/** Background fill per tone — torn layer takes this, label sits crisp on top. */
const fills: Record<Tone, string> = {
  solid:
    "bg-[linear-gradient(180deg,#8c8b5b_0%,#807f51_55%,#6a6942_100%)] group-hover:bg-[linear-gradient(180deg,#4c8243_0%,#41723b_60%,#335a2f_100%)]",
  sage: "bg-[linear-gradient(180deg,#b3bfaf_0%,#a2af9e_55%,#8a978a_100%)] group-hover:bg-[linear-gradient(180deg,#4c8243_0%,#41723b_60%,#335a2f_100%)]",
  ghost: "bg-[rgba(162,175,158,0.10)] group-hover:bg-[rgba(65,114,59,0.85)]",
};

const labelTone: Record<Tone, string> = {
  solid: "text-paper",
  sage: "text-canvas-deep group-hover:text-paper",
  ghost: "text-paper",
};

type BaseProps = {
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  filter?: "torn-rough" | "torn-soft";
  className?: string;
};

function Inner({
  children,
  tone = "solid",
  filter = "torn-rough",
}: Omit<Required<BaseProps>, "className" | "size">) {
  return (
    <>
      {/* torn silhouette layer (filtered) */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 transition-colors duration-300",
          fills[tone],
        )}
        style={{ filter: `url(#${filter})` }}
      />
      {/* subtle carved top-light + bottom-shadow, also torn */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          filter: `url(#${filter})`,
          background:
            "linear-gradient(180deg, rgba(233,233,221,0.25), transparent 30%, rgba(20,26,19,0.35))",
        }}
      />
      <span
        className={cn(
          "font-heading relative z-10 uppercase tracking-[0.12em]",
          labelTone[tone],
        )}
      >
        {children}
      </span>
    </>
  );
}

const shell =
  "group relative inline-flex items-center justify-center select-none transition-transform duration-200 active:translate-y-[1px] hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

type LinkProps = BaseProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className"
  >;
type ButtonProps = BaseProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className"
  >;

export function GrungeButton(props: LinkProps | ButtonProps) {
  const {
    children,
    tone = "solid",
    size = "md",
    filter = "torn-rough",
    className,
    ...rest
  } = props;

  const classes = cn(shell, sizes[size], className);
  const inner = (
    <Inner tone={tone} filter={filter}>
      {children}
    </Inner>
  );

  if (typeof props.href === "string") {
    const { href, ...linkRest } = rest as LinkProps;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={classes} {...(rest as ButtonProps)}>
      {inner}
    </button>
  );
}
