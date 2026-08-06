import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { money } from "@/lib/format";
import { SITE } from "@/lib/site";
import { Pin } from "@/components/Icons";
import Gallery from "@/components/Gallery";
import DetailMap from "@/components/DetailMap";
import InquiryForm from "@/components/InquiryForm";
import { getLang, getT } from "@/lib/i18n-server";
import { tListing, tPhrase } from "@/lib/listing-i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const l = await db.listings.get(params.id);
  return { title: l ? l.title : "Listing" };
}

const labelFromKey = (k: string) => k.charAt(0).toUpperCase() + k.slice(1).replace(/[-_]/g, " ");

export default async function ListingDetail({ params }: { params: { id: string } }) {
  const l = await db.listings.get(params.id);
  if (!l || l.status === "hidden") notFound();
  const t = getT();
  const lang = getLang();
  const tl = tListing(lang, l);

  const baseRows: [string, string | number | null | undefined][] = [
    [t("Property type"), tl.propertyType],
    [t("Deal"), l.dealType === "rent" ? t("For Rent") : t("For Sale")],
    [t("City"), tl.city],
    [t("State"), tl.state],
    [t("Size"), l.size ? `${Number(l.size).toLocaleString("en-MY")} ${tl.sizeUnit || ""}` : ""],
    [t("Beds"), l.beds],
    [t("Baths"), l.baths],
  ];
  const attrRows = Object.entries(l.attributes || {}).filter(([, v]) => v);

  return (
    <div className="container-site">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="pt-5 pb-1">
        <ol className="flex items-center flex-wrap gap-1.5 text-[12.5px]">
          <li><Link href="/" className="inline-flex items-center px-2.5 py-1 rounded-full text-ink-2 hover:text-navy hover:bg-cream transition-colors">{t("Home")}</Link></li>
          <li className="text-faint" aria-hidden>›</li>
          <li><Link href="/listings" className="inline-flex items-center px-2.5 py-1 rounded-full text-ink-2 hover:text-navy hover:bg-cream transition-colors">{t("Listings")}</Link></li>
          <li className="text-faint" aria-hidden>›</li>
          <li><span className="inline-flex items-center px-2.5 py-1 rounded-full bg-navy-soft text-navy-2 font-medium max-w-[60vw] sm:max-w-[42ch] truncate">{tl.title}</span></li>
        </ol>
      </nav>

      <div className="flex items-start justify-between gap-5 flex-wrap my-3.5 mb-[22px]">
        <div>
          <div className="flex gap-2 mb-4">
            <span className={l.dealType === "rent" ? "pill pill-rent" : "pill pill-sale"}>{l.dealType === "rent" ? t("For Rent") : t("For Sale")}</span>
            {tl.propertyType && <span className="pill pill-soft">{tl.propertyType}</span>}
          </div>
          <h1 className="font-serif text-2xl sm:text-[42px] max-w-[22ch] leading-tight">{tl.title}</h1>
          <div className="text-mute flex items-center gap-1.5 mt-2.5 text-sm"><Pin className="w-4 h-4 text-brass" />{[l.address || tl.city, tl.state].filter(Boolean).join(", ")}</div>
        </div>
        <div className="text-right">
          <div className="font-serif text-2xl sm:text-[38px] text-navy">{t(money({ ...l, priceLabel: tl.priceLabel }))}</div>
          <div className="text-xs text-mute uppercase tracking-wide">{l.dealType === "rent" ? t("Rental") : t("Sale price")}</div>
        </div>
      </div>

      <Gallery images={l.images || []} title={tl.title} />

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 py-7 pb-[70px] items-start">
        <div>
          {tl.specs && tl.specs.length > 0 && (
            <Section title={t("Highlights")}>
              <div className="grid sm:grid-cols-2 gap-3">
                {tl.specs.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white border border-line rounded-xl px-4 py-3.5 text-sm before:content-[''] before:w-[7px] before:h-[7px] before:rounded-full before:bg-brass before:shrink-0">{s}</div>
                ))}
              </div>
            </Section>
          )}
          {tl.description && (
            <Section title={t("About this property")}>
              <p className="text-ink-2 text-[15.5px] leading-[1.7] whitespace-pre-line">{tl.description}</p>
            </Section>
          )}
          <Section title={t("Details")}>
            <table className="w-full border-collapse bg-white border border-line rounded-xl2 overflow-hidden">
              <tbody>
                {baseRows.filter(([, v]) => v != null && v !== "").map(([k, v]) => (
                  <Row key={k} k={k} v={String(v)} />
                ))}
                {attrRows.map(([k, v]) => <Row key={k} k={tPhrase(lang, labelFromKey(k))} v={tPhrase(lang, v)} />)}
              </tbody>
            </table>
          </Section>
          {(l.pdfUrl || (l.documents && l.documents.length > 0)) && (
            <Section title={t("Documents & brochures")}>
              <div className="flex flex-col gap-2.5">
                {l.documents?.map((d, i) => (
                  <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 bg-white border border-line rounded-xl px-4 py-3.5 text-sm font-medium hover:border-navy hover:shadow-sm2 transition">
                    <span className="grid place-items-center w-9 h-9 rounded-lg bg-navy-soft text-navy-2 shrink-0">
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                    </span>
                    <span className="flex-1 truncate">{d.name}</span>
                    <span className="text-mute text-[12.5px] group-hover:text-navy">{t("Download")} ↓</span>
                  </a>
                ))}
                {l.pdfUrl && (
                  <a href={l.pdfUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 bg-white border border-line rounded-xl px-4 py-3.5 text-sm font-medium hover:border-navy hover:shadow-sm2 transition">
                    <span className="grid place-items-center w-9 h-9 rounded-lg bg-navy-soft text-navy-2 shrink-0">
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 15h6M9 18h6" /></svg>
                    </span>
                    <span className="flex-1 truncate">Brochure (PDF)</span>
                    <span className="text-mute text-[12.5px] group-hover:text-navy">{t("Download")} ↓</span>
                  </a>
                )}
              </div>
            </Section>
          )}
          {l.lat != null && l.lng != null && (
            <Section title={t("Location")}>
              <DetailMap lat={l.lat} lng={l.lng} />
            </Section>
          )}
        </div>

        <aside className="lg:sticky lg:top-[88px] flex flex-col gap-[18px]">
          <div className="bg-white border border-line rounded-xl2 p-[22px] text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fiza-website-images/MRL_8310.JPG" alt="M.I.R. — industrial & commercial property consultant" className="w-[78px] h-[78px] rounded-full object-cover object-[center_20%] mx-auto mb-3" />
            <div className="font-serif text-[19px]">M.I.R.</div>
            <div className="text-[12.5px] text-mute mt-1 mb-3.5">REN 63161 · Esprit Estate</div>
            <a href={`${SITE.whatsapp}?text=${encodeURIComponent("Hi M.I.R., I am interested in: " + l.title)}`} target="_blank" rel="noopener noreferrer" className="btn btn-brass btn-block mb-2">{t("WhatsApp about this")}</a>
            <a href={`tel:${SITE.phoneRaw}`} className="btn btn-ghost btn-block">{t("Call")} {SITE.phone}</a>
          </div>
          <div className="bg-white border border-line rounded-xl2 p-[22px]">
            <h3 className="font-serif text-lg">{t("Enquire about this property")}</h3>
            <div className="text-[13px] text-mute mb-4">{t("We reply personally.")}</div>
            <InquiryForm listingId={l.id} listingTitle={l.title} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      {title && <h2 className="font-serif text-[22px] mb-3.5">{title}</h2>}
      {children}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <tr className="border-b border-line-2 last:border-0">
      <td className="py-3.5 px-[18px] text-mute w-2/5 text-[14.5px]">{k}</td>
      <td className="py-3.5 px-[18px] font-medium text-[14.5px]">{v}</td>
    </tr>
  );
}
