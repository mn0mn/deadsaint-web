import { source } from "./data";
import { Product, ProductCategory } from "./types";

/**
 * Public product API.
 *
 * This is the ONLY module `app/` and `components/` should ever import
 * product data from. It knows nothing about Medusa, mock data, or any
 * other backend — it just delegates to whichever `CommerceSource` is
 * currently active in `lib/data/index.ts`.
 *
 * UI code stays backend-agnostic by depending on this file, not on
 * `lib/data/*` directly.
 */

export async function getAllProducts(): Promise<Product[]> {
  return source.getAllProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return source.getProductBySlug(slug);
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  return source.getProductsByCategory(category);
}
