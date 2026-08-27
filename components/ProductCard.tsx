import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="product-card">
      <div className="product-card-art" />
      <h3>{product.name}</h3>
      <p className="price">{formatPrice(product.priceCents, product.currency)}</p>
    </Link>
  );
}
