import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { useRouter } from '../../context/RouterContext';
import { RoutePath } from '../../types';
import { Check, Loader2 } from './Icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  href?: RoutePath | string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  successMessage?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'right',
  className = '',
  fullWidth = false,
  isLoading = false,
  isSuccess = false,
  successMessage,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const { navigate } = useRouter();

  const baseStyles =
    'group relative inline-flex items-center justify-center font-display font-semibold select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 min-h-[44px] rounded-xl gap-1.5',
    md: 'text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 min-h-[44px] sm:min-h-[46px] rounded-xl gap-2',
    lg: 'text-sm sm:text-base px-4.5 sm:px-6 py-2.5 sm:py-3 min-h-[46px] sm:min-h-[50px] rounded-xl gap-2',
  };

  const variantStyles = {
    primary:
      'bg-[#1F4D38] text-[#FFFDF7] hover:bg-[#153929] hover:shadow-md focus-visible:ring-[#1F4D38] border border-[#153929]/30 tactile-button',
    secondary:
      'bg-[#FFFDF7] text-[#1F4D38] hover:bg-[#F7F3E8] hover:border-[#6F9F73]/50 focus-visible:ring-[#6F9F73] border border-[#DDE9D8] shadow-2xs tactile-button',
    outline:
      'bg-transparent text-[#1F4D38] border border-[#1F4D38]/30 hover:border-[#1F4D38] hover:bg-[#1F4D38]/5 focus-visible:ring-[#1F4D38]',
    glass:
      'surface-glass text-[#1F4D38] hover:bg-white/95 hover:shadow-md focus-visible:ring-[#1F4D38]',
    ghost:
      'bg-transparent text-[#1F4D38] hover:bg-[#1F4D38]/8 focus-visible:ring-[#1F4D38]',
    success:
      'bg-[#6F9F73] text-[#FFFDF7] border border-[#58825C] shadow-xs focus-visible:ring-[#6F9F73]',
  };

  const activeVariant = isSuccess ? 'success' : variant;

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[activeVariant]} ${
    fullWidth ? 'w-full' : ''
  } ${className}`.trim();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
    if (href && !e.defaultPrevented) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <button
      className={combinedClasses}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : isSuccess ? (
        <Check className="w-4 h-4 shrink-0 text-white animate-bounce" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span className="truncate">
            {isSuccess && successMessage ? successMessage : children}
          </span>
          {icon && iconPosition === 'right' && (
            <span className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
