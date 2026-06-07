import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const subs = await db.subcategories.find({ categoryId: params.id });
  await Promise.all(subs.map((s) => db.subcategories.remove(s.id)));
  return NextResponse.json({ ok: await db.categories.remove(params.id) });
}
