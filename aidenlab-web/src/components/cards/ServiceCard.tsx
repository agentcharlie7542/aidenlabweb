import React from 'react';
import Link from 'next/link';

export interface ServiceCardProps {
  iconSrc: string;
  title: string;
  description: string;
  linkText?: string;
  href?: string;
  isCool?: boolean;
}

export default function ServiceCard({
  iconSrc,
  title,
  description,
  linkText,
  href = '/services',
  isCool = false,
}: ServiceCardProps) {
  return (
    <Link href={href} className={`svc ${isCool ? 'cool' : ''}`} aria-label={`${title} 자세히 보기`}>
      <div className="svc-iconbox">
        { }
        <img src={iconSrc} alt="" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {linkText && <div className="more">{linkText}</div>}
    </Link>
  );
}
