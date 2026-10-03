import { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string | ReactNode;
  align?: 'left' | 'center';
  className?: string;
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  dark = false,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`flex flex-col ${
        isCenter ? 'items-center text-center' : 'items-start text-left'
      } ${className}`}
    >
      {eyebrow && (
        <span
          className={`text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-1.5 sm:mb-2.5 ${
            dark ? 'text-[#8EB892]' : 'text-[#6F9F73]'
          }`}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight [text-wrap:balance] ${
          dark ? 'text-[#FFFDF7]' : 'text-[#1F4D38]'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-2 sm:mt-3 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed ${
            dark ? 'text-[#DDE9D8]/90' : 'text-[#4D6153]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
