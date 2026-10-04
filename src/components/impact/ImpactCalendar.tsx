import { useState } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { Calendar, Users, Sprout } from '../common/Icons';

interface ImpactCalendarProps {
  calendarCounts: Record<number, number>;
}

export function ImpactCalendar({ calendarCounts }: ImpactCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<number>(16);
  const activeCount = calendarCounts[selectedDay] || 0;

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-base relative">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="Monthly Distribution"
              title="Community Activity Across Dates"
              description="This is how the community is showing up across the month. Every day represents someone’s personal Green Day."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <div className="max-w-4xl mx-auto surface-elevated rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 border border-[#DDE9D8] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 border-b border-[#DDE9D8] gap-3 sm:gap-4">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#6F9F73]">
                  31 Days of Distributed Care
                </span>
                <h4 className="font-display font-bold text-base sm:text-xl text-[#1F4D38]">
                  Select any date to see community momentum:
                </h4>
              </div>

              {/* Day focus chip */}
              <div className="surface-glass-forest px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl flex items-center gap-2 w-fit">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8EB892]" />
                <span className="text-xs font-bold text-white">
                  {getOrdinalSuffix(selectedDay)}: {activeCount} {activeCount === 1 ? 'activity' : 'activities'}
                </span>
              </div>
            </div>

            {/* 31-Day Grid */}
            <div className="mt-4 sm:mt-8 grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-11 gap-1.5 sm:gap-2 p-2 sm:p-3 tactile-control-inset rounded-xl sm:rounded-2xl">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                const count = calendarCounts[d] || 0;
                const isSelected = selectedDay === d;
                const hasActivity = count > 0;

                let btnClass = 'bg-[#FFFDF7] text-[#1F4D38] hover:bg-[#DDE9D8]/70';
                if (isSelected) {
                  btnClass = 'surface-active scale-105';
                }

                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDay(d)}
                    className={`aspect-square relative flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer shadow-2xs ${btnClass}`}
                    title={`Day ${d}: ${count} reported community planting activities`}
                  >
                    <span>{d}</span>
                    {hasActivity && !isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6F9F73] absolute bottom-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend & Context */}
            <div className="mt-6 pt-4 border-t border-[#DDE9D8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A8E80] gap-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#1F4D38]" />
                  <span>Selected Date</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#6F9F73]" />
                  <span>Reported Activity</span>
                </div>
              </div>

              <span>* Privacy protected: No participant identifiers are ever attached to calendar cells.</span>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
