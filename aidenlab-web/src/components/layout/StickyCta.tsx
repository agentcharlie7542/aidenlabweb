'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from '@/i18n/Link';
import { useT } from '@/i18n/LocaleProvider';

/**
 * Mobile-only bottom CTA. On narrow screens the header's contact button is
 * hidden to make room, so this keeps the primary action one tap away for the
 * whole scroll. It appears after the hero to avoid covering it.
 */
export default function StickyCta() {
  const pathname = usePathname();
  const { t } = useT();
  const [visible, setVisible] = useState(false);

  const onContactPage = pathname.endsWith('/contact');

  useEffect(() => {
    if (onContactPage) return;
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onContactPage]);

  if (onContactPage) return null;

  return (
    <div className={`sticky-cta ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <span className="sticky-cta-note">{t('상담료 없음 · 1영업일 내 회신')}</span>
      <Link href="/contact" className="btn btn-primary" tabIndex={visible ? 0 : -1}>
        {t('30분 무료 진단 신청')} <span className="arr" aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
