"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchJSON } from "@/lib/clientApi";
import type { Meta } from "@/lib/types";
import { SITE } from "@/lib/site";
import { Search, Pin, ArrowRight } from "./Icons";
import { useLang } from "./LangProvider";

export default function HomeHero() {
  const { t, lang } = useLang();
  const router = useRouter();
  const [region, setRegion] = useState("");
  const [q, setQ] = useState("");
  // Location options come from admin-created listings (distinct states), not a hard-coded list.
  const [regions, setRegions] = useState<string[]>([]);

  useEffect(() => {
    fetchJSON<Meta>("/api/meta").then((m) => setRegions(m.states || [])).catch(() => {});
  }, []);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    // /listings searches across title/city/state/address, so folding the region
    // into the query filters by state without a separate param.
    const terms = [q.trim(), region].filter(Boolean).join(" ").trim();
    const params = new URLSearchParams();
    if (terms) params.set("q", terms);
    router.push(`/listings${params.toString() ? "?" + params.toString() : ""}`);
  }

  return (
    <header
      className="relative min-h-[88vh] flex items-center overflow-hidden"
      /* Averaged tone of the poster frame. Only visible for the instant before
         the poster decodes — keeps that gap from flashing white, without the
         blue block that used to read as the video failing to load. */
      style={{ backgroundColor: "#7C7D80" }}
    >
      {/* Aerial drift over an industrial estate (Pexels #32338863 by Toàn BDS,
          Pexels License: free for commercial use, no attribution required).
          Re-encoded to 1080p/30fps, 20 s, with the last 2 s crossfaded into
          the first so the loop has no visible seam.
          Poster is frame 0 of the video itself, so the still and the first
          played frame are identical — the handover is invisible. metadata
          preload lets the 290 KB poster win the race against the 6 MB video. */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/hero-industrial-poster.jpg"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/media/hero-industrial.mp4" type="video/mp4" />
      </video>
      {/* legibility overlays (opacity steps must exist in Tailwind's scale —
          an off-scale value like /92 is silently dropped and the whole
          gradient disappears) */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-2/90 via-navy-2/70 to-navy-2/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-2/85 via-transparent to-navy-2/40" />

      <div className="container-site relative py-24 sm:py-28">
        <div className="max-w-[760px]">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-brass-soft">
            <span className="w-5 h-px bg-brass" /> {SITE.name}
          </span>

          <h1 className="font-bold tracking-tight text-white text-[38px] sm:text-[54px] lg:text-[66px] leading-[1.06] mt-5">
            {lang === "bm" ? (
              <>Rakan <span className="text-brass-soft">Dipercayai</span> Anda dalam Hartanah Perindustrian &amp; Komersial.</>
            ) : lang === "zh" ? (
              <>您<span className="text-brass-soft">值得信赖</span>的工业与商业地产伙伴。</>
            ) : (
              <>Your <span className="text-brass-soft">Trusted</span> Partner in Industrial &amp; Commercial Property.</>
            )}
          </h1>

          <p className="mt-5 text-[17px] sm:text-[18px] text-[#D7E0EC] max-w-[52ch]">
            {t("Factories, warehouses, hotels, offices and industrial land across Malaysia — handled personally by dedicated negotiators, from first enquiry to final handover.")}
          </p>

          {/* search bar (#5) */}
          <form onSubmit={onSearch} className="mt-8 bg-white/95 backdrop-blur rounded-2xl2 shadow-lg2 p-2.5 flex flex-col sm:flex-row gap-2.5 max-w-[620px]">
            <div className="flex items-center gap-2 bg-cream rounded-full px-3.5 sm:w-[185px] shrink-0">
              <Pin className="w-4 h-4 text-brass shrink-0" />
              <select value={region} onChange={(e) => setRegion(e.target.value)} className="bg-transparent w-full py-3 text-[14px] text-ink focus:outline-none">
                <option value="">{t("All Malaysia")}</option>
                {regions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <input value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 px-4 py-3 rounded-full bg-cream text-[14.5px] text-ink focus:outline-none focus:ring-2 focus:ring-navy-soft" placeholder={t("Search property…")} />
            <button type="submit" className="btn btn-brass !rounded-full px-6"><Search className="w-4 h-4" /> {t("Search")}</button>
          </form>

          {/* quick segment links */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <span className="text-[13px] text-[#AEBED0]">{t("Explore:")}</span>
            {[
              { href: "/industrial", label: t("Industrial") },
              { href: "/commercial", label: t("Commercial") },
              { href: "/hotel", label: t("Hotel") },
            ].map((s) => (
              <Link key={s.href} href={s.href} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[13px] font-medium transition">
                {s.label} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
