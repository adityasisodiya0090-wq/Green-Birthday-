import { ReactNode } from 'react';
import { Sprout } from './Icons';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({
  title = 'The garden is just beginning. 🌱',
  description = 'Your community activity will appear here as real Green Day participation grows.',
  actionLabel,
  onAction,
  icon,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`surface-elevated rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-[#DDE9D8] max-w-lg mx-auto ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-[#DDE9D8]/70 text-[#1F4D38] flex items-center justify-center mx-auto shadow-2xs">
        {icon || <Sprout className="w-7 h-7 text-[#1F4D38]" />}
      </div>

      <div className="space-y-1.5">
        <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#1F4D38]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed max-w-md mx-auto">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <div className="pt-2 flex justify-center">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
