import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { toCSV, dateKey, LEAD_COLUMNS } from "@/lib/csv";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const leads = (await db.leads.find()).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  if (req.nextUrl.searchParams.get("format") === "csv") {
    return new NextResponse(toCSV(leads as any, LEAD_COLUMNS), {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="leads-${dateKey()}.csv"`,
      },
    });
  }
  return NextResponse.json(leads);
}
