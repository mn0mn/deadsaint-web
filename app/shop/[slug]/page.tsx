import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <section className="product-detail">
      <div className="product-detail-art" />
      <div>
        <h1>{product.name}</h1>
        <p className="price">{formatPrice(product.priceCents, product.currency)}</p>
        <p>{product.description}</p>
        <button disabled={!product.inStock} className="btn">
          {product.inStock ? "Add to cart" : "Sold out"}
        </button>
      </div>
    </section>
  );
}
