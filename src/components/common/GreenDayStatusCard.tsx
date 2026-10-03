import { useGreenDay } from '../../context/GreenDayContext';
import { useRouter } from '../../context/RouterContext';
import { Button } from './Button';
import { getOrdinalSuffix } from '../../utils/greenDay';
import {
  Calendar,
  Sparkles,
  Sprout,
  Heart,
  ArrowRight,
  RotateCcw,
  Clock,
} from './Icons';

interface GreenDayStatusCardProps {
  className?: string;
  showNurtureButton?: boolean;
  onNurtureClick?: () => void;
}

export function GreenDayStatusCard({
  className = '',
  showNurtureButton = true,
  onNurtureClick,
}: GreenDayStatusCardProps) {
  const {
    savedDay,
    status,
    isToday,
    isTomorrow,
    daysRemaining,
    greenDayInfo,
    downloadCalendarEvent,
    openNurtureModal,
  } = useGreenDay();
  const { navigate, openCalculator } = useRouter();

  if (!savedDay || !greenDayInfo) {
    return null;
  }

  const ordinal = getOrdinalSuffix(savedDay);

  const handlePlantToday = () => {
    navigate('/participate');
  };

  const handlePrepare = () => {
    navigate('/participate');
  };

  const handleNurture = () => {
    if (onNurtureClick) {
      onNurtureClick();
    } else {
      openNurtureModal();
    }
  };

  return (
    <div
      className={`rounded-3xl border transition-all duration-300 relative overflow-hidden ${
        isToday
          ? 'bg-gradient-to-br from-[#1F4D38] via-[#153929] to-[#0E281C] text-white border-[#6F9F73]/40 shadow-xl'
          : isTomorrow
          ? 'surface-elevated border-[#6F9F73]/60 shadow-md'
          : 'surface-elevated border-[#DDE9D8] shadow-xs'
      } p-6 sm:p-8 ${className}`}
    >
      {/* Decorative ambient growth ring for today */}
      {isToday && (
        <div
          className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full border border-[#8EB892]/20 animate-pulse motion-reduce:animate-none"
          aria-hidden="true"
        />
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        {/* Left side: Status badge & copy */}
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span
              className={
                isToday
                  ? 'text-[#8EB892]'
                  : isTomorrow
                  ? 'text-[#1F4D38]'
                  : 'text-[#6F9F73]'
              }
            >
              Every {ordinal} of the month
            </span>
            <span aria-hidden="true" className={isToday ? 'text-white/40' : 'text-[#7A8E80]'}>·</span>
            <span className={isToday ? 'text-white/80' : 'text-[#7A8E80]'}>
              Personal Recurring Rhythm
            </span>

            {isToday && (
              <>
                <span aria-hidden="true" className="text-white/40">·</span>
                <span className="text-[#8EB892] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>ACTIVE TODAY</span>
                </span>
              </>
            )}
          </div>

          {/* Heading depending on state (Sections 6, 7 & 10) */}
          {isToday ? (
            <div className="space-y-2">
              <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white">
                TODAY IS YOUR GREEN DAY
              </h3>
              <p className="text-sm sm:text-base text-[#DDE9D8] leading-relaxed">
                Your date came around again.
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs text-[#8EB892] font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>Plant</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Nurture</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Return</span>
                </span>
              </div>
            </div>
          ) : isTomorrow ? (
            <div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[#1F4D38]">
                Tomorrow is your Green Day. 🌱
              </h3>
              <p className="text-sm text-[#4D6153] mt-1.5 leading-relaxed">
                Your monthly checkpoint arrives tomorrow. Get ready to plant or care for your living saplings.
              </p>
            </div>
          ) : status === 'passed' ? (
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-[#1F4D38]">
                Your Green Day just passed.
              </h3>
              <p className="text-xs sm:text-sm text-[#4D6153] mt-1.5 leading-relaxed">
                Another month. Another chance to plant, nurture, and return. Next Green Day:{' '}
                <strong className="text-[#1F4D38]">{greenDayInfo.formattedNextDate}</strong> ({daysRemaining} days away).
              </p>
            </div>
          ) : (
            <div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-[#1F4D38]">
                Your Green Day is coming in {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}.
              </h3>
              <p className="text-xs sm:text-sm text-[#4D6153] mt-1.5 leading-relaxed">
                Another month. Another chance to plant, nurture, and return. Next Green Day:{' '}
                <strong className="text-[#1F4D38]">{greenDayInfo.formattedNextDate}</strong>.
              </p>
            </div>
          )}

          {/* Month end adjustment indicator if active */}
          {greenDayInfo.isAdjustedForMonthEnd && (
            <p className={`text-xs italic ${isToday ? 'text-[#DDE9D8]/80' : 'text-[#7A8E80]'}`}>
              *{greenDayInfo.adjustmentNote}
            </p>
          )}
        </div>

        {/* Right side: Action buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
          {isToday ? (
            <>
              <Button
                variant="primary"
                size="md"
                onClick={handlePlantToday}
                className="bg-[#DDE9D8] text-[#153929] hover:bg-white w-full sm:w-auto font-bold"
                icon={<ArrowRight className="w-4 h-4 text-[#153929]" />}
              >
                I’m Ready to Grow 🌱
              </Button>
              <button
                type="button"
                onClick={downloadCalendarEvent}
                className="px-4 py-2.5 rounded-xl border border-white/20 text-xs font-semibold text-[#DDE9D8] hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
                title="Download calendar reminder"
              >
                <Clock className="w-4 h-4 text-[#8EB892]" />
                <span>Remind Me Later</span>
              </button>
            </>
          ) : isTomorrow ? (
            <>
              <Button
                variant="primary"
                size="md"
                onClick={handlePrepare}
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Get Ready →
              </Button>
              <button
                type="button"
                onClick={downloadCalendarEvent}
                className="px-3.5 py-2 rounded-xl border border-[#DDE9D8] text-xs font-semibold text-[#4D6153] hover:text-[#1F4D38] hover:border-[#6F9F73] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Download monthly recurring calendar event (.ics)"
              >
                <Calendar className="w-3.5 h-3.5 text-[#6F9F73]" />
                <span>Add to Calendar</span>
              </button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                size="md"
                onClick={handlePrepare}
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Prepare for Green Day
              </Button>
              <button
                type="button"
                onClick={downloadCalendarEvent}
                className="px-3.5 py-2 rounded-xl border border-[#DDE9D8] text-xs font-semibold text-[#4D6153] hover:text-[#1F4D38] hover:border-[#6F9F73] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Download monthly recurring calendar event (.ics)"
              >
                <Calendar className="w-3.5 h-3.5 text-[#6F9F73]" />
                <span>Add to Calendar</span>
              </button>
            </>
          )}

          {showNurtureButton && (
            <button
              type="button"
              onClick={handleNurture}
              className={`text-xs underline hover:opacity-80 cursor-pointer ml-auto sm:ml-0 ${
                isToday ? 'text-[#DDE9D8]/90' : 'text-[#4D6153]'
              }`}
            >
              Nurture guide
            </button>
          )}

          {/* Change date option */}
          <button
            type="button"
            onClick={() => openCalculator(savedDay)}
            className={`text-xs underline hover:opacity-80 cursor-pointer ml-auto sm:ml-0 ${
              isToday ? 'text-[#DDE9D8]/70' : 'text-[#7A8E80]'
            }`}
          >
            Change date
          </button>
        </div>
      </div>
    </div>
  );
}
