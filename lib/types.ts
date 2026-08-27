export type ProductCategory = "apparel" | "accessories" | "gifts";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  category: ProductCategory;
  images: string[];
  inStock: boolean;
  tags?: string[];
}

export interface CartLine {
  productId: string;
  quantity: number;
}
