import React from 'react';

export interface BrandLink {
  label: string;
  url: string;
}

export interface BrandCardProps {
  imageSrc: string;
  brandName: React.ReactNode;
  jpName?: string;
  tagline?: string;
  category: string;
  description: string;
  links?: BrandLink[];
  tags?: string[];
  variantClass?: string;
}

export default function BrandCard({
  imageSrc,
  brandName,
  jpName,
  tagline,
  category,
  description,
  links = [],
  tags = [],
  variantClass = '',
}: BrandCardProps) {
  return (
    <div className={`brand-card ${variantClass}`.trim()}>
      <div className="brand-vis">
        { }
        <img src={imageSrc} alt="Brand Visual" />
      </div>
      <div className="brand-body">
        <div>
          <span className="biz-pill">{category}</span>
          <div className="brand-logo-text">
            {brandName} {jpName && <span className="jp-name">{jpName}</span>}
          </div>
          {tagline && <div className="tagline">{tagline}</div>}
          <p className={tags.length > 0 ? "muted" : "desc"} style={tags.length > 0 ? { fontSize: '14px' } : undefined}>
            {description}
          </p>
        </div>
        {links.length > 0 && (
          <div className="links">
            {links.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        )}
        {tags.length > 0 && (
          <div className="brand-meta">
            {tags.map((tag, idx) => (
              <span key={idx}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
