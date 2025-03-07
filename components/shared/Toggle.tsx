import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  variant?: 'purple' | 'teal' | 'gold';
  toggleSize?: 'sm' | 'md' | 'lg';
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      description,
      variant = 'purple',
      toggleSize = 'md',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      purple: 'bg-accent-purple',
      teal: 'bg-accent-teal',
      gold: 'bg-accent-gold',
    };
    
    const sizeClasses = {
      sm: 'h-4 w-7 after:h-3 after:w-3',
      md: 'h-5 w-9 after:h-4 after:w-4',
      lg: 'h-6 w-11 after:h-5 after:w-5',
    };
    
    const labelSizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    return (
      <div className="form-control">
        <label className="cursor-pointer label justify-start gap-3">
          <input
            type="checkbox"
            ref={ref}
            className="sr-only"
            disabled={disabled}
            {...props}
          />
          
          <div
            className={cn(
              'relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out',
              'bg-accent-metallic-dark/30',
              sizeClasses[toggleSize],
              'after:absolute after:rounded-full after:bg-white after:transition-transform after:duration-200',
              'after:left-0.5 after:top-0.5',
              props.checked ? `${variantClasses[variant]} after:translate-x-full` : 'after:translate-x-0',
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
          />
          
          {(label || description) && (
            <div className="flex flex-col">
              {label && (
                <span className={cn('font-medium text-white', labelSizeClasses[toggleSize])}>
                  {label}
                </span>
              )}
              {description && (
                <span className="text-xs text-accent-metallic-light">
                  {description}
                </span>
              )}
            </div>
          )}
        </label>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle; 