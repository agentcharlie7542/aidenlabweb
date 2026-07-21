import React from 'react';
import Link from '@/i18n/Link';

export interface NewsCardProps {
  imageSrc: string;
  category: string;
  title: string;
  description?: string;
  dateStr: string;
  isFeatured?: boolean;
  href?: string;
}

export default function NewsCard({
  imageSrc,
  category,
  title,
  description,
  dateStr,
  isFeatured = false,
  href = '/news',
}: NewsCardProps) {
  const containerStyle = isFeatured ? { borderColor: 'var(--line-2)' } : {};

  return (
    <Link href={href} className="news" style={containerStyle} aria-label={`${title} 읽기`}>
      <div className="news-img">
        { }
        <img src={imageSrc} alt="" />
      </div>
      <div className="news-body">
        <span className="cat">{category}</span>
        <h3>{title}</h3>
        {description && (
          <p className="muted" style={{ fontSize: '13px' }}>
            {description}
          </p>
        )}
        <div className="date">{dateStr}</div>
      </div>
    </Link>
  );
}
