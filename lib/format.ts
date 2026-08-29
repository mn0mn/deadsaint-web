import { MedusaProduct } from "./medusa";

export function formatPrice(amount: number, currency: string = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}

// Medusa doesn't give a product a single price/stock status - its
// variants do. Pick the cheapest one for card/list views.
export function getDisplayVariant(product: MedusaProduct) {
  const variants = product.variants ?? [];
  if (variants.length === 0) return undefined;
  return variants.reduce((cheapest, v) =>
    (v.calculated_price?.calculated_amount ?? Infinity) <
    (cheapest.calculated_price?.calculated_amount ?? Infinity)
      ? v
      : cheapest
  );
}
