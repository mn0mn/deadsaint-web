/**
 * A product category. Supports nesting (Clothing -> Tops -> T-Shirts)
 * via parentId, matching how Medusa models categories natively.
 */
export interface Category {
  id: string;
  slug: string;
  name: string;
  parentId?: string;
}
