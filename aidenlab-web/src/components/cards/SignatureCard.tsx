import React from 'react';
import Link from '@/i18n/Link';

export interface SignatureCardProps {
  bgImageSrc: string;
  eyebrowText: string;
  numText: string;
  title: string;
  description: React.ReactNode;
  linkHref?: string;
  linkText?: string;
  isCool?: boolean;
  bottomText?: React.ReactNode;
}

export default function SignatureCard({
  bgImageSrc,
  eyebrowText,
  numText,
  title,
  description,
  linkHref,
  linkText,
  isCool = false,
  bottomText,
}: SignatureCardProps) {
  return (
    <div className={`sig-card ${isCool ? 'cool' : ''}`}>
      <div className="sig-bgimg">
        { }
        <img src={bgImageSrc} alt="" />
      </div>
      <div>
        <div className="eyebrow" style={{ marginBottom: '18px' }}>
          {eyebrowText}
        </div>
        <div className="num">{numText}</div>
        <h3>{title}</h3>
        <p className="muted" style={{ marginTop: '12px' }}>
          {description}
        </p>
        {bottomText}
      </div>
      {linkHref && linkText && (
        <Link href={linkHref} className="arr-link" style={{ marginTop: 'auto' }}>
          {linkText}
        </Link>
      )}
    </div>
  );
}
