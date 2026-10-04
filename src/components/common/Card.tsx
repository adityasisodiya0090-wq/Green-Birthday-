import { HTMLAttributes, ReactNode } from 'react';

export type CardVariant =
  | 'standard'
  | 'elevated'
  | 'glass'
  | 'interactive'
  | 'highlighted'
  | 'success';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  isSelected?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export function Card({
  children,
  variant = 'standard',
  isSelected = false,
  isDisabled = false,
  className = '',
  ...props
}: CardProps) {
  const variantClasses: Record<CardVariant, string> = {
    standard:
      'surface-elevated rounded-2xl p-4 sm:p-6 md:p-8',
    elevated:
      'bg-[#FFFDF7] rounded-2xl sm:rounded-3xl border border-[#DDE9D8] shadow-sm p-4 sm:p-6 md:p-8',
    glass:
      'surface-glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8',
    interactive:
      'surface-elevated rounded-2xl p-4 sm:p-6 md:p-8 hover:-translate-y-0.5 hover:shadow-md hover:border-[#6F9F73]/60 transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-[#1F4D38]',
    highlighted:
      'bg-[#FFFDF7] rounded-2xl border-2 border-[#1F4D38] shadow-2xs p-4 sm:p-6 md:p-8',
    success:
      'bg-[#EEF5EC] rounded-2xl border border-[#8EB892] shadow-2xs p-4 sm:p-6 md:p-8',
  };

  const selectedClass = isSelected
    ? 'ring-2 ring-[#1F4D38] border-[#1F4D38] bg-[#F7F3E8]'
    : '';

  const disabledClass = isDisabled
    ? 'opacity-50 pointer-events-none'
    : '';

  return (
    <div
      className={`${variantClasses[variant]} ${selectedClass} ${disabledClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
