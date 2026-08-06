import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { sortListings } from "@/lib/filter";
import ListingCard from "@/components/ListingCard";
import { SITE } from "@/lib/site";
import { Shield, Building, Clock, Check, ArrowRight } from "@/components/Icons";
import { getLang, getT } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Our Journey" };

export default async function JourneyPage() {
  const all = (await db.listings.find()).filter((l) => l.status !== "hidden");
  const projects = sortListings(all, "newest").slice(0, 6);
  const t = getT();
  const lang = getLang();

  return (
    <>
      {/* profile */}
      <section className="py-9 sm:py-16">
        <div className="container-site grid lg:grid-cols-[.85fr_1.15fr] gap-8 lg:gap-14 items-center">
          <div className="relative rounded-2xl2 overflow-hidden aspect-[4/5] shadow-lg2 bg-navy">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fiza-website-images/MRL_8310.JPG" alt="M.I.R. — industrial & commercial property consultant" className="w-full h-full object-cover object-[center_18%]" />
            <div className="absolute left-4 bottom-4 bg-white/90 backdrop-blur rounded-full px-3.5 py-2 text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-good" /> {t("Available")} · GMT+8
            </div>
          </div>
          <div>
            <span className="eyebrow">{t("Our Journey")}</span>
            <h1 className="font-serif text-4xl sm:text-6xl my-4">{t("Property is a people business.")}</h1>
            <p className="text-[19px] text-navy italic font-serif mb-4">&ldquo;{t("We're a friendly team that goes the extra mile to solve our clients' problems.")}&rdquo;</p>
            <p className="text-ink-2 mb-3.5">{lang === "bm"
              ? `M.I.R. — My Industrial Realtors — beroperasi sebagai Perunding Hartanah Berdaftar (REN 63161) di bawah ${SITE.agency} di Cyberjaya. Kami pakar dalam hartanah perindustrian dan komersial di seluruh Malaysia: kilang binaan khas, gudang logistik, pelaburan hotel dan taman perindustrian bertauliah GreenRE.`
              : lang === "zh"
              ? `M.I.R.（My Industrial Realtors）以注册地产协商员（REN 63161）身份，在赛城 ${SITE.agency} 执业。我们专精于马来西亚各地的工业与商业地产：订制厂房、物流仓库、酒店投资，以及获 GreenRE 认证的工业园。`
              : <>M.I.R. — My Industrial Realtors — operates as a Registered Estate Negotiator (REN 63161) under {SITE.agency} in Cyberjaya. We specialise in industrial and commercial property across Malaysia: purpose-built factories, logistics warehouses, hotel investments and GreenRE-certified industrial parks.</>}</p>
            <p className="text-ink-2">{t("Our approach is simple: understand the business first, then match it to the right space. Every listing is personally vetted, every client personally served — nothing handed off to an assistant or resolved by a template reply.")}</p>
            <div className="flex flex-wrap gap-2.5 mt-6">
              <Cred icon={<Shield className="w-[15px] h-[15px]" />} text="REN 63161" />
              <Cred icon={<Building className="w-[15px] h-[15px]" />} text="Esprit Estate Agent" />
              <Cred icon={<Clock className="w-[15px] h-[15px]" />} text={t("24/7 Response")} />
              <Cred icon={<Check className="w-[15px] h-[15px]" />} text={t("Industrial & Commercial")} />
            </div>
            <div className="mt-6 flex gap-3 flex-wrap">
              <Link href="/quote" className="btn btn-brass">{t("Work with us")}</Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* philosophy */}
      <section className="py-10">
        <div className="container-site">
          <div className="navy-gradient text-white rounded-2xl2 p-9 sm:p-16 text-center">
            <blockquote className="font-serif text-2xl sm:text-[40px] leading-tight">
              {lang === "bm"
                ? <>&ldquo;Sasarkan dan <em className="italic text-brass-soft not-italic">kawal keadaan.</em><br />Bukan dikawal.&rdquo;</>
                : lang === "zh"
                ? <>&ldquo;瞄准目标，<em className="italic text-brass-soft not-italic">掌控全局。</em><br />而非被人掌控。&rdquo;</>
                : <>&ldquo;Aim and be <em className="italic text-brass-soft not-italic">in control.</em><br />Not controlled.&rdquo;</>}
            </blockquote>
            <cite className="block mt-5 not-italic text-[13px] tracking-[0.1em] uppercase text-[#9fb1c6]">{t("M.I.R. · Our Philosophy")}</cite>
          </div>
        </div>
      </section>

      {/* what we do */}
      <section className="py-14 sm:py-24">
        <div className="container-site">
          <div className="max-w-[720px] mb-10">
            <span className="eyebrow">{t("What we do")}</span>
            <h2 className="font-serif text-3xl sm:text-5xl mt-4">{t("Specialist advice across the industrial & commercial spectrum.")}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-[22px]">
            <WWD icon={<Building className="w-[22px] h-[22px]" />} title={t("Factories & warehouses")} text={t("Detached and semi-detached factories, superlink warehouses and logistics facilities — matched to your floor area, eave height, power and loading needs.")} />
            <WWD icon={<Building className="w-[22px] h-[22px]" />} title={t("Industrial Land")} text={t("Freehold and leasehold plots in established parks and ESG-certified developments, with zoning, title and MITI requirements verified up front.")} />
            <WWD icon={<Building className="w-[22px] h-[22px]" />} title={t("Commercial & hotel")} text={t("Office floors, shoplots, built-to-rent developments and hotel assets — including investment-grade, tenanted opportunities with verified yields.")} />
          </div>
        </div>
      </section>

      {/* honours */}
      <section className="py-14 sm:py-24 bg-cream">
        <div className="container-site">
          <div className="max-w-[720px] mb-10">
            <span className="eyebrow">{t("Honours & achievements")}</span>
            <h2 className="font-serif text-3xl sm:text-5xl mt-4">{t("Milestones along the way.")}</h2>
          </div>
          <div className="grid gap-[18px] max-w-[820px]">
            <TL year="2026" h="ESP Global Ascend Bootcamp · Pulau Tioman" p={t("Attended the ESP Global Ascend Bootcamp — a transformational programme on mindset, courage and professional purpose, including a Letter to Future Self.")} />
            <TL year={t("Award")} h="ESP Golden Awards · Top Performer" p={t("Recognised among Esprit's top performers for consistent results and dedication — a milestone that's never about the trophy, but the standard it represents.")} />
            <TL year={t("Field")} h={t("On the ground, every deal")} p={t("Every deal starts with a site visit. We walk the property — rain or shine — so clients get accurate, first-hand information, not recycled brochure data.")} />
          </div>
        </div>
      </section>

      {/* projects */}
      <section className="py-14 sm:py-24">
        <div className="container-site">
          <div className="flex items-end justify-between gap-5 mb-9 flex-wrap">
            <div><span className="eyebrow">{t("Selected projects")}</span><h2 className="font-serif text-3xl sm:text-[44px] mt-3.5">{t("From the portfolio.")}</h2></div>
            <Link href="/listings" className="btn btn-ghost">{t("View all listings")} <ArrowRight className="w-4 h-4" /></Link>
          </div>
          {projects.length === 0 ? (
            <div className="text-center border border-dashed border-line-strong rounded-xl2 py-12 px-6">
              <div className="font-serif text-2xl text-navy mb-2">{t("Projects coming soon.")}</div>
              <p className="text-mute mb-4">{t("Our latest industrial & commercial projects will appear here.")}</p>
              <Link href="/quote" className="btn btn-brass">{t("Discuss your requirement")}</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{projects.map((l) => <ListingCard key={l.id} listing={l} />)}</div>
          )}
        </div>
      </section>
    </>
  );
}

function Cred({ icon, text }: { icon: React.ReactNode; text: string }) {
  return <span className="inline-flex items-center gap-2 px-3.5 py-2.5 border border-line rounded-full bg-white text-[13px] font-medium text-brass-2 [&>svg]:text-brass">{icon}<span className="text-ink">{text}</span></span>;
}
function WWD({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-white border border-line rounded-xl2 p-[26px]">
      <div className="w-[46px] h-[46px] rounded-xl bg-navy-soft text-navy grid place-items-center mb-3.5">{icon}</div>
      <h3 className="font-serif text-xl mb-2">{title}</h3>
      <p className="text-[14.5px] text-ink-2">{text}</p>
    </div>
  );
}
function TL({ year, h, p }: { year: string; h: string; p: string }) {
  return (
    <div className="grid sm:grid-cols-[auto_1fr] gap-5 bg-white border border-line rounded-xl2 p-6">
      <div className="font-serif text-xl text-brass-2 whitespace-nowrap">{year}</div>
      <div><h4 className="font-serif text-[19px] mb-1.5">{h}</h4><p className="text-[14.5px] text-ink-2">{p}</p></div>
    </div>
  );
}
