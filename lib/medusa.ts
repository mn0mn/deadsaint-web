import Medusa from "@medusajs/js-sdk";
import type { HttpTypes } from "@medusajs/types";
import { error } from "console";

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

export async function createCart(): Promise<HttpTypes.StoreCart> {
  const { cart } = await medusa.store.cart.create({
    region_id: REGION_ID,
  });

  return cart;
}

export async function getCart(
  cartId: string
): Promise<HttpTypes.StoreCart> {
  const { cart } = await medusa.store.cart.retrieve(cartId);

  return cart;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<HttpTypes.StoreCart> {
  const { cart } = await medusa.store.cart.createLineItem(cartId, {
    variant_id: variantId,
    quantity,
  });

  return cart;
}

export async function updateCartItem(
  cartId: string,
  lineItemId: string,
  quantity: number
): Promise<HttpTypes.StoreCart> {
  const { cart } = await medusa.store.cart.updateLineItem(
    cartId,
    lineItemId,
    {
      quantity,
    }
  );

  return cart;
}

export async function removeFromCart(
  cartId: string,
  lineItemId: string
): Promise<HttpTypes.StoreCart> {
  const { parent } = await medusa.store.cart.deleteLineItem(
    cartId,
    lineItemId
  );

  if (!parent) {
    throw new Error("Medusa did not return the cart after removing the item!!!");
  }

  return parent;
}

