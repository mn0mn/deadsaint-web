import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductCategoryByHandle, getProductsByCategory } from "@/lib/medusa";
import CategoryFilters from "@/components/CategoryFilters";
import styles from "./Category.module.css";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const category = await getProductCategoryByHandle(handle);

  if (!category) notFound();

  const products = await getProductsByCategory(category.id);

  const optionMap = new Map<
    string,
    { id: string; title: string; values: { id: string; value: string }[] }
  >();

  for (const product of products) {
    for (const option of product.options ?? []) {
      if (!optionMap.has(option.id)) {
        optionMap.set(option.id, {
          id: option.id,
          title: option.title,
          values: [],
        });
      }

      const target = optionMap.get(option.id)!;
      const known = new Set(target.values.map((value) => value.id));

      for (const value of option.values ?? []) {
        if (!known.has(value.id)) {
          target.values.push({ id: value.id, value: value.value });
        }
      }
    }
  }

  const options = [...optionMap.values()].filter((option) => option.values.length > 0);

  return (
    <section className={styles.category}>
      <div className={styles.hero}>
        <Link href="/shop" className={styles.back}>← SHOP</Link>
        <div className={styles.index}>CATEGORY / {category.id.slice(-4).toUpperCase()}</div>
        <h1>{category.name}</h1>
        {category.description && <p>{category.description}</p>}
      </div>

      <CategoryFilters products={products} options={options} />
    </section>
  );
}
