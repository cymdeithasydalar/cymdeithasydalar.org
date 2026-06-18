"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type Lang = "en" | "cy";

type LanguageContextValue = {
  lang: Lang;
  toggle: () => void;
  setLang: (l: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  initialLang = "en",
  children,
}: {
  initialLang?: Lang;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    // Persist for SSR on the next request (1 year)
    document.cookie = `cyd_lang=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "cy" : "en");
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider value={{ lang, toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

/** Inline bilingual text: <T en="Water" cy="Dŵr" /> */
export function T({ en, cy }: { en: ReactNode; cy: ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "cy" ? cy : en}</>;
}
