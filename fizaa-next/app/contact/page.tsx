"use client";

import { useState } from "react";
import Link from "next/link";
import { fetchJSON } from "@/lib/clientApi";
import { SITE } from "@/lib/site";
import DetailMap from "@/components/DetailMap";
import { Phone, Mail, Clock, Building, Shield, Check } from "@/components/Icons";
import { useLang } from "@/components/LangProvider";

export default function ContactPage() {
  const { t } = useLang();
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [consent, setConsent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) { setErr("Please consent to the data notice."); return; }
    setBusy(true); setErr("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      await fetchJSON("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setDone(true);
    } catch (e2) {
      setErr((e2 as Error).message || "Could not send. Please try WhatsApp.");
      setBusy(false);
    }
  }

  return (
    <>
      <section className="navy-gradient text-white pt-8 pb-24">
        <div className="container-site">
          <span className="eyebrow text-brass-soft before:bg-brass-soft">{t("Contact Us")}</span>
          <h1 className="font-serif text-3xl sm:text-[44px] text-white mt-3">{t("Let's start a conversation.")}</h1>
          <p className="text-[#B9C7D8] mt-2.5 max-w-[56ch]">{t("Whether it's a site visit, a second opinion on a deal, or a quiet chat about buying, leasing or investing — Fizaa replies personally.")}</p>
        </div>
      </section>

      <div className="container-site grid lg:grid-cols-[1.2fr_1fr] gap-7 -mt-[60px] mb-10 items-start">
        <div className="bg-white border border-line rounded-xl2 shadow-md2 p-6 sm:p-9">
          {done ? (
            <div className="text-center py-7">
              <Check className="w-[52px] h-[52px] text-good mx-auto mb-3.5" />
              <h2 className="font-serif text-2xl text-navy">{t("Message sent!")}</h2>
              <p className="text-mute my-2.5 mb-5">{t("Thanks for reaching out — Fizaa will reply to you shortly.")}</p>
              <Link href="/listings" className="btn btn-primary">{t("Browse listings")}</Link>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <h2 className="font-serif text-2xl">{t("Send a message")}</h2>
              <p className="text-ink-2 text-[14.5px] mb-6">{t("Fill in the form and Fizaa will get back to you directly.")}</p>
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="mb-1"><label className="field-label">{t("First Name")} <span className="text-brass-2">*</span></label><input className="input" name="firstName" required placeholder={t("Enter your name")} /></div>
                <div className="mb-1"><label className="field-label">{t("Last Name")}</label><input className="input" name="lastName" placeholder={t("Enter your last name")} /></div>
              </div>
              <div className="my-4"><label className="field-label">{t("Email")} <span className="text-brass-2">*</span></label><input className="input" type="email" name="email" required placeholder="you@email.com" /></div>
              <div className="mb-4"><label className="field-label">{t("Message")} <span className="text-brass-2">*</span></label><textarea className="textarea" name="message" required placeholder={t("How can Fizaa help?")} /></div>
              <label className="flex items-start gap-2.5 text-[13.5px] text-ink-2 my-2 mb-5"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 w-4 h-4 accent-navy" /> <span>{t("I consent to having this website store my submitted information.")} <span className="text-brass-2">*</span></span></label>
              {err && <p className="text-sm text-bad mb-3">{err}</p>}
              <button className="btn btn-brass btn-lg btn-block" disabled={busy}>{busy ? t("Sending…") : t("Submit")}</button>
            </form>
          )}
        </div>

        <aside className="flex flex-col gap-4">
          <div className="bg-white border border-line rounded-xl2 p-6">
            <h3 className="font-serif text-lg">{t("For inquiries")}</h3>
            <div className="text-[13px] text-mute mb-3.5">Nur Hafizah Abd Aziz — REN 63161</div>
            <Side icon={<Phone className="w-[18px] h-[18px]" />} k={t("Mobile / WhatsApp")} v={SITE.phone} href={`tel:${SITE.phoneRaw}`} />
            <Side icon={<Mail className="w-[18px] h-[18px]" />} k={t("Email")} v={SITE.email} href={`mailto:${SITE.email}`} />
            <Side icon={<Clock className="w-[18px] h-[18px]" />} k={t("Hours")} v="9am – 9pm · GMT+8" last />
          </div>
          <div className="bg-white border border-line rounded-xl2 p-6">
            <h3 className="font-serif text-lg">{t("Agency")}</h3>
            <div className="text-[13px] text-mute mb-3.5">{SITE.agency}</div>
            <Side icon={<Building className="w-[18px] h-[18px]" />} k={t("Office")} v="Cyberjaya, Selangor, Malaysia" />
            <Side icon={<Shield className="w-[18px] h-[18px]" />} k={t("Registration")} v="REN 63161 · BOVAEP registered" last />
          </div>
        </aside>
      </div>

      <div className="container-site mb-16">
        <DetailMap lat={2.9213} lng={101.6559} />
      </div>
    </>
  );
}

function Side({ icon, k, v, href, last }: { icon: React.ReactNode; k: string; v: string; href?: string; last?: boolean }) {
  return (
    <div className={`flex items-start gap-3 py-2.5 ${last ? "" : "border-b border-line-2"} [&>svg]:text-brass [&>svg]:shrink-0 [&>svg]:mt-0.5`}>
      {icon}
      <div className="min-w-0">
        <div className="text-xs text-mute">{k}</div>
        {href ? <a href={href} className="font-medium text-[14.5px] text-navy break-words">{v}</a> : <div className="font-medium text-[14.5px] break-words">{v}</div>}
      </div>
    </div>
  );
}
