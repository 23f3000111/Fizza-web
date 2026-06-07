import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { buildListingPayload } from "@/lib/listingPayload";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  return NextResponse.json(await db.listings.find());
}

export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  try {
    const form = await req.formData();
    const payload = await buildListingPayload(form);
    if (!payload.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
    const listing = await db.listings.insert(payload as any);
    return NextResponse.json({ ok: true, listing });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
