"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchJSON } from "@/lib/clientApi";
import type { Listing, Meta } from "@/lib/types";
import ListingCard from "@/components/ListingCard";
import ListingsMap from "@/components/ListingsMap";
import { Search, Chevron } from "@/components/Icons";
import { useLang } from "@/components/LangProvider";

const num = (v: string) => {
  const n = Number(v.replace(/[^0-9.]/g, ""));
  return v && Number.isFinite(n) ? n : null;
};
const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="container-site py-24 text-center text-mute">Loading…</div>}>
      <ListingsInner />
    </Suspense>
  );
}

function ListingsInner() {
  const { t } = useLang();
  const sp = useSearchParams();
  const [all, setAll] = useState<Listing[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [dealType, setDealType] = useState("");
  const [q, setQ] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [attrs, setAttrs] = useState<Record<string, string[]>>({});
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  const [focusId, setFocusId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mapHidden, setMapHidden] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const [m, a] = await Promise.all([fetchJSON<Meta>("/api/meta"), fetchJSON<Listing[]>("/api/listings")]);
        setMeta(m);
        setAll(a);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (sp.get("propertyType")) setTypes([sp.get("propertyType")!]);
    if (sp.get("city")) setCities([sp.get("city")!]);
    if (sp.get("dealType")) setDealType(sp.get("dealType")!);
    if (sp.get("q")) setQ(sp.get("q")!);
  }, [sp]);

  const distinctAttr = (key: string) => [...new Set(all.map((l) => l.attributes?.[key]).filter(Boolean) as string[])].sort();

  const filtered = useMemo(() => {
    const minP = num(minPrice);
    const maxP = num(maxPrice);
    const list = all.filter((l) => {
      if (dealType && l.dealType !== dealType) return false;
      if (types.length && !types.includes(l.propertyType || "")) return false;
      if (cities.length && !cities.includes(l.city || "")) return false;
      if (q) {
        const hay = [l.title, l.shortDesc, l.description, l.city, l.state, l.address].filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      if (minP != null && (l.price == null || l.price < minP)) return false;
      if (maxP != null && (l.price == null || l.price > maxP)) return false;
      for (const [key, vals] of Object.entries(attrs)) {
        if (!vals.length) continue;
        const v = l.attributes?.[key];
        if (!v || !vals.includes(v)) return false;
      }
      return true;
    });
    const p = (l: Listing) => (l.price == null ? null : Number(l.price));
    switch (sort) {
      case "price-asc": return [...list].sort((a, b) => (p(a) ?? Infinity) - (p(b) ?? Infinity));
      case "price-desc": return [...list].sort((a, b) => (p(b) ?? -Infinity) - (p(a) ?? -Infinity));
      case "oldest": return [...list].sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
      default: return [...list].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    }
  }, [all, dealType, types, cities, q, minPrice, maxPrice, attrs, sort]);

  const countBy = (key: "propertyType" | "city", v: string) => all.filter((l) => l[key] === v).length;
  const others = (meta?.filterFields || []).filter((f) => f.type === "select" || distinctAttr(f.key).length > 1);

  function onMarkerSelect(id: string) {
    setActiveId(id);
    document.querySelector(`[data-card="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function clearAll() {
    setDealType(""); setQ(""); setTypes([]); setCities([]); setAttrs({}); setMinPrice(""); setMaxPrice("");
  }

  return (
    <>
      {/* header */}
      <section className="navy-gradient text-white pt-8 pb-24">
        <div className="container-site">
          <span className="eyebrow text-brass-soft before:bg-brass-soft">{t("Our Listings")}</span>
          <h1 className="font-serif text-3xl sm:text-[44px] text-white mt-3">{t("Industrial & commercial property across Malaysia.")}</h1>
          <p className="text-[#B9C7D8] mt-2">{t("Search by type, location and more — and see everything on the map.")}</p>
        </div>
      </section>

      {/* search bar */}
      <div className="container-site -mt-16 relative z-[5]">
        <form
          onSubmit={(e) => { e.preventDefault(); gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
          className="bg-white rounded-xl2 shadow-lg2 border border-line p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_1.4fr_1fr_1fr_auto] gap-2.5 items-center"
        >
          <div className="flex bg-cream rounded-full p-1 lg:col-auto col-span-full">
            {[["", "All"], ["sale", "Sale"], ["rent", "Rent"]].map(([v, label]) => (
              <button key={v} type="button" onClick={() => setDealType(v)} className={`px-3.5 py-2.5 rounded-full text-[13px] font-medium transition ${dealType === v ? "bg-navy text-white" : "text-ink-2"}`}>{t(label)}</button>
            ))}
          </div>
          <input value={q} onChange={(e) => setQ(e.target.value)} className="input !h-[46px]" placeholder={t("Search keyword (e.g. factory, warehouse, Banting)")} />
          <select value={types.length === 1 ? types[0] : ""} onChange={(e) => setTypes(e.target.value ? [e.target.value] : [])} className="select !h-[46px]">
            <option value="">{t("Property Type")}</option>
            {meta?.propertyTypes.map((pt) => <option key={pt} value={pt}>{pt}</option>)}
          </select>
          <select value={cities.length === 1 ? cities[0] : ""} onChange={(e) => setCities(e.target.value ? [e.target.value] : [])} className="select !h-[46px]">
            <option value="">{t("All Cities")}</option>
            {meta?.cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="submit" className="btn btn-brass !h-[46px]"><Search className="w-4 h-4" /> {t("Search")}</button>
        </form>
      </div>

      <div className="container-site grid lg:grid-cols-[290px_1fr] gap-7 py-9 pb-16 items-start">
        {/* sidebar */}
        <aside className={`bg-white border border-line rounded-xl2 lg:sticky lg:top-[88px] ${sidebarOpen ? "fixed inset-y-0 left-0 z-[120] w-[300px] max-w-[88vw] overflow-y-auto rounded-none" : "hidden lg:block"}`}>
          <div className="flex items-center justify-between p-[18px] border-b border-line-2">
            <h3 className="font-sans text-sm font-bold tracking-wide">{t("Filters")}</h3>
            <div className="flex gap-3 items-center">
              <button onClick={clearAll} className="text-[12.5px] text-brass-2 font-semibold">{t("Clear all")}</button>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-mute text-xl leading-none">×</button>
            </div>
          </div>
          <FilterGroup title={t("Type")}>
            {meta?.propertyTypes.length ? meta.propertyTypes.map((pt) => (
              <CheckRow key={pt} label={pt} count={countBy("propertyType", pt)} checked={types.includes(pt)} onChange={() => setTypes((a) => toggle(a, pt))} />
            )) : <Empty t={t} />}
          </FilterGroup>
          <FilterGroup title={t("Location")}>
            {meta?.cities.length ? meta.cities.map((c) => (
              <CheckRow key={c} label={c} count={countBy("city", c)} checked={cities.includes(c)} onChange={() => setCities((a) => toggle(a, c))} />
            )) : <Empty t={t} />}
          </FilterGroup>
          <FilterGroup title={t("Price (MYR)")}>
            <div className="flex gap-2 py-1">
              <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} inputMode="numeric" className="input !h-10 !text-[13px]" placeholder={t("Min")} />
              <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} inputMode="numeric" className="input !h-10 !text-[13px]" placeholder={t("Max")} />
            </div>
          </FilterGroup>
          <FilterGroup title={t("Others")} last>
            {others.length ? others.map((f) => {
              const vals = distinctAttr(f.key);
              if (!vals.length) return null;
              return (
                <div key={f.id} className="mb-2">
                  <h5 className="font-sans text-[11px] tracking-[0.1em] uppercase text-mute mt-2.5 mb-1.5">{f.label}</h5>
                  {vals.map((v) => (
                    <CheckRow key={v} label={v} count={all.filter((l) => l.attributes?.[f.key] === v).length}
                      checked={(attrs[f.key] || []).includes(v)}
                      onChange={() => setAttrs((prev) => ({ ...prev, [f.key]: toggle(prev[f.key] || [], v) }))} />
                  ))}
                </div>
              );
            }) : <p className="text-[13px] text-mute">{t("No extra filters yet")}</p>}
          </FilterGroup>
        </aside>

        {/* main */}
        <main>
          <div className="flex items-center justify-between gap-3.5 mb-[18px] flex-wrap">
            <div className="font-serif text-xl text-navy">{loaded ? `${filtered.length} ${filtered.length === 1 ? t("property") : t("properties")}` : t("Loading…")}</div>
            <div className="flex items-center gap-2.5">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden btn btn-ghost btn-sm">{t("Filters")}</button>
              <button onClick={() => setMapHidden((h) => !h)} className="lg:hidden btn btn-ghost btn-sm">{mapHidden ? t("Show map") : t("Hide map")}</button>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="select !h-auto !py-2.5 min-w-[150px]">
                <option value="newest">{t("Sort: Newest")}</option>
                <option value="price-asc">{t("Price: Low to High")}</option>
                <option value="price-desc">{t("Price: High to Low")}</option>
                <option value="oldest">{t("Oldest")}</option>
              </select>
            </div>
          </div>

          {!mapHidden && (
            <div className="relative z-[1] h-[380px] rounded-xl2 overflow-hidden border border-line mb-6">
              <ListingsMap listings={filtered} focusId={focusId} onSelect={onMarkerSelect} />
            </div>
          )}

          <div ref={gridRef} className="grid sm:grid-cols-2 xl:grid-cols-3 gap-[22px]">
            {loaded && filtered.length === 0 ? (
              <div className="col-span-full text-center text-mute py-16">
                {t("No properties match your filters.")} <button onClick={clearAll} className="btn btn-ghost btn-sm ml-2">{t("Clear filters")}</button>
              </div>
            ) : (
              filtered.map((l) => (
                <div key={l.id} data-card={l.id} onMouseEnter={() => setFocusId(l.id)} className={activeId === l.id ? "ring-2 ring-brass rounded-xl2" : ""}>
                  <ListingCard listing={l} />
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}

function FilterGroup({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={last ? "" : "border-b border-line-2"}>
      <button onClick={() => setOpen((o) => !o)} className="flex items-center justify-between w-full px-[18px] py-[15px]">
        <h4 className="font-sans text-[13.5px] font-semibold">{title}</h4>
        <Chevron className={`w-[18px] h-[18px] text-mute transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && <div className="px-[18px] pb-4 flex flex-col gap-1 max-h-[260px] overflow-y-auto">{children}</div>}
    </div>
  );
}

function CheckRow({ label, count, checked, onChange }: { label: string; count: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 py-1.5 px-1 text-sm text-ink-2 rounded-md hover:bg-cream cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 accent-navy" />
      <span className="flex-1">{label}</span>
      <em className="not-italic text-xs text-faint">{count}</em>
    </label>
  );
}

function Empty({ t }: { t: (s: string) => string }) {
  return <p className="text-[13px] text-mute">{t("None yet")}</p>;
}
