import type { Metadata } from "next";
import "./globals.css";
import AppFrame from "@/components/AppFrame";
import { LangProvider } from "@/components/LangProvider";
import { getLang } from "@/lib/i18n-server";
import { HTML_LANG } from "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    default: "Fizaa · Industrial & Commercial Property in Malaysia",
    template: "%s · Fizaa",
  },
  description:
    "Nur Hafizah Abd Aziz (Fizaa), REN 63161 — your trusted estate negotiator for factories, warehouses, hotels, offices and industrial land across Malaysia.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = getLang();
  return (
    <html lang={HTML_LANG[lang]}>
      <body className="min-h-screen flex flex-col">
        <LangProvider initial={lang}>
          <AppFrame>{children}</AppFrame>
        </LangProvider>
      </body>
    </html>
  );
}
