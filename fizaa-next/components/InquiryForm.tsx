"use client";

import { useState } from "react";
import { fetchJSON } from "@/lib/clientApi";
import { Check } from "./Icons";
import { useLang } from "./LangProvider";

export default function InquiryForm({ listingId, listingTitle }: { listingId: string; listingTitle: string }) {
  const { t } = useLang();
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      await fetchJSON("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, inquiryType: "Purchase", listingId, listingTitle, source: "listing-detail" }),
      });
      setDone(true);
    } catch (e2) {
      setErr((e2 as Error).message || "Could not send.");
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="text-center py-3.5">
        <Check className="w-11 h-11 text-good mx-auto mb-2.5" />
        <p>{t("Thank you! We'll be in touch shortly.")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input className="input" name="name" placeholder={t("Your name *")} required />
      <input className="input" name="mobile" placeholder={t("Phone / WhatsApp *")} required />
      <input className="input" type="email" name="email" placeholder={t("Email (optional)")} />
      <textarea className="textarea !min-h-[84px]" name="message" defaultValue={`I'm interested in "${listingTitle}". Please share more details.`} />
      {err && <p className="text-sm text-bad">{err}</p>}
      <button className="btn btn-primary btn-block" disabled={busy}>{busy ? t("Sending…") : t("Send enquiry")}</button>
    </form>
  );
}
