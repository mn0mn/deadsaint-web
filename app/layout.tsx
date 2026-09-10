import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocaleProvider } from "@/components/LocaleProvider";
import { CartProvider } from "./providers/cartProvider";
import { CustomerProvider } from "./providers/customerProvider";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Deadsaint — Punk & Metal Fashion",
  description: "Clothing, accessories, and gifts for the unburied.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale: Locale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;

  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
      <body>
        <LocaleProvider initialLocale={locale}>
          <CustomerProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </CustomerProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
