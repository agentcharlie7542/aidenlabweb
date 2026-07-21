import React from 'react';
import Link from '@/i18n/Link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'ghost' | 'default';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  hasArrow?: boolean;
  style?: React.CSSProperties;
}

export default function Button({
  children,
  href,
  variant = 'default',
  className = '',
  onClick,
  type = 'button',
  hasArrow = false,
  style,
}: ButtonProps) {
  const baseClass = 'btn';
  const variantClass = variant === 'primary' ? 'btn-primary' : variant === 'ghost' ? 'btn-ghost' : '';
  const combinedClass = `${baseClass} ${variantClass} ${className}`.trim();

  const content = (
    <>
      {children}
      {hasArrow && <span className="arr">→</span>}
    </>
  );

  if (href) {
    // If it's an external link
    if (href.startsWith('http')) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={combinedClass} style={style} onClick={onClick}>
          {content}
        </a>
      );
    }
    // Internal link
    return (
      <Link href={href} className={combinedClass} style={style} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClass} style={style} onClick={onClick}>
      {content}
    </button>
  );
}
