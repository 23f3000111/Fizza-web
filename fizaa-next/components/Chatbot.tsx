"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { fetchJSON } from "@/lib/clientApi";
import { money, imgOf } from "@/lib/format";
import type { Listing } from "@/lib/types";
import { SITE } from "@/lib/site";
import { Close } from "./Icons";
import { useLang } from "./LangProvider";

type Msg = { who: "bot" | "user"; text?: string; node?: ReactNode };
type Chip = { label: string; intent?: string; value?: string };

const WA = SITE.whatsapp;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const FAQ: { k: string[]; a: ReactNode }[] = [
  { k: ["fee", "commission", "charge"], a: <>Agent fees are capped by law: max <b>3% of the price</b> for a subsale, or about <b>1.25 months’ rent</b> for a lease (both + SST). We clarify fees upfront.</> },
  { k: ["ren", "license", "licence", "registered", "bovaep"], a: <>M.I.R. operates as a <b>Registered Estate Negotiator (REN 63161)</b> under Esprit Estate Agent Sdn Bhd — fully licensed and verifiable on the BOVAEP register.</> },
  { k: ["zoning", "light industry", "medium industry", "heavy"], a: <>Industrial land is zoned <b>Light, Medium or Heavy</b> industry. Your activity must match the approved zoning — We check title, zoning and MITI requirements before recommending anything.</> },
  { k: ["btr", "built to rent", "built-to-rent"], a: <><b>Built-To-Rent (BTR)</b> means a facility is built to your spec then leased long-term — you avoid the capital outlay of buying while getting a tailored building.</> },
  { k: ["greenre", "esg", "green"], a: <><b>GreenRE</b> is Malaysia’s green-building certification. GreenRE-certified industrial assets help meet ESG reporting and attract premium tenants and financing.</> },
  { k: ["area", "where", "location", "cover", "region"], a: <>M.I.R. covers industrial &amp; commercial property across <b>Malaysia</b>, with deep focus on the Klang Valley, Selangor and Negeri Sembilan corridors.</> },
];

const MAIN_CHIPS: Chip[] = [
  { label: "Browse listings", intent: "browse" },
  { label: "Get a quote", intent: "quote" },
  { label: "Talk to us", intent: "contact" },
  { label: "Agent fees", intent: "faq", value: "agent fees" },
];

