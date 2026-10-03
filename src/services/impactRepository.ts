import {
  PlantingActivity,
  PlantingActivitySubmission,
  ImpactSummary,
  RecentActivityItem,
  GrowthTimelinePoint,
  CommunityType,
  PlantCategory,
  BroadLocationCategory,
} from '../types';
import { COMMUNITY_BASELINE_IMPACT } from '../config/impactBaseline';

export { COMMUNITY_BASELINE_IMPACT };

const STORAGE_KEY = 'birthdaygreen_community_activities_v1';
const PARTICIPANT_KEY_STORAGE = 'birthdaygreen_participant_token_v1';
const HOLDING_PERIOD_MS = 24 * 60 * 60 * 1000; // 24-hour holding period

export function getCommunityTypeLabel(type: CommunityType): string {
  switch (type) {
    case 'school_college':
      return 'School / College';
    case 'housing_society':
      return 'Housing Society';
    case 'ngo_environmental':
      return 'NGO / Environmental Group';
    case 'community_group':
      return 'Community Organization';
    case 'individual_neighborhood':
    default:
      return 'Neighborhood / Individual';
  }
}

export function getPlantCategoryLabel(category: PlantCategory, customName?: string): string {
  switch (category) {
    case 'tree_sapling':
      return 'Tree Sapling';
    case 'native_plant':
      return 'Native Plant';
    case 'other_plant':
      return customName?.trim() || 'Living Plant';
    default:
      return 'Living Plant';
  }
}

export function getBroadLocationLabel(loc: BroadLocationCategory): string {
  switch (loc) {
    case 'home_community_garden':
      return 'Home / Community Garden';
    case 'school_college':
      return 'School / College Campus';
    case 'housing_society':
      return 'Housing Society / Residential Campus';
    case 'public_community_space':
      return 'Public / Community Space';
    case 'ngo_environmental':
      return 'NGO / Environmental Project';
    case 'other_community_space':
    default:
      return 'Community Space';
  }
}

/**
 * Privacy-First Participant Identification:
 * Generates an anonymous, random token on the client.
 * Never derived from name, phone, email, or DOB.
 * Never exposed publicly.
 */
export function getOrCreateAnonymousParticipantKey(): string {
  if (typeof window === 'undefined') {
    return 'anon_server';
  }
  let key = localStorage.getItem(PARTICIPANT_KEY_STORAGE);
  if (!key) {
    const randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);
    key = 'p_' + Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
    try {
      localStorage.setItem(PARTICIPANT_KEY_STORAGE, key);
    } catch {
      // Storage quota or private browsing mode fallback
    }
  }
  return key;
}

function readAllStoredActivities(): PlantingActivity[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to read community activities from storage:', err);
    return [];
  }
}

function writeAllStoredActivities(activities: PlantingActivity[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  } catch (err) {
    console.error('Failed to write community activities to storage:', err);
  }
}

