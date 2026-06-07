import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const rows = (await db.contacts.find()).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  return NextResponse.json(rows);
}
