import type { MetadataRoute } from 'next';

const SITE_URL = 'https://aidenlab.io';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/studio'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
