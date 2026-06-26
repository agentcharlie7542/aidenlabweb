'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LangSwitcher from './LangSwitcher';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Cases', href: '/cases' },
    { name: 'Brands', href: '/brands' },
    { name: 'Wasabi10', href: '/wasabi10' },
    { name: 'Insights', href: '/insights' },
    { name: 'Careers', href: '/careers' },
  ];

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand">
          <span className="brand-mark"></span>aidenlab<small>K-BRAND × GLOBAL</small>
        </Link>
        <nav className="nav">
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
        </div>
      </div>
    </header>
  );
}
