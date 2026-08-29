import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/medusa";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <>
      <section className="hero">
        <h1>DEADSAINT</h1>
        <p>Punk and metal fashion built like a battle jacket.</p>
        <Link href="/shop" className="btn">
          Shop the drop
        </Link>
      </section>

      <section className="featured">
        <h2>Fresh off the press</h2>
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
