export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function str(v: unknown, max = 2000): string {
  return String(v ?? "").trim().slice(0, max);
}
