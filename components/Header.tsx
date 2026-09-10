"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCustomer } from "@/app/providers/customerProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocale } from "@/components/LocaleProvider";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { customer, loading } = useCustomer();
  const { locale, messages } = useLocale();
  const prefix = `/${locale}`;

  const accountLabel = loading ? "..." : customer ? customer.first_name || customer.email.split("@")[0] : messages.nav.login;
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
        <LanguageSwitcher />
        <Link href={customer ? `${prefix}/account` : `${prefix}/login`} className="account-link" onClick={close}>{accountLabel}</Link>
        <Link href={`${prefix}/cart`} className="cart-link" onClick={close}>{messages.nav.cart}</Link>
        <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
