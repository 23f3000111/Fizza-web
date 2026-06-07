import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, createAdminToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const pw = String(body.password || "");
  if (pw && pw === process.env.ADMIN_PASSWORD) {
    cookies().set(ADMIN_COOKIE, createAdminToken(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
      secure: process.env.NODE_ENV === "production",
    });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
}
