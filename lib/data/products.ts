import { Product } from "../types";

export interface ProductSource {
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getProductsByCollection(collectionId: string): Promise<Product[]>;
  getProductsByBrand(brandId: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
}
