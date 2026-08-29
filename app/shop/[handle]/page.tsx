import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/medusa";
import { formatPrice } from "@/lib/format";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  return (
    <section className="product-detail">
      <div className="product-detail-art" />
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>

        <div className="variant-list">
          {(product.variants ?? []).map((variant) => {
            const inStock =
              !variant.manage_inventory || (variant.inventory_quantity ?? 0) > 0;
            return (
              <div className="variant-row" key={variant.id}>
                <div>
                  <span className="variant-title">{variant.title}</span>
                  <span className="price">
                    {formatPrice(
                      variant.calculated_price?.calculated_amount ?? 0,
                      variant.calculated_price?.currency_code ?? "usd"
                    )}
                  </span>
                </div>
                <button disabled={!inStock} className="btn">
                  {inStock ? "Add to cart" : "Sold out"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
