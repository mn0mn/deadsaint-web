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
        <p>{product.description}</p>

        <div className="variant-list">
          {product.variants.map((variant) => (
            <div className="variant-row" key={variant.id}>
              <div>
                <span className="variant-title">{variant.title}</span>
                <span className="price">
                  {formatPrice(variant.priceCents, variant.currency)}
                </span>
              </div>
              <button disabled={!variant.inStock} className="btn">
                {variant.inStock ? "Add to cart" : "Sold out"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
