import Link from "next/link";
import { db } from "@/lib/db";
import { sortListings } from "@/lib/filter";
import ListingCard from "@/components/ListingCard";
import HomeHero from "@/components/HomeHero";
import { ArrowRight, Shield, Building, Search, Check } from "@/components/Icons";
import { SITE } from "@/lib/site";
import { getLang, getT } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const all = (await db.listings.find()).filter((l) => l.status !== "hidden");
  const latest = sortListings(all, "newest").slice(0, 6);
  const t = getT();
  const lang = getLang();

  return (
    <>
      {/* HERO (video background + search) */}
      <HomeHero />

      {/* BRANDS */}
      <section className="bg-white border-y border-line">
        <div className="container-site flex items-center gap-10 flex-wrap justify-center py-7">
          <span className="text-xs tracking-[0.14em] uppercase text-mute font-semibold">{t("Trusted across")}</span>
          {["Esprit Estate", "BOVAEP", "GreenRE", "MITI", "Klang Valley"].map((b) => (
            <span key={b} className="font-serif text-[19px] text-ink-2 opacity-65 hover:opacity-100 transition-opacity">{b}</span>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="py-14 sm:py-24">
        <div className="container-site">
          <div className="max-w-[720px] mb-10 sm:mb-14">
            <span className="eyebrow">{t("Why work with Fizaa")}</span>
            <h2 className="font-serif text-3xl sm:text-5xl mt-4">{t("Property is a people business — handled by one pair of hands.")}</h2>
            <p className="text-ink-2 mt-4 text-[17px]">{t("No call-centres, no handoffs, no template replies. Every industrial and commercial enquiry is personally vetted and personally served.")}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-[22px]">
            <Value icon={<Shield className="w-[22px] h-[22px]" />} title={t("A registered hand")} text={t("REN 63161 under Esprit Estate Agent Sdn Bhd — licensed, compliant, and operating within BOVAEP's framework.")} />
            <Value icon={<Building className="w-[22px] h-[22px]" />} title={t("Industrial specialist")} text={t("Focused only on factories, warehouses, lands, commercial plots and hotel assets — sharper advice than any generalist.")} />
            <Value icon={<Search className="w-[22px] h-[22px]" />} title={t("Verified before viewing")} text={t("Title, zoning, power supply and lease terms checked before you visit — not discovered after the offer.")} />
          </div>
        </div>
      </section>

      {/* LATEST PROJECTS */}
      <section className="pb-14 sm:pb-24">
        <div className="container-site">
          <div className="flex items-end justify-between gap-5 mb-9 flex-wrap">
            <div>
              <span className="eyebrow">{t("Latest projects")}</span>
              <h2 className="font-serif text-3xl sm:text-5xl mt-3.5">{t("Currently in the portfolio.")}</h2>
            </div>
            <Link href="/listings" className="btn btn-ghost">{t("View all listings")} <ArrowRight className="w-4 h-4" /></Link>
          </div>
          {latest.length === 0 ? (
            <div className="text-center border border-dashed border-line-strong rounded-xl2 py-12 px-6">
              <div className="font-serif text-2xl text-navy mb-2">{t("New listings coming soon.")}</div>
              <p className="text-mute mb-4">{t("Fizaa is curating the latest industrial & commercial opportunities. Get in touch to discuss your requirement.")}</p>
              <Link href="/quote" className="btn btn-brass">{t("Tell Fizaa what you need")}</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
          )}
        </div>
      </section>

      {/* REVIEWS (placeholder) */}
      <section className="py-14 sm:py-24 bg-cream">
        <div className="container-site">
          <div className="max-w-[720px] mx-auto text-center mb-12">
            <span className="eyebrow justify-center before:hidden">{t("What clients say")}</span>
            <h2 className="font-serif text-3xl sm:text-5xl mt-4">{t("Trusted by businesses across Malaysia.")}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-[22px]">
            <Review initial="A" name="Azman R." role={t("Logistics Director")} text="Fizaa found us a warehouse that actually matched our power and loading needs. She walked the site herself and flagged issues other agents missed." />
            <Review initial="L" name="Lim S.K." role={t("Manufacturing Owner")} text="Professional, responsive and genuinely knowledgeable about industrial zoning. The whole factory purchase was smoother than we expected." />
            <Review initial="N" name="Nadia H." role={t("Private Investor")} text="We were investing in a hotel asset and Fizaa's diligence on the tenancy and yield gave us real confidence. Highly recommended." />
          </div>
        </div>
      </section>

      {/* OUR JOURNEY (compact, moved to home bottom) */}
      <section className="py-14 sm:py-24">
        <div className="container-site grid lg:grid-cols-[280px_1fr] gap-9 lg:gap-12 items-center">
          {/* small image */}
          <div className="relative rounded-2xl2 overflow-hidden aspect-[4/5] max-w-[280px] mx-auto lg:mx-0 shadow-lg2 bg-navy">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fiza-website-images/MRL_8310.JPG" alt="Nur Hafizah Abd Aziz (Fizaa)" className="w-full h-full object-cover object-[center_18%]" />
            <div className="absolute left-3 bottom-3 bg-white/90 backdrop-blur rounded-full px-3 py-1.5 text-[11px] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-good" /> {t("Available")} · GMT+8
            </div>
          </div>
          {/* main details */}
          <div>
            <span className="eyebrow">{t("Our Journey")}</span>
            <h2 className="font-serif text-3xl sm:text-5xl mt-4 leading-tight">{t("Property is a people business.")}</h2>
            <p className="text-[17px] text-navy italic font-serif mt-4">&ldquo;{t("I'm just a friendly agent who goes the extra mile to solve my client's problems.")}&rdquo;</p>
            <p className="text-ink-2 mt-4 text-[15.5px] leading-relaxed">{lang === "bm"
              ? `Nur Hafizah Abd Aziz — dikenali sebagai Fizaa — ialah Perunding Hartanah Berdaftar (REN 63161) di bawah ${SITE.agency}, Cyberjaya. Beliau pakar dalam hartanah perindustrian, komersial dan hotel di seluruh Malaysia.`
              : <>Nur Hafizah Abd Aziz — known as Fizaa — is a Registered Estate Negotiator (REN 63161) under {SITE.agency}, Cyberjaya. She specialises in industrial, commercial and hotel property across Malaysia.</>}</p>
            <div className="flex flex-wrap gap-2.5 mt-6">
              {[["REN 63161", <Shield key="s" className="w-[15px] h-[15px]" />], [t("Industrial & Commercial"), <Building key="b" className="w-[15px] h-[15px]" />], [t("24/7 Response"), <Check key="c" className="w-[15px] h-[15px]" />]].map(([label, icon], i) => (
                <span key={i} className="inline-flex items-center gap-2 px-3.5 py-2 border border-line rounded-full bg-white text-[13px] font-medium text-brass-2 [&>svg]:text-brass">{icon as React.ReactNode}<span className="text-ink">{label as string}</span></span>
              ))}
            </div>
            <div className="mt-6 flex gap-3 flex-wrap">
              <Link href="/quote" className="btn btn-brass">{t("Work with Fizaa")}</Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-14 sm:pb-24">
        <div className="container-site">
          <div className="relative overflow-hidden navy-gradient text-white rounded-2xl2 p-9 sm:p-16 text-center">
            <div className="absolute -top-32 -right-20 w-[360px] h-[360px] rounded-full bg-brass/25 blur-2xl" />
            <h2 className="font-serif text-3xl sm:text-5xl text-white relative">{t("Let's find your next property.")}</h2>
            <p className="text-[#B9C7D8] mt-4 max-w-[52ch] mx-auto relative">{t("Tell Fizaa what your business needs — type, size, power, location and budget — and get matched to the right industrial or commercial space.")}</p>
            <div className="mt-7 flex gap-3 justify-center flex-wrap relative">
              <Link href="/quote" className="btn btn-brass btn-lg">{t("Get a quote")}</Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-white btn-lg">WhatsApp · {SITE.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Value({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-white border border-line rounded-xl2 p-[26px] transition-all hover:-translate-y-1 hover:shadow-md2">
      <div className="w-[46px] h-[46px] rounded-xl bg-navy-soft text-navy grid place-items-center mb-4">{icon}</div>
      <h3 className="font-serif text-xl mb-2">{title}</h3>
      <p className="text-[14.5px] text-ink-2">{text}</p>
    </div>
  );
}

function Review({ initial, name, role, text }: { initial: string; name: string; role: string; text: string }) {
  return (
    <div className="bg-white border border-line rounded-xl2 p-[26px] flex flex-col">
      <div className="text-brass tracking-[3px] mb-3.5">★★★★★</div>
      <p className="text-[15.5px] leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="w-[42px] h-[42px] rounded-full bg-navy text-white grid place-items-center font-serif text-[17px]">{initial}</div>
        <div>
          <div className="font-semibold text-sm">{name}</div>
          <div className="text-xs text-mute">{role}</div>
        </div>
      </div>
    </div>
  );
}
