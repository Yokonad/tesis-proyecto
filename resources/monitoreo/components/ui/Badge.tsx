import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'info', className = '', ...props }) => {
  const variants = {
    success: 'bg-transparent text-monitoreo-success border border-monitoreo-success',
    warning: 'bg-transparent text-monitoreo-warning border border-monitoreo-warning',
    danger: 'bg-transparent text-monitoreo-danger border border-monitoreo-danger',
    info: 'bg-transparent text-monitoreo-warning border border-monitoreo-warning',
    neutral: 'bg-transparent text-monitoreo-warning border border-monitoreo-warning',
  };

  return (
    <span 
      className={`px-2 py-0.5 text-xs font-mono font-bold tracking-widest uppercase inline-block ${variants[variant]} ${className}`}
      {...props}
    />
  );
};
