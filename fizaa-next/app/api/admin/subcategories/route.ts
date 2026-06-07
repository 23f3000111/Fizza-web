import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { newId, slugify } from "@/lib/ids";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim().slice(0, 80);
  const categoryId = String(body.categoryId || "").trim().slice(0, 60);
  if (!name || !categoryId) return NextResponse.json({ error: "Name and category required" }, { status: 400 });
  const subCategory = await db.subcategories.insert({ id: newId("sub-"), categoryId, name, slug: slugify(name) });
  return NextResponse.json({ ok: true, subCategory });
}
