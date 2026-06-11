/**
 * Root SVG filters that give elements their hand-torn silhouette.
 * Applied via `filter: url(#torn-*)` to a background layer (never to text).
 * Rendered once, hidden, near the top of <body>.
 */
export function TornFilters() {
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <defs>
        {/* soft tear — panels, large surfaces */}
        <filter id="torn-soft" x="-6%" y="-20%" width="112%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.018"
            numOctaves="3"
            seed="7"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="9"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* rough tear — buttons, banners */}
        <filter id="torn-rough" x="-8%" y="-30%" width="116%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.014 0.03"
            numOctaves="3"
            seed="22"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* ragged banner edge — page headers, news strip */}
        <filter id="torn-banner" x="-3%" y="-60%" width="106%" height="220%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.05"
            numOctaves="2"
            seed="13"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
