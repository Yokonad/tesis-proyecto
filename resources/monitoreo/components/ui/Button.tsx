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
  const baseStyles = 'font-medium transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-monitoreo-primary text-monitoreo-dark hover:bg-monitoreo-primary-light focus:ring-monitoreo-primary',
    secondary: 'bg-monitoreo-secondary text-monitoreo-light hover:bg-monitoreo-secondary-dark focus:ring-monitoreo-secondary',
    danger: 'bg-monitoreo-danger text-white hover:bg-red-600 focus:ring-red-500',
    ghost: 'bg-transparent text-monitoreo-primary hover:bg-monitoreo-primary hover:bg-opacity-10 focus:ring-monitoreo-primary',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
