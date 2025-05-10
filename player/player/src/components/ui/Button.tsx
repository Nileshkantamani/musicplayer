import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark';
  
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    secondary: 'bg-secondary-200 text-secondary-900 hover:bg-secondary-300 active:bg-secondary-400 dark:bg-secondary-800 dark:text-white dark:hover:bg-secondary-700 dark:active:bg-secondary-600',
    outline: 'border border-secondary-300 dark:border-secondary-600 bg-transparent hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-900 dark:text-white',
    ghost: 'bg-transparent hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-900 dark:text-white',
    link: 'bg-transparent p-0 text-primary-600 dark:text-primary-400 hover:underline',
  };
  
  const sizeStyles = {
    xs: 'text-xs py-1 px-2',
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2.5 px-5',
  };
  
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const loadingStyles = 'opacity-70 cursor-wait';
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const variantStyle = variantStyles[variant];
  const sizeStyle = variant === 'link' ? 'text-sm' : sizeStyles[size];
  
  return (
    <button
      className={twMerge(
        baseStyles,
        variantStyle,
        sizeStyle,
        widthStyles,
        disabled ? disabledStyles : '',
        isLoading ? loadingStyles : '',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}; 