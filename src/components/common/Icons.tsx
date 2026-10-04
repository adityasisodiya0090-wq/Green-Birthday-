import React from 'react';

export interface IconProps {
  className?: string;
  size?: number | string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

/**
 * Birthday Green Pure CSS/HTML Icon System
 * 100% SVG-free, image-free, lightweight, sharp at any DPI, fully responsive.
 */

// Helper to sanitize className
const base = (cls = '', defaultSize = 'w-4 h-4') =>
  `inline-flex items-center justify-center shrink-0 select-none leading-none ${defaultSize} ${cls}`.trim();

export const ArrowRight: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-mono font-bold text-sm tracking-tighter">→</span>
  </span>
);

export const ArrowLeft: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-mono font-bold text-sm tracking-tighter">←</span>
  </span>
);

export const ArrowDown: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-mono font-bold text-sm">↓</span>
  </span>
);

export const Check: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-bold text-sm leading-none">✓</span>
  </span>
);

export const CheckCircle2: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-full h-full rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
      ✓
    </span>
  </span>
);

export const X: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-bold text-base leading-none">×</span>
  </span>
);

export const ChevronDown: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-[11px] font-bold leading-none transform translate-y-[-1px]">▾</span>
  </span>
);

export const ChevronLeft: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-sm font-bold leading-none">‹</span>
  </span>
);

export const ChevronRight: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-sm font-bold leading-none">›</span>
  </span>
);

export const Menu: React.FC<IconProps> = ({ className }) => (
  <span className={base(className, 'w-5 h-4')} aria-hidden="true">
    <span className="w-full h-full flex flex-col justify-between py-0.5">
      <span className="h-0.5 w-full bg-current rounded-full" />
      <span className="h-0.5 w-full bg-current rounded-full" />
      <span className="h-0.5 w-full bg-current rounded-full" />
    </span>
  </span>
);

export const Sprout: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="relative w-3.5 h-3.5 flex items-center justify-center">
      {/* Primary Leaf */}
      <span className="absolute w-2.5 h-2.5 rounded-tr-full rounded-bl-full bg-current transform -rotate-45 translate-x-[-1px] translate-y-[-2px] opacity-90" />
      {/* Tender secondary leaf */}
      <span className="absolute w-1.5 h-1.5 rounded-tl-full rounded-br-full bg-current transform rotate-12 translate-x-[2px] translate-y-[1px] opacity-75" />
      {/* Root stem */}
      <span className="absolute bottom-0 w-0.5 h-2 bg-current rounded-full" />
    </span>
  </span>
);

export const BirthdayCake: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      {/* Base line */}
      <line x1="21" y1="77" x2="79" y2="77" />

      {/* Bottom tier */}
      <rect x="28" y="58" width="44" height="19" rx="3.5" />
      <path d="M 28 64.5 C 34 61.5, 44 61.5, 50 64.5 C 56 67.5, 66 67.5, 72 64.5" />
      <path d="M 28 71 C 34 68, 44 68, 50 71 C 56 74, 66 74, 72 71" />

      {/* Top tier */}
      <rect x="32" y="39" width="36" height="19" rx="3" />
      <path d="M 32 51.5 C 38 48.5, 44 48.5, 50 51.5 C 56 54.5, 62 54.5, 68 51.5" />

      {/* Dripping frosting on top tier */}
      <path d="M 32 40 L 32 46.5 C 33.5 49, 36.5 49, 38 46.5 C 39.5 44.5, 42 44.5, 43.5 47.5 C 44.5 49.5, 46.5 49.5, 47.5 47 C 49 44.5, 51 44.5, 52.5 48 C 53.5 50, 56 50, 57 47 C 58.5 44.5, 61 44.5, 62.5 47 C 64 49.5, 66.5 49.5, 68 46.5 L 68 40" />

      {/* Frosting dollops across the top */}
      <path d="M 32 39 C 33 36, 38 36, 41 39 C 43 36, 48 36, 50 39 C 52 36, 57 36, 59 39 C 62 36, 67 36, 68 39" />

      {/* Left candle */}
      <rect x="37.5" y="27" width="3.5" height="9" rx="1" />
      <path d="M 39.25 21.5 C 37.5 23.5, 38 25.5, 39.25 26 C 40.5 25.5, 41 23.5, 39.25 21.5 Z" fill="currentColor" stroke="none" />

      {/* Middle candle */}
      <rect x="48.25" y="27" width="3.5" height="9" rx="1" />
      <path d="M 50 21.5 C 48.25 23.5, 48.75 25.5, 50 26 C 51.25 25.5, 51.75 23.5, 50 21.5 Z" fill="currentColor" stroke="none" />

      {/* Right candle */}
      <rect x="59" y="27" width="3.5" height="9" rx="1" />
      <path d="M 60.75 21.5 C 59 23.5, 59.5 25.5, 60.75 26 C 62 25.5, 62.5 23.5, 60.75 21.5 Z" fill="currentColor" stroke="none" />
    </svg>
  </span>
);

