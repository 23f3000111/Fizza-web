import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appendLeadCsv } from "@/lib/csv";
import { EMAIL_RE, str } from "@/lib/validate";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const name = str(body.name, 120);
  const phone = str(body.phone, 40);
  const email = str(body.email, 160);
  if (!name || !phone) return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  if (email && !EMAIL_RE.test(email)) return NextResponse.json({ error: "Invalid email." }, { status: 400 });

  const lead = await db.leads.insert({ name, phone, email, source: str(body.source, 40) || "chatbot" });
  try {
    await appendLeadCsv(lead);
  } catch (err) {
    console.error("CSV append failed:", (err as Error).message);
  }
  return NextResponse.json({ ok: true, id: lead.id });
}
