// Server-only i18n helpers — reads the chosen language from the cookie.
import { cookies } from "next/headers";
import { translate, isLang, LANG_COOKIE, type Lang } from "./i18n";

export function getLang(): Lang {
  const v = cookies().get(LANG_COOKIE)?.value;
  return isLang(v) ? v : "en";
}

// Returns a bound translator for server components: const t = getT(); t("Home")
export function getT() {
  const lang = getLang();
  return (en: string) => translate(lang, en);
}
