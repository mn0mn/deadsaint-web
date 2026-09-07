import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/medusa";
import "./shop.css";

const categories = [
  {
    name: "Apparel",
    items: [
      "T-Shirts",
      "Long Sleeves",
      "Hoodies",
      "Crewnecks",
      "Zip Hoodies",
      "Jackets",
      "Vests",
      "Pants",
      "Shorts",
    ],
  },
  {
    name: "Accessories",
    items: [
      "Caps",
      "Beanies",
      "Jewelry",
      "Chains",
      "Belts",
      "Bags",
      "Totes",
      "Patches",
      "Pins",
      "Badges",
    ],
  },
  {
    name: "Objects",
    items: ["Posters", "Art Prints", "Zines", "Limited Objects", "Misc"],
  },
];

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <section className="shop">
      <h1>Shop</h1>

      <div className="shop-categories" aria-label="Shop categories">
        {categories.map((category) => (
          <div className="shop-category" key={category.name}>
            <span className="shop-category-name">{category.name}</span>
            <div className="shop-subcategories">
              {category.items.map((item) => (
                <Link
                  key={item}
                  href={`/shop?category=${encodeURIComponent(item)}`}
                  className="shop-subcategory"
                >
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
