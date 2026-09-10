import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocaleProvider } from "@/components/LocaleProvider";
import { CartProvider } from "./providers/cartProvider";
import { CustomerProvider } from "./providers/customerProvider";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "@/lib/i18n";

const LOCALE_HEADER = "x-deadsaint-locale";

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const headerLocale = headerStore.get(LOCALE_HEADER);
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale: Locale = isLocale(headerLocale)
    ? headerLocale
    : isLocale(cookieLocale)
      ? cookieLocale
      : DEFAULT_LOCALE;

  return locale === "fa"
    ? {
        title: "ددسینت — فشن پانک و متال",
        description: "پوشاک، اکسسوری و اشیایی برای مرده‌هایی که هنوز می‌پوشند.",
      }
    : {
        title: "Deadsaint — Punk & Metal Fashion",
        description: "Clothing, accessories, and gifts for the unburied.",
      };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const headerLocale = headerStore.get(LOCALE_HEADER);
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale: Locale = isLocale(headerLocale)
    ? headerLocale
    : isLocale(cookieLocale)
      ? cookieLocale
      : DEFAULT_LOCALE;

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
