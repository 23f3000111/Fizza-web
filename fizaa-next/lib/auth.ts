// Admin session via a signed, httpOnly cookie (HMAC-SHA256). No external deps.
import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "fz_admin";

const DEV_SECRET = "dev-secret-change-me";

// In production a missing/placeholder secret would let anyone forge an admin
// cookie, so refuse to run rather than fall back to a value that is public in
// this repo. In development the fallback keeps local setup friction-free.
function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (process.env.NODE_ENV === "production") {
    if (!s || s === DEV_SECRET || s.length < 32) {
      throw new Error(
        "SESSION_SECRET must be set to a random value of at least 32 characters in production."
      );
    }
    return s;
  }
  return s || DEV_SECRET;
}

/** Constant-time string comparison that does not leak length via early return. */
export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  // Hash first so differing lengths still compare in constant time.
  const ah = crypto.createHash("sha256").update(ab).digest();
  const bh = crypto.createHash("sha256").update(bb).digest();
  return crypto.timingSafeEqual(ah, bh) && ab.length === bb.length;
}

function sign(payload: string): string {
  const h = crypto.createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${h}`;
}

export function createAdminToken(): string {
  return sign("admin:" + Date.now());
}

export function verifyToken(token?: string | null): boolean {
  if (!token) return false;
  const i = token.lastIndexOf(".");
  if (i === -1) return false;
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  if (!payload.startsWith("admin:")) return false;
  const expected = crypto.createHmac("sha256", secret()).update(payload).digest("hex");
  try {
    return (
      sig.length === expected.length &&
      crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
    );
  } catch {
    return false;
  }
}

/** Read the cookie (server-side) and check the admin session. */
export function isAdmin(): boolean {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return verifyToken(token);
}
