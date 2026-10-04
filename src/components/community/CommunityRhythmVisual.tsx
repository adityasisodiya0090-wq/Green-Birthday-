import { useState } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { useImpact } from '../../context/ImpactContext';
import { useGreenDay } from '../../context/GreenDayContext';
import { useRouter } from '../../context/RouterContext';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { Button } from '../common/Button';
import { Sparkles, Calendar, RotateCcw, Sprout, ArrowRight, Info, Check } from '../common/Icons';

export function CommunityRhythmVisual() {
  const { calendarCounts } = useImpact();
  const { setGreenDay, savedDay } = useGreenDay();
  const { navigate } = useRouter();

  // Selected date in the "Every Date Can Grow" interactive component
  const [selectedInteractiveDate, setSelectedInteractiveDate] = useState<number>(savedDay || 16);
  const [adoptedFeedback, setAdoptedFeedback] = useState(false);

  // Illustrative chain representing how dates form a continuous wave
  const illustrativeSequence = [
    { day: 1, label: '1st', context: 'New month beginning' },
    { day: 5, label: '5th', context: 'Early month steward' },
    { day: 12, label: '12th', context: 'Mid-month rhythm' },
    { day: 16, label: '16th', context: 'Continuous care' },
    { day: 21, label: '21st', context: 'Late-month growth' },
    { day: 28, label: '28th', context: 'Month-end steward' },
  ];

  const handleAdoptDate = (day: number) => {
    setGreenDay(day);
    setAdoptedFeedback(true);
    setTimeout(() => setAdoptedFeedback(false), 2500);
  };

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-base relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="Collective Rhythm"
              title="Every day can become someone's Green Day."
              description="Birthday Green does not depend on everyone planting on one universal holiday. Each steward has their own date. Together, those dates create a continuous monthly rhythm."
            />
          </div>
        </ScrollReveal>

        {/* 1. Illustrative Flow Chain (Section 7) */}
        <ScrollReveal delayMs={100}>
          <div className="max-w-4xl mx-auto surface-elevated rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 border border-[#DDE9D8] shadow-xs mb-4 sm:mb-8">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DDE9D8] flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F4D38] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#6F9F73]" />
                <span>The Continuous Chain of Dates</span>
              </span>
              <span className="text-[11px] font-semibold text-[#7A8E80] bg-[#F7F3E8] px-2.5 py-0.5 rounded-full border border-[#DDE9D8]">
                Illustrative sequence
              </span>
            </div>

            <p className="text-xs text-[#4D6153] mb-6 leading-relaxed">
              When 31 dates belong to different people, environmental care is not an isolated annual event. It becomes a living daily wave:
            </p>

            {/* Sequence line: 1st -> 5th -> 12th -> 16th -> 21st -> 28th */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
              {illustrativeSequence.map((item, idx) => (
                <div
                  key={item.day}
                  onClick={() => setSelectedInteractiveDate(item.day)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                    selectedInteractiveDate === item.day
                      ? 'bg-[#EEF5EC] border-[#6F9F73] shadow-xs'
                      : 'surface-canvas border-[#DDE9D8] hover:border-[#6F9F73]/60'
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-[#6F9F73] block">
                    STEP {idx + 1}
                  </span>
                  <span className="font-display font-black text-xl text-[#1F4D38] block mt-0.5">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-[#7A8E80] block mt-1">
                    {item.context}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 2. "Every Date Can Grow" Interactive Matrix (Section 21) */}
        <ScrollReveal delayMs={200}>
          <div className="max-w-4xl mx-auto surface-elevated rounded-3xl p-6 sm:p-10 border border-[#DDE9D8] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#DDE9D8]">
              <div>
                <h4 className="font-display font-extrabold text-lg sm:text-xl text-[#1F4D38]">
                  Every Date Can Grow
                </h4>
                <p className="text-xs text-[#7A8E80]">
                  Select any calendar date from 1 to 31 to explore how it functions as a recurring monthly Green Day.
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1F4D38] bg-[#DDE9D8]/60 px-3 py-1 rounded-full shrink-0">
                <Info className="w-3.5 h-3.5" />
                <span>Educational Example</span>
              </div>
            </div>

            {/* 31 Date Pill Grid */}
            <div className="grid grid-cols-7 sm:grid-cols-11 md:grid-cols-16 lg:grid-cols-31 gap-1.5">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                const isSelected = selectedInteractiveDate === d;
                const isUserSaved = savedDay === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedInteractiveDate(d)}
                    className={`aspect-square rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center relative cursor-pointer ${
                      isSelected
                        ? 'bg-[#1F4D38] text-white shadow-md scale-105'
                        : isUserSaved
                        ? 'bg-[#DDE9D8] text-[#1F4D38] border border-[#6F9F73]'
                        : 'surface-canvas text-[#1C2821] border border-[#DDE9D8]/80 hover:border-[#6F9F73] hover:bg-[#DDE9D8]/40'
                    }`}
                    title={`Day ${d} of the month`}
                  >
                    <span>{d}</span>
                    {isUserSaved && (
                      <span className="text-[8px] leading-none absolute bottom-0.5 text-[#1F4D38]">
                        🌱
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Interactive Date Context Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#F7F3E8] to-[#FFFDF7] border border-[#DDE9D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6F9F73]">
                  Example for the {getOrdinalSuffix(selectedInteractiveDate)}
                </span>
                <p className="font-display font-bold text-base text-[#1F4D38]">
                  Someone born on the {getOrdinalSuffix(selectedInteractiveDate)} has this as their Green Day.
                </p>
                <p className="text-xs text-[#4D6153] leading-relaxed">
                  Every month on the {getOrdinalSuffix(selectedInteractiveDate)}, they receive a quiet reminder to plant living roots and care for what they started previously.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAdoptDate(selectedInteractiveDate)}
                  className="bg-white"
                  icon={adoptedFeedback ? <Check className="w-3.5 h-3.5 text-[#6F9F73]" /> : <Sprout className="w-3.5 h-3.5 text-[#1F4D38]" />}
                >
                  {adoptedFeedback ? 'Saved as my date!' : `Make this my Green Day`}
                </Button>
              </div>
            </div>

            {/* Starting-State Insight (Section 20) */}
            <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-xs text-[#7A8E80] flex items-start gap-2.5 leading-relaxed">
              <Info className="w-4 h-4 text-[#6F9F73] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1F4D38]">Historical Foundation & Next Chapter:</strong> The Birthday Green movement was founded on 973 grassroots community members and 23,659 historically planted trees. This website records the next chapter of eligible verified digital participation on top of that established baseline.
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
