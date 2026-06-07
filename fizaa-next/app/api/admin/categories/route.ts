import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { newId, slugify } from "@/lib/ids";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim().slice(0, 80);
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });
  const all = await db.categories.find();
  if (all.some((c) => c.name.toLowerCase() === name.toLowerCase()))
    return NextResponse.json({ error: "Category already exists" }, { status: 409 });
  const category = await db.categories.insert({ id: newId("cat-"), name, slug: slugify(name) });
  return NextResponse.json({ ok: true, category });
}
