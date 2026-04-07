import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({ className = '', title, subtitle, children, ...props }) => {
  return (
    <div 
      className={`bg-monitoreo-card pixel-border p-6 ${className}`} 
      {...props}
    >
      {title ? (
        <div className="mb-4">
          <h3 className="text-monitoreo-light font-mono text-lg uppercase tracking-wide">{title}</h3>
          {subtitle ? <p className="mt-1 text-xs text-monitoreo-text-secondary">{subtitle}</p> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
};
