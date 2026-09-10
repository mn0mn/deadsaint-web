"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LOCALE_COOKIE, type Locale, getMessages } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  messages: ReturnType<typeof getMessages>;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  return match?.[1] === "fa" ? "fa" : "en";
}

export function LocaleProvider({ children, initialLocale = "en" }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const detected = readLocale();
    if (detected !== locale) setLocaleState(detected);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = (next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    setLocaleState(next);
    window.location.reload();
  };

  const value = useMemo(() => ({ locale, messages: getMessages(locale), setLocale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