export const Calendar = BirthdayCake;
export const Cake = BirthdayCake;

export interface BirthdayCakeBadgeProps {
  className?: string;
  size?: string;
  variant?: 'forest' | 'sage' | 'emerald' | 'light';
  withSprout?: boolean;
}

export const BirthdayCakeBadge: React.FC<BirthdayCakeBadgeProps> = ({
  className = '',
  size = 'w-9 h-9',
  variant = 'forest',
  withSprout = false,
}) => {
  const bgClasses = {
    forest: 'bg-[#1F4D38] text-white border-[#153929]',
    sage: 'bg-[#5FA368] text-white border-[#478250]',
    emerald: 'bg-[#4CAF50] text-white border-[#388E3C]',
    light: 'bg-[#FFFDF7] text-[#1F4D38] border-[#DDE9D8]',
  };

  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-full shrink-0 select-none shadow-xs border transition-transform ${bgClasses[variant]} ${size} ${className}`}
      aria-hidden="true"
    >
      <BirthdayCake className="w-[72%] h-[72%]" />
      {withSprout && (
        <span
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-tr-full rounded-bl-full bg-[#8EB892] border border-[#153929]/40 transform rotate-12 shadow-2xs"
          aria-hidden="true"
        />
      )}
    </span>
  );
};

export const CalendarCheck: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-3.5 rounded border border-current flex items-center justify-center text-[9px] font-bold">
      ✓
    </span>
  </span>
);

export const Clock: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-3.5 rounded-full border border-current relative flex items-center justify-center">
      <span className="absolute w-1.5 h-0.5 bg-current rounded-full translate-x-[2px] translate-y-0" />
      <span className="absolute w-0.5 h-1.5 bg-current rounded-full translate-y-[-2px]" />
    </span>
  </span>
);

export const Heart: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-xs leading-none">♥</span>
  </span>
);

export const HeartHandshake: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-xs font-bold leading-none">🤝</span>
  </span>
);

export const Shield: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-4 rounded-b-full border border-current border-t-2" />
  </span>
);

export const ShieldCheck: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-4 rounded-b-full border border-current border-t-2 flex items-center justify-center text-[9px] font-bold">
      ✓
    </span>
  </span>
);

export const ShieldAlert: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-4 rounded-b-full border border-current border-t-2 flex items-center justify-center text-[9px] font-bold">
      !
    </span>
  </span>
);

export const Users: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="flex items-center gap-0.5">
      <span className="w-2 h-2 rounded-full border border-current" />
      <span className="w-2 h-2 rounded-full border border-current" />
    </span>
  </span>
);

export const Home: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-bold text-sm leading-none">⌂</span>
  </span>
);

export const MapPin: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="flex flex-col items-center">
      <span className="w-2 h-2 rounded-full border border-current bg-current/20" />
      <span className="w-0.5 h-1.5 bg-current rounded-b-full -mt-0.5" />
    </span>
  </span>
);

export const Sparkles: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-xs leading-none">✦</span>
  </span>
);

export const BookOpen: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-mono text-xs font-bold leading-none tracking-tighter">📖</span>
  </span>
);

export const MessageSquare: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-3 rounded-md border border-current relative flex items-center justify-center">
      <span className="w-1.5 h-0.5 bg-current rounded-full" />
    </span>
  </span>
);

export const Send: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-xs font-bold transform rotate-45 inline-block">➤</span>
  </span>
);

export const Copy: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="relative w-3.5 h-3.5">
      <span className="absolute top-0 left-0 w-2.5 h-2.5 border border-current rounded-xs opacity-50" />
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border border-current rounded-xs bg-[#FFFDF7]" />
    </span>
  </span>
);

export const RotateCcw: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-bold text-sm leading-none">↺</span>
  </span>
);

export const RotateCw: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-bold text-sm leading-none">↻</span>
  </span>
);

export const RefreshCw: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-bold text-sm leading-none">⟳</span>
  </span>
);

export const Filter: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-xs font-bold leading-none">▼</span>
  </span>
);

export const HelpCircle: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] font-bold">
      ?
    </span>
  </span>
);

export const AlertCircle: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
      !
    </span>
  </span>
);

export const AlertTriangle: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-xs font-bold">⚠</span>
  </span>
);

export const Info: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] font-bold font-serif">
      i
    </span>
  </span>
);

export const Shovel: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="flex flex-col items-center">
      <span className="w-2 h-2 rounded-t-full border border-current" />
      <span className="w-0.5 h-2 bg-current" />
    </span>
  </span>
);

export const Eye: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-2 rounded-full border border-current flex items-center justify-center">
      <span className="w-1 h-1 rounded-full bg-current" />
    </span>
  </span>
);

export const EyeOff: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-xs font-bold">⊘</span>
  </span>
);

export const Droplets: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-2.5 h-3 rounded-b-full rounded-tl-full bg-current/20 border border-current rotate-45" />
  </span>
);

export const Trophy: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-xs">🏆</span>
  </span>
);

export const FileText: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3 h-3.5 rounded-xs border border-current flex flex-col justify-evenly px-0.5">
      <span className="w-full h-0.5 bg-current opacity-60" />
      <span className="w-2/3 h-0.5 bg-current opacity-60" />
    </span>
  </span>
);

export const FileCheck2: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3 h-3.5 rounded-xs border border-current flex items-center justify-center text-[8px] font-bold">
      ✓
    </span>
  </span>
);

export const User: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="flex flex-col items-center">
      <span className="w-2 h-2 rounded-full border border-current" />
      <span className="w-3.5 h-1.5 rounded-t-full border border-current border-b-0 -mt-0.5" />
    </span>
  </span>
);

export const UserCheck: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="flex items-center gap-0.5">
      <span className="w-2 h-2 rounded-full border border-current" />
      <span className="text-[9px] font-bold">✓</span>
    </span>
  </span>
);

export const UserX: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="flex items-center gap-0.5">
      <span className="w-2 h-2 rounded-full border border-current" />
      <span className="text-[9px] font-bold">×</span>
    </span>
  </span>
);

export const Database: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="flex flex-col gap-0.5">
      <span className="w-3 h-1 rounded-full border border-current" />
      <span className="w-3 h-1 rounded-full border border-current" />
    </span>
  </span>
);

export const Lock: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="flex flex-col items-center">
      <span className="w-2 h-1.5 rounded-t-full border border-current border-b-0" />
      <span className="w-3 h-2 rounded-xs border border-current bg-current/20" />
    </span>
  </span>
);

export const Printer: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-mono text-xs">⎙</span>
  </span>
);

export const Download: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-mono text-xs font-bold">⭳</span>
  </span>
);

export const GraduationCap: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-xs">🎓</span>
  </span>
);

export const Building2: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3 h-3.5 border border-current flex flex-col justify-evenly px-0.5">
      <span className="flex justify-between"><span className="w-0.5 h-0.5 bg-current" /><span className="w-0.5 h-0.5 bg-current" /></span>
      <span className="flex justify-between"><span className="w-0.5 h-0.5 bg-current" /><span className="w-0.5 h-0.5 bg-current" /></span>
    </span>
  </span>
);

export const Trees: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-xs">🌲</span>
  </span>
);

export const TreePine: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-xs">🌲</span>
  </span>
);

export const Compass: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px] font-bold">
      ◇
    </span>
  </span>
);

export const Search: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-bold text-xs">⚲</span>
  </span>
);

export const Megaphone: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-xs">📢</span>
  </span>
);

export const CheckSquare: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-3.5 rounded-xs border border-current flex items-center justify-center text-[9px] font-bold">
      ✓
    </span>
  </span>
);

export const Square: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-3.5 rounded-xs border border-current" />
  </span>
);

export const Circle: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3 h-3 rounded-full border border-current" />
  </span>
);

export const Image: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-3 rounded-xs border border-current flex items-center justify-center text-[7px] font-bold">
      ▣
    </span>
  </span>
);

export const TrendingUp: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-bold text-xs">↗</span>
  </span>
);

export const Camera: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="text-xs">📷</span>
  </span>
);

export const Share2: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="font-bold text-xs tracking-tighter">➦</span>
  </span>
);

export const Loader2: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
  </span>
);

export const Bell: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="flex flex-col items-center">
      <span className="w-3 h-2.5 rounded-t-full border border-current border-b-2" />
      <span className="w-1 h-0.5 bg-current rounded-full mt-0.5" />
    </span>
  </span>
);

export const Trash2: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="flex flex-col items-center">
      <span className="w-3.5 h-0.5 bg-current rounded-full mb-0.5" />
      <span className="w-2.5 h-3 rounded-b-xs border border-current flex justify-evenly">
        <span className="w-px h-full bg-current opacity-60" />
      </span>
    </span>
  </span>
);

export const Mail: React.FC<IconProps> = ({ className }) => (
  <span className={base(className)} aria-hidden="true">
    <span className="w-3.5 h-2.5 rounded-xs border border-current relative flex items-center justify-center overflow-hidden">
      <span className="text-[7px] font-mono leading-none">✉</span>
    </span>
  </span>
);
