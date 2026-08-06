import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, createAdminToken, safeEqual } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Simple in-memory throttle. The admin path is public and guarded only by a
// password, so cap attempts per IP. Resets on restart, which is fine for a
// single-instance deployment.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const attempts = new Map<string, { count: number; first: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || now - rec.first > WINDOW_MS) {
    attempts.set(ip, { count: 1, first: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_ATTEMPTS;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : req.headers.get("x-real-ip") || "unknown").trim();
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    console.error("[admin] ADMIN_PASSWORD is not set — login disabled.");
    return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  const pw = String(body.password || "");

  if (pw && safeEqual(pw, expected)) {
    attempts.delete(ip);
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
