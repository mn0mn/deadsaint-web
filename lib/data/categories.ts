import { Category } from "../types";

export interface CategorySource {
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
}
