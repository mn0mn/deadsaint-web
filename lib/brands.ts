import { source } from "./data";
import { Brand } from "./types";

export async function getAllBrands(): Promise<Brand[]> {
  return source.getBrands();
}

export async function getBrandBySlug(slug: string): Promise<Brand | undefined> {
  return source.getBrandBySlug(slug);
}
