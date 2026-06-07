import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [categories, subCategories, filterFields, listings] = await Promise.all([
    db.categories.find(),
    db.subcategories.find(),
    db.filterFields.find(),
    db.listings.find(),
  ]);
  const distinct = (key: keyof (typeof listings)[number]) =>
    [...new Set(listings.map((l) => l[key]).filter(Boolean) as string[])].sort();

  return NextResponse.json({
    categories,
    subCategories,
    filterFields,
    cities: distinct("city"),
    states: distinct("state"),
    propertyTypes: distinct("propertyType"),
    dealTypes: ["sale", "rent"],
    total: listings.filter((l) => l.status !== "hidden").length,
  });
}
