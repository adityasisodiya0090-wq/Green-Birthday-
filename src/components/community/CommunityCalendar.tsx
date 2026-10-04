import { useState, useEffect } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Button } from '../common/Button';
import { useRouter } from '../../context/RouterContext';
import { impactRepository } from '../../services/impactRepository';
import { RecentActivityItem } from '../../types';
import { getDaysInMonth, getOrdinalSuffix } from '../../utils/greenDay';
import { ChevronLeft, ChevronRight, Calendar, Sprout, CheckCircle2, ShieldCheck, ArrowRight } from '../common/Icons';

interface DayMonthData {
  activitiesCount: number;
  participantsCount: number;
  saplingsCount: number;
  activities: RecentActivityItem[];
}

export function CommunityCalendar() {
  const { openCalculator, navigate } = useRouter();

  // Calendar Month Navigation State
  const today = new Date();
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Month data
  const [monthData, setMonthData] = useState<Record<number, DayMonthData>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    impactRepository.getCalendarMonthActivity(currentYear, currentMonthIndex).then((res) => {
      if (isMounted) {
        setMonthData(res);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [currentYear, currentMonthIndex]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex);
  const firstDayOfWeek = new Date(currentYear, currentMonthIndex, 1).getDay(); // 0 = Sunday

  const handlePrevMonth = () => {
    setSelectedDay(null);
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonthIndex((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    setSelectedDay(null);
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonthIndex((m) => m + 1);
    }
  };

  // Count total activities in this month view
  const totalMonthActivities = Object.values(monthData).reduce(
    (acc, d) => acc + (d?.activitiesCount || 0),
    0
  );

  const activeDayDetails = selectedDay ? monthData[selectedDay] : null;

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-base relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="Interactive Calendar"
              title="See the community show up."
              description="«Every marked date represents Green Day activity reported by the community.»"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <div className="max-w-4xl mx-auto surface-glass rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 border border-white/90 shadow-md">
            {/* Calendar Controls & Month Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 mb-4 sm:mb-6 border-b border-[#DDE9D8] gap-3">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#6F9F73] block mb-0.5 sm:mb-1">
                  Collective Action Calendar
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#1F4D38]">
                  {monthNames[currentMonthIndex]} {currentYear}
                </h3>
              </div>

              {/* Month Navigation Buttons */}
              <div className="flex items-center justify-between sm:justify-start gap-1.5 bg-[#F7F3E8] p-1 rounded-xl border border-[#DDE9D8] self-stretch sm:self-auto">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg text-[#1F4D38] hover:bg-[#DDE9D8] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4D38]"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-[#1F4D38] px-2 min-w-[100px] text-center">
                  {monthNames[currentMonthIndex]}
                </span>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg text-[#1F4D38] hover:bg-[#DDE9D8] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4D38]"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Day of Week Headers */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-[10px] sm:text-xs font-bold text-[#7A8E80] uppercase mb-1.5">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`pad-${i}`} className="aspect-square" />
              ))}

              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                const dayInfo = monthData[d];
                const count = dayInfo?.activitiesCount || 0;
                const hasActivity = count > 0;
                const isSelected = selectedDay === d;

                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDay(isSelected ? null : d)}
                    className={`aspect-square relative flex flex-col items-center justify-center p-1 sm:p-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4D38] ${
                      isSelected
                        ? 'surface-active scale-102 shadow-sm z-10'
                        : hasActivity
                        ? 'bg-[#EEF5EC] text-[#1F4D38] border border-[#6F9F73] hover:scale-102 shadow-2xs'
                        : 'bg-[#FFFDF7] text-[#1C2821] border border-[#DDE9D8]/70 hover:bg-[#DDE9D8]/50'
                    }`}
                    aria-label={`Day ${d}: ${count} reported activities`}
                  >
                    <span>{d}</span>
                    {hasActivity && (
                      <span
                        className={`text-[8px] sm:text-[10px] leading-none flex items-center gap-0.5 font-bold ${
                          isSelected ? 'text-[#DDE9D8]' : 'text-[#6F9F73]'
                        }`}
                      >
                        <span className="hidden sm:inline">🌱</span> {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="mt-6 pt-4 border-t border-[#DDE9D8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A8E80] gap-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-[#EEF5EC] border border-[#6F9F73]" />
                  <span>Reported Green Day</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md surface-active" />
                  <span>Selected Date</span>
                </div>
              </div>
              <span>Click any date to inspect community activity details</span>
            </div>

            {/* EMPTY STATE IF NO ACTIVITIES IN MONTH */}
            {totalMonthActivities === 0 && !isLoading && (
              <div className="mt-8 p-6 rounded-2xl bg-[#F7F3E8] border border-[#DDE9D8] text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#DDE9D8]/70 flex items-center justify-center mx-auto text-[#1F4D38]">
                  <Sprout className="w-6 h-6 text-[#1F4D38]" />
                </div>
                <h4 className="font-display font-bold text-base text-[#1F4D38]">
                  The calendar is waiting for its first Green Day in {monthNames[currentMonthIndex]}.
                </h4>
                <p className="text-xs text-[#4D6153] max-w-md mx-auto">
                  Every movement starts with a single seed. Plant something living on your Green Day to initiate this month's record.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => openCalculator()}
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Find My Green Day
                  </Button>
                </div>
              </div>
            )}

            {/* SECTION 12: SELECTED DATE ACTIVITY DETAIL PANEL */}
            {selectedDay && activeDayDetails && (
              <div className="mt-8 p-6 rounded-2xl surface-elevated border border-[#6F9F73] shadow-md animate-hero-center">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DDE9D8]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#1F4D38]" />
                    <h4 className="font-display font-extrabold text-lg text-[#1F4D38]">
                      {selectedDay} {monthNames[currentMonthIndex]} {currentYear}
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-[#6F9F73] bg-[#DDE9D8]/60 px-3 py-1 rounded-full">
                    {activeDayDetails.activitiesCount} {activeDayDetails.activitiesCount === 1 ? 'activity' : 'activities'} · {activeDayDetails.saplingsCount} saplings
                  </span>
                </div>

                {activeDayDetails.activities.length === 0 ? (
                  <div className="text-center py-4 space-y-2">
                    <p className="text-xs text-[#4D6153]">
                      No verified planting activities reported for the {getOrdinalSuffix(selectedDay)} in {monthNames[currentMonthIndex]} yet.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate('/participate')}
                      className="text-xs font-bold text-[#1F4D38] underline hover:text-[#6F9F73] cursor-pointer"
                    >
                      Report a planting for this date →
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-[#DDE9D8]/60 max-h-60 overflow-y-auto">
                    {activeDayDetails.activities.map((act) => (
                      <div key={act.id} className="py-3 first:pt-1 last:pb-1 flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-[#1F4D38] flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#6F9F73]" />
                            {act.title}
                          </span>
                          <span className="text-[#4D6153] pl-5 block">
                            {act.actionType} · {act.communityTypeLabel}
                          </span>
                        </div>
                        <span className="font-medium text-[#7A8E80] shrink-0">
                          {act.locationRegion}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
