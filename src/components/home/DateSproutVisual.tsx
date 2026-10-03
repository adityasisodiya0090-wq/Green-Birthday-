import { useState } from 'react';
import { getOrdinalSuffix, calculateNextGreenDay } from '../../utils/greenDay';
import { Calendar, Sparkles } from '../common/Icons';

interface DateSproutVisualProps {
  initialDay?: number;
  interactive?: boolean;
  onSelectDay?: (day: number) => void;
}

export function DateSproutVisual({
  initialDay = 16,
  interactive = true,
  onSelectDay,
}: DateSproutVisualProps) {
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const [isHovered, setIsHovered] = useState(false);
  const info = calculateNextGreenDay(selectedDay);

  const handleDayChange = (newDay: number) => {
    setSelectedDay(newDay);
    if (onSelectDay) {
      onSelectDay(newDay);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] flex flex-col items-center justify-center select-none animate-hero-center py-1 sm:py-2">
      {/* Background ambient radial glow: Pure CSS subtle diffused atmosphere */}
      <div
        className={`absolute inset-2 sm:inset-4 rounded-full bg-radial from-[#DDE9D8]/70 via-[#6F9F73]/15 to-transparent blur-2xl pointer-events-none transition-opacity duration-500 ${
          isHovered ? 'opacity-100 scale-105' : 'opacity-80'
        }`}
        aria-hidden="true"
      />

      {/* Main Glass Visual Container - 100% SVG Free */}
      <div
        className={`relative w-full rounded-3xl surface-glass p-4 sm:p-6 flex flex-col items-center justify-between overflow-hidden shadow-md transition-all duration-300 border border-[#DDE9D8]/80 ${
          isHovered ? 'shadow-xl shadow-[#1F4D38]/10 border-white' : ''
        }`}
      >
        {/* Decorative Pure CSS Concentric Calendar Circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="w-[90%] aspect-square rounded-full border border-dashed border-[#6F9F73]/20" />
          <div className="absolute w-[70%] aspect-square rounded-full border border-[#DDE9D8]/40" />
          <div className="absolute w-[50%] aspect-square rounded-full border border-dotted border-[#6F9F73]/25" />
        </div>

        {/* Top Header Tag */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-xs font-semibold tracking-wider text-[#4D6153] uppercase z-10 pb-2">
          <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-[#1F4D38]">
            <Calendar className="w-3 h-3 text-[#6F9F73]" />
            Monthly Rhythm
          </span>
          <span className="text-[9px] sm:text-[10px] text-[#7A8E80] font-medium tracking-normal lowercase">
            (e.g. 16th is an example)
          </span>
        </div>

        {/* Center Date & Emergent Sprout Composition */}
        <div
          className="relative flex flex-col items-center justify-center my-2 sm:my-3 z-10 cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          onClick={() => onSelectDay && onSelectDay(selectedDay)}
          title="Click to view recurring Green Day calculation"
        >
          {/* Main Round Date Vessel with pure CSS depth */}
          <div
            className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center bg-gradient-to-b from-[#FFFDF7] to-[#F7F3E8] border-2 transition-all duration-300 ${
              isHovered
                ? 'border-[#6F9F73] shadow-md shadow-[#1F4D38]/10 scale-[1.02]'
                : 'border-[#DDE9D8] shadow-inner shadow-[#1F4D38]/5'
            }`}
          >
            {/* Outer focus dashed ring */}
            <div
              className={`absolute -inset-2 rounded-full border border-dashed transition-all duration-300 pointer-events-none ${
                isHovered ? 'border-[#1F4D38]/40 scale-105' : 'border-[#6F9F73]/25'
              }`}
            />

            {/* Emergent Botanical Sprout Leaf (Pure CSS Geometry: Zero SVG) */}
            <div
              className={`absolute -top-3.5 right-2 sm:right-3 transition-transform duration-300 ${
                isHovered ? 'rotate-12 scale-110' : ''
              }`}
              aria-hidden="true"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Main curved leaf */}
                <div className="w-5 h-5 rounded-tr-full rounded-bl-full bg-[#6F9F73] border-2 border-[#1F4D38] transform -rotate-45 shadow-xs" />
                {/* Smaller tender leaflet */}
                <div className="absolute top-1 left-0 w-3 h-3 rounded-tl-full rounded-br-full bg-[#8EB892] border border-[#1F4D38] transform rotate-12" />
                {/* Stem line */}
                <div className="absolute bottom-0 left-3 w-1 h-3 bg-[#1F4D38] rounded-full" />
              </div>
            </div>

            {/* Central Date Numeral and Typography */}
            <div className="flex flex-col items-center text-center">
              <span className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-[#1F4D38] tabular-nums leading-none drop-shadow-2xs">
                {selectedDay}
              </span>
              <span className="mt-1.5 text-[10px] sm:text-xs font-extrabold tracking-widest uppercase text-[#6F9F73]">
                EVERY {getOrdinalSuffix(selectedDay).toUpperCase()}
              </span>
              <span
                className={`text-[9px] sm:text-[10px] uppercase tracking-wider mt-0.5 transition-colors duration-200 ${
                  isHovered ? 'text-[#1F4D38] font-bold underline decoration-[#6F9F73]' : 'text-[#1C2821] font-semibold opacity-90'
                }`}
              >
                MY GREEN DAY
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Quick-Day Dial */}
        <div className="w-full z-10 pt-2 border-t border-[#DDE9D8]/70 flex flex-col items-center gap-1.5">
          {interactive ? (
            <div className="flex items-center gap-2 w-full justify-between">
              <span className="text-[10px] sm:text-xs text-[#4D6153] font-medium shrink-0">Sample dates:</span>
              <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                {[1, 7, 16, 22, 28, 31].map((day) => {
                  const isSelected = selectedDay === day;
                  return (
                    <button
                      key={day}
                      onClick={() => handleDayChange(day)}
                      aria-label={`Select sample date ${day}`}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4D38] cursor-pointer ${
                        isSelected
                          ? 'surface-active scale-105'
                          : 'tactile-control-inset text-[#1C2821] hover:bg-[#DDE9D8]/70'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#4D6153]">
              <Sparkles className="w-3 h-3 text-[#6F9F73]" />
              <span>Next Green Day: <strong className="text-[#1F4D38]">{info.formattedNextDate}</strong></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
