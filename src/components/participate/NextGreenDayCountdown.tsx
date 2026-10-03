import { calculateNextGreenDay, getOrdinalSuffix } from '../../utils/greenDay';
import { Calendar, Clock, Sparkles } from '../common/Icons';

interface NextGreenDayCountdownProps {
  dayNumber: number;
}

export function NextGreenDayCountdown({ dayNumber }: NextGreenDayCountdownProps) {
  const info = calculateNextGreenDay(dayNumber);

  return (
    <div className="surface-glass-forest rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
      <div className="flex items-center justify-between text-xs text-[#8EB892] font-semibold uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Your Recurring Rhythm</span>
        </span>
        <span className="bg-white/15 px-3 py-1 rounded-full text-white">
          Every {getOrdinalSuffix(dayNumber)}
        </span>
      </div>

      <div className="space-y-1">
        <span className="text-xs uppercase tracking-widest text-[#DDE9D8]">
          Your next Green Day arrives on:
        </span>
        <h4 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          {info.formattedNextDate}
        </h4>
      </div>

      <div className="pt-3 border-t border-white/20 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#8EB892]" />
          <span className="font-semibold text-white">
            {info.isToday ? 'Today is your Green Day! 🌱' : `${info.daysRemaining} days away`}
          </span>
        </div>
        <span className="text-[#DDE9D8]">
          Mark your calendar to check in and nurture
        </span>
      </div>
    </div>
  );
}
