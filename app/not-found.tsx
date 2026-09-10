import Link from "next/link";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, getMessages, isLocale } from "@/lib/i18n";

export default async function NotFound() {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get("deadsaint-locale")?.value;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const m = getMessages(locale).notFound;

  return <section className="not-found"><h1>404</h1><p>{m.text}</p><Link href={`/${locale}/`}>{m.home}</Link></section>;
}
