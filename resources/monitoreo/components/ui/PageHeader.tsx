import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`mb-6 p-4 bg-monitoreo-card pixel-border pixel-box ${className}`}>
      <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-widest text-glitch uppercase">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-monitoreo-primary font-mono text-sm md:text-base">
          {'>'} {subtitle}
        </p>
      )}
    </div>
  );
};
