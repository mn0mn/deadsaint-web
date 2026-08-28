import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice, getDisplayVariant } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const variant = getDisplayVariant(product);

  return (
    <Link href={`/shop/${product.slug}`} className="product-card">
      <div className="product-card-art" />
      <h3>{product.name}</h3>
      <p className="price">{formatPrice(variant.priceCents, variant.currency)}</p>
    </Link>
  );
}
