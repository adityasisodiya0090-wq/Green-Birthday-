import { useState } from 'react';
import { useGreenDay } from '../../context/GreenDayContext';
import { useRouter } from '../../context/RouterContext';
import { Button } from '../common/Button';
import { ShareModal } from '../share/ShareModal';
import {
  Sprout,
  Heart,
  Calendar,
  RotateCcw,
  Share2,
  Clock,
  Sparkles,
  ArrowRight,
} from '../common/Icons';

interface GreenDayActionHubProps {
  className?: string;
  onReportPlanting?: () => void;
}

export function GreenDayActionHub({ className = '', onReportPlanting }: GreenDayActionHubProps) {
  const {
    savedDay,
    isToday,
    localPlantings,
    openNurtureModal,
    downloadCalendarEvent,
  } = useGreenDay();
  const { navigate } = useRouter();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const hasPastPlantings = localPlantings.length > 0;

  const handlePlantClick = () => {
    if (onReportPlanting) {
      onReportPlanting();
    } else {
      navigate('/participate');
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Nurture Continuity Callout if user previously planted (Section 9) */}
      {hasPastPlantings && (
        <div className="surface-elevated rounded-2xl p-5 sm:p-6 border border-[#8EB892]/60 bg-[#EEF5EC]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1F4D38] flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#6F9F73]" />
              <span>KEEP GROWING</span>
            </span>
            <h4 className="font-display font-bold text-base text-[#1F4D38]">
              You planted something. Give it care.
            </h4>
            <p className="text-xs text-[#4D6153] leading-relaxed max-w-lg">
              Stewardship is continuous. Rather than assuming growth, check the soil, observe seasonal changes, and care for what you’ve already started.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={openNurtureModal}
            icon={<Heart className="w-3.5 h-3.5 text-[#6F9F73]" />}
            className="bg-white shrink-0 self-start sm:self-center"
          >
            View Nurture Guide
          </Button>
        </div>
      )}

      {/* 3-Column Action Grid: TODAY / CARE / RETURN (Section 8) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: TODAY */}
        <div className="surface-elevated rounded-2xl p-5 border border-[#DDE9D8] space-y-3 flex flex-col justify-between hover:border-[#6F9F73] transition-colors shadow-2xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center text-[#1F4D38]">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xs uppercase tracking-wider text-[#1F4D38]">
                1. TODAY
              </span>
            </div>
            <p className="text-xs text-[#4D6153] leading-relaxed">
              Plant something living responsibly. Choose native varieties and prepare proper soil.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handlePlantClick}
            fullWidth
            icon={<Sprout className="w-3.5 h-3.5" />}
          >
            {isToday ? 'I’m Ready to Grow 🌱' : 'Report a Planting'}
          </Button>
        </div>

        {/* Card 2: CARE */}
        <div className="surface-elevated rounded-2xl p-5 border border-[#DDE9D8] space-y-3 flex flex-col justify-between hover:border-[#6F9F73] transition-colors shadow-2xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center text-[#1F4D38]">
                <Heart className="w-4 h-4 text-[#6F9F73]" />
              </div>
              <span className="font-display font-bold text-xs uppercase tracking-wider text-[#1F4D38]">
                2. CARE
              </span>
            </div>
            <p className="text-xs text-[#4D6153] leading-relaxed">
              Nurture what you’ve already started. Water by soil need and shield young stems.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={openNurtureModal}
            fullWidth
            icon={<Heart className="w-3.5 h-3.5" />}
          >
            View Nurture Guide
          </Button>
        </div>

        {/* Card 3: RETURN */}
        <div className="surface-elevated rounded-2xl p-5 border border-[#DDE9D8] space-y-3 flex flex-col justify-between hover:border-[#6F9F73] transition-colors shadow-2xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center text-[#1F4D38]">
                <RotateCcw className="w-4 h-4 text-[#1F4D38]" />
              </div>
              <span className="font-display font-bold text-xs uppercase tracking-wider text-[#1F4D38]">
                3. RETURN
              </span>
            </div>
            <p className="text-xs text-[#4D6153] leading-relaxed">
              Come back next month. Download a free recurring calendar event to keep the rhythm.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={downloadCalendarEvent}
            fullWidth
            icon={<Calendar className="w-3.5 h-3.5 text-[#6F9F73]" />}
            className="bg-white/80"
          >
            Add to Calendar
          </Button>
        </div>
      </div>

      {/* Tertiary Action: Share Birthday Green */}
      <div className="pt-1 text-center">
        <button
          type="button"
          onClick={() => setIsShareModalOpen(true)}
          className="text-xs text-[#4D6153] hover:text-[#1F4D38] inline-flex items-center gap-1.5 underline cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-[#6F9F73]" />
          <span>Know someone who should find their Green Day? Share Birthday Green →</span>
        </button>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        contentType="FIND_YOURS"
        dayNumber={savedDay || 16}
        title="Share Birthday Green"
      />
    </div>
  );
}
