import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { sendLeadsReport } from "@/lib/mailer";
import { dateKey } from "@/lib/csv";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const date = req.nextUrl.searchParams.get("date") || dateKey();
  const result = await sendLeadsReport(date);
  return NextResponse.json(result);
}