export const impactRepository = {
  /**
   * Submits a new community planting report.
   * Includes duplicate protection (idempotency key / double-submit guard).
   * Enforces 24-hour holding period before contributing to public impact counters.
   */
  async submitPlantingActivity(
    submission: PlantingActivitySubmission
  ): Promise<{ success: boolean; activityId: string; eligibleAt: number; message: string }> {
    const participantKey = getOrCreateAnonymousParticipantKey();
    const now = Date.now();
    const currentActivities = readAllStoredActivities();

    // Idempotent duplicate protection
    if (submission.clientSubmissionToken) {
      const existing = currentActivities.find(
        (a) => a.clientSubmissionToken === submission.clientSubmissionToken
      );
      if (existing) {
        return {
          success: true,
          activityId: existing.activityId,
          eligibleAt: existing.eligibleAt,
          message: 'Activity already recorded.',
        };
      }
    }

    // Secondary rapid-submit check: same participant, same date, same sapling count within 30 seconds
    const recentDuplicate = currentActivities.find(
      (a) =>
        a.participantKey === participantKey &&
        a.plantingDate === submission.plantingDate &&
        a.saplingCount === submission.saplingCount &&
        now - a.submittedAt < 30000
    );
    if (recentDuplicate) {
      return {
        success: true,
        activityId: recentDuplicate.activityId,
        eligibleAt: recentDuplicate.eligibleAt,
        message: 'Activity already recorded.',
      };
    }

    const eligibleAt = now + HOLDING_PERIOD_MS;
    const activityId = 'act_' + now + '_' + Math.random().toString(36).substring(2, 9);

    const cleanRegion = submission.locationRegion.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
    const communityKey = `${submission.communityType}_${cleanRegion || 'general'}`;

    const plantLabel = getPlantCategoryLabel(submission.plantCategory, submission.customPlantName);
    const actionType = submission.actionType?.trim() || `${plantLabel} planted`;

    const newActivity: PlantingActivity = {
      activityId,
      participantKey,
      plantingDate: submission.plantingDate,
      dayOfMonth: submission.dayOfMonth,
      submittedAt: now,
      eligibleAt,
      plantCategory: submission.plantCategory || 'tree_sapling',
      customPlantName: submission.customPlantName?.trim(),
      saplingCount: Math.max(1, Math.min(500, Math.floor(submission.saplingCount || 1))),
      broadLocation: submission.broadLocation || 'home_community_garden',
      communityType: submission.communityType || 'individual_neighborhood',
      communityKey,
      locationRegion: submission.locationRegion.trim() || 'General Community',
      actionType,
      status: 'pending_eligibility',
      optionalNote: submission.optionalNote?.slice(0, 200).trim(),
      clientSubmissionToken: submission.clientSubmissionToken,
    };

    currentActivities.push(newActivity);
    writeAllStoredActivities(currentActivities);

    return {
      success: true,
      activityId,
      eligibleAt,
      message: 'Planting activity recorded. In accordance with integrity rules, it enters a 24-hour holding period before public impact counters update.',
    };
  },

  /**
   * Computes the aggregated live impact summary.
   * Single Source of Truth: Combines the official community baseline
   * (973 participants, 23,659 trees, 0 communities) with eligible new submissions
   * past the 24-hour holding period.
   * Does not invent historical activities.
   */
  async getImpactSummary(): Promise<ImpactSummary> {
    const now = Date.now();
    const all = readAllStoredActivities();

    const eligible = all.filter((a) => now >= a.eligibleAt && a.status !== 'archived');

    const totalNewTrees = eligible.reduce((acc, a) => acc + (a.saplingCount || 1), 0);
    const uniqueNewParticipants = new Set(eligible.map((a) => a.participantKey)).size;
    const totalNewActivities = eligible.length;
    const uniqueNewCommunities = new Set(eligible.map((a) => a.communityKey)).size;

    return {
      treesPlanted: COMMUNITY_BASELINE_IMPACT.treesPlanted + totalNewTrees,
      participants: COMMUNITY_BASELINE_IMPACT.participants + uniqueNewParticipants,
      activities: totalNewActivities,
      communities: COMMUNITY_BASELINE_IMPACT.communitiesReached + uniqueNewCommunities,
      baselineParticipants: COMMUNITY_BASELINE_IMPACT.participants,
      baselineTreesPlanted: COMMUNITY_BASELINE_IMPACT.treesPlanted,
      baselineCommunities: COMMUNITY_BASELINE_IMPACT.communitiesReached,
      newParticipants: uniqueNewParticipants,
      newTreesPlanted: totalNewTrees,
      newActivities: totalNewActivities,
      newCommunities: uniqueNewCommunities,
      lastCalculatedAt: now,
      isZeroBaseline: false,
    };
  },

  /**
   * Retrieves recent anonymized community activity feed.
   */
  async getRecentActivities(limit = 10): Promise<RecentActivityItem[]> {
    const now = Date.now();
    const all = readAllStoredActivities();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const eligible = all.filter((a) => now >= a.eligibleAt && a.status !== 'archived');
    eligible.sort((a, b) => b.submittedAt - a.submittedAt);

    return eligible.slice(0, limit).map((a) => {
      const d = new Date(a.plantingDate || a.submittedAt);
      const formattedDate = `${d.getDate()} ${monthNames[d.getMonth()]} · ${a.locationRegion}`;
      return {
        id: a.activityId,
        title: 'Green Day planting reported',
        formattedDate,
        actionType: a.actionType,
        dayOfMonth: a.dayOfMonth,
        locationRegion: a.locationRegion,
        saplingCount: a.saplingCount,
        communityTypeLabel: getCommunityTypeLabel(a.communityType),
        eligibleAt: a.eligibleAt,
      };
    });
  },

  /**
   * Returns a map of dayOfMonth (1-31) -> count of eligible community activities.
   */
  async getCalendarActivityDays(): Promise<Record<number, number>> {
    const now = Date.now();
    const all = readAllStoredActivities();
    const eligible = all.filter((a) => now >= a.eligibleAt && a.status !== 'archived');

    const counts: Record<number, number> = {};
    for (let d = 1; d <= 31; d++) {
      counts[d] = 0;
    }

    for (const a of eligible) {
      if (a.dayOfMonth >= 1 && a.dayOfMonth <= 31) {
        counts[a.dayOfMonth] = (counts[a.dayOfMonth] || 0) + 1;
      }
    }

    return counts;
  },

  /**
   * Returns cumulative growth timeline for organic visualization.
   */
  async getGrowthTimeline(): Promise<GrowthTimelinePoint[]> {
    const now = Date.now();
    const all = readAllStoredActivities();
    const eligible = all.filter((a) => now >= a.eligibleAt && a.status !== 'archived');

    if (eligible.length === 0) {
      return [];
    }

    eligible.sort((a, b) => a.submittedAt - b.submittedAt);

    let cumulativeTrees = 0;
    let cumulativeActs = 0;
    const timeline: GrowthTimelinePoint[] = [];

    for (const item of eligible) {
      cumulativeTrees += item.saplingCount || 1;
      cumulativeActs += 1;
      const d = new Date(item.plantingDate || item.submittedAt);
      const dateLabel = `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;

      timeline.push({
        date: dateLabel,
        treesPlanted: cumulativeTrees,
        activities: cumulativeActs,
      });
    }

    return timeline;
  },

  /**
   * Returns count of activities submitted by this device still in 24-hr holding period.
   */
  async getPendingHoldingCount(): Promise<number> {
    const now = Date.now();
    const participantKey = getOrCreateAnonymousParticipantKey();
    const all = readAllStoredActivities();
    const pending = all.filter(
      (a) => a.participantKey === participantKey && now < a.eligibleAt
    );
    return pending.length;
  },

  /**
   * Section 17 Participation History ("My Green Days"):
   * Returns activities associated strictly with this device's anonymous participantKey.
   * Completely private to this device; never shared with or accessible by other devices.
   */
  async getMyParticipationHistory(): Promise<PlantingActivity[]> {
    const participantKey = getOrCreateAnonymousParticipantKey();
    const all = readAllStoredActivities();
    const mine = all.filter((a) => a.participantKey === participantKey);
    // Sort descending by submission timestamp
    mine.sort((a, b) => b.submittedAt - a.submittedAt);
    return mine;
  },

  /**
   * Section 11 & 12 Green Day Calendar Data:
   * Aggregates real eligible activities for each date in a specific month & year.
   */
  async getCalendarMonthActivity(
    year: number,
    monthIndex0: number
  ): Promise<Record<number, { activitiesCount: number; participantsCount: number; saplingsCount: number; activities: RecentActivityItem[] }>> {
    const now = Date.now();
    const all = readAllStoredActivities();
    const eligible = all.filter((a) => now >= a.eligibleAt && a.status !== 'archived');

    const result: Record<number, { activitiesCount: number; participantsCount: number; saplingsCount: number; activities: RecentActivityItem[] }> = {};
    for (let d = 1; d <= 31; d++) {
      result[d] = { activitiesCount: 0, participantsCount: 0, saplingsCount: 0, activities: [] };
    }

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    for (const a of eligible) {
      const d = new Date(a.plantingDate || a.submittedAt);
      if (d.getFullYear() === year && d.getMonth() === monthIndex0) {
        const day = d.getDate();
        if (day >= 1 && day <= 31) {
          result[day].activitiesCount += 1;
          result[day].saplingsCount += a.saplingCount || 1;
          // Add sanitized public activity item
          result[day].activities.push({
            id: a.activityId,
            title: 'Green Day planting reported',
            formattedDate: `${day} ${monthNames[monthIndex0]} · ${a.locationRegion}`,
            actionType: a.actionType,
            dayOfMonth: a.dayOfMonth,
            locationRegion: a.locationRegion,
            saplingCount: a.saplingCount,
            communityTypeLabel: getCommunityTypeLabel(a.communityType),
            eligibleAt: a.eligibleAt,
          });
        }
      }
    }

    // Compute unique participants for each day safely
    for (let d = 1; d <= 31; d++) {
      const dayActs = eligible.filter((a) => {
        const dt = new Date(a.plantingDate || a.submittedAt);
        return dt.getFullYear() === year && dt.getMonth() === monthIndex0 && dt.getDate() === d;
      });
      result[d].participantsCount = new Set(dayActs.map((a) => a.participantKey)).size;
    }

    return result;
  },

  /**
   * Section 20 & 25 Filtered Recent Activities with Pagination:
   */
  async getFilteredRecentActivities(filters: {
    timeFilter?: 'all' | 'this_month' | 'previous_month';
    communityTypeFilter?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ activities: RecentActivityItem[]; totalCount: number; hasMore: boolean }> {
    const now = Date.now();
    const all = readAllStoredActivities();
    let eligible = all.filter((a) => now >= a.eligibleAt && a.status !== 'archived');

    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const currMonth = currDate.getMonth();

    if (filters.timeFilter === 'this_month') {
      eligible = eligible.filter((a) => {
        const d = new Date(a.plantingDate || a.submittedAt);
        return d.getFullYear() === currYear && d.getMonth() === currMonth;
      });
    } else if (filters.timeFilter === 'previous_month') {
      const prevMonth = currMonth === 0 ? 11 : currMonth - 1;
      const prevYear = currMonth === 0 ? currYear - 1 : currYear;
      eligible = eligible.filter((a) => {
        const d = new Date(a.plantingDate || a.submittedAt);
        return d.getFullYear() === prevYear && d.getMonth() === prevMonth;
      });
    }

    if (filters.communityTypeFilter && filters.communityTypeFilter !== 'all') {
      eligible = eligible.filter((a) => a.communityType === filters.communityTypeFilter);
    }

    eligible.sort((a, b) => b.submittedAt - a.submittedAt);

    const offset = filters.offset || 0;
    const limit = filters.limit || 8;
    const paged = eligible.slice(offset, offset + limit);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const sanitized = paged.map((a) => {
      const d = new Date(a.plantingDate || a.submittedAt);
      const formattedDate = `${d.getDate()} ${monthNames[d.getMonth()]} · ${a.locationRegion}`;
      return {
        id: a.activityId,
        title: 'Green Day planting reported',
        formattedDate,
        actionType: a.actionType,
        dayOfMonth: a.dayOfMonth,
        locationRegion: a.locationRegion,
        saplingCount: a.saplingCount,
        communityTypeLabel: getCommunityTypeLabel(a.communityType),
        eligibleAt: a.eligibleAt,
      };
    });

    return {
      activities: sanitized,
      totalCount: eligible.length,
      hasMore: offset + limit < eligible.length,
    };
  },

  /**
   * Section 18 Community Types Breakdown:
   */
  async getCommunityTypeBreakdown(): Promise<{ type: CommunityType; label: string; count: number; saplings: number }[]> {
    const now = Date.now();
    const all = readAllStoredActivities();
    const eligible = all.filter((a) => now >= a.eligibleAt && a.status !== 'archived');

    const types: CommunityType[] = [
      'individual_neighborhood',
      'housing_society',
      'school_college',
      'ngo_environmental',
      'community_group',
    ];

    return types.map((t) => {
      const matching = eligible.filter((a) => a.communityType === t);
      const saplings = matching.reduce((sum, a) => sum + (a.saplingCount || 1), 0);
      return {
        type: t,
        label: getCommunityTypeLabel(t),
        count: matching.length,
        saplings,
      };
    });
  },
};
