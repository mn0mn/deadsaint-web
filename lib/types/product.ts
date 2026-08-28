import { Media } from "./media";
import { ProductVariant } from "./variant";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  brandId?: string;
  categoryIds: string[];
  collectionIds?: string[];
  media: Media[];
  variants: ProductVariant[];
  tags?: string[];
}
