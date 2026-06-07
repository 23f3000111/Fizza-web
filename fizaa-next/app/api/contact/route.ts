import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { EMAIL_RE, str } from "@/lib/validate";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Record<string, any>;
  const firstName = str(b.firstName, 80);
  const email = str(b.email, 160);
  const message = str(b.message, 4000);
  if (!firstName || !email || !message)
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Invalid email." }, { status: 400 });

  const msg = await db.contacts.insert({ firstName, lastName: str(b.lastName, 80), email, message });
  return NextResponse.json({ ok: true, id: msg.id });
}
