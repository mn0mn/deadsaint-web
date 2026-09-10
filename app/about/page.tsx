import Link from "next/link";
import styles from "./About.module.css";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, getMessages, isLocale } from "@/lib/i18n";

const CODE = ["01", "02", "03"] as const;

export default async function AboutPage() {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get("deadsaint-locale")?.value;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const m = getMessages(locale).about;
  const prefix = `/${locale}`;
  const items = [
    [CODE[0], m.code1Title, m.code1Body],
    [CODE[1], m.code2Title, m.code2Body],
    [CODE[2], m.code3Title, m.code3Body],
  ];

  return (
    <>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>{m.eyebrow}</span>
        <h1>{m.hero1}<br />{m.hero2}</h1>
      </section>
      <section className={styles.body}>
        <div className={styles.copy}>
          <p>{m.p1}</p>
          <p>{m.p2}</p>
          <Link href={`${prefix}/shop`} className="btn">{m.cta}</Link>
        </div>
        <div className={styles.patch}><div className={styles.patchInner}><span>{m.patch1}</span><strong>{m.patch2}</strong></div></div>
      </section>
      <section className={styles.code}>
        <h2>{m.code}</h2>
        <div className={styles.codeGrid}>
          {items.map(([n, title, body]) => <div className={styles.codeItem} key={n}><span className={styles.codeN}>{n}</span><h3>{title}</h3><p>{body}</p></div>)}
        </div>
      </section>
    </>
  );
}
