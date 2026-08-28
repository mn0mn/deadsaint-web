import { CommerceSource } from "./source";
import { mockSource } from "./mock-source";
// import { medusaSource } from "./medusa-source";

/**
 * THIS LINE is the entire "swap the backend" operation.
 *
 * Today: mockSource (placeholder data, no network calls).
 * Once Medusa is wired up: change this to `medusaSource` and everything
 * else in the app — pages, components, lib/products.ts — needs zero changes.
 */
export const source: CommerceSource = mockSource;
