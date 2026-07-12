'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LangSwitcher from './LangSwitcher';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Cases', href: '/cases' },
    { name: 'Brands', href: '/brands' },
    { name: 'Wasabi10', href: '/wasabi10' },
    { name: 'Insights', href: '/news' },
    { name: 'Careers', href: '/careers' },
  ];

  useEffect(() => setIsMenuOpen(false), [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand" aria-label="aidenlab 홈으로">
          <span className="brand-mark" aria-hidden="true"></span>aidenlab<small>K-BRAND × GLOBAL</small>
        </Link>
        <nav className="nav" aria-label="주요 메뉴">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={pathname === link.href ? 'active' : ''}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <LangSwitcher />
          <Link href="/contact" className="btn btn-primary">
            상담 신청 <span className="arr">→</span>
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </div>
      <div id="mobile-navigation" className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <nav aria-label="모바일 메뉴">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className={pathname === link.href ? 'active' : ''}>
              {link.name}<span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="btn btn-primary mobile-contact">
          30분 무료 진단 신청 <span className="arr">→</span>
        </Link>
      </div>
    </header>
  );
}
