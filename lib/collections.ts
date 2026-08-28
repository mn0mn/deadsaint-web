import { source } from "./data";
import { Collection } from "./types";

export async function getAllCollections(): Promise<Collection[]> {
  return source.getCollections();
}

export async function getCollectionBySlug(slug: string): Promise<Collection | undefined> {
  return source.getCollectionBySlug(slug);
}
