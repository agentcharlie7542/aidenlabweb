import React from 'react';

export interface Kpi {
  value: string;
  label: string;
}

export interface CaseCardProps {
  variant?: 'default' | 'featured';
  imageSrc: string;
  imageAlt: string;
  platformOrBadge: string;
  title: string;
  quote?: string;
  kpis: Kpi[];
  cornerTag?: string;
}

export default function CaseCard({
  variant = 'default',
  imageSrc,
  imageAlt,
  platformOrBadge,
  title,
  quote,
  kpis,
  cornerTag,
}: CaseCardProps) {
  if (variant === 'featured') {
    return (
      <div className="case-big">
        <div className="case-cover">
          {cornerTag && <span className="corner-tag">{cornerTag}</span>}
          { }
          <img src={imageSrc} alt={imageAlt} />
        </div>
        <div className="case-content">
          <span className="badge">{platformOrBadge}</span>
          <h3>{title}</h3>
          {quote && <div className="quote">{quote}</div>}
          <div className="metrics">
            {kpis.map((kpi, index) => (
              <div key={index}>
                <strong>{kpi.value}</strong>
                <span>{kpi.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="case">
      <div className="case-img">
        { }
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <div className="case-body">
        <div>
          <span className="platform">{platformOrBadge}</span>
          <h3>{title}</h3>
        </div>
        <div className="kpi">
          {kpis.map((kpi, index) => (
            <div key={index}>
              <strong>{kpi.value}</strong>
              {kpi.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
