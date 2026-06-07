import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { EMAIL_RE, str } from "@/lib/validate";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Record<string, any>;
  const name = str(b.firstName ? `${b.firstName} ${b.lastName || ""}` : b.name, 160);
  if (!name && !b.email) return NextResponse.json({ error: "Please provide your name or email." }, { status: 400 });
  if (b.email && !EMAIL_RE.test(str(b.email, 160))) return NextResponse.json({ error: "Invalid email." }, { status: 400 });

  const inquiry = await db.inquiries.insert({
    inquiryType: str(b.inquiryType, 60),
    role: str(b.role, 60),
    name,
    email: str(b.email, 160),
    mobile: str(b.mobile, 40),
    city: str(b.city, 80),
    area: str(b.area, 80),
    state: str(b.state, 80),
    zip: str(b.zip, 20),
    propertyType: str(b.propertyType, 80),
    maxPrice: str(b.maxPrice, 40),
    minSize: str(b.minSize, 40),
    beds: str(b.beds, 10),
    baths: str(b.baths, 10),
    listingId: str(b.listingId, 60),
    listingTitle: str(b.listingTitle, 200),
    message: str(b.message, 4000),
    source: str(b.source, 40),
  });
  return NextResponse.json({ ok: true, id: inquiry.id });
}
