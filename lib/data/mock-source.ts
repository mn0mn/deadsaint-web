import { Brand, Category, Collection, Product } from "../types";
import { CommerceSource } from "./source";

/**
 * Placeholder data reflecting the real shape of the business: Deadsaint
 * starts by curating/reselling other brands' gear (e.g. "Ashborne Supply
 * Co." below) and will add its own manufactured line ("Deadsaint
 * Originals") as a brand of its own later — no special-casing needed,
 * it's just another Brand record with its own products.
 */

const BRANDS: Brand[] = [
  {
    id: "brand-deadsaint",
    slug: "deadsaint-originals",
    name: "Deadsaint Originals",
    description: "Deadsaint's own manufactured line. Coming later.",
  },
  {
    id: "brand-ashborne",
    slug: "ashborne-supply-co",
    name: "Ashborne Supply Co.",
    description: "Independent metal/punk apparel label, curated by Deadsaint.",
  },
];

const CATEGORIES: Category[] = [
  { id: "cat-clothing", slug: "clothing", name: "Clothing" },
  { id: "cat-outerwear", slug: "outerwear", name: "Outerwear", parentId: "cat-clothing" },
  { id: "cat-tops", slug: "tops", name: "Tops", parentId: "cat-clothing" },
  { id: "cat-tshirts", slug: "t-shirts", name: "T-Shirts", parentId: "cat-tops" },
  { id: "cat-accessories", slug: "accessories", name: "Accessories" },
  { id: "cat-jewelry", slug: "jewelry", name: "Jewelry", parentId: "cat-accessories" },
  { id: "cat-gifts", slug: "gifts", name: "Gifts" },
];

const COLLECTIONS: Collection[] = [
  {
    id: "col-fall-restock",
    slug: "fall-restock",
    name: "Fall Restock",
    description: "Back in stock for the season.",
  },
];

const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "reaper-battle-jacket",
    name: "Reaper Battle Jacket",
    description: "Denim battle jacket, patch-ready back panel.",
    brandId: "brand-ashborne",
    categoryIds: ["cat-outerwear"],
    collectionIds: ["col-fall-restock"],
    media: [],
    tags: ["new"],
    variants: [
      {
        id: "1-v1",
        sku: "RBJ-OS",
        title: "One Size",
        priceCents: 11800,
        currency: "USD",
        inStock: true,
        options: [{ name: "Size", value: "One Size" }],
      },
    ],
  },
  {
    id: "2",
    slug: "static-riot-tee",
    name: "Static Riot Tee",
    description: "100% ringspun cotton screen print tee.",
    brandId: "brand-ashborne",
    categoryIds: ["cat-tshirts"],
    media: [],
    variants: [
      {
        id: "2-v1",
        sku: "SRT-S",
        title: "Small",
        priceCents: 3400,
        currency: "USD",
        inStock: true,
        options: [{ name: "Size", value: "S" }],
      },
      {
        id: "2-v2",
        sku: "SRT-M",
        title: "Medium",
        priceCents: 3400,
        currency: "USD",
        inStock: false,
        options: [{ name: "Size", value: "M" }],
      },
    ],
  },
  {
    id: "3",
    slug: "chainlink-choker",
    name: "Chainlink Choker",
    description: "Surgical steel chainlink choker.",
    brandId: "brand-ashborne",
    categoryIds: ["cat-jewelry"],
    media: [],
    tags: ["low-stock"],
    variants: [
      {
        id: "3-v1",
        sku: "CLC-OS",
        title: "One Size",
        priceCents: 2600,
        currency: "USD",
        inStock: true,
        options: [],
      },
    ],
  },
];

export const mockSource: CommerceSource = {
  async getProducts() {
    return PRODUCTS;
  },
  async getProductBySlug(slug) {
    return PRODUCTS.find((p) => p.slug === slug);
  },
  async getProductsByCategory(categoryId) {
    return PRODUCTS.filter((p) => p.categoryIds.includes(categoryId));
  },
  async getProductsByCollection(collectionId) {
    return PRODUCTS.filter((p) => p.collectionIds?.includes(collectionId));
  },
  async getProductsByBrand(brandId) {
    return PRODUCTS.filter((p) => p.brandId === brandId);
  },
  async searchProducts(query) {
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  },

  async getCategories() {
    return CATEGORIES;
  },
  async getCategoryBySlug(slug) {
    return CATEGORIES.find((c) => c.slug === slug);
  },

  async getCollections() {
    return COLLECTIONS;
  },
  async getCollectionBySlug(slug) {
    return COLLECTIONS.find((c) => c.slug === slug);
  },

  async getBrands() {
    return BRANDS;
  },
  async getBrandBySlug(slug) {
    return BRANDS.find((b) => b.slug === slug);
  },
};
