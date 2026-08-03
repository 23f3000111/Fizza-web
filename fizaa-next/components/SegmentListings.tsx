"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { fetchJSON } from "@/lib/clientApi";
import { money, imgOf } from "@/lib/format";
import { tListing, tPhrase } from "@/lib/listing-i18n";
import type { Lang } from "@/lib/i18n";
import type { Listing, Meta, Segment } from "@/lib/types";
import { SITE } from "@/lib/site";
import { Search, Pin, ArrowRight } from "./Icons";
import ListingsMap from "./ListingsMap";
import { useLang } from "./LangProvider";

const num = (v: string) => {
  const n = Number(v.replace(/[^0-9.]/g, ""));
  return v && Number.isFinite(n) ? n : null;
};

export default function SegmentListings({
  segment,
  title,
  subtitle,
}: {
  segment: Segment;
  title: string;
  subtitle: string;
}) {
  const { t, lang } = useLang();
  const [all, setAll] = useState<Listing[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [region, setRegion] = useState("");
  const [q, setQ] = useState("");
  const [dealType, setDealType] = useState("");
  const [ptype, setPtype] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  const [focusId, setFocusId] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [m, a] = await Promise.all([fetchJSON<Meta>("/api/meta"), fetchJSON<Listing[]>("/api/listings")]);
        setMeta(m);
        setAll(a.filter((l) => l.segment === segment));
      } finally {
        setLoaded(true);
      }
    })();
  }, [segment]);

  // Location + property-type options come only from listings that exist in this
  // segment (admin-created) — never a hard-coded list.
  const propertyTypes = useMemo(
    () => [...new Set(all.map((l) => l.propertyType).filter(Boolean) as string[])].sort(),
    [all]
  );
  const regions = useMemo(
    () => [...new Set(all.map((l) => l.state).filter(Boolean) as string[])].sort(),
    [all]
  );

  const filtered = useMemo(() => {
    const minP = num(minPrice);
    const maxP = num(maxPrice);
    const list = all.filter((l) => {
      if (dealType && l.dealType !== dealType) return false;
      if (ptype && l.propertyType !== ptype) return false;
      if (region && (l.state || "").toLowerCase() !== region.toLowerCase()) return false;
      if (q) {
        const hay = [l.title, l.shortDesc, l.description, l.city, l.state, l.address].filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      if (minP != null && (l.price == null || l.price < minP)) return false;
      if (maxP != null && (l.price == null || l.price > maxP)) return false;
      return true;
    });
    const p = (l: Listing) => (l.price == null ? null : Number(l.price));
    switch (sort) {
      case "price-asc": return [...list].sort((a, b) => (p(a) ?? Infinity) - (p(b) ?? Infinity));
      case "price-desc": return [...list].sort((a, b) => (p(b) ?? -Infinity) - (p(a) ?? -Infinity));
      case "oldest": return [...list].sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
      default: return [...list].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    }
  }, [all, dealType, ptype, region, q, minPrice, maxPrice, sort]);

  return (
    <>
      {/* header */}
      <section className="navy-gradient text-white pt-9 pb-24">
        <div className="container-site">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-serif text-2xl sm:text-3xl text-white tracking-tight">Fizaa</span>
            <span className="w-px h-6 bg-white/25 hidden sm:block" />
            <h1 className="font-serif text-xl sm:text-3xl text-white">{title}</h1>
          </div>
          <p className="text-[#B9C7D8] mt-2 max-w-[60ch]">{subtitle}</p>
        </div>
      </section>

      {/* search + filters */}
      <div className="container-site -mt-16 relative z-[5]">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white rounded-xl2 shadow-lg2 border border-line p-3 flex flex-col sm:flex-row gap-2.5"
        >
          <div className="flex items-center gap-2 bg-cream rounded-full px-3.5 sm:w-[190px] shrink-0">
            <Pin className="w-4 h-4 text-brass shrink-0" />
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="bg-transparent w-full py-3 text-[14px] focus:outline-none">
              <option value="">{t("All Malaysia")}</option>
              {regions.map((s) => <option key={s} value={s}>{tPhrase(lang, s)}</option>)}
            </select>
          </div>
          <input value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 px-4 py-3 rounded-full bg-cream text-[14.5px] focus:outline-none focus:ring-2 focus:ring-navy-soft" placeholder={t("Search property…")} />
          <button type="submit" className="btn btn-primary !rounded-full px-6"><Search className="w-4 h-4" /> {t("Search")}</button>
        </form>

        {/* filter chips */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <Seg label={t("All")} active={dealType === ""} onClick={() => setDealType("")} />
          <Seg label={t("Sale")} active={dealType === "sale"} onClick={() => setDealType("sale")} />
          <Seg label={t("Rent")} active={dealType === "rent"} onClick={() => setDealType("rent")} />
          <span className="w-px h-5 bg-line-strong mx-1" />
          <select value={ptype} onChange={(e) => setPtype(e.target.value)} className="chip-select">
            <option value="">{t("Property Type")}</option>
            {(propertyTypes.length ? propertyTypes : meta?.propertyTypes || []).map((pt) => <option key={pt} value={pt}>{tPhrase(lang, pt)}</option>)}
          </select>
          <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} inputMode="numeric" placeholder={t("Min price")} className="chip-select w-[120px]" />
          <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} inputMode="numeric" placeholder={t("Max price")} className="chip-select w-[120px]" />
        </div>
      </div>

      {/* results */}
      <div className="container-site grid lg:grid-cols-[1fr_300px] gap-7 py-8 pb-16 items-start">
        <main>
          {/* map */}
          {filtered.some((l) => l.lat != null && l.lng != null) && (
            <div className="mb-5">
              <button onClick={() => setMapOpen((o) => !o)} className="text-[13px] font-semibold text-brass-2 mb-2 inline-flex items-center gap-1.5">
                {mapOpen ? t("Hide map") : t("Show map")}
              </button>
              {mapOpen && (
                <div className="relative z-[1] h-[340px] rounded-xl2 overflow-hidden border border-line">
                  <ListingsMap listings={filtered} focusId={focusId} onSelect={(id) => { document.querySelector(`[data-row="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" }); }} />
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div className="font-serif text-lg text-navy">{loaded ? `${filtered.length} ${filtered.length === 1 ? t("property") : t("properties")}` : t("Loading…")}</div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="select !h-auto !py-2.5 min-w-[160px]">
              <option value="newest">{t("Sort: Newest")}</option>
              <option value="price-asc">{t("Price: Low to High")}</option>
              <option value="price-desc">{t("Price: High to Low")}</option>
              <option value="oldest">{t("Oldest")}</option>
            </select>
          </div>

          {loaded && filtered.length === 0 ? (
            <div className="text-center border border-dashed border-line-strong rounded-xl2 py-16 px-6">
              <div className="font-serif text-xl text-navy mb-2">{t("No properties here yet.")}</div>
              <p className="text-mute mb-4">{t("Tell Fizaa what you need and she'll source it for you.")}</p>
              <Link href="/quote" className="btn btn-brass">{t("Get a Quote")}</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {filtered.map((l) => <Row key={l.id} l={l} t={t} lang={lang} />)}
            </div>
          )}
        </main>

        {/* sidebar CTA (replaces subsaleking's app/QR card) */}
        <aside className="lg:sticky lg:top-[88px] flex flex-col gap-4">
          <div className="bg-white border border-line rounded-xl2 p-[22px] text-center shadow-sm2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fiza-website-images/MRL_8310.JPG" alt="Fizaa" className="w-[72px] h-[72px] rounded-full object-cover object-[center_20%] mx-auto mb-3" />
            <div className="font-serif text-[18px]">Nur Hafizah · Fizaa</div>
            <div className="text-[12.5px] text-mute mt-1 mb-4">REN 63161 · Esprit Estate</div>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-brass btn-block mb-2">{t("WhatsApp Fizaa")}</a>
            <Link href="/quote" className="btn btn-ghost btn-block">{t("Get a Quote")}</Link>
          </div>
          <div className="navy-gradient text-white rounded-xl2 p-[22px]">
            <h3 className="font-serif text-lg text-white mb-1.5">{t("Looking for something specific?")}</h3>
            <p className="text-[#B9C7D8] text-[13.5px] mb-3.5">{t("Share your brief — size, power, zoning, budget — and get matched, including off-market.")}</p>
            <Link href="/quote" className="btn btn-white btn-block">{t("Tell Fizaa")}</Link>
          </div>
        </aside>
      </div>
    </>
  );
}

function Seg({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`px-4 py-2 rounded-full text-[13px] font-medium border transition ${active ? "bg-navy text-white border-navy" : "bg-white text-ink-2 border-line-strong hover:border-navy"}`}>{label}</button>
  );
}

function Row({ l, t, lang }: { l: Listing; t: (s: string) => string; lang: Lang }) {
  const tl = tListing(lang, l);
  return (
    <Link href={`/listing/${l.id}`} data-row={l.id} className="group grid grid-cols-[120px_1fr] sm:grid-cols-[210px_1fr_auto] gap-4 sm:gap-5 bg-white border border-line rounded-xl2 p-3 sm:p-3.5 hover:shadow-md2 hover:border-line-strong transition-all scroll-mt-[88px]">
      <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden bg-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgOf(l)} alt={tl.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className={`absolute top-2 left-2 ${l.dealType === "rent" ? "pill pill-rent" : "pill pill-sale"} !text-[10px] !px-2 !py-0.5`}>{l.dealType === "rent" ? t("For Rent") : t("For Sale")}</span>
      </div>
      <div className="min-w-0 flex flex-col justify-center">
        <h3 className="font-serif text-[18px] sm:text-[21px] leading-snug group-hover:text-navy transition-colors truncate">{tl.title}</h3>
        <div className="flex items-center gap-1.5 text-[13px] text-mute mt-1.5">
          <Pin className="w-[14px] h-[14px] text-brass shrink-0" />
          <span className="truncate">{[tl.city, tl.state].filter(Boolean).join(", ") || "—"}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-ink-2 mt-2.5">
          {tl.propertyType && <span className="inline-flex items-center gap-1.5">🏢 {tl.propertyType}</span>}
          {l.beds != null && l.beds > 0 && <span className="inline-flex items-center gap-1.5">🛏 {l.beds} {t("beds")}</span>}
          {l.baths != null && l.baths > 0 && <span className="inline-flex items-center gap-1.5">🛁 {l.baths} {t("baths")}</span>}
          {l.size != null && <span className="inline-flex items-center gap-1.5">📐 {Number(l.size).toLocaleString("en-MY")} {tl.sizeUnit || "sqft"}</span>}
        </div>
      </div>
      <div className="hidden sm:flex flex-col justify-center items-end text-right pr-2">
        <div className="font-serif text-xl text-navy whitespace-nowrap">{t(money({ ...l, priceLabel: tl.priceLabel }))}</div>
        <span className="text-[13px] font-semibold text-brass-2 inline-flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{t("View")} <ArrowRight className="w-3.5 h-3.5" /></span>
      </div>
      {/* price on mobile (under details) */}
      <div className="sm:hidden col-span-2 -mt-1 font-serif text-lg text-navy">{t(money({ ...l, priceLabel: tl.priceLabel }))}</div>
    </Link>
  );
}
