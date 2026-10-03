import { useEffect, useRef, useState, ReactNode } from 'react';
import { Sprout } from './Icons';

interface ImpactCounterProps {
  label: string;
  value: number;
  unit?: string;
  icon?: ReactNode;
  isInitialBaseline?: boolean;
  subtext?: string;
  className?: string;
  dark?: boolean;
}

export function ImpactCounter({
  label,
  value,
  unit,
  icon = <Sprout className="w-5 h-5 text-[#6F9F73]" />,
  isInitialBaseline = true,
  subtext,
  className = '',
  dark = false,
}: ImpactCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // If value is 0, keep it zero without running animation
    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Smooth count up animation using requestAnimationFrame
          const duration = 1200; // 1.2s smooth duration
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOutProgress * value);

            setDisplayValue(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    const el = counterRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [value]);

  const formattedNumber = new Intl.NumberFormat('en-IN').format(displayValue);

  return (
    <div
      ref={counterRef}
      className={`flex flex-col items-center text-center p-3.5 sm:p-6 rounded-2xl transition-all duration-300 ${
        dark
          ? 'bg-[#153929]/70 border border-[#6F9F73]/25 text-[#FFFDF7]'
          : 'surface-elevated hover:border-[#6F9F73]/50'
      } ${className}`}
    >
      {/* Icon */}
      <div
        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-1.5 sm:mb-2.5 ${
          dark ? 'bg-white/10 text-[#8EB892]' : 'bg-[#DDE9D8]/60 text-[#1F4D38]'
        }`}
      >
        {icon}
      </div>

      {/* Label */}
      <span
        className={`text-[10px] sm:text-xs font-semibold tracking-wide uppercase line-clamp-1 ${
          dark ? 'text-[#DDE9D8]' : 'text-[#4D6153]'
        }`}
      >
        {label}
      </span>

      {/* Number Metric with Tabular Figures */}
      <div className="flex items-baseline gap-1 my-1 sm:my-2">
        <span
          className={`font-display text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight tabular-nums ${
            dark ? 'text-[#FFFDF7]' : 'text-[#1F4D38]'
          }`}
        >
          {formattedNumber}
        </span>
        {unit && (
          <span
            className={`text-xs sm:text-sm font-semibold ${
              dark ? 'text-[#8EB892]' : 'text-[#6F9F73]'
            }`}
          >
            {unit}
          </span>
        )}
      </div>

      {/* Subtext: Community-reported / custom subtext */}
      <span
        className={`text-[10px] sm:text-[11px] font-medium tracking-normal ${
          dark ? 'text-[#8EB892]/80' : 'text-[#7A8E80]'
        }`}
      >
        {subtext || (isInitialBaseline ? 'Community baseline' : 'Verified reports')}
      </span>
    </div>
  );
}
