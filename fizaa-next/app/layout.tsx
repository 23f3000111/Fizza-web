import type { Metadata } from "next";
import "./globals.css";
import AppFrame from "@/components/AppFrame";
import { LangProvider } from "@/components/LangProvider";
import { getLang } from "@/lib/i18n-server";
import { HTML_LANG } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · Industrial & Commercial Property in Malaysia`,
    template: `%s · ${SITE.name}`,
  },
  description:
    `${SITE.name} — factories, warehouses, hotels, offices and industrial land across Malaysia, handled personally by dedicated, registered estate negotiators.`,
  applicationName: SITE.name,
  keywords: [
    "industrial property Malaysia",
    "factory for rent Malaysia",
    "warehouse for sale Malaysia",
    "commercial property Malaysia",
    "industrial land Selangor",
    "Malaysia Industrial Realtors",
    "MyIR",
    "My Industrial Realtors",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} · Industrial & Commercial Property in Malaysia`,
    description:
      "Factories, warehouses, hotels, offices and industrial land across Malaysia — verified before viewing.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} · Industrial & Commercial Property in Malaysia`,
    description:
      "Factories, warehouses, hotels, offices and industrial land across Malaysia — verified before viewing.",
  },
  robots: { index: true, follow: true },
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
