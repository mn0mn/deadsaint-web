const CONTACT = {
  email: "YOUR_EMAIL_HERE",
  phone: "YOUR_PHONE_HERE",
  socials: {
    instagram: "#",
    tiktok: "#",
    telegram: "#",
  },
  map: {
    lat: 0,
    lng: 0,
  },
};

import styles from "./Contact.module.css";

export default function ContactPage() {
  const mapUrl = `https://www.google.com/maps?q=${CONTACT.map.lat},${CONTACT.map.lng}&output=embed`;

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>THE DEADSAINT HOTLINE™</span>
        <h1>TALK TO<br />THE DEAD.</h1>
        <p>
          Got a question? Complaint? Love letter? Existential crisis?
          <br />
          Send it our way. We&apos;re listening. Mostly.
        </p>
      </header>

      <div className={styles.tape} aria-hidden="true">
        <span>NO CORPORATE ROBOTS</span>
        <span>REAL HUMANS (ALLEGEDLY)</span>
        <span>EST. SOMEWHERE IN THE UNDERWORLD</span>
      </div>

      <div className={styles.grid}>
        <div className={styles.main}>
          <div className={`${styles.card} ${styles.cardDark}`}>
            <span className={styles.label}>01 / EMAIL THE DEAD</span>
            <h2>Got something to say?</h2>
            <p>
              Orders, sizing, collaborations, wholesale, existential complaints,
              or anything else that survived the night.
            </p>
            <a className={styles.bigLink} href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </div>

          <div className={`${styles.card} ${styles.cardRed}`}>
            <span className={styles.label}>02 / CUSTOMER SERVICE DEPARTMENT</span>
            <div className={styles.stats}>
              <div>
                <strong>HOURS</strong>
                <span>WHEN WE&apos;RE AWAKE</span>
              </div>
              <div>
                <strong>RESPONSE TIME</strong>
                <span>1–3 BUSINESS ETERNITIES</span>
              </div>
              <div>
                <strong>EMERGENCY</strong>
                <span>BUY ANOTHER SHIRT</span>
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.cardLight}`}>
            <span className={styles.label}>03 / SOCIAL DISTORTION</span>
            <h2>Find us in the wild.</h2>
            <div className={styles.socialLinks}>
              <a href={CONTACT.socials.instagram} target="_blank" rel="noreferrer">Instagram <span>↗</span></a>
              <a href={CONTACT.socials.tiktok} target="_blank" rel="noreferrer">TikTok <span>↗</span></a>
              <a href={CONTACT.socials.telegram} target="_blank" rel="noreferrer">Telegram <span>↗</span></a>
            </div>
          </div>
        </div>

        <aside className={styles.side}>
          <div className={styles.mapCard}>
            <div className={styles.mapHeading}>
              <div>
                <span className={styles.label}>04 / COME FIND US</span>
                <h2>THE DEAD HQ</h2>
              </div>
              <span className={styles.mapCoords}>
                {CONTACT.map.lat.toFixed(4)}° / {CONTACT.map.lng.toFixed(4)}°
              </span>
            </div>
            <div className={styles.mapFrame}>
              <iframe title="DeadSaint location map" src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <div className={styles.mapStamp} aria-hidden="true">DS</div>
            </div>
            <p className={styles.mapNote}>
              Coordinates are currently classified. Replace the lat/lng above
              when Dead HQ is ready to be discovered.
            </p>
          </div>

          <div className={styles.note}>
            <span>BEFORE YOU SUMMON US</span>
            <p>
              Check your order email before blaming the spirits. If your parcel
              is genuinely lost, we&apos;ll help you hunt it down.
            </p>
          </div>
        </aside>
      </div>

      <footer className={styles.bottom}>
        <span>DEADSAINT / NO REFUNDS ON BAD ATTITUDES</span>
        <span>☠ KEEP THE DEAD ALIVE ☠</span>
      </footer>
    </section>
  );
}
