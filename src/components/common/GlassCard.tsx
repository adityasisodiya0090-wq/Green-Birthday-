import { HTMLAttributes, ReactNode } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'forest';
  glow?: boolean;
}

export function GlassCard({
  children,
  className = '',
  variant = 'light',
  glow = false,
  ...props
}: GlassCardProps) {
  const variantStyles = {
    light:
      'bg-[#FFFDF7]/80 backdrop-blur-xl border border-white/80 text-[#1C2821] shadow-lg shadow-[#1F4D38]/5',
    forest:
      'bg-[#1F4D38]/90 backdrop-blur-xl border border-[#6F9F73]/30 text-[#FFFDF7] shadow-xl shadow-[#153929]/20',
  };

  return (
    <div
      className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transition-all duration-300 ${
        variantStyles[variant]
      } ${
        glow ? 'ring-1 ring-[#6F9F73]/30 shadow-xl' : ''
      } ${className}`}
      {...props}
    >
      {/* Subtle highlight gradient */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-40 bg-gradient-to-br from-white/40 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
