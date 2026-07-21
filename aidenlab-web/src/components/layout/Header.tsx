'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from '@/i18n/Link';
import { useT } from '@/i18n/LocaleProvider';
import LangSwitcher from './LangSwitcher';

const NAV_LINKS = [
  { key: '회사소개', href: '/about' },
  { key: '서비스', href: '/services' },
  { key: '성공사례', href: '/cases' },
  { key: '브랜드', href: '/brands' },
  { key: 'わさび10', href: '/wasabi10' },
  { key: '인사이트', href: '/news' },
  { key: '채용', href: '/careers' },
];

export default function Header() {
  const pathname = usePathname();
  const { t } = useT();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const isActive = (href: string) => pathname.replace(/^\/[a-z]{2}/, '') === href;

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand" aria-label={t('에이든랩 홈으로')}>
          <span className="brand-mark" aria-hidden="true"></span>aidenlab
          <small>K-BRAND × GLOBAL</small>
        </Link>

        <nav className="nav" aria-label={t('주요 메뉴')}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'active' : ''}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="nav-cta">
          <LangSwitcher />
          <Link href="/contact" className="btn btn-primary btn-sm nav-contact">
            {t('문의하기')} <span className="arr" aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? t('메뉴 닫기') : t('메뉴 열기')}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </div>

      <div id="mobile-navigation" className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <nav aria-label={t('모바일 메뉴')}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'active' : ''}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {t(link.key)}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="btn btn-primary mobile-contact">
          {t('30분 무료 진단 신청')} <span className="arr" aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
