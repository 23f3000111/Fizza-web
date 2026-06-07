"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { translate, LANG_COOKIE, type Lang } from "@/lib/i18n";

interface LangCtx {
  lang: Lang;
  t: (en: string) => string;
  setLang: (l: Lang) => void;
}

const Ctx = createContext<LangCtx>({ lang: "en", t: (s) => s, setLang: () => {} });

export function LangProvider({ initial, children }: { initial: Lang; children: React.ReactNode }) {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(initial);

  const setLang = useCallback(
    (l: Lang) => {
      document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
      setLangState(l);
      // re-render server components (home, listing detail, journey, footer) with the new cookie
      router.refresh();
    },
    [router]
  );

  const t = useCallback((en: string) => translate(lang, en), [lang]);

  return <Ctx.Provider value={{ lang, t, setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
