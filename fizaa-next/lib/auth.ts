// Admin session via a signed, httpOnly cookie (HMAC-SHA256). No external deps.
import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "fz_admin";

function secret(): string {
  return process.env.SESSION_SECRET || "dev-secret-change-me";
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
