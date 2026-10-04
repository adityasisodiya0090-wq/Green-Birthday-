import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { RecentActivityItem } from '../../types';
import { CheckCircle2, Calendar, MapPin, ShieldCheck, Sprout } from '../common/Icons';

interface RecentActivitySectionProps {
  activities: RecentActivityItem[];
}

export function RecentActivitySection({ activities }: RecentActivitySectionProps) {
  const hasActivities = activities.length > 0;

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-canvas relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="Community Ledger"
              title="Recent Green Day Activity"
              description="Anonymized reports of living trees and plants tended across different neighborhoods. Verified through our 24-hour holding period."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <div className="max-w-4xl mx-auto surface-elevated rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 border border-[#DDE9D8] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#DDE9D8] mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F4D38]">
                Public Ledger Feed
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#1F4D38] font-medium bg-[#DDE9D8]/60 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6F9F73]" />
                <span>Zero Personally Identifiable Info</span>
              </div>
            </div>

            {!hasActivities ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#DDE9D8]/50 flex items-center justify-center mx-auto text-[#1F4D38]">
                  <Sprout className="w-6 h-6 text-[#1F4D38]" />
                </div>
                <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                  No public reports active yet
                </h4>
                <p className="text-xs text-[#4D6153] max-w-sm mx-auto">
                  Newly submitted community reports appear here after their 24-hour verification holding period passes.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#DDE9D8]/60">
                {activities.map((act) => (
                  <div
                    key={act.id}
                    className="py-4 first:pt-2 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#6F9F73] shrink-0" />
                        <span className="text-sm font-semibold text-[#1F4D38]">
                          {act.title}
                        </span>
                        <span className="text-[11px] font-medium text-[#6F9F73] bg-[#DDE9D8]/40 px-2 py-0.5 rounded-md">
                          {act.saplingCount} {act.saplingCount === 1 ? 'sapling' : 'saplings'}
                        </span>
                      </div>
                      <p className="text-xs text-[#4D6153] pl-6">
                        {act.actionType} · {act.communityTypeLabel}
                      </p>
                    </div>

                    <div className="text-right shrink-0 pl-6 sm:pl-0 flex items-center sm:flex-col sm:items-end gap-3 sm:gap-1 text-xs text-[#7A8E80]">
                      <span className="flex items-center gap-1 font-medium text-[#1F4D38]">
                        <Calendar className="w-3.5 h-3.5 text-[#6F9F73]" />
                        {act.formattedDate}
                      </span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3 h-3" />
                        {act.locationRegion}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-[#DDE9D8] text-xs text-[#7A8E80] leading-relaxed">
              * Privacy protection: All updates are anonymized. No personal profiles, phone numbers, or exact addresses are ever collected or displayed.
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
