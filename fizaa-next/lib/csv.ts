// CSV generation + per-day lead CSV file append.
import fs from "node:fs/promises";
import path from "node:path";
import type { Lead } from "./types";

const CSV_DIR = path.join(process.cwd(), "data", "leads-csv");
export const LEAD_COLUMNS = ["id", "name", "phone", "email", "source", "createdAt"] as const;

function escapeCell(value: unknown): string {
  const s = value === undefined || value === null ? "" : String(value);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCSV(rows: Record<string, any>[], columns?: readonly string[]): string {
  if (!rows || rows.length === 0) {
    return (columns || []).join(",") + (columns ? "\n" : "");
  }
  const cols = columns || Object.keys(rows[0]);
  const header = cols.map(escapeCell).join(",");
  const body = rows.map((r) => cols.map((c) => escapeCell(r[c])).join(",")).join("\n");
  return `${header}\n${body}\n`;
}

export function dateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function appendLeadCsv(lead: Lead, dir: string = CSV_DIR): Promise<string> {
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, `leads-${dateKey(new Date(lead.createdAt || Date.now()))}.csv`);
  let needsHeader = false;
  try {
    await fs.access(file);
  } catch {
    needsHeader = true;
  }
  const line = LEAD_COLUMNS.map((c) => escapeCell((lead as any)[c])).join(",") + "\n";
  const prefix = needsHeader ? LEAD_COLUMNS.join(",") + "\n" : "";
  await fs.appendFile(file, prefix + line, "utf8");
  return file;
}
