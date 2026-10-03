import { useState } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { useRouter } from '../../context/RouterContext';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { ArrowRight, MapPin, Calendar, CheckCircle2, Info } from '../common/Icons';

export function CommunityPreviewSection() {
  const { openCalculator } = useRouter();
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(16);
  const todayDate = new Date().getDate();

  // Illustrative anonymized activity examples matching the prompt guidelines
  const sampleActivities = [
    {
      id: '1',
      title: 'Green Day planting reported',
      date: '16 September · Pune',
      actionType: 'Native neem sapling tended',
      day: 16,
    },
    {
      id: '2',
      title: 'Green Day planting reported',
      date: '12 September · Pune',
      actionType: 'Balcony herbal planters nurtured',
      day: 12,
    },
    {
      id: '3',
      title: 'Green Day planting reported',
      date: '04 September · Pune',
      actionType: 'Fruit tree watered and mulched',
      day: 4,
    },
  ];

  // Days with illustrative sample activity indicators
  const activityDays = [4, 12, 16, 22, 28];

  return (
    <section className="py-18 sm:py-26 surface-base relative">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              align="left"
              eyebrow="Community Activity"
              title="A movement that grows one Green Day at a time."
              description="Every month brings 31 distributed waves of care. See how quiet individual acts create continuous collective momentum."
            />
            <Button
              variant="secondary"
              size="md"
              href="/community"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Community
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Recent Planting Updates (Privacy-First Stream) */}
          <div className="lg:col-span-7">
            <ScrollReveal delayMs={100}>
              <div className="surface-elevated rounded-3xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#DDE9D8]">
                  <h3 className="font-display font-bold text-lg text-[#1F4D38]">
                    Recent Planting Updates
                  </h3>
                  <span className="text-xs font-semibold text-[#6F9F73] uppercase tracking-wider">
                    Privacy-First Stream
                  </span>
                </div>

                <div className="mt-4 divide-y divide-[#DDE9D8]/60">
                  {sampleActivities.map((act) => (
                    <div key={act.id} className="py-4 first:pt-2 last:pb-0 flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#1F4D38]">
                          <CheckCircle2 className="w-4 h-4 text-[#6F9F73] shrink-0" />
                          <span>{act.title}</span>
                        </div>
                        <div className="text-xs text-[#4D6153] pl-6">
                          {act.actionType}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-semibold text-[#1F4D38] flex items-center justify-end gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#6F9F73]" />
                          <span>{act.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#DDE9D8] text-xs text-[#7A8E80] flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#6F9F73] shrink-0 mt-0.5" />
                  <span>
                    Privacy protection: All updates are anonymized. No personal profiles, phone numbers, or exact addresses are ever collected or displayed.
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Section 21 Community Calendar Preview */}
          <div className="lg:col-span-5">
            <ScrollReveal delayMs={200}>
              <div className="surface-elevated rounded-3xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#DDE9D8]">
                  <h3 className="font-display font-bold text-lg text-[#1F4D38]">
                    Community Calendar
                  </h3>
                  <span className="text-xs text-[#4D6153]">31-Day Grid</span>
                </div>

                <p className="mt-4 text-xs text-[#4D6153] leading-relaxed">
                  Every day of the month is someone’s Green Day. Click any date to preview its monthly cycle:
                </p>

                {/* 31-Day Interactive Grid */}
                <div className="mt-4 grid grid-cols-7 gap-1.5 p-3 tactile-control-inset rounded-2xl">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                    const isSelected = selectedCalendarDay === d;
                    const isCurrent = todayDate === d;
                    const hasActivity = activityDays.includes(d);

                    let stateClasses = 'bg-[#FFFDF7] text-[#1F4D38] hover:bg-[#DDE9D8]/80';
                    if (isSelected) {
                      stateClasses = 'surface-active scale-105';
                    } else if (isCurrent) {
                      stateClasses = 'bg-[#FFFDF7] text-[#1F4D38] ring-2 ring-[#6F9F73] font-extrabold';
                    }

                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setSelectedCalendarDay(d)}
                        className={`aspect-square relative flex flex-col items-center justify-center rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${stateClasses}`}
                        title={`Day ${d}${isCurrent ? ' (Today)' : ''}${hasActivity ? ' (Community Green Day)' : ''}`}
                      >
                        <span>{d}</span>
                        {/* Green Day activity dot indicator */}
                        {hasActivity && !isSelected && (
                          <span className="w-1 h-1 rounded-full bg-[#6F9F73] absolute bottom-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Calendar State Legend */}
                <div className="mt-4 pt-3 border-t border-[#DDE9D8]/60 grid grid-cols-2 gap-2 text-[11px] text-[#4D6153]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#1F4D38]" />
                    <span>Selected ({getOrdinalSuffix(selectedCalendarDay)})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#FFFDF7] ring-1 ring-[#6F9F73]" />
                    <span>Today ({todayDate})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6F9F73]" />
                    <span>Sample Green Day</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#FFFDF7] border border-[#DDE9D8]" />
                    <span>Normal Day</span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => openCalculator(selectedCalendarDay)}
                    className="text-xs font-semibold text-[#1F4D38] hover:text-[#6F9F73] underline transition-colors cursor-pointer"
                  >
                    View Green Day details for the {getOrdinalSuffix(selectedCalendarDay)} →
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
