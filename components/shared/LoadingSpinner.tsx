import React from 'react';
import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export const LoadingSpinner = ({
  size = 'md',
  variant = 'primary',
  className,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const variantClasses = {
    primary: 'border-accent-purple/20 border-t-accent-purple',
    secondary: 'border-accent-teal/20 border-t-accent-teal',
    accent: 'border-accent-gold/20 border-t-accent-gold',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    />
  );
};

export default LoadingSpinner; 