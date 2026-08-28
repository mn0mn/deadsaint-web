/**
 * A curated grouping of products (e.g. a seasonal drop, "Back in Black
 * Restock", a collab). Distinct from Category: categories are the
 * permanent taxonomy, collections are more like a themed shelf.
 */
export interface Collection {
  id: string;
  slug: string;
  name: string;
  description?: string;
}
