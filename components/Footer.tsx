"use client";

import { useLocale } from "@/components/LocaleProvider";

export default function Footer() {
  const { messages } = useLocale();
  return <footer className="site-footer"><p>&copy; {new Date().getFullYear()} Deadsaint. {messages.footer}</p></footer>;
}
