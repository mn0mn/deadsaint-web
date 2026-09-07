import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/medusa';
import './page.css';

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-kicker">
          <span>FILE NO. DS-000000</span>
          <span>EST. IN A GARAGE</span>
        </div>
        <div className="home-hero-row">
          <h1>
            DEADSAINT
            <br />
            NO SURVIVORS.
          </h1>
          <div className="home-stamp">
            <span>SMALL BATCH</span>
            <strong>HANDMADE</strong>
          </div>
        </div>
        <p>Punk and metal fashion built like a battle jacket.</p>
        <Link href="/shop" className="btn">
          Shop the drop
        </Link>
      </section>

      <div className="home-tape" aria-hidden="true">
        <span>NO RESTOCKS</span>
        <span>SMALL BATCH</span>
        <span>BUILT FOR THE PIT</span>
        <span>NO RESTOCKS</span>
        <span>SMALL BATCH</span>
        <span>BUILT FOR THE PIT</span>
      </div>

      <section className="home-manifesto">
        <p>
          &ldquo;We don&apos;t design trends.
          <br />
          We design battle scars.&rdquo;
        </p>
        <Link href="/about" className="home-manifesto-link">
          Read the manifesto ↗
        </Link>
      </section>

      <section className="featured">
        <div className="featured-heading">
          <span className="featured-index">01 /</span>
          <h2>Fresh off the press</h2>
        </div>
        <div className="grid home-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
