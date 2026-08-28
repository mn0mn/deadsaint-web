import { Product } from "../types";
import { CommerceSource } from "./source";

/**
 * Medusa implementation of CommerceSource — NOT wired up yet.
 *
 * Fill this in once:
 *   1. The Medusa backend is running (Postgres + Redis + `medusa` server)
 *   2. `@medusajs/js-sdk` is installed in this project
 *   3. A Medusa client is configured (base URL via env var, e.g.
 *      NEXT_PUBLIC_MEDUSA_BACKEND_URL) and a default region_id is known
 *
 * Rough shape once real (uncomment/adapt, don't copy blindly):
 *
 *   import Medusa from "@medusajs/js-sdk";
 *   const medusa = new Medusa({ baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL! });
 *
 *   async getAllProducts() {
 *     const { products } = await medusa.store.product.list({ region_id: REGION_ID });
 *     return products.map(toDomainProduct);
 *   }
 *
 * `toDomainProduct` would be a small mapper function converting Medusa's
 * product shape into our own `Product` type from lib/types.ts — keeping
 * Medusa's data shape from leaking into the rest of the app.
 */
export const medusaSource: CommerceSource = {
  async getAllProducts(): Promise<Product[]> {
    throw new Error("medusaSource.getAllProducts not implemented yet");
  },

  async getProductBySlug(): Promise<Product | undefined> {
    throw new Error("medusaSource.getProductBySlug not implemented yet");
  },

  async getProductsByCategory(): Promise<Product[]> {
    throw new Error("medusaSource.getProductsByCategory not implemented yet");
  },
};
