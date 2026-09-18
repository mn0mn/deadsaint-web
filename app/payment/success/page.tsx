import Link from "next/link";
import styles from "./Success.module.css";

export default function PaymentSuccessPage() {
  // TODO: Read the verified order/payment result from the server-side payment callback.
  // TODO: Replace placeholder order data with the real Medusa order.
  const order = {
    id: "DS-10482",
    items: [
      { title: "BLACK STATIC TEE", size: "L", quantity: 1, price: "€45" },
      { title: "DS CHAIN", size: "ONE SIZE", quantity: 1, price: "€40" },
    ],
    total: "€85",
  };

  return (
    <main className={styles.page}>
      <div className={styles.topline}>
        <span>DEADSAINT</span>
        <span>PAYMENT / 0001</span>
      </div>

      <section className={styles.hero}>
        <p className={styles.kicker}>TRANSACTION COMPLETE</p>
        <h1>PAYMENT<br /><em>CONFIRMED.</em></h1>
        <div className={styles.confirmMark} aria-hidden="true">✓</div>
        <p className={styles.intro}>Your order has been received and is being prepared for dispatch.</p>
      </section>

      <section className={styles.order}>
        <div className={styles.orderHeader}>
          <div>
            <span className={styles.label}>ORDER</span>
            <strong>{order.id}</strong>
          </div>
          <div className={styles.status}>
            <span className={styles.label}>STATUS</span>
            <strong>PAID</strong>
          </div>
        </div>

        <div className={styles.items}>
          {order.items.map((item) => (
            <article className={styles.item} key={`${item.title}-${item.size}`}>
              <div className={styles.itemImage} aria-hidden="true">DS</div>
              <div className={styles.itemInfo}>
                <h2>{item.title}</h2>
                <p>SIZE {item.size} · QTY {item.quantity}</p>
              </div>
              <strong className={styles.price}>{item.price}</strong>
            </article>
          ))}
        </div>

        <div className={styles.total}>
          <span>ORDER TOTAL</span>
          <strong>{order.total}</strong>
        </div>
      </section>

      <section className={styles.actions}>
        <Link href="/account" className={styles.primary}>VIEW ORDER →</Link>
        <Link href="/shop" className={styles.secondary}>CONTINUE SHOPPING</Link>
      </section>

      <footer className={styles.footer}>
        <span>THANK YOU FOR THE DAMAGE.</span>
        <span>DS / DEADSAINT</span>
      </footer>
    </main>
  );
}
