import { Product, ProductCategory } from "../types";

/**
 * The contract any commerce backend must fulfill.
 *
 * This is the ONE thing both the app and every backend implementation
 * agree on. The UI (pages, components) never imports a specific backend —
 * it only ever calls the functions re-exported from `lib/products.ts`,
 * which delegate to whichever implementation of THIS interface is
 * currently active (see `lib/data/index.ts`).
 *
 * Swapping Mock -> Medusa -> something else later means writing a new
 * file that satisfies this interface and flipping one line in
 * `lib/data/index.ts`. Nothing in `app/` or `components/` has to change.
 */
export interface CommerceSource {
  getAllProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(category: ProductCategory): Promise<Product[]>;
}
