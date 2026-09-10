"use client";

import Link from "next/link";
import { useCart } from "@/app/providers/cartProvider";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./cart.module.css";

function formatPrice(amount: number, currencyCode: string, locale: string) {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", { style: "currency", currency: currencyCode.toUpperCase() }).format(amount / 100);
}

export default function CartPage() {
  const { cart, loading, error, updateQuantity, removeItem } = useCart();
  const { locale, messages } = useLocale();
  const t = messages.cart;
  const href = (path: string) => `/${locale}${path}`;

  if (loading) return <main className={styles.page}><div className={styles.loading}>{t.loading}<span>...</span></div></main>;

  if (!cart || !cart.items?.length) return (
    <main className={styles.page}><section className={styles.empty}>
      <div className={styles.cross}>†</div><p className={styles.eyebrow}>{t.emptyEyebrow}</p>
      <h1 className={styles.emptyTitle}>{t.nothing}<br />{t.here}<span>.</span></h1>
      <p className={styles.emptyText}>{t.emptyText}<br />{t.emptyText2}</p>
      <Link href={href("/shop")} className={styles.shopButton}>{t.enterShop}<span>↗</span></Link>
    </section></main>
  );

  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  return <main className={styles.page}>
    <header className={styles.header}><div><p className={styles.eyebrow}>{t.shoppingCart}</p><h1 className={styles.title}>{t.haul}<br />{t.haul2}</h1></div><div className={styles.itemCount}><span>{t.pieces}</span><strong>{String(itemCount).padStart(2, "0")}</strong></div></header>
    <div className={styles.rule} />{error && <div className={styles.error}>{error}</div>}
    <div className={styles.layout}>
      <section className={styles.items}>{cart.items.map((item, index) => <article key={item.id} className={styles.item}>
        <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
        <Link href={href(`/shop/${item.product_handle}`)} className={styles.image}>{item.thumbnail ? <img src={item.thumbnail} alt={item.product_title ?? item.title} /> : <div className={styles.noImage}><span>DS</span></div>}</Link>
        <div className={styles.details}><div className={styles.top}><div><p className={styles.productType}>{t.drop}</p><h2 className={styles.productName}>{item.product_title ?? item.title}</h2>{item.variant_title && <p className={styles.variant}>{item.variant_title}</p>}</div><p className={styles.price}>{formatPrice(item.total ?? 0, cart.currency_code, locale)}</p></div>
          <div className={styles.bottom}><div className={styles.quantity}><button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={t.decrease}>−</button><span>{String(item.quantity).padStart(2, "0")}</span><button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={t.increase}>+</button></div><button type="button" className={styles.remove} onClick={() => removeItem(item.id)}>{t.remove}</button></div>
        </div>
      </article>)}</section>
      <aside className={styles.summary}><div className={styles.summaryStamp}><span>DS / 000</span><span>READY ROOM</span></div><div className={styles.summaryHeader}><span>{t.damage}</span><span>{cart.currency_code.toUpperCase()}</span></div>
        <div className={styles.totalRow}><span>{t.subtotal}</span><strong>{formatPrice(cart.subtotal ?? 0, cart.currency_code, locale)}</strong></div><div className={styles.divider} />
        <div className={styles.metaRow}><span>{t.shipping}</span><span>{t.calculated}</span></div><div className={styles.metaRow}><span>{t.tax}</span><span>{t.calculated}</span></div>
        <button type="button" className={styles.checkout}>{t.checkout}<span>↗</span></button><Link href={href("/shop")} className={styles.continue}>{t.continue}</Link>
        <div className={styles.warning}><span>†</span><p>{t.warning}<br />{t.warning2}</p></div>
      </aside>
    </div>
  </main>;
}
