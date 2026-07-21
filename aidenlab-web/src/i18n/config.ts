export const LOCALES = ['ko', 'en', 'zh', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ko';

export function isLocale(v: string | undefined): v is Locale {
  return !!v && (LOCALES as readonly string[]).includes(v);
}

/** BCP-47 tags used for <html lang> and hreflang. */
export const HTML_LANG: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en',
  zh: 'zh-Hans',
  ja: 'ja-JP',
};

export const LOCALE_META: Record<
  Locale,
  { code: string; name: string; flag: string; ariaLabel: string }
> = {
  ko: { code: 'KO', name: '한국어', flag: '🇰🇷', ariaLabel: '한국어로 보기' },
  en: { code: 'EN', name: 'English', flag: '🇺🇸', ariaLabel: 'View in English' },
  zh: { code: 'ZH', name: '中文', flag: '🇨🇳', ariaLabel: '切换到中文' },
  ja: { code: 'JA', name: '日本語', flag: '🇯🇵', ariaLabel: '日本語で見る' },
};

/** Prefix an app-relative path with the active locale. */
export function localizePath(path: string, locale: Locale): string {
  if (!path.startsWith('/')) return path;
  const rest = path === '/' ? '' : path;
  return `/${locale}${rest}`;
}

/** Swap the locale segment of a full pathname, keeping the rest intact. */
export function switchLocalePath(pathname: string, next: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (isLocale(segments[0])) segments[0] = next;
  else segments.unshift(next);
  return '/' + segments.join('/');
}
