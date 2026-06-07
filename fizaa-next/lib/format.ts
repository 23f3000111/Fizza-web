import type { Listing } from "./types";

export function money(l: Pick<Listing, "priceLabel" | "price" | "priceUnit">): string {
  if (l.priceLabel) return l.priceLabel;
  if (l.price == null) return "Contact for price";
  return `${l.priceUnit || "MYR"} ${Number(l.price).toLocaleString("en-MY")}`;
}

export function imgOf(l: Pick<Listing, "images">): string {
  return (l.images && l.images[0]) || "/img/placeholder.svg";
}
