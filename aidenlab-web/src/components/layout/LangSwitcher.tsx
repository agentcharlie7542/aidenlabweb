'use client';

import { useLanguage, type Locale } from '@/i18n/LanguageProvider';

const OPTIONS: { code: Locale; flag: string; label: string }[] = [
  { code: 'ko', flag: '🇰🇷', label: 'KO' },
  { code: 'en', flag: '🇺🇸', label: 'EN' },
  { code: 'zh', flag: '🇨🇳', label: 'ZH' },
  { code: 'ja', flag: '🇯🇵', label: 'JA' },
];

export default function LangSwitcher() {
  const { locale, setLocale } = useLanguage();
  return (
    <div className="lang-switch" role="group" aria-label="Language" data-no-i18n>
      {OPTIONS.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => setLocale(o.code)}
          className={'lang-btn' + (locale === o.code ? ' active' : '')}
          aria-pressed={locale === o.code}
          title={o.label}
        >
          <span className="lang-flag">{o.flag}</span>
          <span className="lang-code">{o.label}</span>
        </button>
      ))}
    </div>
  );
}
