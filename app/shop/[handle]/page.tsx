import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";
import { getProductByHandle } from "@/lib/medusa";
import ProductDetail from "@/components/ProductDetail";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

const LOCALE_HEADER = "x-deadsaint-locale";

async function getRequestLocale(): Promise<Locale> {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const headerLocale = headerStore.get(LOCALE_HEADER) ?? undefined;
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  return isLocale(headerLocale) ? headerLocale : isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return {};

  const locale = await getRequestLocale();
  const metadata = (product.metadata ?? {}) as Record<string, unknown>;
  const title = locale === "fa" && typeof metadata.title_fa === "string" ? metadata.title_fa : product.title;
  const description = locale === "fa" && typeof metadata.description_fa === "string" ? metadata.description_fa : product.description ?? undefined;

  return { title: `${title} — Deadsaint`, description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const locale = await getRequestLocale();
  const metadata = (product.metadata ?? {}) as Record<string, unknown>;
  const localizedTitle = locale === "fa" && typeof metadata.title_fa === "string" ? metadata.title_fa : product.title;
  const localizedDescription = locale === "fa" && typeof metadata.description_fa === "string" ? metadata.description_fa : product.description;

  const images = Array.from(
    new Set(
      [product.thumbnail, ...(product.images ?? []).map((image) => image.url)].filter(
        (url): url is string => Boolean(url),
      ),
    ),
  );

  return (
    <ProductDetail
      title={localizedTitle}
      description={localizedDescription}
      images={images}
      variants={product.variants ?? []}
    />
  );
}
