import React from 'react';

export interface NewsCardProps {
  imageSrc: string;
  category: string;
  title: string;
  description?: string;
  dateStr: string;
  isFeatured?: boolean;
}

export default function NewsCard({
  imageSrc,
  category,
  title,
  description,
  dateStr,
  isFeatured = false,
}: NewsCardProps) {
  const containerStyle = isFeatured ? { borderColor: 'var(--line-2)' } : {};

  return (
    <div className="news" style={containerStyle}>
      <div className="news-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
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
    </div>
  );
}
