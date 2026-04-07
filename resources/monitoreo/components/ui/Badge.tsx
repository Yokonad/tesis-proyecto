import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'info', className = '', ...props }) => {
  const variants = {
    success: 'bg-transparent text-monitoreo-light border border-monitoreo-light',
    warning: 'bg-transparent text-monitoreo-light border border-monitoreo-secondary',
    danger: 'bg-transparent text-monitoreo-light border border-monitoreo-light',
    info: 'bg-transparent text-monitoreo-light border border-monitoreo-border',
    neutral: 'bg-transparent text-monitoreo-text-secondary border border-monitoreo-border',
  };

  return (
    <span 
      className={`px-2 py-0.5 text-xs font-mono font-bold tracking-widest uppercase inline-block ${variants[variant]} ${className}`}
      {...props}
    />
  );
};
