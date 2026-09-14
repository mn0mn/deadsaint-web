import Link from "next/link";
import { cookies } from "next/headers";
import ProductCard from "@/components/ProductCard";
import StoreUnavailable from "@/components/StoreUnavailable";
import { getAllProducts } from "@/lib/medusa";
import { getMessages, isLocale, LOCALE_COOKIE } from "@/lib/i18n";
import styles from "./Shop.module.css";

const categoryKeys = [
  { name: "apparel", items: ["tshirts", "longSleeves", "hoodies", "crewnecks", "zipHoodies", "jackets", "vests", "pants", "shorts"] },
  { name: "accessories", items: ["caps", "beanies", "jewelry", "chains", "belts", "bags", "totes", "patches", "pins", "badges"] },
  { name: "objects", items: ["posters", "artPrints", "zines", "limitedObjects", "misc"] },
] as const;

export default async function ShopPage() {
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
  const messages = getMessages(isLocale(cookieLocale) ? cookieLocale : "en");
  const t = messages.shop;

  let products;
  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Failed to load shop:", error);
    return <StoreUnavailable />;
  }

  return (
    <section className={styles.shop}>
      <h1>{t.title}</h1>
      <details className={styles.categoryMenu}>
        <summary className={styles.categoryTrigger}>
          <span>{t.categories}</span>
          <span className={styles.categoryIcon} aria-hidden="true">+</span>
        </summary>
        <div className={styles.categoryPanel}>
          {categoryKeys.map((category) => (
            <div className={styles.category} key={category.name}>
              <span className={styles.categoryName}>{t[category.name]}</span>
              <div className={styles.subcategories}>
                {category.items.map((item) => (
                  <Link key={item} href={`/shop?category=${encodeURIComponent(t[item])}`} className={styles.subcategory}>{t[item]}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </details>
      <div className="grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </section>
  );
}
