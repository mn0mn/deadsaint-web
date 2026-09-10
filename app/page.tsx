import Link from 'next/link';
import { cookies } from 'next/headers';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/medusa';
import { getMessages, isLocale, LOCALE_COOKIE } from '@/lib/i18n';
import './page.css';

export default async function HomePage() {
  const products = await getAllProducts();
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
  const messages = getMessages(isLocale(cookieLocale) ? cookieLocale : 'en');
  const home = messages.home;

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-kicker"><span>{home.kicker1}</span><span>{home.kicker2}</span></div>
        <div className="home-hero-row"><h1>DEADSAINT<br />NO SURVIVORS.</h1><div className="home-stamp"><span>{home.stamp1}</span><strong>{home.stamp2}</strong></div></div>
        <p>{home.intro}</p>
        <Link href="/shop" className="btn">{home.cta}</Link>
      </section>
      <div className="home-tape" aria-hidden="true">
        {[home.tape1, home.tape2, home.tape3, home.tape1, home.tape2, home.tape3].map((text, index) => <span key={index}>{text}</span>)}
      </div>
      <section className="home-manifesto">
        <p>&ldquo;{home.quote}<br />{home.quote2}&rdquo;</p>
        <Link href="/about" className="home-manifesto-link">{home.manifesto}</Link>
      </section>
      <section className="featured">
        <div className="featured-heading"><span className="featured-index">01 /</span><h2>{home.featured}</h2></div>
        <div className="grid home-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
    </>
  );
}
