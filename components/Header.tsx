"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
        DEAD<span>SAINT</span>
      </Link>

      <nav className={menuOpen ? "nav-open" : ""}>
        <Link href="/shop" onClick={() => setMenuOpen(false)}>
          Shop
        </Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>
          Manifesto
        </Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>
      </nav>

      <div className="header-right">
        <Link href="/cart" className="cart-link">
          Cart
        </Link>
        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
