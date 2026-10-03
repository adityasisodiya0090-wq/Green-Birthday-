import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useGreenDay } from '../../context/GreenDayContext';
import {
  validateBirthDate,
  calculateNextGreenDay,
  buildMonthCalendarGrid,
  getOrdinalSuffix,
  DetailedGreenDayResult,
} from '../../utils/greenDay';
import { Button } from '../common/Button';
import { StatusMessage } from '../common/StatusMessage';
import { GreenDayReminder } from '../common/GreenDayReminder';
import { GreenDayResponsibility } from '../common/GreenDayResponsibility';
import { ShareModal } from '../share/ShareModal';
import {
  Calendar as CalendarIcon,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Clock,
  Sprout,
  CheckCircle2,
  Share2,
  Heart,
} from '../common/Icons';

interface GreenDayCalculatorProps {
  initialDay?: number;
  onReadyToGrow?: () => void;
  className?: string;
  isModalView?: boolean;
}

export function GreenDayCalculator({
  initialDay,
  onReadyToGrow,
  className = '',
  isModalView = false,
}: GreenDayCalculatorProps) {
  // Input state (Full DOB string only exists during typing/submission)
  const [dateInput, setDateInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Temporary client-side calculation result (Stores ONLY day number 1-31, NEVER full DOB)
  const [result, setResult] = useState<DetailedGreenDayResult | null>(() => {
    if (initialDay && initialDay >= 1 && initialDay <= 31) {
      return calculateNextGreenDay(initialDay);
    }
    return null;
  });

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [readyAcknowledged, setReadyAcknowledged] = useState(false);

  // Format today's date in YYYY-MM-DD for the native date picker 'max' constraint
  const todayStr = new Date().toISOString().split('T')[0];

  // Update initial day if prop changes and not yet calculated
  useEffect(() => {
    if (initialDay && initialDay >= 1 && initialDay <= 31 && !result) {
      setResult(calculateNextGreenDay(initialDay));
    }
  }, [initialDay, result]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = validateBirthDate(dateInput);

    if (!validation.isValid || !validation.dayNumber) {
      setErrorMessage(validation.error || 'Please enter a valid date.');
      return;
    }

    // PRIVACY ENFORCEMENT:
    // Extract only the day number (1-31).
    // Wipe the full date string from state so no full DOB is retained.
    const day = validation.dayNumber;
    setDateInput(''); // Clear full date string immediately

    // Calculate recurring Green Day locally
    const calculated = calculateNextGreenDay(day);
    setResult(calculated);
    setGreenDay(day);
    setReadyAcknowledged(false);
  };

  const handleReset = () => {
    setResult(null);
    setDateInput('');
    setErrorMessage(null);
    setIsShareModalOpen(false);
    setReadyAcknowledged(false);
  };

  const { navigate, setSavedGreenDay } = useRouter();
  const { setGreenDay } = useGreenDay();

  const handleReadyClick = () => {
    setReadyAcknowledged(true);
    if (result) {
      setSavedGreenDay(result.dayNumber);
      setGreenDay(result.dayNumber);
    }
    if (onReadyToGrow) {
      onReadyToGrow();
    }
    navigate('/participate');
  };

  const handleMakeItYours = () => {
    if (result) {
      setSavedGreenDay(result.dayNumber);
      setGreenDay(result.dayNumber);
    }
    if (onReadyToGrow) {
      onReadyToGrow();
    }
    navigate('/participate');
  };

  // Build calendar visual for the calculated month
  const calendarGrid = result
    ? buildMonthCalendarGrid(
        result.nextDate.getFullYear(),
        result.nextDate.getMonth(),
        result.dayNumber
      )
    : null;

  return (
    <div className={`w-full ${className}`}>
      {!result ? (
        /* =========================================================================
           INPUT EXPERIENCE
           ========================================================================= */
        <div className="surface-glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-white/90 relative overflow-hidden transition-all duration-300">
          {/* Soft ambient background glow */}
          <div
            className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#DDE9D8]/50 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Privacy Guarantee Note */}
          <div className="flex items-start gap-2.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#DDE9D8]/60 border border-[#6F9F73]/30 text-xs sm:text-sm text-[#1F4D38] mb-4 sm:mb-6">
            <ShieldCheck className="w-4 h-4 text-[#1F4D38] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Privacy first:</strong> Your exact birth date stays on your device. We only use the day number to calculate your Green Day.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10" noValidate>
            <div>
              <label
                htmlFor="birth-date-picker"
                className="block text-sm sm:text-base font-display font-bold text-[#1F4D38] mb-1"
              >
                Your date of birth
              </label>
              <p className="text-xs text-[#4D6153] mb-3">
                Only the day of the month is used to calculate your Green Day.
              </p>

              {/* Comfortable, accessible date input */}
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6F9F73]">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <input
                  id="birth-date-picker"
                  type="date"
                  max={todayStr}
                  value={dateInput}
                  onChange={(e) => {
                    setDateInput(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full pl-10 pr-3.5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl tactile-control-inset text-sm sm:text-base font-semibold text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38] focus:bg-white transition-all cursor-pointer min-h-[44px]"
                  aria-describedby={errorMessage ? 'date-error-msg' : undefined}
                  aria-invalid={errorMessage ? 'true' : 'false'}
                  required
                />
              </div>

              {/* Validation error display */}
              {errorMessage && (
                <div id="date-error-msg" className="mt-2.5">
                  <StatusMessage type="note">
                    {errorMessage}
                  </StatusMessage>
                </div>
              )}
            </div>

            {/* Submit Action Button */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Find My Green Day
              </Button>
            </div>
          </form>
        </div>
      ) : (
        /* =========================================================================
           RESULT EXPERIENCE
           ========================================================================= */
        <div className="space-y-4 sm:space-y-6 animate-hero-center">
          {/* Main Result Hero Card */}
          <div className="surface-glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-white/90 relative overflow-hidden">
            {/* Ambient Lighting */}
            <div
              className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[#DDE9D8]/60 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#DDE9D8]/80">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#6F9F73] mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  YOUR GREEN DAY
                </span>
                <div className="flex items-baseline gap-2.5 my-1 sm:my-2">
                  <span className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-[#1F4D38] tracking-tighter tabular-nums leading-none">
                    {getOrdinalSuffix(result.dayNumber)}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[#4D6153]">
                    of every month
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4D6153] max-w-lg leading-relaxed pt-0.5">
                  Every {getOrdinalSuffix(result.dayNumber)} of the month, you have another opportunity to grow something.
                </p>
              </div>

              {/* Reset Control */}
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#4D6153] hover:text-[#1F4D38] bg-[#F7F3E8] hover:bg-[#DDE9D8] px-3 py-1.5 rounded-xl transition-all border border-[#DDE9D8] cursor-pointer self-start sm:self-center"
                title="Change birth date"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Change date</span>
              </button>
            </div>

            {/* Next Green Day Card (Level 3 Forest Glass Surface) */}
            <div className="mt-4 sm:mt-6 surface-glass-forest rounded-2xl p-4 sm:p-6 shadow-md relative overflow-hidden">
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8EB892] font-bold">
                    NEXT GREEN DAY
                  </span>
                  <h4 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                    {result.formattedNextDate}
                  </h4>
                  {result.isAdjustedForMonthEnd && (
                    <p className="text-[11px] sm:text-xs text-[#DDE9D8]/95 pt-0.5">
                      🌱 {result.adjustmentNote}
                    </p>
                  )}
                </div>

                {/* Countdown Badge */}
                <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-xl border border-white/20 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#8EB892]" />
                  <span className="font-display text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
                    {result.isToday ? (
                      <span className="text-[#DDE9D8]">TODAY</span>
                    ) : (
                      <span>{result.daysRemaining} days away</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Today special active state */}
              {result.isToday && (
                <div className="mt-4 pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white">
                  <div className="space-y-0.5">
                    <span className="text-xs uppercase tracking-wider font-bold text-[#8EB892] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      TODAY IS YOUR GREEN DAY
                    </span>
                    <p className="font-display font-extrabold text-lg text-white mt-0.5">
                      Plant something living.
                    </p>
                    <p className="text-xs text-[#DDE9D8]">
                      And don't forget what you've already planted.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleReadyClick}
                      className="bg-[#DDE9D8] text-[#153929] hover:bg-white font-bold"
                      icon={<ArrowRight className="w-4 h-4 text-[#153929]" />}
                    >
                      I Planted Today →
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Calendar & Monthly Cycle Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Mini Monthly Calendar */}
              {calendarGrid && (
                <div className="md:col-span-6 surface-elevated rounded-2xl p-5 sm:p-6 border border-[#DDE9D8]">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DDE9D8]">
                    <span className="font-display font-bold text-sm text-[#1F4D38]">
                      {calendarGrid.monthName} {calendarGrid.year}
                    </span>
                    <span className="text-[11px] font-semibold text-[#6F9F73] uppercase tracking-wider">
                      Upcoming Green Day
                    </span>
                  </div>

                  {/* Day-of-week headers */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#7A8E80] mb-2 uppercase">
                    <span>Su</span>
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                  </div>

                  {/* Calendar cells */}
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: calendarGrid.paddingDays }).map((_, i) => (
                      <div key={`pad-${i}`} className="aspect-square" />
                    ))}
                    {calendarGrid.days.map((d) => (
                      <div
                        key={d.dayNumber}
                        className={`aspect-square relative flex items-center justify-center rounded-lg text-xs font-semibold transition-all ${
                          d.isGreenDay
                            ? 'surface-active font-extrabold scale-105 shadow-sm'
                            : d.isToday
                            ? 'bg-[#FFFDF7] text-[#1F4D38] ring-1 ring-[#6F9F73]'
                            : 'text-[#1C2821] hover:bg-[#DDE9D8]/50'
                        }`}
                      >
                        <span>{d.dayNumber}</span>
                        {d.isGreenDay && (
                          <span
                            className="absolute -top-1 -right-1 text-[10px] leading-none"
                            title="Your Green Day"
                          >
                            🌱
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-[11px] text-[#7A8E80] text-center">
                    Highlighted in green: Your recurring Green Day in {calendarGrid.monthName}.
                  </p>
                </div>
              )}

              {/* Monthly Cycle Progression Visualization */}
              <div className="md:col-span-6 surface-elevated rounded-2xl p-5 sm:p-6 border border-[#DDE9D8] flex flex-col justify-between h-full">
                <div>
                  <h5 className="font-display font-bold text-sm text-[#1F4D38] mb-3 pb-2 border-b border-[#DDE9D8]">
                    Recurring Rhythm
                  </h5>
                  <p className="text-xs text-[#4D6153] leading-relaxed mb-4">
                    Your personal commitment operates as an ongoing cycle every single month:
                  </p>

                  {/* Desktop Horizontal / Mobile Vertical Chain */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-xs font-bold text-[#1F4D38] py-2">
                    <div className="p-2.5 rounded-xl bg-[#F7F3E8] border border-[#DDE9D8] w-full sm:w-auto">
                      THIS MONTH
                    </div>
                    <span className="text-[#6F9F73] font-extrabold">↓</span>
                    <div className="p-2.5 rounded-xl surface-active w-full sm:w-auto">
                      {getOrdinalSuffix(result.dayNumber)}
                    </div>
                    <span className="text-[#6F9F73] font-extrabold">↓</span>
                    <div className="p-2.5 rounded-xl bg-[#F7F3E8] border border-[#DDE9D8] w-full sm:w-auto">
                      NEXT MONTH
                    </div>
                    <span className="text-[#6F9F73] font-extrabold">↓</span>
                    <div className="p-2.5 rounded-xl bg-[#DDE9D8] text-[#1F4D38] w-full sm:w-auto">
                      KEEP GROWING
                    </div>
                  </div>
                </div>

                {/* Deterministic Personalized Message */}
                <div className="mt-5 p-3.5 rounded-xl bg-[#F7F3E8] border border-[#DDE9D8] text-center">
                  <p className="text-xs sm:text-sm font-semibold text-[#1F4D38]">
                    “{result.message}”
                  </p>
                </div>
              </div>
            </div>

            {/* Action CTA Buttons (Section 23: Find My Green Day -> Your Green Day is the 16th -> Make It Yours -> My Green Day) */}
            <div className="mt-10 pt-6 border-t border-[#DDE9D8]/80 flex flex-col sm:flex-row items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleMakeItYours}
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto font-bold"
              >
                Make It Yours → My Green Day
              </Button>

              <Button
                variant={readyAcknowledged ? 'success' : 'secondary'}
                size="lg"
                onClick={handleReadyClick}
                icon={<CheckCircle2 className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                {readyAcknowledged ? 'Ready to Grow! 🌱' : 'I’m ready to grow 🌱'}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsShareModalOpen(true)}
                icon={<Share2 className="w-4 h-4" />}
                className="w-full sm:w-auto bg-white/90"
              >
                Share My Green Day
              </Button>
            </div>

            {/* Ready Confirmation Banner */}
            {readyAcknowledged && (
              <div className="mt-4 p-4 rounded-xl bg-[#EEF5EC] border border-[#8EB892] text-xs sm:text-sm text-[#1F4D38] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6F9F73] shrink-0" />
                <span>
                  You’re all set for the {getOrdinalSuffix(result.dayNumber)}! When your Green Day arrives, plant something living and nurture it.
                </span>
              </div>
            )}

            {/* Free Device Reminders & Calendar Sync */}
            <GreenDayReminder className="mt-8" />

            {/* Core Responsibility: Plant. Nurture. Repeat. */}
            <GreenDayResponsibility className="mt-8" />
          </div>

          {/* Share Modal Integration */}
          {result && (
            <ShareModal
              isOpen={isShareModalOpen}
              onClose={() => setIsShareModalOpen(false)}
              contentType="GREEN_DAY_DISCOVERED"
              dayNumber={result.dayNumber}
              title="Share My Green Day"
            />
          )}
        </div>
      )}
    </div>
  );
}
