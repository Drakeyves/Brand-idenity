import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const baseClasses = 'btn font-medium rounded transition-all duration-200 focus:outline-none';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    outline: 'btn-outline border-accent-metallic hover:bg-accent-purple/10 hover:border-accent-purple text-accent-metallic hover:text-accent-purple',
    ghost: 'btn-ghost hover:bg-accent-purple/10 text-accent-metallic hover:text-accent-purple',
  };
  
  const sizeClasses = {
    sm: 'btn-sm text-xs px-3',
    md: 'btn-md text-sm px-4',
    lg: 'btn-lg text-base px-6',
  };
  
  const loadingClass = loading ? 'loading' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        loadingClass,
        widthClass,
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  );
}; 