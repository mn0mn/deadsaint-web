import Medusa from "@medusajs/js-sdk";
import type { HttpTypes } from "@medusajs/types";

// One client, configured from env vars. Set these in .env.local —
// see .env.example.
export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});

// Medusa requires a region for pricing. Set this once you've created a
// region in the Medusa Admin and grab its ID from there.
const REGION_ID = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID!;

export type MedusaProduct = HttpTypes.StoreProduct;

export async function getAllProducts(): Promise<MedusaProduct[]> {
  const { products } = await medusa.store.product.list({
    region_id: REGION_ID,
    fields: "*variants.calculated_price",
  });
  return products;
}

export async function getProductByHandle(
  handle: string
): Promise<MedusaProduct | undefined> {
  const { products } = await medusa.store.product.list({
    handle,
    region_id: REGION_ID,
    fields: "*variants.calculated_price",
  });
  return products[0];
}
