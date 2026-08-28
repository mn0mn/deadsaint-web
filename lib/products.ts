import { source } from "./data";
import { Product } from "./types";

/**
 * Public product API — the only module app/ and components/ should import
 * product data from. Knows nothing about Medusa or mock data; delegates
 * to whichever CommerceSource is active in lib/data/index.ts.
 */

export async function getAllProducts(): Promise<Product[]> {
  return source.getProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return source.getProductBySlug(slug);
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return source.getProductsByCategory(categoryId);
}

export async function getProductsByCollection(collectionId: string): Promise<Product[]> {
  return source.getProductsByCollection(collectionId);
}

export async function getProductsByBrand(brandId: string): Promise<Product[]> {
  return source.getProductsByBrand(brandId);
}

export async function searchProducts(query: string): Promise<Product[]> {
  return source.searchProducts(query);
}
