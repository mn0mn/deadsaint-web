"use client";

import { useState } from "react";
import Link from "next/link";
import { useCustomer } from "@/app/providers/customerProvider";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { customer, loading } = useCustomer();

  const accountLabel = loading
    ? "..."
    : customer
      ? customer.first_name || customer.email.split("@")[0]
      : "Login";

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
        <Link
          href={customer ? "/account" : "/login"}
          className="account-link"
          onClick={() => setMenuOpen(false)}
        >
          {accountLabel}
        </Link>
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
