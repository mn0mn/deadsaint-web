import { cookies } from "next/headers";
import { DEFAULT_LOCALE, getMessages, isLocale } from "@/lib/i18n";
import styles from "./Contact.module.css";

const CONTACT = { email: "YOUR_EMAIL_HERE", phone: "YOUR_PHONE_HERE", socials: { instagram: "#", tiktok: "#", telegram: "#" }, map: { lat: 0, lng: 0 } };

export default async function ContactPage() {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get("deadsaint-locale")?.value;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const m = getMessages(locale).contact;
  const mapUrl = `https://www.google.com/maps?q=${CONTACT.map.lat},${CONTACT.map.lng}&output=embed`;

  return (
    <section className={styles.page}>
      <header className={styles.hero}><span className={styles.eyebrow}>{m.eyebrow}</span><h1>{m.title.split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h1><p>{m.intro1}<br />{m.intro2}</p></header>
      <div className={styles.tape} aria-hidden="true"><span>{m.tape1}</span><span>{m.tape2}</span><span>{m.tape3}</span></div>
      <div className={styles.grid}>
        <div className={styles.main}>
          <div className={`${styles.card} ${styles.cardDark}`}><span className={styles.label}>{m.emailLabel}</span><h2>{m.emailTitle}</h2><p>{m.emailBody}</p><a className={styles.bigLink} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
          <div className={`${styles.card} ${styles.cardRed}`}><span className={styles.label}>{m.serviceLabel}</span><div className={styles.stats}><div><strong>{m.hours}</strong><span>{m.awake}</span></div><div><strong>{m.response}</strong><span>{m.eternity}</span></div><div><strong>{m.emergency}</strong><span>{m.buyShirt}</span></div></div></div>
          <div className={`${styles.card} ${styles.cardLight}`}><span className={styles.label}>{m.socialLabel}</span><h2>{m.socialTitle}</h2><div className={styles.socialLinks}><a href={CONTACT.socials.instagram} target="_blank" rel="noreferrer">Instagram <span>↗</span></a><a href={CONTACT.socials.tiktok} target="_blank" rel="noreferrer">TikTok <span>↗</span></a><a href={CONTACT.socials.telegram} target="_blank" rel="noreferrer">Telegram <span>↗</span></a></div></div>
        </div>
        <aside className={styles.side}><div className={styles.mapCard}><div className={styles.mapHeading}><div><span className={styles.label}>{m.findLabel}</span><h2>{m.hq}</h2></div><span className={styles.mapCoords}>{CONTACT.map.lat.toFixed(4)}° / {CONTACT.map.lng.toFixed(4)}°</span></div><div className={styles.mapFrame}><iframe title={m.mapTitle} src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className={styles.mapStamp} aria-hidden="true">DS</div></div><p className={styles.mapNote}>{m.mapNote}</p></div><div className={styles.note}><span>{m.before}</span><p>{m.beforeBody}</p></div></aside>
      </div>
      <footer className={styles.bottom}><span>{m.bottom1}</span><span>{m.bottom2}</span></footer>
    </section>
  );
}
