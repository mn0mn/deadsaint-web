"use client";

import { useCallback, useEffect, useState } from "react";
import { messages, isLocale, LOCALE_COOKIE, type Locale } from "@/lib/i18n";
import styles from "./StoreUnavailable.module.css";

type StoreUnavailableProps = {
  reset?: () => void;
  fullScreen?: boolean;
};

function getLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const value = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${LOCALE_COOKIE}=`))
    ?.split("=")[1];
  return isLocale(value) ? value : "en";
}

export default function StoreUnavailable({ reset, fullScreen = false }: StoreUnavailableProps) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => setLocale(getLocale()), []);

  const retry = useCallback(() => {
    reset?.();
    if (!reset) window.location.reload();
  }, [reset]);

  const t = messages[locale].storeUnavailable;

  return (
    <main className={`${styles.root} ${fullScreen ? styles.fullScreen : ""}`}>
      <section className={styles.panel} role="alert">
        <div className={styles.mark} aria-hidden="true">DS</div>
        <p className={styles.code}>{t.code}</p>
        <h1>{t.title}</h1>
        <p className={styles.body}>{t.body}</p>
        <button type="button" onClick={retry} className={styles.retry}>{t.retry}<span aria-hidden="true">↻</span></button>
      </section>
    </main>
  );
}
