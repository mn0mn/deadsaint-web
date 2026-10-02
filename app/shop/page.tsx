import Link from "next/link";
import { cookies } from "next/headers";
import ProductCard from "@/components/ProductCard";
import StoreUnavailable from "@/components/StoreUnavailable";
import { getAllProducts, getProductCategories } from "@/lib/medusa";
import { getMessages, isLocale, LOCALE_COOKIE } from "@/lib/i18n";
import styles from "./Shop.module.css";

export default async function ShopPage() {
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
  const messages = getMessages(isLocale(cookieLocale) ? cookieLocale : "en");
  const t = messages.shop;

  let products;
  let categories;

  try {
    [products, categories] = await Promise.all([
      getAllProducts(),
      getProductCategories(),
    ]);
  } catch (error) {
    console.error("Failed to load shop:", error);
    return <StoreUnavailable />;
  }

  return (
    <section className={styles.shop}>
      <h1>{t.title}</h1>

      {categories.length > 0 && (
        <details className={styles.categoryMenu}>
          <summary className={styles.categoryTrigger}>
            <span>{t.categories}</span>
            <span className={styles.categoryIcon} aria-hidden="true">+</span>
          </summary>

          <div className={styles.categoryPanel}>
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/shop/category/${category.handle}`}
                className={styles.category}
              >
                <span className={styles.categoryNumber}>
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className={styles.categoryName}>{category.name}</span>
                {category.description && (
                  <span className={styles.categoryDescription}>{category.description}</span>
                )}
                <span className={styles.categoryArrow}>↗</span>
              </Link>
            ))}
          </div>
        </details>
      )}

      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
