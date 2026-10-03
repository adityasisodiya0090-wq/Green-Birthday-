import { useState } from 'react';
import { useGreenDay } from '../../context/GreenDayContext';
import { useRouter } from '../../context/RouterContext';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { Button } from '../common/Button';
import { ShareModal } from '../share/ShareModal';
import {
  Calendar,
  Sparkles,
  Sprout,
  Heart,
  RotateCcw,
  ArrowRight,
  Share2,
  Clock,
  ShieldCheck,
  Compass,
  Users,
} from '../common/Icons';

interface PersonalGreenDayCardProps {
  className?: string;
  onPlantClick?: () => void;
  onNurtureClick?: () => void;
}

export function PersonalGreenDayCard({
  className = '',
  onPlantClick,
  onNurtureClick,
}: PersonalGreenDayCardProps) {
  const {
    savedDay,
    greenDayInfo,
    status,
    isToday,
    isTomorrow,
    daysRemaining,
    openNurtureModal,
    downloadCalendarEvent,
  } = useGreenDay();
  const { navigate, openCalculator } = useRouter();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  if (!savedDay || !greenDayInfo) {
    return (
      <div className={`surface-elevated rounded-3xl p-7 sm:p-9 border border-[#DDE9D8] text-center space-y-4 ${className}`}>
        <div className="w-12 h-12 rounded-2xl bg-[#DDE9D8]/70 flex items-center justify-center mx-auto text-[#1F4D38]">
          <Sprout className="w-6 h-6 text-[#1F4D38]" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#6F9F73]">
            PERSONAL RECURRING RHYTHM
          </span>
          <h3 className="font-display font-extrabold text-2xl text-[#1F4D38] mt-1">
            Find Your Green Day
          </h3>
          <p className="text-xs sm:text-sm text-[#4D6153] max-w-sm mx-auto mt-2 leading-relaxed">
            Your birth date gives you a monthly opportunity to plant, nurture, and return.
          </p>
        </div>
        <div className="pt-2">
          <Button variant="primary" size="md" onClick={() => openCalculator()} icon={<ArrowRight className="w-4 h-4" />}>
            Find My Green Day →
          </Button>
        </div>
      </div>
    );
  }

  const ordinal = getOrdinalSuffix(savedDay);

  const handlePlant = () => {
    if (onPlantClick) {
      onPlantClick();
    } else {
      navigate('/participate');
    }
  };

  const handleNurture = () => {
    if (onNurtureClick) {
      onNurtureClick();
    } else {
      openNurtureModal();
    }
  };

  // Status-sensitive subtitle & description (Section 6, 7 & 10)
  const getStatusContent = () => {
    if (isToday) {
      return {
        eyebrow: 'TODAY IS YOUR GREEN DAY',
        subtitle: 'Your date came around again.',
        description: 'Plant something living responsibly, or care for what you have already started. Keep the rhythm going.',
      };
    }
    if (isTomorrow) {
      return {
        eyebrow: 'TOMORROW IS YOUR GREEN DAY',
        subtitle: 'Tomorrow is your Green Day. 🌱',
        description: 'Your monthly checkpoint arrives tomorrow. Prepare your soil or plan care for existing saplings.',
      };
    }
    if (status === 'passed') {
      return {
        eyebrow: 'YOUR GREEN DAY JUST PASSED',
        subtitle: 'Another month. Another chance to plant, nurture, and return.',
        description: `Next Green Day: ${greenDayInfo.formattedNextDate}. Return when you can. Keep the responsibility alive.`,
      };
    }
    return {
      eyebrow: 'YOUR GREEN DAY IS COMING',
      subtitle: `Your Green Day arrives in ${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'}.`,
      description: `Next Green Day: ${greenDayInfo.formattedNextDate}. Another month, another chance to plant, nurture, and return.`,
    };
  };

  const statusContent = getStatusContent();

  return (
    <div
      className={`rounded-3xl relative overflow-hidden transition-all duration-300 ${
        isToday
          ? 'surface-glass-forest text-white p-7 sm:p-10 shadow-2xl border border-white/20'
          : 'surface-elevated border border-[#DDE9D8] p-7 sm:p-10 shadow-sm'
      } ${className}`}
    >
      {/* Decorative ambient subtle circle */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#6F9F73]/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-6">
        {/* Top Header: Unboxed metadata (Section 1A of design constitution) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/15 dark:border-[#DDE9D8]">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className={isToday ? 'text-[#8EB892]' : 'text-[#6F9F73]'}>
              MY GREEN DAY
            </span>
            <span aria-hidden="true" className={isToday ? 'text-white/40' : 'text-[#7A8E80]'}>·</span>
            <span className={isToday ? 'text-white/90' : 'text-[#4D6153]'}>
              Personal Calendar Marker
            </span>
            {isToday && (
              <>
                <span aria-hidden="true" className="text-white/40">·</span>
                <span className="text-[#8EB892] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>TODAY</span>
                </span>
              </>
            )}
            {isTomorrow && (
              <>
                <span aria-hidden="true" className="text-[#7A8E80]">·</span>
                <span className="text-[#1F4D38] font-bold">TOMORROW</span>
              </>
            )}
          </div>

          <span
            className={`text-xs ${
              isToday ? 'text-[#DDE9D8]/90' : 'text-[#7A8E80]'
            }`}
          >
            Private to this device
          </span>
        </div>

        {/* Center: The Marker (Section 2) */}
        <div className="text-center py-2 space-y-1">
          <span
            className={`text-xs font-bold uppercase tracking-widest block ${
              isToday ? 'text-[#8EB892]' : 'text-[#6F9F73]'
            }`}
          >
            MY GREEN DAY
          </span>
          <h2
            className={`font-display font-black text-6xl sm:text-7xl tracking-tight leading-none ${
              isToday ? 'text-white' : 'text-[#1F4D38]'
            }`}
          >
            {ordinal}
          </h2>
          <span
            className={`text-sm sm:text-base font-semibold block pt-1 ${
              isToday ? 'text-[#DDE9D8]' : 'text-[#4D6153]'
            }`}
          >
            Every month
          </span>
        </div>

        {/* The Sequence: PLANT -> NURTURE -> RETURN (Section 2) */}
        <div
          className={`p-4 rounded-2xl border text-center ${
            isToday
              ? 'bg-white/10 border-white/15 text-white'
              : 'surface-canvas border-[#DDE9D8] text-[#1F4D38]'
          }`}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Sprout className="w-3.5 h-3.5 text-[#6F9F73]" />
              <span>PLANT</span>
            </span>
            <span className={isToday ? 'text-[#8EB892]' : 'text-[#6F9F73]'}>↓</span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-[#6F9F73]" />
              <span>NURTURE</span>
            </span>
            <span className={isToday ? 'text-[#8EB892]' : 'text-[#6F9F73]'}>↓</span>
            <span className="flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5 text-[#6F9F73]" />
              <span>RETURN</span>
            </span>
          </div>
        </div>

        {/* Status Callout (Sections 6, 7 & 10) */}
        <div
          className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
            isToday
              ? 'bg-white/5 border-white/10 text-white'
              : 'bg-[#FFFDF7] border-[#DDE9D8] text-[#4D6153]'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#6F9F73] shrink-0" />
              <strong className={isToday ? 'text-white' : 'text-[#1F4D38]'}>
                {statusContent.subtitle}
              </strong>
            </div>
            <p className={isToday ? 'text-[#DDE9D8]/90 text-[11px]' : 'text-[#7A8E80] text-[11px]'}>
              {statusContent.description}
            </p>
          </div>

          <button
            type="button"
            onClick={downloadCalendarEvent}
            className={`font-semibold hover:underline flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-center ${
              isToday ? 'text-[#8EB892]' : 'text-[#1F4D38]'
            }`}
            title="Download free recurring calendar reminder (.ics)"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Add to Calendar</span>
          </button>
        </div>

        {/* Action Controls (Section 7 & 8) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          {isToday ? (
            <>
              <Button
                variant="primary"
                size="md"
                onClick={handlePlant}
                fullWidth
                className="bg-[#DDE9D8] text-[#153929] hover:bg-white font-bold"
                icon={<Sprout className="w-4 h-4 text-[#153929]" />}
              >
                I’m Ready to Grow 🌱
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={downloadCalendarEvent}
                fullWidth
                className="border-white/30 text-white hover:bg-white/10"
                icon={<Clock className="w-4 h-4" />}
              >
                Remind Me Later
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                size="md"
                onClick={handlePlant}
                fullWidth
                icon={<Sprout className="w-4 h-4" />}
              >
                Record a Planting
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={handleNurture}
                fullWidth
                icon={<Heart className="w-4 h-4 text-[#6F9F73]" />}
              >
                How to Nurture
              </Button>
            </>
          )}

          <Button
            variant="outline"
            size="md"
            onClick={() => setIsShareModalOpen(true)}
            icon={<Share2 className="w-4 h-4" />}
            className={isToday ? 'border-white/30 text-white hover:bg-white/10' : 'bg-white'}
            title="Share your Green Day rhythm"
          >
            Share
          </Button>
        </div>

        {/* Community & Collective Connection (Section 26 & 27) */}
        <div
          className={`pt-3 border-t text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${
            isToday ? 'border-white/15 text-[#DDE9D8]' : 'border-[#DDE9D8] text-[#4D6153]'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#6F9F73] shrink-0" />
            <span>Different dates. One collective rhythm (1 → 31).</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/community')}
              className={`hover:underline cursor-pointer font-medium ${
                isToday ? 'text-white' : 'text-[#1F4D38]'
              }`}
            >
              Explore Community →
            </button>
            <span aria-hidden="true" className="opacity-50">·</span>
            <button
              type="button"
              onClick={() => navigate('/community-kit')}
              className={`hover:underline cursor-pointer font-medium ${
                isToday ? 'text-white' : 'text-[#1F4D38]'
              }`}
            >
              Bring to your community →
            </button>
          </div>
        </div>

        {/* Strict Invariant Disclaimer (Section 2 & 31) */}
        <div className={`text-center text-[10px] leading-relaxed ${isToday ? 'text-white/60' : 'text-[#7A8E80]'}`}>
          Personal environmental calendar marker · Not an official membership credential or certificate · No user accounts · Stored locally on this device
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        contentType="GREEN_DAY_DISCOVERED"
        dayNumber={savedDay}
        title="Share My Green Day"
      />
    </div>
  );
}
