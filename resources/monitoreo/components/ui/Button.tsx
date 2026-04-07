import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'font-mono transition-colors duration-200 focus:outline-none flex items-center border hover:bg-monitoreo-border hover:bg-opacity-20';
  
  const variantStyles = {
    primary: 'border-monitoreo-border text-monitoreo-light',
    secondary: 'border-transparent text-monitoreo-text-secondary hover:text-monitoreo-light',
    danger: 'border-monitoreo-light text-monitoreo-light hover:border-monitoreo-light hover:text-monitoreo-light',
    ghost: 'border-transparent text-monitoreo-light hover:border-monitoreo-light',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      <span className="text-monitoreo-text-secondary mr-2">$</span>
      {children}
    </button>
  );
};
