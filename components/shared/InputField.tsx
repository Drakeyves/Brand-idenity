import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'filled';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = true,
      variant = 'default',
      className,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('form-control', fullWidth ? 'w-full' : 'w-auto')}>
        {label && (
          <label className="label">
            <span className="label-text text-accent-metallic-light font-medium">
              {label}
            </span>
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-metallic">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={cn(
              'input w-full bg-background-secondary/50 border border-accent-metallic-dark/20',
              'focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/20 focus:outline-none',
              'placeholder:text-accent-metallic-dark/50 text-white',
              'transition-all duration-200',
              variant === 'filled' && 'bg-accent-purple/5',
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '',
              disabled && 'opacity-60 cursor-not-allowed',
              className
            )}
            disabled={disabled}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-metallic">
              {rightIcon}
            </div>
          )}
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

InputField.displayName = 'InputField';

export default InputField; 