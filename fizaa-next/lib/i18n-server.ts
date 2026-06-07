// Server-only i18n helpers — reads the chosen language from the cookie.
import { cookies } from "next/headers";
import { translate, type Lang } from "./i18n";

export function getLang(): Lang {
  return cookies().get("lang")?.value === "bm" ? "bm" : "en";
}

// Returns a bound translator for server components: const t = getT(); t("Home")
export function getT() {
  const lang = getLang();
  return (en: string) => translate(lang, en);
}
