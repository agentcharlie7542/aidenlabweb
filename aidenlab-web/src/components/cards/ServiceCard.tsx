import React from 'react';
import Link from '@/i18n/Link';
import Icon, { type IconName } from '@/components/ui/Icon';

export interface ServiceCardProps {
  icon: IconName;
  title: string;
  description: string;
  linkText?: string;
  href?: string;
  isCool?: boolean;
}

export default function ServiceCard({
  icon,
  title,
  description,
  linkText,
  href = '/services',
  isCool = false,
}: ServiceCardProps) {
  return (
    <Link href={href} className={`svc ${isCool ? 'cool' : ''}`}>
      <span className="svc-iconbox">
        <Icon name={icon} size={26} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      {linkText && <span className="more">{linkText}</span>}
    </Link>
  );
}
