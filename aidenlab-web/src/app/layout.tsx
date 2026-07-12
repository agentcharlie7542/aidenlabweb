import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LanguageProvider from '@/i18n/LanguageProvider';

export const metadata: Metadata = {
  title: {
    default: 'aidenlab | K-브랜드의 글로벌 성장 파트너',
    template: '%s | aidenlab',
  },
  description: '데이터·AI·현지 네트워크로 K-브랜드의 일본 마케팅, 이커머스, 유통 성장을 설계합니다.',
  metadataBase: new URL('https://aidenlab.io'),
  openGraph: {
    title: 'aidenlab | K-브랜드의 글로벌 성장 파트너',
    description: 'K-브랜드의 글로벌 매출을 설계합니다.',
    type: 'website',
  },
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
          <a href="#main-content" className="skip-link">본문으로 바로가기</a>
          <div className="bg-grid"></div>
          <Header />
          <div id="main-content" tabIndex={-1}>{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
