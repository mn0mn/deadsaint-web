import { Product } from "./types";

/**
 * Data layer for products.
 *
 * Backend is TBD, so every page/component should import from HERE
 * (not from a hardcoded array) and these functions should be the ONLY
 * place that changes once you pick a backend:
 *   - Shopify Storefront API -> fetch() calls to Shopify here
 *   - Custom REST/GraphQL API -> fetch() calls to your API here
 *   - Headless CMS -> SDK calls here
 *
 * Keeping this boundary means swapping backends later is a change in
 * one file, not a rewrite of every page.
 */

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "reaper-battle-jacket",
    name: "Reaper Battle Jacket",
    description: "Denim battle jacket, patch-ready back panel.",
    priceCents: 11800,
    currency: "USD",
    category: "apparel",
    images: [],
    inStock: true,
    tags: ["new"],
  },
  {
    id: "2",
    slug: "static-riot-tee",
    name: "Static Riot Tee",
    description: "100% ringspun cotton screen print tee.",
    priceCents: 3400,
    currency: "USD",
    category: "apparel",
    images: [],
    inStock: true,
  },
  {
    id: "3",
    slug: "chainlink-choker",
    name: "Chainlink Choker",
    description: "Surgical steel chainlink choker.",
    priceCents: 2600,
    currency: "USD",
    category: "accessories",
    images: [],
    inStock: true,
    tags: ["low-stock"],
  },
];

export async function getAllProducts(): Promise<Product[]> {
  // TODO: replace with real fetch once backend is chosen
  return MOCK_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  // TODO: replace with real fetch once backend is chosen
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export async function getProductsByCategory(
  category: Product["category"]
): Promise<Product[]> {
  return MOCK_PRODUCTS.filter((p) => p.category === category);
}
