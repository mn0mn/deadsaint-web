import { Media } from "./media";

/**
 * A brand a product belongs to.
 *
 * Deadsaint starts as a curator/reseller of other brands' gear, then
 * eventually adds its own manufactured line. That line is just another
 * Brand record (e.g. "Deadsaint Originals") — no special-casing needed
 * anywhere else in the app.
 *
 * Note: Medusa has no native "Brand" entity. When mapping from Medusa,
 * this will likely come from a Product Type, a custom category, or
 * product metadata — decided when medusa-source.ts is implemented.
 */
export interface Brand {
  id: string;
  slug: string;
  name: string;
  description?: string;
  logo?: Media;
}
