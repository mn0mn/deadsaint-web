import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/medusa";
import styles from "./Shop.module.css";

const categories = [
  {
    name: "Apparel",
    items: ["T-Shirts", "Long Sleeves", "Hoodies", "Crewnecks", "Zip Hoodies", "Jackets", "Vests", "Pants", "Shorts"],
  },
  {
    name: "Accessories",
    items: ["Caps", "Beanies", "Jewelry", "Chains", "Belts", "Bags", "Totes", "Patches", "Pins", "Badges"],
  },
  {
    name: "Objects",
    items: ["Posters", "Art Prints", "Zines", "Limited Objects", "Misc"],
  },
];

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <section className={styles.shop}>
      <h1>Shop</h1>

      <div className={styles.categories} aria-label="Shop categories">
        {categories.map((category) => (
          <div className={styles.category} key={category.name}>
            <span className={styles.categoryName}>{category.name}</span>
            <div className={styles.subcategories}>
              {category.items.map((item) => (
                <Link key={item} href={`/shop?category=${encodeURIComponent(item)}`} className={styles.subcategory}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
