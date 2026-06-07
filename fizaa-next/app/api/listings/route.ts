import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { filterListings, sortListings } from "@/lib/filter";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const query: Record<string, string> = {};
  sp.forEach((v, k) => {
    query[k] = v;
  });

  const all = (await db.listings.find()).filter((l) => l.status !== "hidden");
  let result = filterListings(all, query);
  result = sortListings(result, query.sort);
  if (query.featured === "true") result = result.filter((l) => l.featured);
  if (query.limit) result = result.slice(0, Number(query.limit) || result.length);
  return NextResponse.json(result);
}
