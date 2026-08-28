import { Brand, Category, Collection, Product } from "../types";
import { CommerceSource } from "./source";

/**
 * Medusa implementation of CommerceSource — NOT wired up yet.
 *
 * Deliberately not touching this until:
 *   1. Medusa backend is running (Postgres + Redis + `medusa` server)
 *   2. `@medusajs/js-sdk` is installed and configured
 *   3. Mapping from Medusa's shapes to ours is worked out — notably:
 *        - Medusa has no native "Brand" entity. This will likely map from
 *          a Product Type, a dedicated category, or product metadata.
 *        - Medusa's ProductCategory already supports parent_category_id,
 *          which maps directly to our Category.parentId.
 *        - Medusa's Product + Options + Variants map closely to our
 *          Product + ProductVariant + ProductOptionValue already.
 *
 * A small mapper module (e.g. medusa-mapper.ts) converting Medusa API
 * responses into our domain types belongs alongside this file, so Medusa's
 * shapes never leak past this one module.
 */
function notImplemented(method: string): never {
  throw new Error(`medusaSource.${method} not implemented yet`);
}

export const medusaSource: CommerceSource = {
  async getProducts(): Promise<Product[]> {
    return notImplemented("getProducts");
  },
  async getProductBySlug(): Promise<Product | undefined> {
    return notImplemented("getProductBySlug");
  },
  async getProductsByCategory(): Promise<Product[]> {
    return notImplemented("getProductsByCategory");
  },
  async getProductsByCollection(): Promise<Product[]> {
    return notImplemented("getProductsByCollection");
  },
  async getProductsByBrand(): Promise<Product[]> {
    return notImplemented("getProductsByBrand");
  },
  async searchProducts(): Promise<Product[]> {
    return notImplemented("searchProducts");
  },

  async getCategories(): Promise<Category[]> {
    return notImplemented("getCategories");
  },
  async getCategoryBySlug(): Promise<Category | undefined> {
    return notImplemented("getCategoryBySlug");
  },

  async getCollections(): Promise<Collection[]> {
    return notImplemented("getCollections");
  },
  async getCollectionBySlug(): Promise<Collection | undefined> {
    return notImplemented("getCollectionBySlug");
  },

  async getBrands(): Promise<Brand[]> {
    return notImplemented("getBrands");
  },
  async getBrandBySlug(): Promise<Brand | undefined> {
    return notImplemented("getBrandBySlug");
  },
};
