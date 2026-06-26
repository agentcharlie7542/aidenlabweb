import React from 'react';

export interface ServiceCardProps {
  iconSrc: string;
  title: string;
  description: string;
  linkText?: string;
  isCool?: boolean;
}

export default function ServiceCard({
  iconSrc,
  title,
  description,
  linkText,
  isCool = false,
}: ServiceCardProps) {
  return (
    <div className={`svc ${isCool ? 'cool' : ''}`}>
      <div className="svc-iconbox">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} alt="" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {linkText && <div className="more">{linkText}</div>}
    </div>
  );
}
