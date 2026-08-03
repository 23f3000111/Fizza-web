"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Close } from "./Icons";
import { useLang } from "./LangProvider";
import { LANGS, LANG_LABEL } from "@/lib/i18n";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/industrial", label: "Industrial" },
  { href: "/commercial", label: "Commercial" },
  { href: "/hotel", label: "Hotel" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact", label: "Contacts" },
];

function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`inline-flex items-center rounded-full border border-line-strong bg-white p-0.5 ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1 rounded-full text-[12px] font-semibold tracking-wide transition-colors ${
            lang === l ? "bg-navy text-white" : "text-mute hover:text-navy"
          }`}
        >
          {LANG_LABEL[l]}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const { t } = useLang();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[100] h-[72px] flex items-center bg-paper/85 backdrop-blur-md transition-colors ${
          stuck ? "border-b border-line shadow-[0_4px_24px_-20px_rgba(0,0,0,.4)]" : "border-b border-transparent"
        }`}
      >
        <div className="container-site flex items-center justify-between gap-4 w-full">
          <Link href="/" className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-[10px] bg-navy text-white grid place-items-center font-serif italic text-xl shadow-sm2">F</span>
            <span className="font-serif text-[19px] leading-tight">
              myindustrialrealtors
              <small className="block font-sans text-[9.5px] tracking-[0.18em] uppercase text-mute mt-0.5">
                {t("Industrial & Commercial · Malaysia")}
              </small>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-3.5 py-2 rounded-full text-sm transition-colors hover:bg-cream ${
                  isActive(l.href) ? "text-navy font-semibold" : "text-ink-2"
                }`}
              >
                {t(l.label)}
                {isActive(l.href) && <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 rounded-full bg-brass" />}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <LangToggle className="hidden sm:inline-flex" />
            <Link href="/quote" className="btn btn-brass btn-sm">{t("Get a Quote")}</Link>
            <button className="lg:hidden w-[42px] h-[42px] rounded-[10px] border border-line-strong bg-white grid place-items-center" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
              {open ? <Close className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-[99] bg-paper p-6 flex flex-col gap-1.5 lg:hidden overflow-y-auto">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="py-3.5 px-2 text-lg font-serif border-b border-line-2">
              {t(l.label)}
            </Link>
          ))}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-mute">Language / Bahasa</span>
            <LangToggle />
          </div>
          <Link href="/quote" className="btn btn-brass btn-block mt-3">{t("Get a Quote")}</Link>
        </div>
      )}
    </>
  );
}
