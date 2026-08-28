import { Product } from "../types";
import { CommerceSource } from "./source";

/**
 * Placeholder implementation used until Medusa is wired up.
 * Satisfies the CommerceSource contract with static in-memory data.
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

export const mockSource: CommerceSource = {
  async getAllProducts() {
    return MOCK_PRODUCTS;
  },

  async getProductBySlug(slug) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug);
  },

  async getProductsByCategory(category) {
    return MOCK_PRODUCTS.filter((p) => p.category === category);
  },
};
