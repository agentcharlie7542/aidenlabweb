import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from './i18n/config';

export const config = {
  // Everything except Next internals, the API surface and static files.
  matcher: ['/((?!_next|api|favicon.ico|.*\\.[\\w]+$).*)'],
};

const COOKIE = 'locale';

/** Pick the best locale: explicit choice (cookie) > browser preference > Korean. */
function resolveLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(COOKIE)?.value;
  if (isLocale(saved)) return saved;

  const header = request.headers.get('accept-language');
  if (!header) return DEFAULT_LOCALE;

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split('-')[0];
    if (base === 'zh') return 'zh';
    if (isLocale(base) && (LOCALES as readonly string[]).includes(base)) return base as Locale;
  }
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split('/')[1];
  if (isLocale(first)) return NextResponse.next();

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}
