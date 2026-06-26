import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import SitemapPanel from '@/components/layout/SitemapPanel';
import Footer from '@/components/layout/Footer';
import LanguageProvider from '@/i18n/LanguageProvider';

export const metadata: Metadata = {
  title: 'aidenlab — Renewal Prototype v2.0',
  description: 'aidenlab 리뉴얼 홈페이지 인터랙티브 와이어프레임. 실사 이미지 적용 버전.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <LanguageProvider>
          <div className="bg-grid"></div>
          <Header />
          {children}
          <Footer />
          <SitemapPanel />
        </LanguageProvider>
      </body>
    </html>
  );
}
