import Medusa from "@medusajs/js-sdk";
import type { HttpTypes } from "@medusajs/types";

/**
 * Shared Medusa API client for the storefront.
 *
 * Keep NEXT_PUBLIC_* environment references static so Next.js can inline them.
 *
 * TODO: Add a server-only API boundary for privileged checkout/account work.
 */

function requiredEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Check your .env.local file.`
    );
  }

  return value;
}

// One client, configured from env vars. Set these in .env.local —
// see .env.example.
// Keep NEXT_PUBLIC_* references direct so Next.js can inline them into the
// browser bundle. Dynamic process.env[name] lookups are not inlined by Next.js.
const BACKEND_URL = requiredEnv(
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
  "NEXT_PUBLIC_MEDUSA_BACKEND_URL"
);
const REGION_ID = requiredEnv(
  process.env.NEXT_PUBLIC_MEDUSA_REGION_ID,
  "NEXT_PUBLIC_MEDUSA_REGION_ID"
);

export const medusa = new Medusa({
  baseUrl: BACKEND_URL,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  auth: {
    // Cookie sessions are the recommended choice for a Next.js storefront.
    type: "session",
  },
});

export type MedusaProduct = HttpTypes.StoreProduct;

/** Fetch the public product catalog for the configured region. */
export async function getAllProducts(): Promise<MedusaProduct[]> {
  const { products } = await medusa.store.product.list({
    region_id: REGION_ID,
    fields: "*variants.calculated_price,+variants.inventory_quantity",
  });
  return products;
}

export async function getProductByHandle(
  handle: string
): Promise<MedusaProduct | undefined> {
  const { products } = await medusa.store.product.list({
    handle,
    region_id: REGION_ID,
    fields: "*variants.calculated_price,+variants.inventory_quantity",
  });
  return products[0];
}

/** Create the anonymous/session cart used by the storefront. */
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

/** Add a variant to an existing Medusa cart. */
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

/** Update a cart line quantity. */
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

/** Remove a line item and return the updated cart. */
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


export async function getProductCategories(): Promise<HttpTypes.StoreProductCategory[]> {
  const { product_categories } = await medusa.store.category.list({
    limit: 100,
    order: "name",
  });
  return product_categories;
}

export async function getProductCategoryByHandle(
  handle: string
): Promise<HttpTypes.StoreProductCategory | undefined> {
  const { product_categories } = await medusa.store.category.list({
    handle,
    limit: 1,
  });
  return product_categories[0];
}

export async function getProductsByCategory(
  categoryId: string,
  optionValueIds: string[] = []
): Promise<MedusaProduct[]> {
  const { products } = await medusa.store.product.list({
    region_id: REGION_ID,
    category_id: categoryId,
    ...(optionValueIds.length ? { option_value_id: optionValueIds } : {}),
    fields: "*options,*options.values,*variants.calculated_price,+variants.inventory_quantity",
    limit: 100,
  });
  return products;
}
