import { source } from "./data";
import { Category } from "./types";

export async function getAllCategories(): Promise<Category[]> {
  return source.getCategories();
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return source.getCategoryBySlug(slug);
}
