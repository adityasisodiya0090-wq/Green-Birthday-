import { useState } from 'react';
import { Container } from '../components/common/Container';
import { ImpactCounter } from '../components/common/ImpactCounter';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { useImpact } from '../context/ImpactContext';
import { ImpactHero } from '../components/impact/ImpactHero';
import { GrowthVisualization } from '../components/impact/GrowthVisualization';
import { ImpactCalendar } from '../components/impact/ImpactCalendar';
import { RecentActivitySection } from '../components/impact/RecentActivitySection';
import { CountingDistinctionSection } from '../components/impact/CountingDistinctionSection';
import { ImpactCta } from '../components/impact/ImpactCta';
import { ReportPlantingModal } from '../components/impact/ReportPlantingModal';
import { Sprout, Users, CalendarCheck, MapPin, Clock, AlertCircle, RotateCcw } from '../components/common/Icons';

export function ImpactPage() {
  const {
    summary,
    recentActivities,
    calendarCounts,
    timeline,
    pendingHoldingCount,
    isLoading,
    error,
    refreshImpact,
  } = useImpact();

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {/* 01 — Hero */}
      <ImpactHero onOpenReportModal={() => setIsReportModalOpen(true)} />

      {/* 02 — Live Impact Counters (Four Primary Metrics) */}
      <section className="py-14 sm:py-20 surface-canvas border-b border-[#DDE9D8]/80">
        <Container>
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              {/* Error banner with retry if data fails */}
              {error && (
                <div className="mb-8 p-4 rounded-2xl bg-[#F7F3E8] border border-[#DDE9D8] flex items-center justify-between text-xs text-[#4D6153]">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#6F9F73]" />
                    <span>{error}</span>
                  </div>
                  <button
                    onClick={() => refreshImpact()}
                    className="text-[#1F4D38] font-bold underline flex items-center gap-1 hover:text-[#6F9F73] cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Retry</span>
                  </button>
                </div>
              )}

              {/* Notice for pending reports in 24-hr holding period */}
              {pendingHoldingCount > 0 && (
                <div className="mb-8 p-4 rounded-2xl bg-[#EEF5EC] border border-[#8EB892] flex items-center gap-3 text-xs sm:text-sm text-[#1F4D38]">
                  <Clock className="w-4 h-4 text-[#6F9F73] shrink-0" />
                  <span>
                    You have <strong>{pendingHoldingCount} planting report</strong> currently in the 24-hour verification holding period. It will automatically contribute to public metrics once the hold elapses.
                  </span>
                </div>
              )}

              <div className="surface-elevated rounded-3xl p-6 sm:p-10 shadow-xs border border-[#DDE9D8]">
                <div className="flex items-center justify-between pb-6 border-b border-[#DDE9D8] flex-wrap gap-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#1F4D38]">
                      Current Community Totals
                    </h3>
                    <p className="text-xs text-[#7A8E80] mt-0.5">
                      Established community baseline combined with new verified reports past the 24-hour holding period
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#1F4D38] bg-[#DDE9D8]/60 px-3 py-1.5 rounded-full">
                    Official Community Baseline
                  </span>
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8 animate-pulse">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-36 rounded-2xl bg-[#DDE9D8]/30" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8">
                    <ImpactCounter
                      label="Trees & Saplings Planted"
                      value={summary.treesPlanted}
                      icon={<Sprout className="w-5 h-5 text-[#1F4D38]" />}
                      subtext="Historical baseline + new reports"
                    />
                    <ImpactCounter
                      label="Community Members"
                      value={summary.participants}
                      icon={<Users className="w-5 h-5 text-[#1F4D38]" />}
                      subtext="Current community baseline"
                    />
                    <ImpactCounter
                      label="Communities Reached"
                      value={summary.communities}
                      icon={<MapPin className="w-5 h-5 text-[#1F4D38]" />}
                      subtext="0 communities reached — the next chapter starts here"
                    />
                    <ImpactCounter
                      label="Green Day Activities"
                      value={summary.activities}
                      icon={<CalendarCheck className="w-5 h-5 text-[#1F4D38]" />}
                      subtext="Digital reports logged"
                    />
                  </div>
                )}

                <div className="pt-4 border-t border-[#DDE9D8] text-center text-xs text-[#7A8E80]">
                  «Impact figures are based on community reports and include a historical planting baseline recorded before the Birthday Green website was introduced. New submissions enter a 24-hour holding period before contributing to public totals.»
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 03 — Growth Visualization */}
      <GrowthVisualization
        timeline={timeline}
        isZeroBaseline={summary.isZeroBaseline}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* 04 — Green Day Calendar */}
      <ImpactCalendar calendarCounts={calendarCounts} />

      {/* 05 — Recent Green Day Activity */}
      <RecentActivitySection activities={recentActivities} />

      {/* 06 & 07 — What These Numbers Mean & Transparency */}
      <CountingDistinctionSection />

      {/* 08 — CTA */}
      <ImpactCta onOpenReportModal={() => setIsReportModalOpen(true)} />

      {/* Planting Report Modal */}
      <ReportPlantingModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
