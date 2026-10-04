import { Link } from '../../context/RouterContext';
import { BirthdayCake } from './Icons';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

export function Logo({ className = '', iconOnly = false, size = 'md', variant = 'dark' }: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8.5 h-8.5',
    lg: 'w-10 h-10',
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
      {/* Birthday Cake Badge (matches uploaded icon to suit the theme) */}
      <span
        className={`relative flex items-center justify-center rounded-full border transition-transform group-hover:scale-105 shrink-0 ${iconSizes[size]} ${
          isLight
            ? 'bg-[#FFFDF7]/20 border-white/40 text-white shadow-xs'
            : 'bg-[#52AB62] border-[#388E3C] text-white shadow-xs'
        }`}
      >
        <BirthdayCake className="w-[72%] h-[72%]" />

        {/* Emergent sprout leaf pure CSS shape nestled on the corner */}
        <span
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-tr-full rounded-bl-full bg-[#8EB892] border border-[#153929]/40 transform rotate-12 shadow-2xs"
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
