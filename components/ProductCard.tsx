import Link from "next/link";
import { MedusaProduct } from "@/lib/medusa";
import { formatPrice, getDisplayVariant } from "@/lib/format";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: MedusaProduct }) {
  const variant = getDisplayVariant(product);
  const image = product.thumbnail ?? product.images?.[0]?.url;

  return (
    <Link href={`/shop/${product.handle}`} className={styles.card}>
      <div className={styles.art}>
        {image ? (
          <img src={image} alt={product.title} loading="lazy" className={styles.image} />
        ) : (
          <div className={styles.placeholder} aria-hidden="true" />
        )}
      </div>
      <h3>{product.title}</h3>
      {variant && (
        <p className={styles.price}>
          {formatPrice(
            variant.calculated_price?.calculated_amount ?? 0,
            variant.calculated_price?.currency_code ?? "usd"
          )}
        </p>
      )}
    </Link>
  );
}
