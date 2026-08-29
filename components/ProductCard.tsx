import Link from "next/link";
import { MedusaProduct } from "@/lib/medusa";
import { formatPrice, getDisplayVariant } from "@/lib/format";

export default function ProductCard({ product }: { product: MedusaProduct }) {
  const variant = getDisplayVariant(product);

  return (
    <Link href={`/shop/${product.handle}`} className="product-card">
      <div className="product-card-art" />
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
