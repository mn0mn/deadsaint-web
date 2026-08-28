/**
 * One selected value of a product option (e.g. { name: "Size", value: "M" }).
 * A variant is a specific combination of these — same shape Medusa uses
 * internally (Options define the axes, Variants are combinations of values).
 */
export interface ProductOptionValue {
  name: string;
  value: string;
}

/**
 * A purchasable SKU. Products don't have a single price/stock status —
 * their variants do (a Reaper Battle Jacket in size M might be in stock
 * while size S is sold out, and that's tracked per variant).
 */
export interface ProductVariant {
  id: string;
  sku?: string;
  title: string;
  priceCents: number;
  currency: string;
  inStock: boolean;
  options: ProductOptionValue[];
}
