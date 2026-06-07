"use client";

import Link from "next/link";
import type { Listing } from "@/lib/types";
import { money, imgOf } from "@/lib/format";
import { Pin, ArrowRight } from "./Icons";
import { useLang } from "./LangProvider";

export default function ListingCard({ listing, showType = true }: { listing: Listing; showType?: boolean }) {
  const l = listing;
  const { t } = useLang();
  return (
    <Link
      href={`/listing/${l.id}`}
      className="group flex flex-col bg-white border border-line rounded-xl2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg2 hover:border-line-strong"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgOf(l)} alt={l.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-3 left-3 right-3 flex gap-1.5">
          <span className={l.dealType === "rent" ? "pill pill-rent" : "pill pill-sale"}>{l.dealType === "rent" ? t("For Rent") : t("For Sale")}</span>
          {showType && l.propertyType && <span className="pill pill-white ml-auto">{l.propertyType}</span>}
        </div>
      </div>
      <div className="p-[18px] pb-5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-xs text-mute mb-2">
          <Pin className="w-[13px] h-[13px] text-brass" />
          {[l.city, l.state].filter(Boolean).join(", ")}
        </div>
        <h3 className="font-serif text-[19px] leading-snug mb-3">{l.title}</h3>
        {l.specs && l.specs.length > 0 && (
          <div className="flex flex-wrap gap-x-3.5 gap-y-1.5 text-xs text-ink-2 mb-4">
            {l.specs.slice(0, 3).map((s, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-brass">{s}</span>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between gap-2.5 pt-3.5 border-t border-line-2">
          <div className="font-serif text-xl text-navy">{money(l)}</div>
          <span className="text-[13px] font-semibold text-brass-2 inline-flex items-center gap-1.5">
            {t("View")} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
