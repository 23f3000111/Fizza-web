"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";
import { useLang } from "./LangProvider";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-2 text-[#D9E1EC] pt-12 sm:pt-20 pb-8 mt-auto">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="font-serif text-2xl text-white">
              Nur Hafizah · Fizaa
              <small className="block font-sans text-[11px] tracking-[0.14em] uppercase text-[#8DA0B6] mt-1.5">
                {t("Industrial & Commercial · Malaysia")}
              </small>
            </div>
            <p className="mt-4 text-sm text-[#A9B6C6] max-w-[36ch] leading-relaxed">
              {t("A dedicated estate negotiator under")} {SITE.agency}. {t("Licensed, focused, and genuinely committed to solving your industrial & commercial property needs.")}
            </p>
          </div>
          <FootCol title={t("Explore")} links={[["/", t("Home")], ["/industrial", t("Industrial")], ["/commercial", t("Commercial")], ["/hotel", t("Hotel")], ["/faq", t("FAQ")], ["/contact", t("Contact")]]} />
          <FootCol title={t("Specialties")} links={[["/industrial", t("Factories")], ["/industrial", t("Warehouses")], ["/hotel", t("Hotel Assets")], ["/industrial", t("Industrial Land")], ["/quote", t("Get a Quote")]]} />
          <div>
            <h5 className="font-sans text-xs tracking-[0.14em] uppercase text-white mb-4 font-semibold">{t("Reach")}</h5>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><a className="hover:text-white" href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a></li>
              <li><a className="hover:text-white" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a className="hover:text-white break-all" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li>{SITE.ren}</li>
            </ul>
          </div>
        </div>
        {/* Powered by ESP */}
        <div className="flex items-center justify-center sm:justify-start gap-3 pt-8 pb-2">
          <span className="text-[12px] tracking-wide text-[#8DA0B6] uppercase">{t("Powered by")}</span>
          <span className="inline-flex items-center bg-white rounded-lg px-3 py-2 shadow-sm2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fiza-website-images/ESP-Logo.png" alt="ESP · Esprit Estate Agent" className="h-7 w-auto" />
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 mt-2 border-t border-white/10 text-[12.5px] text-[#8DA0B6]">
          <div>© {year} · Nur Hafizah Abd Aziz · {SITE.ren} · {SITE.agency}</div>
          <div className="flex gap-2">
            {[["WA", SITE.whatsapp], ["FB", "#"], ["IG", "#"]].map(([label, h]) => (
              <a key={label} href={h} target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-[9px] border border-white/15 grid place-items-center text-[11px] font-semibold hover:bg-white/10">{label}</a>
            ))}
          </div>
          <div>{t("Built for industrial & commercial Malaysia")}</div>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h5 className="font-sans text-xs tracking-[0.14em] uppercase text-white mb-4 font-semibold">{title}</h5>
      <ul className="flex flex-col gap-2.5 text-sm">
        {links.map(([href, label]) => (
          <li key={label}><Link className="hover:text-white" href={href}>{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
