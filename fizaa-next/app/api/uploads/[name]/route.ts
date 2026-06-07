import { NextResponse } from "next/server";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

// Serve user-uploaded files from the writable top-level /uploads directory.
// Going through a route handler (instead of /public) means uploads work
// identically in `next dev`, `next start` and any host — Next.js does not
// reliably serve files written to /public at runtime.
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export async function GET(_req: Request, { params }: { params: { name: string } }) {
  // Reject anything that isn't a plain filename (no traversal, no slashes).
  const name = params.name;
  if (!name || !/^[A-Za-z0-9._-]+$/.test(name) || name.includes("..")) {
    return new NextResponse("Bad request", { status: 400 });
  }
  const file = path.join(UPLOAD_DIR, name);
  try {
    await stat(file);
    const buf = await readFile(file);
    const ext = path.extname(name).toLowerCase();
    const isDoc = [".pdf", ".doc", ".docx", ".xls", ".xlsx"].includes(ext);
    return new NextResponse(buf, {
      headers: {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        // images render inline; documents may carry an explicit download name via ?download=
        "Content-Disposition": isDoc ? "inline" : "inline",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
