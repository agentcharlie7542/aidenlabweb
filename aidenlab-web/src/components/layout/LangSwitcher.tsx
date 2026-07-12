'use client';

import { useLanguage, type Locale } from '@/i18n/LanguageProvider';

const OPTIONS: { code: Locale; flag: string; label: string; name: string }[] = [
  { code: 'ko', flag: '🇰🇷', label: 'KO', name: '한국어' },
  { code: 'en', flag: '🇺🇸', label: 'EN', name: 'English' },
  { code: 'zh', flag: '🇨🇳', label: 'ZH', name: '中文' },
  { code: 'ja', flag: '🇯🇵', label: 'JA', name: '日本語' },
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
          aria-label={`${o.name}로 변경`}
          title={o.label}
        >
          <span className="lang-flag">{o.flag}</span>
          <span className="lang-code">{o.label}</span>
        </button>
      ))}
    </div>
  );
}
