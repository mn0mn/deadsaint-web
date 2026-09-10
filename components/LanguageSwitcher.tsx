'use client';

import { useLocale } from '@/components/LocaleProvider';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const nextLocale = locale === 'en' ? 'fa' : 'en';

  return (
    <button
      type="button"
      className="language-switcher"
      onClick={() => setLocale(nextLocale)}
      aria-label={`Switch language to ${nextLocale === 'fa' ? 'Persian' : 'English'}`}
      title={nextLocale === 'fa' ? 'فارسی' : 'English'}
    >
      <span aria-hidden="true">{nextLocale === 'fa' ? '🇮🇷' : '🇺🇸'}</span>
    </button>
  );
}
