import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  dotColor?: string;
}

export default function Eyebrow({ children, className = '', dotColor }: EyebrowProps) {
  const dotStyle = dotColor
    ? { background: dotColor, boxShadow: `0 0 8px ${dotColor}` }
    : {};

  return (
    <div className={`eyebrow ${className}`}>
      <span className="dot" style={dotStyle}></span>
      {children}
    </div>
  );
}
