import { useState, useRef } from 'react';
import { useGreenDay } from '../../context/GreenDayContext';
import { Button } from '../common/Button';
import { ShareModal } from '../share/ShareModal';
import { Share2, Printer, CheckCircle2, Clock, Sparkles, Sprout, Heart, Calendar } from '../common/Icons';

interface CelebrationCardProps {
  dateStr: string;
  saplingCount: number;
  plantTypeLabel: string;
  location: string;
  eligibleAt: number;
  onReset: () => void;
}

export function CelebrationCard({
  dateStr,
  saplingCount,
  plantTypeLabel,
  location,
  eligibleAt,
  onReset,
}: CelebrationCardProps) {
  const { greenDayInfo, openNurtureModal, downloadCalendarEvent } = useGreenDay();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const formattedDate = new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const nextGreenDayFormatted = greenDayInfo?.formattedNextDate || 'next month';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-hero-center">
      {/* Success Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#6F9F73] flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>CELEBRATE YOUR ACTION</span>
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F4D38] tracking-tight">
          A birthday worth remembering.
        </h2>
        <p className="text-base sm:text-lg text-[#4D6153] max-w-xl mx-auto leading-relaxed">
          «You turned your Green Day into an action. Now comes the important part: nurture what you planted.»
        </p>
      </div>

      {/* The Digital Celebration Card (Level 3 Forest Glass styling, strictly NOT a certificate) */}
      <div
        ref={cardRef}
        className="max-w-xl mx-auto rounded-3xl surface-glass-forest p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center text-white space-y-6 border border-white/20"
      >
        {/* Subtle Decorative concentric rings */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 w-60 h-60 rounded-full border border-white/15"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 -bottom-16 w-60 h-60 rounded-full border border-white/15"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8EB892]">
            <Sprout className="w-4 h-4" />
            <span>BIRTHDAY GREEN</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            A Green Day Worth Remembering
          </h3>

          <div className="py-4 border-y border-white/20 my-4 space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#DDE9D8]">
              Planted On
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">
              {formattedDate}
            </div>
            <div className="text-sm font-medium text-[#8EB892] capitalize">
              {saplingCount} {plantTypeLabel} · {location}
            </div>
          </div>

          <div className="text-xs text-[#DDE9D8] max-w-sm mx-auto leading-relaxed space-y-1">
            <p className="italic">
              «Your birthday gave you a date. Give that date a purpose.»
            </p>
            <p className="text-[11px] text-[#8EB892] pt-1">
              Next Green Day check-in: <strong>{nextGreenDayFormatted}</strong>
            </p>
          </div>
        </div>

        <div className="relative z-10 text-[10px] text-white/60 tracking-wider uppercase pt-2">
          Plant · Nurture · Repeat · Voluntary Personal Milestone
        </div>
      </div>

      {/* Action Buttons: Share & Print */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={() => setIsShareModalOpen(true)}
          icon={<Share2 className="w-4 h-4" />}
        >
          Share Celebration Card
        </Button>

        <Button
          variant="secondary"
          size="md"
          fullWidth
          onClick={handlePrint}
          icon={<Printer className="w-4 h-4" />}
        >
          Print / Save Card
        </Button>
      </div>

      {/* Post-Planting Organic Growth Module (Section 8 & 9) */}
      <div className="surface-elevated rounded-2xl p-5 border border-[#DDE9D8] text-center max-w-md mx-auto space-y-2.5 shadow-2xs">
        <span className="text-xs font-bold text-[#1F4D38] block">
          Want someone else to find their Green Day?
        </span>
        <p className="text-xs text-[#7A8E80] leading-relaxed">
          Let friends, family, or classmates know about turning birth dates into recurring Green Days.
        </p>
        <div className="pt-1 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsShareModalOpen(true)}
            icon={<Share2 className="w-3.5 h-3.5" />}
            className="bg-white/90"
          >
            Share Birthday Green
          </Button>
        </div>
      </div>

      {/* Nurture & Calendar Quick Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-md mx-auto">
        <button
          type="button"
          onClick={openNurtureModal}
          className="px-4 py-2 rounded-xl surface-canvas border border-[#DDE9D8] text-xs font-bold text-[#1F4D38] hover:border-[#6F9F73] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <Heart className="w-3.5 h-3.5 text-[#6F9F73]" />
          <span>How to Nurture</span>
        </button>

        <button
          type="button"
          onClick={downloadCalendarEvent}
          className="px-4 py-2 rounded-xl surface-canvas border border-[#DDE9D8] text-xs font-bold text-[#1F4D38] hover:border-[#6F9F73] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <Calendar className="w-3.5 h-3.5 text-[#6F9F73]" />
          <span>Add Next Green Day to Calendar</span>
        </button>
      </div>

      {/* 24-Hour Holding Transparency Disclosure */}
      <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#EEF5EC] border border-[#8EB892] text-xs text-[#1F4D38] space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-sm">
          <Clock className="w-4 h-4 text-[#6F9F73]" />
          <span>24-Hour Holding Period Active</span>
        </div>
        <p className="text-[#4D6153]">
          «Your activity will become part of Birthday Green's public impact record after the 24-hour holding period on {new Date(eligibleAt).toLocaleString()}.»
        </p>
        <p className="text-[11px] text-[#7A8E80] pt-1 border-t border-[#8EB892]/40">
          «Impact figures are based on community-submitted planting reports and are not independently verified.»
        </p>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="text-xs font-semibold text-[#4D6153] hover:text-[#1F4D38] underline cursor-pointer"
        >
          Submit another Green Day activity
        </button>
      </div>

      {/* Reusable Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        contentType="PLANTED"
        dayNumber={greenDayInfo?.dayNumber}
        title="Share Your Green Day Planting"
      />
    </div>
  );
}
