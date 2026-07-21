import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyCta from '@/components/layout/StickyCta';
import LocaleProvider from '@/i18n/LocaleProvider';
import { HTML_LANG, LOCALES, isLocale, type Locale } from '@/i18n/config';
import { t } from '@/i18n/translate';

const SITE_URL = 'https://aidenlab.io';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'ko';
  const title = t('K-브랜드의 글로벌 매출을 설계합니다.', locale);
  const description = t(
    '데이터·AI·현지 네트워크로 K-브랜드의 일본 마케팅, 이커머스, 유통 성장을 설계합니다.',
    locale
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `aidenlab | ${title}`, template: '%s | aidenlab' },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], `/${l}`])),
        'x-default': '/ko',
      },
    },
    openGraph: {
      title: `aidenlab | ${title}`,
      description,
      url: `/${locale}`,
      siteName: 'aidenlab',
      locale: HTML_LANG[locale].replace('-', '_'),
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <html lang={HTML_LANG[locale]} data-locale={locale}>
      <body>
        <LocaleProvider locale={locale}>
          <a href="#main-content" className="skip-link">
            {t('본문으로 바로가기', locale)}
          </a>
          <div className="bg-grid" aria-hidden="true"></div>
          <Header />
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <Footer locale={locale} />
          <StickyCta />
        </LocaleProvider>
      </body>
    </html>
  );
}
