"use client";

import Link from "next/link";
import { useCart } from "@/app/providers/cartProvider";

import styles from "./cart.module.css";

function formatPrice(
  amount: number,
  currencyCode: string,
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  }).format(amount / 100);
}

export default function CartPage() {
  const {
    cart,
    loading,
    error,
    updateQuantity,
    removeItem,
  } = useCart();

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.loading}>
          LOADING YOUR HAUL<span>...</span>
        </div>
      </main>
    );
  }

  if (!cart || !cart.items?.length) {
    return (
      <main className={styles.page}>
        <section className={styles.empty}>
          <div className={styles.cross}>†</div>

          <p className={styles.eyebrow}>
            DEADSAINT / CART
          </p>

          <h1 className={styles.emptyTitle}>
            NOTHING
            <br />
            HERE<span>.</span>
          </h1>

          <p className={styles.emptyText}>
            Your cart is currently deceased.
            <br />
            Find something worth bringing back.
          </p>

          <Link
            href="/shop"
            className={styles.shopButton}
          >
            ENTER THE SHOP
            <span>↗</span>
          </Link>
        </section>
      </main>
    );
  }

  const itemCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            DEADSAINT / SHOPPING CART
          </p>

          <h1 className={styles.title}>
            YOUR
            <br />
            HAUL<span>.</span>
          </h1>
        </div>

        <div className={styles.itemCount}>
          <span>ITEMS</span>
          <strong>
            {String(itemCount).padStart(2, "0")}
          </strong>
        </div>
      </header>

      <div className={styles.rule} />

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <div className={styles.layout}>
        <section className={styles.items}>
          {cart.items.map((item, index) => (
            <article
              key={item.id}
              className={styles.item}
            >
              <span className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <Link
                href={`/shop/${item.product_handle}`}
                className={styles.image}
              >
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.product_title ?? item.title}
                  />
                ) : (
                  <div className={styles.noImage}>
                    <span>DS</span>
                  </div>
                )}
              </Link>

              <div className={styles.details}>
                <div className={styles.top}>
                  <div>
                    <p className={styles.productType}>
                      DEADSAINT
                    </p>

                    <h2 className={styles.productName}>
                      {item.product_title ?? item.title}
                    </h2>

                    {item.variant_title && (
                      <p className={styles.variant}>
                        {item.variant_title}
                      </p>
                    )}
                  </div>

                  <p className={styles.price}>
                    {formatPrice(
                      //item.total,
                      80008,
                      cart.currency_code,
                    )}
                  </p>
                </div>

                <div className={styles.bottom}>
                  <div className={styles.quantity}>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1,
                        )
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>
                      {String(item.quantity).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1,
                        )
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => removeItem(item.id)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className={styles.summary}>
          <div className={styles.summaryHeader}>
            <span>THE DAMAGE</span>
            <span>
              {cart.currency_code.toUpperCase()}
            </span>
          </div>

          <div className={styles.totalRow}>
            <span>SUBTOTAL</span>

            <strong>
              {formatPrice(
                cart.subtotal,
                cart.currency_code,
              )}
            </strong>
          </div>

          <div className={styles.divider} />

          <div className={styles.metaRow}>
            <span>SHIPPING</span>
            <span>CALCULATED AT CHECKOUT</span>
          </div>

          <div className={styles.metaRow}>
            <span>TAX</span>
            <span>CALCULATED AT CHECKOUT</span>
          </div>

          <button
            type="button"
            className={styles.checkout}
          >
            PROCEED TO CHECKOUT
            <span>↗</span>
          </button>

          <Link
            href="/shop"
            className={styles.continue}
          >
            ← CONTINUE SHOPPING
          </Link>

          <div className={styles.warning}>
            <span>†</span>

            <p>
              ITEMS ARE NOT RESERVED UNTIL
              CHECKOUT IS COMPLETED.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
