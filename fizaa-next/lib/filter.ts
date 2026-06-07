// Pure listing search/filter/sort helpers.
import type { Listing } from "./types";

function num(v: unknown): number | null {
  if (v === undefined || v === null || v === "") return null;
  const n = Number(String(v).replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : null;
}
const lc = (v: unknown) => String(v ?? "").trim().toLowerCase();

export function filterListings(list: Listing[], query: Record<string, any> = {}): Listing[] {
  const q = (query.q || "").trim().toLowerCase();
  const minPrice = num(query.minPrice);
  const maxPrice = num(query.maxPrice);
  const minSize = num(query.minSize);
  const maxSize = num(query.maxSize);

  return list.filter((item) => {
    if (query.dealType && item.dealType !== query.dealType) return false;
    if (query.categoryId && item.categoryId !== query.categoryId) return false;
    if (query.subCategoryId && item.subCategoryId !== query.subCategoryId) return false;
    if (query.city && lc(item.city) !== lc(query.city)) return false;
    if (query.state && lc(item.state) !== lc(query.state)) return false;
    if (query.propertyType && lc(item.propertyType) !== lc(query.propertyType)) return false;

    if (q) {
      const hay = [item.title, item.shortDesc, item.description, item.city, item.state, item.address]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }

    const price = num(item.price);
    if (minPrice !== null && (price === null || price < minPrice)) return false;
    if (maxPrice !== null && (price === null || price > maxPrice)) return false;

    const size = num(item.size);
    if (minSize !== null && (size === null || size < minSize)) return false;
    if (maxSize !== null && (size === null || size > maxSize)) return false;

    if (query.beds && num(item.beds) !== num(query.beds)) return false;
    if (query.baths && num(item.baths) !== num(query.baths)) return false;

    for (const [key, val] of Object.entries(query)) {
      if (!key.startsWith("attr_") || val === "" || val == null) continue;
      const attrKey = key.slice(5);
      const actual = item.attributes && item.attributes[attrKey];
      if (lc(actual) !== lc(val)) return false;
    }
    return true;
  });
}

export function sortListings(list: Listing[], sort = "newest"): Listing[] {
  const arr = [...list];
  const p = (l: Listing) => (l.price == null ? null : Number(l.price));
  switch (sort) {
    case "price-asc":
      return arr.sort((a, b) => (p(a) ?? Infinity) - (p(b) ?? Infinity));
    case "price-desc":
      return arr.sort((a, b) => (p(b) ?? -Infinity) - (p(a) ?? -Infinity));
    case "oldest":
      return arr.sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
    case "newest":
    default:
      return arr.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }
}
