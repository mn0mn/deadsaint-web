import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/medusa";
import ProductDetail from "@/components/ProductDetail";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "@/lib/i18n";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale: Locale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
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
