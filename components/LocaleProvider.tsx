"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale, getMessages } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  messages: ReturnType<typeof getMessages>;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children, initialLocale = "en" }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = (next: Locale) => {
    if (next === locale) return;

    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = next;
    document.documentElement.dir = next === "fa" ? "rtl" : "ltr";
    setLocaleState(next);

    const currentPath = pathname || "/";
    const withoutLocale = currentPath.replace(/^\/(en|fa)(?=\/|$)/, "") || "/";
    router.replace(`/${next}${withoutLocale === "/" ? "/" : withoutLocale}`);
  };

  const value = useMemo(() => ({ locale, messages: getMessages(locale), setLocale }), [locale, pathname]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
