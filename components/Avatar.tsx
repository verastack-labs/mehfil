/**
 * Avatars are chosen, never uploaded: a figure from a fixed catalogue, plus a
 * skin tone and an outfit colour picked by index from curated palettes. The
 * indices are the product's real model, which is why they are typed as unions
 * rather than as strings; an out-of-range value is a compile error here and a
 * CHECK constraint violation in the database.
 *
 * Ranges mirror mehfil-app/lib/avatars.mjs.
 */
export type SkinTone = 1 | 2 | 3 | 4;
export type OutfitColor = 1 | 2 | 3 | 4;

export function Avatar({
  skin,
  outfit,
}: {
  skin: SkinTone;
  outfit: OutfitColor;
}) {
  return (
    <svg
      className="avatar"
      viewBox="0 0 32 32"
      fill="none"
      stroke="var(--color-border)"
      strokeWidth="2.5"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <rect
        x="1.25"
        y="1.25"
        width="29.5"
        height="29.5"
        fill="var(--color-secondary-background)"
      />
      <path
        d="M4 31c0-7 5.5-10 12-10s12 3 12 10z"
        fill={`var(--color-outfit-${outfit})`}
      />
      <circle cx="16" cy="12" r="6.5" fill={`var(--color-skin-${skin})`} />
    </svg>
  );
}
