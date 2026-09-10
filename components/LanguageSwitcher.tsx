'use client';

import { useLocale } from '@/components/LocaleProvider';

export default function LanguageSwitcher() {
  const { locale, setLocale, messages } = useLocale();
  const nextLocale = locale === 'en' ? 'fa' : 'en';

  return (
    <button
      type="button"
      className="language-switcher"
      onClick={() => setLocale(nextLocale)}
      aria-label={`Switch language to ${nextLocale === 'fa' ? 'Persian' : 'English'}`}
    >
      {messages.nav.language == 'فارسی' ? 'FA' : 'EN'}
    </button>
  );
}
