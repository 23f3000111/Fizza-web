// Tiny id + slug helpers (no external deps).

let counter = 0;

/** Time-sortable, collision-resistant id. */
export function newId(prefix = ""): string {
  counter = (counter + 1) % 0xffff;
  const time = Date.now().toString(36);
  const rand = Math.floor(Math.random() * 0xffffff).toString(36);
  const seq = counter.toString(36);
  return `${prefix}${time}${seq}${rand}`;
}

/** URL-safe slug from arbitrary text. */
export function slugify(str = ""): string {
  return (
    String(str)
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "item"
  );
}

/** Normalise a label into an attribute key, e.g. "Power Supply" -> "power_supply". */
export function keyOf(label: string): string {
  return String(label).toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}
