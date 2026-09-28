/**
 * The pin. Every notice on the board hangs from one, and the tilt of a notice
 * rotates about it, so this is a structural element rather than decoration.
 */
export function Pin({ tone = "main" }: { tone?: "main" | "urgent" }) {
  return (
    <svg className="pin" viewBox="0 0 32 32" aria-hidden="true">
      <circle
        cx="16"
        cy="16"
        r="12"
        fill={tone === "urgent" ? "var(--color-urgent)" : "var(--color-main)"}
        stroke="var(--color-border)"
        strokeWidth="3"
      />
      <circle cx="16" cy="16" r="3.5" fill="var(--color-border)" />
    </svg>
  );
}
