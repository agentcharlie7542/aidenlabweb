'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_META, switchLocalePath } from '@/i18n/config';
import { useLocale } from '@/i18n/LocaleProvider';

/** Remember the explicit choice so the middleware stops guessing from headers. */
function rememberLocale(code: string) {
  document.cookie = `locale=${code}; path=/; max-age=31536000; samesite=lax`;
}

export default function LangSwitcher() {
  const current = useLocale();
  const pathname = usePathname();

  return (
    <div className="lang-switch" role="group" aria-label="Language / 언어" data-no-i18n>
      {LOCALES.map((code) => {
        const meta = LOCALE_META[code];
        const active = code === current;
        return (
          <NextLink
            key={code}
            href={switchLocalePath(pathname, code)}
            hrefLang={code}
            lang={code}
            onClick={() => rememberLocale(code)}
            className={'lang-btn' + (active ? ' active' : '')}
            aria-current={active ? 'true' : undefined}
            aria-label={meta.ariaLabel}
          >
            <span className="lang-code">{meta.code}</span>
          </NextLink>
        );
      })}
    </div>
  );
}
