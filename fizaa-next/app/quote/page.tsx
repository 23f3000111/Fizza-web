"use client";

import { useState } from "react";
import Link from "next/link";
import { fetchJSON } from "@/lib/clientApi";
import { SITE } from "@/lib/site";
import { Phone, Mail, Shield, Check } from "@/components/Icons";
import { useLang } from "@/components/LangProvider";

const STATES = ["Johor", "Kedah", "Kelantan", "Melaka", "Negeri Sembilan", "Pahang", "Perak", "Perlis", "Pulau Pinang", "Sabah", "Sarawak", "Selangor", "Terengganu", "Kuala Lumpur", "Labuan", "Putrajaya"];
const PTYPES = ["Factory", "Warehouse", "Industrial Land", "Commercial Land", "Office", "Shop Lot", "Hotel", "Agriculture Land", "Other"];

export default function QuotePage() {
  const { t } = useLang();
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [consent, setConsent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) { setErr("Please consent to the data notice to continue."); return; }
    setBusy(true); setErr("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      await fetchJSON("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, source: "quote-page" }) });
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e2) {
      setErr((e2 as Error).message || "Something went wrong. Please try WhatsApp.");
      setBusy(false);
    }
  }

  return (
    <>
      <section className="navy-gradient text-white pt-8 pb-24">
        <div className="container-site">
          <span className="eyebrow text-brass-soft before:bg-brass-soft">{t("Get a Quote")}</span>
          <h1 className="font-serif text-3xl sm:text-[44px] text-white mt-3">{t("Tell us what your business needs.")}</h1>
          <p className="text-[#B9C7D8] mt-2.5 max-w-[56ch]">{t("Share your requirement — type, size, power, location and budget — and get a tailored shortlist of industrial & commercial options, including off-market properties.")}</p>
        </div>
      </section>

      <div className="container-site grid lg:grid-cols-[1.7fr_1fr] gap-7 -mt-[60px] mb-16 items-start">
        <div className="bg-white border border-line rounded-xl2 shadow-md2 p-6 sm:p-9">
          {done ? (
            <div className="text-center py-8">
              <Check className="w-14 h-14 text-good mx-auto mb-4" />
              <h2 className="font-serif text-2xl text-navy">{t("Thank you — request received.")}</h2>
              <p className="text-mute mt-2.5 mb-5">{t("We'll personally review your requirement and get back to you shortly, usually within hours.")}</p>
              <div className="flex gap-2.5 justify-center flex-wrap">
                <Link href="/listings" className="btn btn-primary">{t("Browse listings")}</Link>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{t("WhatsApp us")}</a>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <h2 className="font-serif text-2xl">{t("Property requirement")}</h2>
              <p className="text-ink-2 text-[14.5px] mb-6">{t("Fields marked * are required. We reply in hours, not days.")}</p>

              <Legend>{t("Your enquiry")}</Legend>
              <div className="grid sm:grid-cols-2 gap-3.5">
                <Field label={t("Inquiry Type")}><select name="inquiryType" className="select"><option value="">{t("Select…")}</option>{["Purchase", "Rent", "Sell", "Valuation", "Mortgage", "Other"].map((o) => <option key={o}>{o}</option>)}</select></Field>
                <Field label={t("I'm a…")}><select name="role" className="select"><option value="">{t("Select…")}</option>{["Buyer", "Tenant", "Owner / Seller", "Investor", "Developer", "Agent"].map((o) => <option key={o}>{o}</option>)}</select></Field>
              </div>

              <Legend>{t("Contact details")}</Legend>
              <div className="grid sm:grid-cols-2 gap-3.5">
                <Field label={t("First Name")} req><input className="input" name="firstName" required placeholder={t("Your first name")} /></Field>
                <Field label={t("Last Name")}><input className="input" name="lastName" placeholder={t("Your last name")} /></Field>
                <Field label={t("Email")} req><input className="input" type="email" name="email" required placeholder="you@company.com" /></Field>
                <Field label={t("Mobile")} req><input className="input" name="mobile" required placeholder="01X-XXX XXXX" /></Field>
              </div>

              <Legend>{t("Location")}</Legend>
              <div className="grid sm:grid-cols-3 gap-3.5">
                <Field label={t("City")}><input className="input" name="city" placeholder="e.g. Shah Alam" /></Field>
                <Field label={t("Area")}><input className="input" name="area" placeholder="e.g. Section 23" /></Field>
                <Field label={t("State")}><select name="state" className="select"><option value="">{t("Select…")}</option>{STATES.map((s) => <option key={s}>{s}</option>)}</select></Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-3.5">
                <Field label={t("Country")}><input className="input" name="country" defaultValue="Malaysia" readOnly /></Field>
                <Field label={t("Zip Code")}><input className="input" name="zip" placeholder="e.g. 40000" /></Field>
              </div>

              <Legend>{t("Property preferences")}</Legend>
              <div className="grid sm:grid-cols-2 gap-3.5">
                <Field label={t("Property Type")}><select name="propertyType" className="select"><option value="">{t("Select…")}</option>{PTYPES.map((p) => <option key={p}>{p}</option>)}</select></Field>
                <Field label={t("Max Price (MYR)")}><input className="input" name="maxPrice" placeholder="e.g. 5,000,000" /></Field>
              </div>
              <div className="grid sm:grid-cols-3 gap-3.5">
                <Field label={t("Minimum Size (sq ft)")}><input className="input" name="minSize" placeholder="e.g. 10,000" /></Field>
                <Field label={t("No. of Beds")}><input className="input" name="beds" placeholder="—" /></Field>
                <Field label={t("No. of Baths")}><input className="input" name="baths" placeholder="—" /></Field>
              </div>

              <div className="mb-4"><label className="field-label">{t("Message")}</label><textarea className="textarea" name="message" placeholder={t("Tell us more — eave height, power supply, zoning, timeline…")} /></div>

              <label className="flex items-start gap-2.5 text-[13.5px] text-ink-2 my-2 mb-5"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 w-4 h-4 accent-navy" /> <span>{t("I consent to M.I.R. storing my submitted information to respond to this enquiry.")} <span className="text-brass-2">*</span></span></label>
              {err && <p className="text-sm text-bad mb-3">{err}</p>}
              <button className="btn btn-brass btn-lg btn-block" disabled={busy}>{busy ? t("Sending…") : t("Send my requirement")}</button>
            </form>
          )}
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-[88px]">
          <div className="bg-white border border-line rounded-xl2 p-6">
            <h3 className="font-serif text-[19px] mb-3.5">{t("Speak to us")}</h3>
            <Side icon={<Phone className="w-[18px] h-[18px]" />} k={t("Mobile / WhatsApp")} v={SITE.phone} />
            <Side icon={<Mail className="w-[18px] h-[18px]" />} k={t("Email")} v={SITE.email} />
            <Side icon={<Shield className="w-[18px] h-[18px]" />} k={t("Licence")} v="REN 63161 · Esprit Estate" last />
          </div>
          <div className="bg-navy-soft rounded-xl p-[18px] text-[13.5px] text-navy-2 leading-relaxed"><strong>{t("No obligation.")}</strong> {t("Your details are used only to respond to your enquiry — never shared or sold. M.I.R. handles every requirement personally.")}</div>
        </aside>
      </div>
    </>
  );
}

function Legend({ children }: { children: React.ReactNode }) {
  return <div className="text-xs tracking-[0.12em] uppercase text-brass-2 font-bold mb-3.5 mt-5 pb-2 border-b border-line-2">{children}</div>;
}
function Field({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) {
  return <div className="mb-4"><label className="field-label">{label} {req && <span className="text-brass-2">*</span>}</label>{children}</div>;
}
function Side({ icon, k, v, last }: { icon: React.ReactNode; k: string; v: string; last?: boolean }) {
  return (
    <div className={`flex items-start gap-3 py-2.5 ${last ? "" : "border-b border-line-2"} [&>svg]:text-brass [&>svg]:shrink-0 [&>svg]:mt-0.5`}>
      {icon}
      <div><div className="text-xs text-mute">{k}</div><div className="font-medium text-[14.5px] break-words">{v}</div></div>
    </div>
  );
}
