import { ProductSource } from "./products";
import { CategorySource } from "./categories";
import { CollectionSource } from "./collections";
import { BrandSource } from "./brands";

/**
 * The full contract a commerce backend implementation must satisfy.
 *
 * Each resource's methods are defined in their own file (products.ts,
 * categories.ts, etc.) so no single interface file grows into a
 * 400-line catch-all. This file just assembles them.
 *
 * Cart/checkout is deliberately NOT part of this yet — that gets modeled
 * once we're actually wiring up Medusa's cart API, not before.
 */
export interface CommerceSource
  extends ProductSource,
    CategorySource,
    CollectionSource,
    BrandSource {}
