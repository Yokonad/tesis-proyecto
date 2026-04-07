import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        bg-monitoreo-card border border-monitoreo-border
        rounded-lg p-6 shadow-lg
        hover:shadow-xl transition-shadow duration-200
        ${className}
      `}
      {...props}
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-monitoreo-light">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-monitoreo-text-secondary mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
