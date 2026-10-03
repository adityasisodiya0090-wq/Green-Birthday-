import { RotateCcw, AlertCircle } from './Icons';
import { Button } from './Button';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({
  title = "Something didn't grow as expected.",
  message = "We couldn't load this information right now. Please try again.",
  onRetry,
  className = '',
}: ErrorMessageProps) {
  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-[#FFFDF7] border border-[#DDE9D8] text-center space-y-4 max-w-md mx-auto shadow-2xs ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-[#F7F3E8] text-[#1F4D38] flex items-center justify-center mx-auto">
        <AlertCircle className="w-6 h-6 text-[#1F4D38]" />
      </div>

      <div className="space-y-1">
        <h4 className="font-display font-bold text-base text-[#1F4D38]">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
          {message}
        </p>
      </div>

      {onRetry && (
        <div className="pt-2 flex justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={onRetry}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            iconPosition="left"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
