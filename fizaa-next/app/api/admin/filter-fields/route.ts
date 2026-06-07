import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { newId, slugify } from "@/lib/ids";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const label = String(body.label || "").trim().slice(0, 80);
  if (!label) return NextResponse.json({ error: "Label required" }, { status: 400 });
  const key = slugify(label).replace(/-/g, "_");
  const type = body.type === "select" ? "select" : "text";
  const options =
    Array.isArray(body.options)
      ? body.options
      : String(body.options || "")
          .split(",")
          .map((o: string) => o.trim())
          .filter(Boolean);
  const field = await db.filterFields.insert({ id: newId("ff-"), key, label, type, options });
  return NextResponse.json({ ok: true, field });
}
