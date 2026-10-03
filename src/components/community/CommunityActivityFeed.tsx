import { useState, useEffect } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Button } from '../common/Button';
import { impactRepository } from '../../services/impactRepository';
import { RecentActivityItem, CommunityType } from '../../types';
import { Sprout, Calendar, MapPin, CheckCircle2, Filter, ShieldCheck, ChevronDown } from '../common/Icons';

export function CommunityActivityFeed() {
  const [timeFilter, setTimeFilter] = useState<'all' | 'this_month' | 'previous_month'>('all');
  const [communityTypeFilter, setCommunityTypeFilter] = useState<string>('all');
  
  const [activities, setActivities] = useState<RecentActivityItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const PAGE_SIZE = 8;

  const loadActivities = async (isNewFilter = false) => {
    const currentOffset = isNewFilter ? 0 : offset;
    if (isNewFilter) {
      setIsLoading(true);
      setOffset(0);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const res = await impactRepository.getFilteredRecentActivities({
        timeFilter,
        communityTypeFilter,
        limit: PAGE_SIZE,
        offset: currentOffset,
      });

      if (isNewFilter) {
        setActivities(res.activities);
      } else {
        setActivities((prev) => [...prev, ...res.activities]);
      }
      setTotalCount(res.totalCount);
      setHasMore(res.hasMore);
      setOffset(currentOffset + PAGE_SIZE);
    } catch (err) {
      console.error('Failed to load community activities:', err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    loadActivities(true);
  }, [timeFilter, communityTypeFilter]);

  return (
    <section className="py-18 sm:py-26 surface-canvas relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <SectionHeading
              eyebrow="Activity Record"
              title="Recent Green Day Activity"
              description="Real, verified planting reports submitted by stewards across neighborhoods. No social algorithms, no rankings."
            />
          </div>
        </ScrollReveal>

        {/* Minimal Filters Bar */}
        <ScrollReveal delayMs={100}>
          <div className="max-w-4xl mx-auto surface-elevated rounded-2xl p-4 sm:p-5 border border-[#DDE9D8] mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F4D38]">
              <Filter className="w-4 h-4 text-[#6F9F73]" />
              <span>Filter Activity:</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Time filter */}
              <div className="flex items-center bg-[#FFFDF7] rounded-xl border border-[#DDE9D8] p-1 text-xs">
                {(['all', 'this_month', 'previous_month'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeFilter(t)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      timeFilter === t
                        ? 'surface-active shadow-2xs'
                        : 'text-[#4D6153] hover:text-[#1F4D38]'
                    }`}
                  >
                    {t === 'all' ? 'All Time' : t === 'this_month' ? 'This Month' : 'Last Month'}
                  </button>
                ))}
              </div>

              {/* Community type filter */}
              <select
                value={communityTypeFilter}
                onChange={(e) => setCommunityTypeFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl tactile-control-inset text-xs font-semibold text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38] cursor-pointer"
              >
                <option value="all">All Community Settings</option>
                <option value="individual_neighborhood">Neighborhood / Individual</option>
                <option value="housing_society">Housing Society</option>
                <option value="school_college">School / College</option>
                <option value="ngo_environmental">NGO / Environmental</option>
                <option value="community_group">Community Group</option>
              </select>
            </div>
          </div>
        </ScrollReveal>

        {/* Activity Feed Grid */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 rounded-2xl surface-elevated opacity-60" />
              ))}
            </div>
          ) : activities.length === 0 ? (
            <div className="surface-elevated rounded-3xl p-10 sm:p-12 text-center space-y-3 border border-[#DDE9D8]">
              <div className="w-12 h-12 rounded-xl bg-[#DDE9D8]/60 flex items-center justify-center mx-auto text-[#1F4D38]">
                <Sprout className="w-6 h-6 text-[#1F4D38]" />
              </div>
              <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                Digital activity log is beginning
              </h4>
              <p className="text-xs sm:text-sm text-[#4D6153] max-w-md mx-auto leading-relaxed">
                The wider Birthday Green community has an established baseline of 973 Community Members and 23,659 trees. New planting reports submitted through this website will appear here following their 24-hour verification holding period.
              </p>
            </div>
          ) : (
            activities.map((act) => (
              <div
                key={act.id}
                className="surface-elevated rounded-2xl p-5 border border-[#DDE9D8] shadow-2xs hover:border-[#6F9F73] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="p-1 rounded-md bg-[#DDE9D8]/70 text-[#1F4D38]">
                      <Sprout className="w-4 h-4" />
                    </span>
                    <span className="font-display font-bold text-sm sm:text-base text-[#1F4D38]">
                      {act.title}
                    </span>
                    <span className="text-[11px] font-semibold text-[#1F4D38] bg-[#DDE9D8]/60 px-2 py-0.5 rounded-full">
                      {act.saplingCount} {act.saplingCount === 1 ? 'sapling' : 'saplings'}
                    </span>
                  </div>

                  <p className="text-xs text-[#4D6153] pl-7">
                    {act.actionType} · <span className="font-medium text-[#1F4D38]">{act.communityTypeLabel}</span>
                  </p>
                </div>

                <div className="text-right shrink-0 pl-7 sm:pl-0 flex items-center sm:flex-col sm:items-end gap-3 sm:gap-1 text-xs text-[#7A8E80]">
                  <span className="flex items-center gap-1 font-semibold text-[#1F4D38]">
                    <Calendar className="w-3.5 h-3.5 text-[#6F9F73]" />
                    {act.formattedDate}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3 h-3" />
                    {act.locationRegion}
                  </span>
                </div>
              </div>
            ))
          )}

          {/* View More Button */}
          {hasMore && !isLoading && (
            <div className="pt-6 text-center">
              <Button
                variant="outline"
                size="md"
                onClick={() => loadActivities(false)}
                isLoading={isLoadingMore}
                icon={<ChevronDown className="w-4 h-4" />}
              >
                View more activity
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
