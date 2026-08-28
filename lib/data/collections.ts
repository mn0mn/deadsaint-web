import { Collection } from "../types";

export interface CollectionSource {
  getCollections(): Promise<Collection[]>;
  getCollectionBySlug(slug: string): Promise<Collection | undefined>;
}
