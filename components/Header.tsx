"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCustomer } from "@/app/providers/customerProvider";
import { useCart } from "@/app/providers/CartProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocale } from "@/components/LocaleProvider";
import { formatPrice } from "@/lib/format";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { customer, loading } = useCustomer();
  const { cart } = useCart();
  const { locale, messages } = useLocale();
  const prefix = `/${locale}`;

  const accountLabel = loading ? "..." : customer ? customer.first_name || customer.email.split("@")[0] : messages.nav.login;
  const cartItems = cart?.items ?? [];
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity ?? 0), 0);
  const close = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-brand">
        <Link href={`${prefix}/`} className="logo" onClick={close} aria-label="Deadsaint home">
          <Image src="/deadsaint_E_master.svg" alt="Deadsaint" width={358} height={298} priority />
        </Link>
        <div className="brand-copy" aria-hidden="true">
          <span className="brand-name">DEADSAINT</span>
          <span className="brand-tagline">PUNK &amp; METAL FASHION</span>
        </div>
        <span className="brand-divider" aria-hidden="true" />
      </div>

      <nav className={menuOpen ? "nav-open" : ""}>
        <Link href={`${prefix}/shop`} onClick={close}>{messages.nav.shop}</Link>
        <Link href={`${prefix}/about`} onClick={close}>{messages.nav.manifesto}</Link>
        <Link href={`${prefix}/contact`} onClick={close}>{messages.nav.contact}</Link>
      </nav>

      <div className="header-right">
        <Link href={customer ? `${prefix}/account` : `${prefix}/login`} className="account-link" onClick={close}>{accountLabel}</Link>
        <div className="cart-wrap">
          <Link href={`${prefix}/cart`} className="cart-link" onClick={close}>
            {messages.nav.cart}{cartCount > 0 ? ` [${cartCount}]` : ""}
          </Link>
          <div className="cart-dropdown" aria-label="Cart preview">
            {cartItems.length > 0 ? (
              <>
                <div className="cart-dropdown-head">
                  <span>CART / {cartCount}</span>
                  <span>PREVIEW</span>
                </div>
                <div className="cart-dropdown-items">
                  {cartItems.slice(0, 4).map((item) => {
                    const image = item.thumbnail;
                    const amount = item.unit_price ?? 0;
                    return (
                      <div className="cart-preview-item" key={item.id}>
                        {image ? <img src={image} alt="" /> : <span className="cart-preview-placeholder" />}
                        <div className="cart-preview-copy">
                          <strong>{item.product_title ?? item.title}</strong>
                          <span>QTY {item.quantity} · {formatPrice(amount, cart.currency_code ?? "usd")}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {cartItems.length > 4 && <div className="cart-more">+ {cartItems.length - 4} MORE ITEMS</div>}
                <Link href={`${prefix}/cart`} className="cart-view-all" onClick={close}>VIEW CART →</Link>
              </>
            ) : (
              <div className="cart-empty">
                <span>CART / 00</span>
                <p>Your cart is empty.</p>
              </div>
            )}
          </div>
        </div>
        <LanguageSwitcher />
        <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
