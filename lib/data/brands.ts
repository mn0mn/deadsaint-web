import { Brand } from "../types";

export interface BrandSource {
  getBrands(): Promise<Brand[]>;
  getBrandBySlug(slug: string): Promise<Brand | undefined>;
}
