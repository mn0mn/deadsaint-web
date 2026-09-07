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

export default function ContactPage() {
  const mapUrl = `https://www.google.com/maps?q=${CONTACT.map.lat},${CONTACT.map.lng}&output=embed`;

  return (
    <section className="contact-page">
      <style>{`
        .contact-page,
        .contact-page * { min-width: 0; }
        .contact-card,
        .map-card,
        .contact-note { max-width: 100%; overflow: hidden; }
        .contact-card p,
        .contact-note p,
        .map-note,
        .contact-big-link,
        .contact-stats span,
        .contact-stats strong,
        .social-links a { overflow-wrap: anywhere; word-break: break-word; }
        .contact-stats div,
        .social-links a { min-width: 0; }

        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 560px) {
          .contact-hero { padding: 56px 18px 68px; }
          .contact-hero h1 { font-size: clamp(3.25rem, 17vw, 5.5rem); }
          .contact-hero p { font-size: .95rem; }
          .contact-hero p br { display: none; }
          .contact-tape { padding-left: 18px; padding-right: 18px; }
          .contact-grid { grid-template-columns: minmax(0, 1fr); gap: 22px; padding: 28px 18px 58px; }
          .contact-main,
          .contact-side { min-width: 0; gap: 22px; }
          .contact-card { padding: 24px 18px; transform: none; }
          .contact-card h2,
          .map-card h2 { font-size: clamp(1.65rem, 9vw, 2.5rem); }
          .contact-stats { grid-template-columns: 1fr; }
          .contact-stats div { min-height: auto; padding: 16px; }
          .social-links { grid-template-columns: 1fr; }
          .social-links a { padding: 16px; }
          .map-card { padding: 18px; }
          .map-heading { display: block; }
          .map-coords { display: block; margin-top: 10px; white-space: normal; overflow-wrap: anywhere; }
          .map-frame-wrap,
          .map-frame-wrap iframe { min-height: 300px; height: 300px; }
          .contact-note { padding: 22px 18px; }
          .contact-bottom { flex-direction: column; gap: 8px; padding: 18px; }
        }

        @media (max-width: 375px) {
          .contact-hero { padding: 48px 14px 60px; }
          .contact-hero h1 { font-size: 3.05rem; letter-spacing: -.07em; }
          .contact-grid { padding-left: 14px; padding-right: 14px; }
          .contact-card,
          .map-card,
          .contact-note { border-width: 2px; box-shadow: 5px 5px 0 var(--ink); }
          .contact-card { padding: 21px 14px; }
          .contact-label { font-size: .64rem; letter-spacing: .08em; }
          .contact-big-link { font-size: .86rem; }
          .contact-stats strong,
          .contact-stats span { font-size: .67rem; }
          .map-card { padding: 14px; }
          .map-frame-wrap,
          .map-frame-wrap iframe { height: 255px; min-height: 255px; }
          .contact-bottom { font-size: .6rem; }
        }
      `}</style>

      <header className="contact-hero">
        <span className="contact-eyebrow">THE DEADSAINT HOTLINE™</span>
        <h1>TALK TO<br />THE DEAD.</h1>
        <p>
          Got a question? Complaint? Love letter? Existential crisis?
          <br />
          Send it our way. We&apos;re listening. Mostly.
        </p>
      </header>

      <div className="contact-tape" aria-hidden="true">
        <span>NO CORPORATE ROBOTS</span>
        <span>REAL HUMANS (ALLEGEDLY)</span>
        <span>EST. SOMEWHERE IN THE UNDERWORLD</span>
      </div>

      <div className="contact-grid">
        <div className="contact-main">
          <div className="contact-card contact-card-dark">
            <span className="contact-label">01 / EMAIL THE DEAD</span>
            <h2>Got something to say?</h2>
            <p>
              Orders, sizing, collaborations, wholesale, existential complaints,
              or anything else that survived the night.
            </p>
            <a className="contact-big-link" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </div>

          <div className="contact-card contact-card-red">
            <span className="contact-label">02 / CUSTOMER SERVICE DEPARTMENT</span>
            <div className="contact-stats">
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

          <div className="contact-card contact-card-light">
            <span className="contact-label">03 / SOCIAL DISTORTION</span>
            <h2>Find us in the wild.</h2>
            <div className="social-links">
              <a href={CONTACT.socials.instagram} target="_blank" rel="noreferrer">
                Instagram <span>↗</span>
              </a>
              <a href={CONTACT.socials.tiktok} target="_blank" rel="noreferrer">
                TikTok <span>↗</span>
              </a>
              <a href={CONTACT.socials.telegram} target="_blank" rel="noreferrer">
                Telegram <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        <aside className="contact-side">
          <div className="map-card">
            <div className="map-heading">
              <div>
                <span className="contact-label">04 / COME FIND US</span>
                <h2>THE DEAD HQ</h2>
              </div>
              <span className="map-coords">
                {CONTACT.map.lat.toFixed(4)}° / {CONTACT.map.lng.toFixed(4)}°
              </span>
            </div>
            <div className="map-frame-wrap">
              <iframe
                title="DeadSaint location map"
                src={mapUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-stamp" aria-hidden="true">DS</div>
            </div>
            <p className="map-note">
              Coordinates are currently classified. Replace the lat/lng above
              when Dead HQ is ready to be discovered.
            </p>
          </div>

          <div className="contact-note">
            <span>BEFORE YOU SUMMON US</span>
            <p>
              Check your order email before blaming the spirits. If your parcel
              is genuinely lost, we&apos;ll help you hunt it down.
            </p>
          </div>
        </aside>
      </div>

      <footer className="contact-bottom">
        <span>DEADSAINT / NO REFUNDS ON BAD ATTITUDES</span>
        <span>☠ KEEP THE DEAD ALIVE ☠</span>
      </footer>
    </section>
  );
}
