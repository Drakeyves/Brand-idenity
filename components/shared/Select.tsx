import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      fullWidth = true,
      size = 'md',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'select-sm text-xs',
      md: 'select-md text-sm',
      lg: 'select-lg text-base',
    };

    return (
      <div className={cn('form-control', fullWidth ? 'w-full' : 'w-auto')}>
        {label && (
          <label className="label">
            <span className="label-text text-accent-metallic-light font-medium">
              {label}
            </span>
          </label>
        )}
        
        <select
          ref={ref}
          className={cn(
            'select w-full bg-background-secondary/50 border border-accent-metallic-dark/20',
            'focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/20 focus:outline-none',
            'text-white appearance-none',
            'transition-all duration-200',
            sizeClasses[size],
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '',
            disabled && 'opacity-60 cursor-not-allowed',
            className
          )}
          disabled={disabled}
          {...props}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-accent-metallic">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        
        {(error || helperText) && (
          <label className="label">
            <span 
              className={cn(
                'label-text-alt text-xs',
                error ? 'text-red-500' : 'text-accent-metallic'
              )}
            >
              {error || helperText}
            </span>
          </label>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select; 