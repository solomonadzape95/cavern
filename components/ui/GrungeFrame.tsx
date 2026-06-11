import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type TornFilter = "torn-rough" | "torn-soft" | "torn-banner";

type GrungeFrameProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** wrapper for the crisp z-10 content layer */
  contentClassName?: string;
  /** bg classes for the outer (frame) layer */
  frameClassName?: string;
  /** bg classes for the inner (fill) layer — ignored when `media` is set */
  fillClassName?: string;
  frameFilter?: TornFilter;
  fillFilter?: TornFilter;
  /** px the frame layer extends beyond the fill layer */
  frameInset?: number;
  showSheen?: boolean;
  /** photo mode — rendered inside the filtered fill layer */
  media?: ReactNode;
  mediaOverlay?: ReactNode;
};

/**
 * Reusable torn-silhouette wrapper, generalizing GrungeButton's layering:
 * a larger filtered "frame" layer peeks out as a ragged ring around a
 * filtered "fill" layer (solid color or photo), topped by a crisp
 * unfiltered content layer.
 */
export function GrungeFrame({
  children,
  className,
  style,
  contentClassName,
  frameClassName = "bg-canvas-deep",
  fillClassName = "bg-canvas",
  frameFilter = "torn-rough",
  fillFilter = "torn-soft",
  frameInset = 14,
  showSheen = true,
  media,
  mediaOverlay,
}: GrungeFrameProps) {
  return (
    <div style={style} className={cn("group relative", className)}>
      {/* frame layer — bigger box, rougher tear, peeks out as a ragged ring */}
      <span
        aria-hidden
        className={cn(
          "absolute transition-colors duration-300",
          frameClassName,
        )}
        style={{ inset: -frameInset, filter: `url(#${frameFilter})` }}
      />

      {/* fill layer — solid color or photo */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden"
        style={{ filter: `url(#${fillFilter})` }}
      >
        {media ? (
          <>
            {media}
            {mediaOverlay}
          </>
        ) : (
          <span
            className={cn(
              "absolute inset-0 transition-colors duration-300",
              fillClassName,
            )}
          />
        )}
      </div>

      {/* subtle carved top-light + bottom-shadow, also torn */}
      {showSheen && (
        <span
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            filter: `url(#${fillFilter})`,
            background:
              "linear-gradient(180deg, rgba(233,233,221,0.25), transparent 30%, rgba(20,26,19,0.35))",
          }}
        />
      )}

      {/* content */}
      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </div>
  );
}
