import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { SITE } from "@/lib/site";

// Rebuilt on request so newly published listings appear without a redeploy.
export const dynamic = "force-dynamic";

const STATIC_ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, freq: "weekly" },
  { path: "/listings", priority: 0.9, freq: "daily" },
  { path: "/industrial", priority: 0.9, freq: "daily" },
  { path: "/commercial", priority: 0.8, freq: "daily" },
  { path: "/hotel", priority: 0.8, freq: "weekly" },
  { path: "/journey", priority: 0.6, freq: "monthly" },
  { path: "/faq", priority: 0.6, freq: "monthly" },
  { path: "/contact", priority: 0.7, freq: "monthly" },
  { path: "/quote", priority: 0.7, freq: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  let listingEntries: MetadataRoute.Sitemap = [];
  try {
    const listings = (await db.listings.find()).filter((l) => l.status !== "hidden");
    listingEntries = listings.map((l) => ({
      url: `${SITE.url}/listing/${l.id}`,
      lastModified: new Date(l.updatedAt || l.createdAt || now),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // A sitemap missing listings is better than a 500 on /sitemap.xml.
  }

  return [...staticEntries, ...listingEntries];
}
