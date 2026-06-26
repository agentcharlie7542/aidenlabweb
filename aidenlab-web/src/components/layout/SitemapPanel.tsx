'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SitemapPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const links = [
    { name: 'P1 · Home', href: '/' },
    { name: 'P2 · About', href: '/about' },
    { name: 'P3 · Services', href: '/services' },
    { name: 'P4 · Cases', href: '/cases' },
    { name: 'P5 · Brands', href: '/brands' },
    { name: 'P6 · わさび10 Bridge', href: '/wasabi10' },
    { name: 'P7 · Careers', href: '/careers' },
    { name: 'P8 · Insights / News', href: '/insights' },
    { name: 'P9 · Contact', href: '/contact' },
  ];

  return (
    <>
      <button
        ref={btnRef}
        className="sitemap-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        SITEMAP
      </button>
      <div
        ref={panelRef}
        className={`sitemap-panel ${isOpen ? 'open' : ''}`}
      >
        <h4>Prototype v2.0 — with real assets</h4>
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={pathname === link.href ? 'current' : ''}
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        <hr style={{ border: 0, borderTop: '1px solid var(--line)', margin: '14px 0' }} />
        <h4>Documents</h4>
        <a href="https://www.aidenlab.io" target="_blank" rel="noreferrer">
          ↗ 현재 사이트
        </a>
        <a href="https://wasabi10.com" target="_blank" rel="noreferrer">
          ↗ わさび10
        </a>
      </div>
    </>
  );
}