export default function Chatbot() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<"gate" | "chat">("gate");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [chips, setChips] = useState<Chip[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [showBadge, setShowBadge] = useState(true);

  const leadRef = useRef<{ name: string; phone: string; email: string } | null>(null);
  const listingsRef = useRef<Listing[] | null>(null);
  const flowRef = useRef<((input: string) => void) | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, typing, phase]);

  function pushBot(node: ReactNode) {
    setMsgs((m) => [...m, { who: "bot", node }]);
  }
  async function botSay(node: ReactNode, delay = 600) {
    setTyping(true);
    await sleep(delay);
    setTyping(false);
    pushBot(node);
  }

  async function getListings(): Promise<Listing[]> {
    if (listingsRef.current) return listingsRef.current;
    try {
      listingsRef.current = await fetchJSON<Listing[]>("/api/listings");
    } catch {
      listingsRef.current = [];
    }
    return listingsRef.current;
  }

  function ListingChip({ l }: { l: Listing }) {
    return (
      <Link href={`/listing/${l.id}`} className="flex gap-2.5 items-center bg-white border border-line rounded-xl p-2 mt-1.5 hover:border-brass transition-colors">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgOf(l)} alt="" className="w-[52px] h-[52px] rounded-[9px] object-cover bg-cream flex-shrink-0" />
        <span className="flex flex-col min-w-0">
          <b className="text-[13px] leading-tight">{l.title}</b>
          <small className="text-[11.5px] text-mute">{l.city} · {money(l)}</small>
        </span>
      </Link>
    );
  }

  async function replyWithListings(filterFn: (l: Listing) => boolean, intro: string) {
    const all = await getListings();
    const matches = all.filter(filterFn).slice(0, 3);
    if (!matches.length) {
      await botSay(<>I don’t have a live match for that yet, but new listings come in often. <a className="text-brass-2 font-semibold" href={WA} target="_blank" rel="noopener noreferrer">WhatsApp us →</a></>);
      return;
    }
    await botSay(<>{intro}</>);
    pushBot(<div>{matches.map((l) => <ListingChip key={l.id} l={l} />)}</div>);
    setChips([{ label: "See all listings", intent: "all" }, ...MAIN_CHIPS.slice(1)]);
  }

  function classify(t: string): string {
    if (/quote|enquir|inquir|interested|budget|how much|valuation|sell my|buy a/.test(t)) return "quote";
    if (/contact|call|whatsapp|talk|speak|reach|phone|number/.test(t)) return "contact";
    if (/factory|warehouse|hotel|land|commercial|office|shop|plot/.test(t)) return "type";
    if (FAQ.some((f) => f.k.some((k) => t.includes(k)))) return "faq";
    if (/list|show|browse|propert|available/.test(t)) return "browse";
    return "free";
  }

  const cities = ["banting", "puncak alam", "batu caves", "shah alam", "klang", "enstek", "kuala langat", "kuala lumpur", "selangor", "negeri sembilan"];
  const cap = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

  async function handleType(t: string) {
    const map = [
      { kw: ["factory"], type: "Factory", label: "factories" },
      { kw: ["warehouse"], type: "Warehouse", label: "warehouses" },
      { kw: ["hotel"], type: "Hotel", label: "hotel assets" },
      { kw: ["land", "plot"], type: "Industrial Land", label: "industrial land" },
      { kw: ["commercial", "office", "shop"], type: "Commercial", label: "commercial spaces" },
    ];
    const hit = map.find((m) => m.kw.some((k) => t.includes(k)));
    const city = cities.find((c) => t.includes(c)) || null;
    if (!hit && !city) return handleFree(t);
    await replyWithListings(
      (l) => (!hit || l.propertyType === hit.type) && (!city || (l.city || "").toLowerCase().includes(city)),
      `Here are ${hit ? hit.label : "listings"}${city ? " around " + cap(city) : ""} I have right now:`
    );
  }

  async function answerFaq(t: string) {
    const hit = FAQ.find((f) => f.k.some((k) => t.includes(k)));
    await botSay(hit ? hit.a : <>Good question — we can answer that in detail. <a className="text-brass-2 font-semibold" href={WA} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp →</a></>);
    setChips(MAIN_CHIPS);
  }

  async function handleFree(t: string) {
    const faqHit = FAQ.find((f) => f.k.some((k) => t.includes(k)));
    if (faqHit) { await botSay(faqHit.a); setChips(MAIN_CHIPS); return; }
    await botSay(<>Thanks! I’ve noted that. For anything specific, our team will help personally. <a className="text-brass-2 font-semibold" href={WA} target="_blank" rel="noopener noreferrer">Message us →</a></>);
    setChips(MAIN_CHIPS);
  }

  function startQuoteFlow() {
    const data: { propertyType?: string; message?: string } = {};
    botSay(<>Happy to help you get a quote. What type of property are you looking for? (e.g. factory, warehouse, land)</>).then(() => {
      flowRef.current = (inp: string) => {
        if (!data.propertyType) { data.propertyType = inp || "—"; botSay(<>Got it. What’s your budget or any key requirement? (size, location, power…)</>); return; }
        if (!data.message) { data.message = inp || "—"; flowRef.current = null; submitQuote(data); }
      };
    });
  }

  async function submitQuote(data: { propertyType?: string; message?: string }) {
    try {
      await fetchJSON("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: leadRef.current?.name, email: leadRef.current?.email, mobile: leadRef.current?.phone, propertyType: data.propertyType, message: data.message, inquiryType: "Purchase", source: "chatbot" }),
      });
      await botSay(<>Perfect — your request is in! We'll reach out on <b>{leadRef.current?.phone || "your number"}</b> shortly. Anything else?</>);
    } catch {
      await botSay(<>I couldn’t submit that just now — please <a className="text-brass-2 font-semibold" href={WA} target="_blank" rel="noopener noreferrer">WhatsApp us →</a> and we’ll sort it immediately.</>);
    }
    setChips(MAIN_CHIPS);
  }

  async function onUser(text: string, forcedIntent?: string) {
    const raw = text.trim();
    if (!raw && !forcedIntent) return;
    if (raw) setMsgs((m) => [...m, { who: "user", text: raw }]);
    const t = raw.toLowerCase();

    if (flowRef.current) { flowRef.current(raw); return; }
    const intent = forcedIntent || classify(t);

    switch (intent) {
      case "all":
        await botSay(<>Here’s the full portfolio — search and filter by type, location and more.</>);
        pushBot(<Link href="/listings" className="btn btn-brass btn-sm">Open all listings →</Link>);
        setChips(MAIN_CHIPS);
        break;
      case "browse":
        await botSay(<>Sure! What are you after? Tap one or just tell me the type and location.</>);
        setChips([
          { label: "Factory", intent: "type", value: "factory" },
          { label: "Warehouse", intent: "type", value: "warehouse" },
          { label: "Hotel", intent: "type", value: "hotel" },
          { label: "Industrial land", intent: "type", value: "land" },
        ]);
        break;
      case "type":
        await handleType(forcedIntent ? (text || "").toLowerCase() : t);
        break;
      case "quote":
        startQuoteFlow();
        break;
      case "contact":
        await botSay(<>The fastest way to reach us is WhatsApp — we reply personally, usually within minutes.</>);
        pushBot(
          <div className="flex gap-2 flex-wrap">
            <a className="btn btn-brass btn-sm" href={WA} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.phone}</a>
            <a className="btn btn-ghost btn-sm" href={`tel:${SITE.phoneRaw}`}>Call</a>
          </div>
        );
        setChips(MAIN_CHIPS);
        break;
      case "faq":
        await answerFaq(forcedIntent ? (text || raw).toLowerCase() : t);
        break;
      default:
        await handleFree(t);
    }
  }

  function onChip(c: Chip) {
    setChips([]);
    onUser(c.value || c.label, c.intent);
  }

  async function onGateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    if (!name || !phone) return;
    try {
      await fetchJSON("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, phone, email, source: "chatbot" }) });
    } catch { /* allow chat anyway */ }
    leadRef.current = { name, phone, email };
    setPhase("chat");
    const first = name.split(" ")[0];
    setMsgs([]);
    await botSay(<>Thanks{first ? `, ${first}` : ""}! How can I help today? You can browse listings, get a quote, or ask me anything about industrial &amp; commercial property.</>);
    setChips(MAIN_CHIPS);
  }

  function toggle() {
    setOpen((o) => !o);
    setShowBadge(false);
    if (!startedRef.current) { startedRef.current = true; setPhase("gate"); }
  }

  return (
    <div className="z-[95]">
      {/* FAB */}
      <button onClick={toggle} aria-label="Open chat" className="fixed right-[22px] bottom-[22px] w-[64px] h-[64px] rounded-full bg-navy text-white grid place-items-center shadow-[0_10px_30px_-8px_rgba(23,51,82,.6)] hover:bg-navy-2 transition z-[200]">
        {open ? <Close className="w-6 h-6" /> : (
          <svg viewBox="0 0 24 24" className="w-[26px] h-[26px]" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" /></svg>
        )}
        {showBadge && <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1.5 rounded-[10px] bg-brass text-white text-[11px] font-bold grid place-items-center border-2 border-paper">1</span>}
      </button>

      {/* Window */}
      {open && (
        <div className="fixed right-2 sm:right-[22px] left-2 sm:left-auto w-auto sm:w-[460px] bg-paper border border-line rounded-[20px] overflow-hidden flex flex-col shadow-lg2 z-[200]" style={{top:'80px', bottom:'22px', maxHeight:'calc(100dvh - 110px)'}}>
          {/* header */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-navy text-white">
            <div className="w-10 h-10 rounded-full bg-brass grid place-items-center font-serif italic text-[19px]">F</div>
            <div>
              <h4 className="font-sans text-[14.5px] font-semibold">{SITE.name} · {t("Property Assistant")}</h4>
              <p className="text-[11.5px] text-[#B9C7D8] flex items-center gap-1.5"><span className="w-[7px] h-[7px] rounded-full bg-[#5BE584]" /> {t("Online · replies in minutes")}</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="ml-auto w-8 h-8 rounded-lg bg-white/10 grid place-items-center hover:bg-white/20"><Close className="w-[17px] h-[17px]" /></button>
          </div>

          {/* body */}
          <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {phase === "gate" ? (
              <>
                <div className="text-center pt-2.5 pb-1">
                  <div className="w-14 h-14 rounded-full bg-navy text-white grid place-items-center font-serif italic text-[26px] mx-auto mb-3.5">F</div>
                  <h4 className="font-serif text-xl mb-2">{t("Hi, I'm the M.I.R. assistant 👋")}</h4>
                  <p className="text-[13.5px] text-ink-2 leading-relaxed">{t("Industrial & commercial property across Malaysia. Leave your details so we can follow up, then let's chat.")}</p>
                </div>
                <form onSubmit={onGateSubmit} className="flex flex-col gap-2.5 mt-3">
                  <input className="input !py-2.5" name="name" placeholder={t("Your name *")} required />
                  <input className="input !py-2.5" name="phone" placeholder={t("Phone (WhatsApp) *")} required />
                  <input className="input !py-2.5" name="email" type="email" placeholder={t("Email (optional)")} />
                  <button className="btn btn-brass btn-block" type="submit">{t("Start chat →")}</button>
                  <small className="text-[11px] text-mute text-center leading-tight">{t("By starting, you agree M.I.R. may contact you about your enquiry.")}</small>
                </form>
              </>
            ) : (
              <>
                {msgs.map((m, i) => (
                  <div key={i} className={`flex max-w-[88%] ${m.who === "user" ? "self-end" : "self-start"}`}>
                    <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${m.who === "user" ? "bg-navy text-white rounded-br-[5px]" : "bg-white border border-line text-ink rounded-bl-[5px]"}`}>
                      {m.text ?? m.node}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex self-start">
                    <div className="px-3.5 py-3 rounded-2xl bg-white border border-line flex gap-1 items-center">
                      <Dot /> <Dot d={0.2} /> <Dot d={0.4} />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* chips */}
          {phase === "chat" && chips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-2.5">
              {chips.map((c, i) => (
                <button key={i} onClick={() => onChip(c)} className="px-3 py-2 rounded-full border border-line-strong bg-white text-[12.5px] text-navy font-medium hover:bg-navy hover:text-white hover:border-navy transition">{t(c.label)}</button>
              ))}
            </div>
          )}

          {/* input */}
          {phase === "chat" && (
            <form onSubmit={(e) => { e.preventDefault(); const v = input.trim(); if (!v) return; setInput(""); setChips([]); onUser(v); }} className="flex gap-2 px-3.5 py-3 border-t border-line bg-paper">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t("Type a message…")} className="flex-1 border border-line-strong rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-navy" />
              <button type="submit" disabled={!input.trim()} aria-label="Send" className="w-[42px] h-[42px] rounded-full bg-navy text-white grid place-items-center disabled:bg-faint">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>
              </button>
            </form>
          )}
          <a href={WA} target="_blank" rel="noopener noreferrer" className="block text-center py-2.5 text-xs text-brass-2 font-medium border-t border-line-2 bg-white">{t("Prefer WhatsApp? Chat with us directly →")}</a>
        </div>
      )}
    </div>
  );
}

function Dot({ d = 0 }: { d?: number }) {
  return <span className="w-[7px] h-[7px] rounded-full bg-faint animate-bounce" style={{ animationDelay: `${d}s`, animationDuration: "1s" }} />;
}
