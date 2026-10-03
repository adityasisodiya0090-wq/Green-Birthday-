import { CommunityHero } from '../components/community/CommunityHero';
import { CommunitySummaryBar } from '../components/community/CommunitySummaryBar';
import { CommunityCalendar } from '../components/community/CommunityCalendar';
import { CommunityActivityFeed } from '../components/community/CommunityActivityFeed';
import { CommunityRhythmVisual } from '../components/community/CommunityRhythmVisual';
import { CommunityTypesSection } from '../components/community/CommunityTypesSection';
import { CommunityTransparency } from '../components/community/CommunityTransparency';
import { CommunityFinalCta } from '../components/community/CommunityFinalCta';

export function CommunityPage() {
  return (
    <div className="flex flex-col">
      {/* 01 — Hero */}
      <CommunityHero />

      {/* 02 — Community Summary Bar (Shared Live Counters) */}
      <CommunitySummaryBar />

      {/* 03 & 04 — Green Day Calendar with Selected Date Activity Details */}
      <CommunityCalendar />

      {/* 05 — Recent Green Day Activity Feed with Filters and Pagination */}
      <CommunityActivityFeed />

      {/* 06 — Community Rhythm Visualization (31-Day Pulse & Insight) */}
      <CommunityRhythmVisual />

      {/* 07 — Community Types Breakdown */}
      <CommunityTypesSection />

      {/* 08 — Transparency & 24-Hour Hold Disclosure */}
      <CommunityTransparency />

      {/* 09 & 10 — Personal Connection & Final CTA */}
      <CommunityFinalCta />
    </div>
  );
}
