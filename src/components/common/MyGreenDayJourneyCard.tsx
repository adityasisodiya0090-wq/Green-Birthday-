import { useState } from 'react';
import { useGreenDay } from '../../context/GreenDayContext';
import { useRouter } from '../../context/RouterContext';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { COMMUNITY_BASELINE_IMPACT } from '../../config/impactBaseline';
import { Button } from './Button';
import {
  Calendar,
  Sparkles,
  Sprout,
  Heart,
  RotateCcw,
  ArrowRight,
  Clock,
  Trash2,
  CheckCircle2,
  Info,
  ShieldCheck,
  Users,
  Compass,
} from './Icons';

interface MyGreenDayJourneyCardProps {
  className?: string;
}

export function MyGreenDayJourneyCard({ className = '' }: MyGreenDayJourneyCardProps) {
  const {
    savedDay,
    greenDayInfo,
    status,
    isToday,
    daysRemaining,
    localPlantings,
    totalPlantingsRecorded,
    totalSaplingsRecorded,
    nurtureState,
    openNurtureModal,
    clearAllPersonalData,
    downloadCalendarEvent,
  } = useGreenDay();
  const { navigate, openCalculator } = useRouter();

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [clearedNotice, setClearedNotice] = useState(false);

  if (!savedDay || !greenDayInfo) {
    return (
      <div className={`surface-elevated rounded-3xl p-7 sm:p-10 border border-[#DDE9D8] text-center space-y-4 ${className}`}>
        <div className="w-14 h-14 rounded-2xl bg-[#DDE9D8]/70 flex items-center justify-center mx-auto text-[#1F4D38]">
          <Sprout className="w-7 h-7 text-[#1F4D38]" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#6F9F73]">
            PERSONAL STEWARDSHIP JOURNEY
          </span>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1F4D38] mt-1">
            Discover Your Green Day
          </h3>
          <p className="text-xs sm:text-sm text-[#4D6153] max-w-md mx-auto mt-2 leading-relaxed">
            Your birth date gives you a recurring monthly checkpoint. Take the first step by finding your Green Day.
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

  const getNurtureStatusCopy = () => {
    switch (nurtureState) {
      case 'green_day':
        return {
          eyebrow: 'ACTIVE GREEN DAY',
          title: 'Plant again. Keep caring for what came before.',
          desc: 'Today is your monthly checkpoint. Start another living plant or visit the ones you started in previous months.',
        };
      case 'after_planting':
        return {
          eyebrow: 'NURTURE IN PROGRESS',
          title: 'You planted. Now nurture.',
          desc: 'Stewardship is continuous. Check soil moisture, protect the base, and let roots settle.',
        };
      case 'returning_month':
        return {
          eyebrow: 'CYCLE RETURNING',
          title: 'What you’ve planted still deserves care.',
          desc: 'Your Green Day is approaching. Prepare to return, nurture your saplings, and continue the rhythm.',
        };
      case 'before_planting':
      default:
        return {
          eyebrow: 'READY TO BEGIN',
          title: 'Your first Green Day is waiting.',
          desc: 'Planting starts the story. Nurturing keeps it alive. Make your first commitment this month.',
        };
    }
  };

  const copy = getNurtureStatusCopy();

  const handlePlantAction = () => {
    navigate('/participate');
  };

  const handleClearAll = () => {
    clearAllPersonalData();
    setShowClearConfirm(false);
    setClearedNotice(true);
    setTimeout(() => setClearedNotice(false), 4000);
  };

  return (
    <div className={`surface-elevated rounded-3xl p-6 sm:p-10 border border-[#DDE9D8] shadow-sm relative overflow-hidden ${className}`}>
      {/* Decorative ambient subtle circle */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#DDE9D8]/40 blur-3xl"
        aria-hidden="true"
      />

      {/* Top Bar: Title & Recurring Day (Zero-Pill styling) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DDE9D8] mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6F9F73]">
            <span>MY GREEN DAY JOURNEY</span>
            <span aria-hidden="true" className="text-[#7A8E80]">·</span>
            <span className="text-[#4D6153]">Private to this device</span>
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1F4D38] mt-1">
            Every {ordinal} of the month
          </h3>
        </div>

        {/* Next Date & Action */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] text-right shadow-2xs">
            <span className="text-[11px] font-medium text-[#7A8E80] block">
              Next Green Day
            </span>
            <span className="font-display font-bold text-sm sm:text-base text-[#1F4D38]">
              {greenDayInfo.formattedNextDate}
            </span>
            <span className="text-[10px] text-[#7A8E80] block">
              {isToday ? 'Today! 🌱' : `${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} away`}
            </span>
          </div>

          <button
            type="button"
            onClick={downloadCalendarEvent}
            className="p-3 rounded-2xl surface-canvas border border-[#DDE9D8] text-[#4D6153] hover:text-[#1F4D38] hover:border-[#6F9F73] transition-colors cursor-pointer"
            title="Download recurring calendar reminder (.ics)"
            aria-label="Add Green Day to device calendar"
          >
            <Calendar className="w-5 h-5 text-[#6F9F73]" />
          </button>
        </div>
      </div>

      {/* The 4-Stage Stewardship Cycle Visual (Section 15) */}
      <div className="mb-8 p-5 sm:p-6 rounded-2xl surface-canvas border border-[#DDE9D8]/80">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7A8E80] block mb-3">
          Recurring Monthly Rhythm
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-center">
          <div className="p-3.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center space-y-1">
            <div className="w-8 h-8 rounded-lg bg-[#DDE9D8]/70 flex items-center justify-center mx-auto text-[#1F4D38]">
              <Sprout className="w-4 h-4" />
            </div>
            <div className="font-display font-bold text-xs text-[#1F4D38]">1. THIS MONTH</div>
            <div className="text-[10px] text-[#7A8E80]">{ordinal} Green Day</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center space-y-1">
            <div className="w-8 h-8 rounded-lg bg-[#DDE9D8]/70 flex items-center justify-center mx-auto text-[#1F4D38]">
              <Heart className="w-4 h-4 text-[#6F9F73]" />
            </div>
            <div className="font-display font-bold text-xs text-[#1F4D38]">2. NEXT MONTH</div>
            <div className="text-[10px] text-[#7A8E80]">{ordinal} Green Day</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center space-y-1">
            <div className="w-8 h-8 rounded-lg bg-[#DDE9D8]/70 flex items-center justify-center mx-auto text-[#1F4D38]">
              <RotateCcw className="w-4 h-4 text-[#1F4D38]" />
            </div>
            <div className="font-display font-bold text-xs text-[#1F4D38]">3. MONTH AFTER</div>
            <div className="text-[10px] text-[#7A8E80]">{ordinal} Green Day</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center space-y-1">
            <div className="w-8 h-8 rounded-lg bg-[#DDE9D8]/70 flex items-center justify-center mx-auto text-[#1F4D38]">
              <Sparkles className="w-4 h-4 text-[#6F9F73]" />
            </div>
            <div className="font-display font-bold text-xs text-[#1F4D38]">4. REPEAT</div>
            <div className="text-[10px] text-[#7A8E80]">Keep the cycle alive</div>
          </div>
        </div>
      </div>

      {/* Human Nurture Status Section (Section 7, 8 & 9) */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-[#F7F3E8] to-[#FFFDF7] border border-[#DDE9D8] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6F9F73] block">
            {copy.eyebrow}
          </span>
          <h4 className="font-display font-bold text-lg sm:text-xl text-[#1F4D38]">
            {copy.title}
          </h4>
          <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
            {copy.desc}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
          <Button
            variant="primary"
            size="md"
            onClick={handlePlantAction}
            className="w-full sm:w-auto"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {isToday ? 'I’m Ready to Grow 🌱' : 'Report on Green Day'}
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={openNurtureModal}
            className="w-full sm:w-auto bg-white/80"
            icon={<Heart className="w-4 h-4 text-[#6F9F73]" />}
          >
            How to Nurture
          </Button>
        </div>
      </div>

      {/* Section 19: Simple Local History Timeline */}
      <div className="mb-8 p-5 sm:p-6 rounded-2xl surface-canvas border border-[#DDE9D8]/80 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7A8E80] block">
          Personal Cycle Timeline
        </span>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] flex-1">
            <Calendar className="w-4 h-4 text-[#6F9F73] shrink-0" />
            <div>
              <strong className="block text-[#1F4D38]">Green Day ({ordinal})</strong>
              <span className="text-[10px] text-[#7A8E80]">Monthly opportunity</span>
            </div>
          </div>
          <span className="text-center text-[#6F9F73] font-bold">↓</span>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] flex-1">
            <Sprout className="w-4 h-4 text-[#6F9F73] shrink-0" />
            <div>
              <strong className="block text-[#1F4D38]">Planting Reported</strong>
              <span className="text-[10px] text-[#7A8E80]">
                {totalPlantingsRecorded > 0 ? `${totalPlantingsRecorded} recorded` : 'Pending first report'}
              </span>
            </div>
          </div>
          <span className="text-center text-[#6F9F73] font-bold">↓</span>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] flex-1">
            <Heart className="w-4 h-4 text-[#6F9F73] shrink-0" />
            <div>
              <strong className="block text-[#1F4D38]">Ongoing Nurture</strong>
              <span className="text-[10px] text-[#7A8E80]">Continuous responsibility</span>
            </div>
          </div>
          <span className="text-center text-[#6F9F73] font-bold">↓</span>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] flex-1">
            <RotateCcw className="w-4 h-4 text-[#6F9F73] shrink-0" />
            <div>
              <strong className="block text-[#1F4D38]">Next Green Day</strong>
              <span className="text-[10px] text-[#7A8E80]">{greenDayInfo.formattedNextDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Local Planting Memory (Section 18) */}
      <div className="pt-6 border-t border-[#DDE9D8]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 gap-2">
          <div>
            <h5 className="font-display font-bold text-sm text-[#1F4D38]">
              Planting moments recorded on this device
            </h5>
            <span className="text-xs text-[#7A8E80] block mt-0.5">
              Personal local history. Does not automatically alter public community impact totals.
            </span>
          </div>

          <div className="text-xs font-semibold text-[#1F4D38]">
            <span>Planting moments: </span>
            <strong className="font-mono">{totalPlantingsRecorded}</strong>
            {totalPlantingsRecorded > 0 && (
              <span className="text-[#7A8E80]"> ({totalSaplingsRecorded} saplings noted)</span>
            )}
          </div>
        </div>

        {totalPlantingsRecorded === 0 ? (
          <div className="p-6 rounded-2xl surface-canvas border border-[#DDE9D8] text-center text-xs text-[#7A8E80]">
            «Your Green Day journey will appear here after your first planting report on this device.»
          </div>
        ) : (
          <div className="space-y-2.5">
            {localPlantings.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl surface-canvas border border-[#DDE9D8] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-[#DDE9D8]/70 text-[#1F4D38]">
                    <Sprout className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="font-bold text-[#1F4D38]">
                      {p.monthName} {p.year}
                    </span>
                    <span className="text-[#7A8E80] ml-2">
                      · {p.saplingCount} {p.plantTypeLabel}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-medium text-[#6F9F73] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Planting moment</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Section 5: IMPORTANT DATA DISTINCTION BOX */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#FCFAF3] border border-[#DDE9D8] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F4D38]">
            <Info className="w-4 h-4 text-[#6F9F73]" />
            <span>Understanding Birthday Green Data Streams</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Stream 1: My Journey */}
            <div className="p-3.5 rounded-xl bg-white border border-[#DDE9D8] space-y-1">
              <strong className="text-[#1F4D38] block font-display">1. My Journey</strong>
              <p className="text-[#7A8E80] leading-relaxed">
                Private, local information about this browser/device’s Green Day experience ({ordinal} of every month, {totalPlantingsRecorded} planting moments).
              </p>
            </div>

            {/* Stream 2: Community Impact */}
            <div className="p-3.5 rounded-xl bg-white border border-[#DDE9D8] space-y-1">
              <strong className="text-[#1F4D38] block font-display">2. Community Impact</strong>
              <p className="text-[#7A8E80] leading-relaxed">
                Community-reported information that becomes eligible under Birthday Green’s public impact rules after the 24-hour holding period.
              </p>
            </div>

            {/* Stream 3: Historical Baseline */}
            <div className="p-3.5 rounded-xl bg-white border border-[#DDE9D8] space-y-1">
              <strong className="text-[#1F4D38] block font-display">3. Historical Baseline</strong>
              <p className="text-[#7A8E80] leading-relaxed">
                Official real-world baseline: {COMMUNITY_BASELINE_IMPACT.participants.toLocaleString()} Members · {COMMUNITY_BASELINE_IMPACT.treesPlanted.toLocaleString()} Trees & Saplings · {COMMUNITY_BASELINE_IMPACT.communitiesReached} Communities.
              </p>
            </div>
          </div>
        </div>

        {/* Section 26 & 27: Community & Starter Kit Integration */}
        <div className="mt-6 p-4 rounded-2xl surface-canvas border border-[#DDE9D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-[#1F4D38] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#6F9F73]" />
              <span>Your Green Day is personal. The movement is collective.</span>
            </span>
            <p className="text-[#7A8E80]">
              Together: 1 → 2 → 3 → ... → 31 creates a recurring environmental rhythm.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/community')}
              className="text-[#1F4D38] font-semibold hover:underline cursor-pointer"
            >
              Explore Community →
            </button>
            <span aria-hidden="true" className="text-[#DDE9D8]">|</span>
            <button
              type="button"
              onClick={() => navigate('/community-kit')}
              className="text-[#1F4D38] font-semibold hover:underline cursor-pointer"
            >
              Bring to your community →
            </button>
          </div>
        </div>

        {/* Section 30 & 31: Footer info, multi-device limit, & local reset */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-[#7A8E80]">
          <div className="space-y-0.5">
            <p>
              Your personal Green Day settings are stored locally on this device unless a future feature provides another option.
            </p>
            <p>
              Stored in your browser only. Never transmitted as personal identity. Full DOB is never stored.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => openCalculator(savedDay)}
              className="text-[#1F4D38] hover:underline cursor-pointer font-medium"
            >
              Change recurring date
            </button>

            {!showClearConfirm && (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="text-[#B87070] hover:underline cursor-pointer flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear My Green Day Data</span>
              </button>
            )}

            {showClearConfirm && (
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#FFFDF7] border border-[#B87070]/40">
                <span className="text-[#1F4D38]">Clear device data?</span>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="font-bold text-[#B87070] hover:underline cursor-pointer"
                >
                  Yes, clear
                </button>
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="text-[#4D6153] hover:underline cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {clearedNotice && (
          <div className="mt-4 p-3 rounded-xl bg-[#EEF5EC] border border-[#8EB892] text-xs text-[#1F4D38]">
            Local Green Day data cleared from this browser. Any previously submitted community reports remain intact under public impact rules.
          </div>
        )}
      </div>
    </div>
  );
}
