import { Link } from '../../context/RouterContext';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

export function Logo({ className = '', iconOnly = false, size = 'md', variant = 'dark' }: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  const isLight = variant === 'light';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4D38] rounded-md ${className}`}
      aria-label="Birthday Green Home"
    >
      {/* Date + Sprout visual symbol */}
      <span
        className={`relative flex items-center justify-center font-display font-bold rounded-lg border transition-transform group-hover:scale-105 shrink-0 ${iconSizes[size]} ${
          isLight
            ? 'bg-[#FFFDF7]/15 border-white/30 text-white'
            : 'bg-[#1F4D38] border-[#153929] text-[#FFFDF7] shadow-xs'
        }`}
      >
        {/* Calendar top binder bar */}
        <span className="absolute -top-1 inset-x-1.5 flex justify-between">
          <span className={`w-0.5 h-1 rounded-full ${isLight ? 'bg-[#DDE9D8]' : 'bg-[#6F9F73]'}`} />
          <span className={`w-0.5 h-1 rounded-full ${isLight ? 'bg-[#DDE9D8]' : 'bg-[#6F9F73]'}`} />
        </span>

        {/* Date numeral */}
        <span className="leading-none pt-0.5 tracking-tighter">16</span>

        {/* Emergent sprout leaf pure CSS shape nestled on the corner */}
        <span
          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-tr-full rounded-bl-full bg-[#6F9F73] border border-[#153929]/50 transform rotate-12 shadow-2xs"
          aria-hidden="true"
        />
      </span>

      {!iconOnly && (
        <span
          className={`font-display font-extrabold tracking-tight uppercase whitespace-nowrap ${textSizes[size]} ${
            isLight ? 'text-white' : 'text-[#1F4D38]'
          }`}
        >
          Birthday Green
        </span>
      )}
    </Link>
  );
}
