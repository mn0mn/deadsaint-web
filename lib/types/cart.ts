/**
 * Intentionally minimal. Real cart modeling (line items, totals, discounts,
 * shipping) is deferred until we're actually implementing checkout against
 * Medusa's cart API — modeling it now would mean guessing its shape.
 */
export interface CartLine {
  variantId: string;
  quantity: number;
}
