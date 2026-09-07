import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/medusa";
import ProductDetail from "@/components/ProductDetail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const images = Array.from(
    new Set(
      [product.thumbnail, ...(product.images ?? []).map((image) => image.url)].filter(
        (url): url is string => Boolean(url),
      ),
    ),
  );

  return (
    <ProductDetail
      title={product.title}
      description={product.description}
      images={images}
      variants={product.variants ?? []}
    />
  );
}
