"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { LOCALE_COOKIE, type Locale, getMessages } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  messages: ReturnType<typeof getMessages>;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children, initialLocale = "en" }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = (next: Locale) => {
    if (next === locale) return;

    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;

    const currentPath = window.location.pathname || "/";
    const withoutLocale = currentPath.replace(/^\/(en|fa)(?=\/|$)/, "") || "/";
    const nextPath = `/${next}${withoutLocale === "/" ? "/" : withoutLocale}`;

    // Do a full navigation so the middleware, server layout, html lang/dir,
    // and all server-rendered translations are guaranteed to use the same locale.
    window.location.replace(nextPath);
  };

  const value = useMemo(() => ({ locale, messages: getMessages(locale), setLocale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
