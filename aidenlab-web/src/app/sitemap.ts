import type { MetadataRoute } from 'next';
import { HTML_LANG, LOCALES } from '@/i18n/config';

const SITE_URL = 'https://aidenlab.io';

const ROUTES = [
  { path: '', priority: 1 },
  { path: '/services', priority: 0.9 },
  { path: '/cases', priority: 0.9 },
  { path: '/contact', priority: 0.9 },
  { path: '/about', priority: 0.8 },
  { path: '/brands', priority: 0.8 },
  { path: '/wasabi10', priority: 0.8 },
  { path: '/news', priority: 0.7 },
  { path: '/careers', priority: 0.6 },
];

/** Every page is listed once per locale, cross-linked with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(({ path, priority }) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      priority,
      changeFrequency: 'weekly' as const,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [HTML_LANG[l], `${SITE_URL}/${l}${path}`])
        ),
      },
    }))
  );
}
