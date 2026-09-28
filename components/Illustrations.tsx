/**
 * Ritual illustrations.
 *
 * Flat, hard-edged geometry in one consistent stroke weight, drawn from the
 * palette and nothing else: no gradients, no shading, no perspective. That is
 * partly a quality rule (a shaded vector scene reads as amateur clip art) and
 * partly the world's own grammar, since Indian matchbox and signboard art is
 * built the same way.
 *
 * Every shape here is specifiable geometry rather than a picture in line-art
 * costume, which is the line worth holding.
 *
 * Note on the break: the brief requires that Mehfil never depicts or promotes
 * tobacco, so the ritual people call a sutta break is drawn as a matchbox. The
 * vernacular stays in the copy; the cigarette never appears.
 */

const shared = {
  viewBox: "0 0 120 120",
  fill: "none",
  stroke: "var(--color-border)",
  strokeWidth: 5,
  strokeLinejoin: "miter" as const,
  strokeLinecap: "square" as const,
};

export function ChaiGlass() {
  return (
    <svg {...shared} role="img" aria-label="A cutting chai glass on a saucer">
      <path d="M39 64h42l-5 34H44z" fill="var(--color-main)" stroke="none" />
      <path d="M34 46h52l-8 56H42z" />
      <path d="M39 64h42" />
      <path d="M22 110h76" />
      <path
        d="M46 34c7-7-7-13 0-20M60 30c7-7-7-13 0-20M74 34c7-7-7-13 0-20"
        strokeWidth={4}
      />
    </svg>
  );
}

export function Matchbox() {
  return (
    <svg {...shared} role="img" aria-label="A matchbox with a match standing in it">
      <rect x="22" y="50" width="76" height="46" fill="var(--color-urgent)" />
      <rect
        x="34"
        y="60"
        width="52"
        height="26"
        fill="var(--color-secondary-background)"
      />
      <path d="M22 90h76" />
      <path d="M62 46V20" />
      <circle cx="62" cy="14" r="8" fill="var(--color-main)" />
    </svg>
  );
}

export function PlayingCards() {
  return (
    <svg {...shared} role="img" aria-label="Two playing cards, one marked with a diamond">
      <g transform="rotate(-11 50 62)">
        <rect
          x="27"
          y="30"
          width="46"
          height="64"
          fill="var(--color-secondary-background)"
        />
      </g>
      <g transform="rotate(9 72 62)">
        <rect
          x="49"
          y="30"
          width="46"
          height="64"
          fill="var(--color-secondary-background)"
        />
        <path d="M72 48l11 14-11 14-11-14z" fill="var(--color-urgent)" stroke="none" />
      </g>
    </svg>
  );
}

export function Tiffin() {
  return (
    <svg {...shared} role="img" aria-label="A three tier tiffin carrier">
      <path d="M40 38c0-13 40-13 40 0" />
      <rect x="32" y="42" width="56" height="21" fill="var(--color-main)" />
      <rect
        x="32"
        y="63"
        width="56"
        height="21"
        fill="var(--color-secondary-background)"
      />
      <rect x="32" y="84" width="56" height="21" fill="var(--color-surface-sunken)" />
    </svg>
  );
}

export function AutoRickshaw() {
  return (
    <svg {...shared} role="img" aria-label="An auto rickshaw">
      <path
        d="M26 76V54c0-15 12-26 27-26h19c12 0 14 9 14 19v29z"
        fill="var(--color-main)"
      />
      <path d="M41 48h25v18H41z" fill="var(--color-secondary-background)" />
      <path d="M22 76h76" />
      <circle cx="41" cy="90" r="13" fill="var(--color-secondary-background)" />
      <circle cx="85" cy="90" r="13" fill="var(--color-secondary-background)" />
    </svg>
  );
}
