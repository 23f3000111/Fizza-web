import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { buildListingPayload } from "@/lib/listingPayload";

export const dynamic = "force-dynamic";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  try {
    const existing = await db.listings.get(params.id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const form = await req.formData();
    const payload = await buildListingPayload(form);
    payload.slug = existing.slug;
    const listing = await db.listings.update(params.id, payload);
    return NextResponse.json({ ok: true, listing });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  return NextResponse.json({ ok: await db.listings.remove(params.id) });
}
