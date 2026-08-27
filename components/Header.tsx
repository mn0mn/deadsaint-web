import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="logo">
        DEAD<span>SAINT</span>
      </Link>
      <nav>
        <Link href="/shop">Shop</Link>
        <Link href="/about">Manifesto</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <Link href="/cart" className="cart-link">
        Cart
      </Link>
    </header>
  );
}
