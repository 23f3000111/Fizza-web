// Build a Listing payload from an admin FormData submission: resolves/creates
// category + sub-category, ensures filter fields exist for "Others" attributes,
// and saves uploaded images + documents (PDF / Word) to the writable /uploads dir.
// Files are served back through /api/uploads/<name> so they work in dev, in
// `next start`, and on any host (Next.js does not reliably serve files written
// to /public at runtime).
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { db } from "./db";
import { newId, slugify } from "./ids";
import type { Category, SubCategory, Listing, DocFile } from "./types";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

// File types accepted for the document/brochure slot.
const DOC_EXT = new Set([".pdf", ".doc", ".docx", ".xls", ".xlsx"]);

const str = (v: unknown, max = 4000) => (v == null ? "" : String(v).trim().slice(0, max));
const numOrNull = (v: unknown): number | null => {
  const s = str(v).replace(/[^0-9.\-]/g, "");
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};

function parseJson<T>(value: unknown, fallback: T): T {
  if (value == null || value === "") return fallback;
  if (typeof value === "object") return value as T;
  try {
    return JSON.parse(String(value)) as T;
  } catch {
    return fallback;
  }
}

async function saveFile(file: File): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(file.name).toLowerCase().replace(/[^a-z0-9.]/g, "").slice(0, 8) || "";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, name), buf);
  return `/api/uploads/${name}`;
}

// Friendly original filename for documents (so downloads keep a sensible name).
const cleanName = (s: string) => str(s, 120).replace(/[\r\n\t]/g, " ") || "document";

async function resolveCategory(id: string, name: string): Promise<Category | null> {
  if (id) {
    const c = await db.categories.get(id);
    if (c) return c;
  }
  const clean = str(name, 80);
  if (!clean) return null;
  const all = await db.categories.find();
  const found = all.find((c) => c.name.toLowerCase() === clean.toLowerCase());
  if (found) return found;
  return db.categories.insert({ id: newId("cat-"), name: clean, slug: slugify(clean) });
}

async function resolveSubCategory(id: string, name: string, categoryId: string | null): Promise<SubCategory | null> {
  if (id) {
    const s = await db.subcategories.get(id);
    if (s) return s;
  }
  const clean = str(name, 80);
  if (!clean) return null;
  const all = await db.subcategories.find();
  const found = all.find((s) => s.categoryId === categoryId && s.name.toLowerCase() === clean.toLowerCase());
  if (found) return found;
  return db.subcategories.insert({ id: newId("sub-"), categoryId: categoryId || "", name: clean, slug: slugify(clean) });
}

async function ensureFilterFields(attributes: Record<string, string>) {
  const fields = await db.filterFields.find();
  const known = new Set(fields.map((f) => f.key));
  for (const [key, value] of Object.entries(attributes || {})) {
    if (known.has(key) || !value) continue;
    const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/[-_]/g, " ");
    await db.filterFields.insert({ id: newId("ff-"), key, label, type: "text", options: [] });
    known.add(key);
  }
}

export async function buildListingPayload(form: FormData): Promise<Partial<Listing>> {
  const g = (k: string) => str(form.get(k));
  const category = await resolveCategory(g("categoryId"), g("categoryName"));
  const subCategory = await resolveSubCategory(g("subCategoryId"), g("subCategoryName"), category ? category.id : null);

  const attributes = parseJson<Record<string, string>>(form.get("attributes"), {});
  await ensureFilterFields(attributes);

  const specs = parseJson<string[] | null>(form.get("specs"), null) ||
    g("specs").split("\n").map((s) => s.trim()).filter(Boolean);

  const keptImages = parseJson<string[]>(form.get("existingImages"), []);
  const newFiles = form.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  const newImages: string[] = [];
  for (const f of newFiles) newImages.push(await saveFile(f));
  const images = [...keptImages, ...newImages];

  // Documents / brochures — accept PDF and Word (and spreadsheets), multiple files.
  const keptDocs = parseJson<DocFile[]>(form.get("existingDocuments"), []).filter((d) => d && d.url);
  const newDocFiles = form.getAll("documents").filter((f): f is File => f instanceof File && f.size > 0);
  const newDocs: DocFile[] = [];
  for (const f of newDocFiles) {
    const ext = path.extname(f.name).toLowerCase();
    if (!DOC_EXT.has(ext)) continue; // ignore unsupported doc types silently
    newDocs.push({ name: cleanName(f.name), url: await saveFile(f) });
  }
  const documents = [...keptDocs, ...newDocs];

  // Legacy single-PDF field kept for backward compatibility.
  let pdfUrl: string | null = g("existingPdf") || null;
  const pdf = form.get("pdf");
  if (pdf instanceof File && pdf.size > 0) pdfUrl = await saveFile(pdf);

  const segRaw = g("segment").toLowerCase();
  const segment = (["industrial", "commercial", "hotel"].includes(segRaw) ? segRaw : null) as Listing["segment"];

  return {
    title: g("title").slice(0, 200),
    slug: slugify(g("title")) + "-" + Math.random().toString(36).slice(2, 6),
    segment,
    categoryId: category ? category.id : null,
    subCategoryId: subCategory ? subCategory.id : null,
    propertyType: g("propertyType").slice(0, 80),
    dealType: g("dealType") === "rent" ? "rent" : "sale",
    city: g("city").slice(0, 80),
    state: g("state").slice(0, 80),
    address: g("address").slice(0, 240),
    lat: numOrNull(form.get("lat")),
    lng: numOrNull(form.get("lng")),
    price: numOrNull(form.get("price")),
    priceUnit: g("priceUnit").slice(0, 20) || "MYR",
    priceLabel: g("priceLabel").slice(0, 60),
    size: numOrNull(form.get("size")),
    sizeUnit: g("sizeUnit").slice(0, 30),
    beds: numOrNull(form.get("beds")),
    baths: numOrNull(form.get("baths")),
    featured: g("featured") === "true",
    status: g("status") === "hidden" ? "hidden" : "active",
    shortDesc: g("shortDesc").slice(0, 400),
    description: g("description").slice(0, 8000),
    images,
    pdfUrl,
    documents,
    specs,
    attributes,
  };
}
