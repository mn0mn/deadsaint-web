export function formatPrice(cents: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

import { Product } from "./types";

/**
 * Products no longer have a single price/stock status — their variants do.
 * This picks a representative variant for list/card views: prefer the
 * cheapest in-stock one, fall back to the cheapest overall if everything's
 * sold out.
 */
export function getDisplayVariant(product: Product) {
  const inStock = product.variants.filter((v) => v.inStock);
  const pool = inStock.length > 0 ? inStock : product.variants;
  return pool.reduce((cheapest, v) =>
    v.priceCents < cheapest.priceCents ? v : cheapest
  );
}

export function isProductInStock(product: Product): boolean {
  return product.variants.some((v) => v.inStock);
}
