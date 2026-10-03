import { ReactNode } from 'react';
import { Info, ShieldCheck, AlertCircle } from './Icons';

interface StatusMessageProps {
  children: ReactNode;
  type?: 'info' | 'privacy' | 'note';
  className?: string;
}

export function StatusMessage({
  children,
  type = 'info',
  className = '',
}: StatusMessageProps) {
  const icons = {
    info: <Info className="w-4 h-4 text-[#6F9F73] shrink-0 mt-0.5" />,
    privacy: <ShieldCheck className="w-4 h-4 text-[#1F4D38] shrink-0 mt-0.5" />,
    note: <AlertCircle className="w-4 h-4 text-[#6F9F73] shrink-0 mt-0.5" />,
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border border-[#DDE9D8] bg-[#FFFDF7]/90 text-xs sm:text-sm text-[#4D6153] leading-relaxed ${className}`}
      role="status"
    >
      {icons[type]}
      <div className="flex-1">{children}</div>
    </div>
  );
}
