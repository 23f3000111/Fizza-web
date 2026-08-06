// Nightly leads email. Builds a CSV of a day's leads and emails it to the client.
// If SMTP is not configured the send is skipped (CSV is still written on disk).
import nodemailer from "nodemailer";
import { db } from "./db";
import { toCSV, dateKey, LEAD_COLUMNS } from "./csv";
import type { Lead } from "./types";

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function buildTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

export async function leadsForDate(dayKey: string): Promise<Lead[]> {
  const all = await db.leads.find();
  return all.filter((l) => dateKey(new Date(l.createdAt!)) === dayKey);
}

export interface ReportResult {
  sent: boolean;
  skipped: boolean;
  count: number;
  reason?: string;
}

export async function sendLeadsReport(dayKey?: string): Promise<ReportResult> {
  if (!dayKey) {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    dayKey = dateKey(y);
  }
  const leads = await leadsForDate(dayKey);
  const csv = toCSV(leads as any, LEAD_COLUMNS);
  const to = process.env.CLIENT_EMAIL;

  if (!smtpConfigured()) {
    console.log(`  [leads] SMTP not configured — skipped email for ${dayKey} (${leads.length} leads). CSV on disk.`);
    return { sent: false, skipped: true, count: leads.length, reason: "smtp-not-configured" };
  }
  if (!to) {
    return { sent: false, skipped: true, count: leads.length, reason: "no-recipient" };
  }

  const transport = buildTransport();
  const subject = `M.I.R. · Website leads for ${dayKey} (${leads.length})`;
  const summary = leads.length
    ? leads.map((l) => `• ${l.name} — ${l.phone}${l.email ? " — " + l.email : ""}`).join("\n")
    : "No new leads were captured on this date.";

  await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    text: `Hi M.I.R. team,\n\nHere are the website chatbot leads collected on ${dayKey}.\nTotal: ${leads.length}\n\n${summary}\n\nThe full CSV is attached.\n\n— M.I.R. website`,
    attachments: [{ filename: `leads-${dayKey}.csv`, content: csv, contentType: "text/csv" }],
  });

  console.log(`  [leads] Emailed ${leads.length} leads for ${dayKey} to ${to}.`);
  return { sent: true, skipped: false, count: leads.length };
}
