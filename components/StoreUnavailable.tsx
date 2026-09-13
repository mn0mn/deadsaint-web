"use client";

import { useCallback, useEffect, useState } from "react";
import { isLocale, LOCALE_COOKIE, type Locale } from "@/lib/i18n";
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

  const isFa = locale === "fa";

  return (
    <main className={`${styles.root} ${fullScreen ? styles.fullScreen : ""}`} dir={isFa ? "rtl" : "ltr"}>
      <section className={styles.panel} role="alert">
        <div className={styles.mark} aria-hidden="true">DS</div>
        <p className={styles.code}>{isFa ? "خطای 503 / سرویس در دسترس نیست" : "ERROR 503 / SERVICE UNAVAILABLE"}</p>
        <h1>{isFa ? "فروشگاه در دسترس نیست." : "STORE UNAVAILABLE."}</h1>
        <p className={styles.body}>
          {isFa ? "اتصال به سرور فروشگاه برقرار نشد. چند لحظه دیگر دوباره امتحان کن." : "We couldn't reach the store backend. Give it a moment, then try again."}
        </p>
        <button type="button" onClick={retry} className={styles.retry}>
          {isFa ? "تلاش دوباره" : "RETRY"}<span aria-hidden="true">↻</span>
        </button>
      </section>
    </main>
  );
}
