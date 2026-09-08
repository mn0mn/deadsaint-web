"use client";

import { useState } from "react";
import Image from "next/image";
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
      <div className="header-brand">
        <Link href="/" className="logo" onClick={() => setMenuOpen(false)} aria-label="Deadsaint home">
          <Image
            src="/deadsaint_E_master.svg"
            alt="Deadsaint"
            width={358}
            height={298}
            priority
          />
        </Link>
        <div className="brand-copy" aria-hidden="true">
          <span className="brand-name">DEADSAINT</span>
          <span className="brand-tagline">PUNK &amp; METAL FASHION</span>
        </div>
        <span className="brand-divider" aria-hidden="true" />
      </div>

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
        <Link href="/cart" className="cart-link" onClick={() => setMenuOpen(false)}>
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
