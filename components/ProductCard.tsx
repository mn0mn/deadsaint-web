import Link from "next/link";
import { MedusaProduct } from "@/lib/medusa";
import { formatPrice, getDisplayVariant } from "@/lib/format";

export default function ProductCard({ product }: { product: MedusaProduct }) {
  const variant = getDisplayVariant(product);
  const image = product.thumbnail ?? product.images?.[0]?.url;

  return (
    <Link href={`/shop/${product.handle}`} className="product-card">
      <div className="product-card-art">
        {image ? (
          <img
            src={image}
            alt={product.title}
            loading="lazy"
            className="product-card-image"
          />
        ) : (
          <div className="product-card-image-placeholder" aria-hidden="true" />
        )}
      </div>
      <h3>{product.title}</h3>
      {variant && (
        <p className="price">
          {formatPrice(
            variant.calculated_price?.calculated_amount ?? 0,
            variant.calculated_price?.currency_code ?? "usd"
          )}
        </p>
      )}
    </Link>
  );
}
