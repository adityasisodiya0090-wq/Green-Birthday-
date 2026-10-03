export type RoutePath = 
  | '/'
  | '/how-it-works'
  | '/participate'
  | '/impact'
  | '/community'
  | '/partners'
  | '/community-kit'
  | '/about'
  | '/privacy'
  | '/contact'
  | '/guidelines'
  | '/404';

export interface GreenDayInfo {
  dayNumber: number;
  nextDate: Date;
  daysRemaining: number;
  formattedNextDate: string;
  isAdjustedForMonthEnd: boolean;
  adjustmentNote?: string;
  cycleFrequency: string;
}

export interface MetricItem {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  unit?: string;
  isPlaceholder?: boolean;
}

export type CommunityType = 
  | 'school_college'
  | 'housing_society'
  | 'ngo_environmental'
  | 'community_group'
  | 'individual_neighborhood';

export type PlantCategory = 
  | 'tree_sapling'
  | 'native_plant'
  | 'other_plant';

export type BroadLocationCategory = 
  | 'home_community_garden'
  | 'school_college'
  | 'housing_society'
  | 'public_community_space'
  | 'ngo_environmental'
  | 'other_community_space';

export type ActivityStatus = 
  | 'pending_eligibility' // in 24-hour holding period
  | 'accepted'            // eligible and contributing to public impact
  | 'archived';

/**
 * Clean data model for planting activity records.
 * Privacy rule: Full DOB, phone numbers, exact addresses, names are NEVER stored.
 */
export interface PlantingActivity {
  activityId: string;
  participantKey: string; // Anonymous client-side UUID, never exposed publicly
  plantingDate: string;   // ISO format YYYY-MM-DD
  dayOfMonth: number;     // 1-31
  submittedAt: number;    // Timestamp in ms
  eligibleAt: number;     // Timestamp in ms (submittedAt + 24 hours)
  plantCategory: PlantCategory;
  customPlantName?: string;
  saplingCount: number;   // Positive integer >= 1
  broadLocation: BroadLocationCategory;
  locationRegion: string; // Broad district/city e.g. 'Pune'
  communityType: CommunityType;
  communityKey: string;   // Normalized identifier e.g. 'society_pune_east'
  actionType: string;     // e.g. 'Native sapling planted', 'Balcony garden tended'
  status: ActivityStatus;
  optionalNote?: string;  // Non-identifying note
  clientSubmissionToken?: string; // Idempotency key to protect against double-submit
}

export interface PlantingActivitySubmission {
  plantingDate: string;
  dayOfMonth: number;
  plantCategory: PlantCategory;
  customPlantName?: string;
  saplingCount: number;
  broadLocation: BroadLocationCategory;
  locationRegion: string;
  communityType: CommunityType;
  actionType?: string;
  optionalNote?: string;
  clientSubmissionToken?: string;
}

export interface ImpactSummary {
  treesPlanted: number;
  participants: number;
  activities: number;
  communities: number;
  lastCalculatedAt: number;
  isZeroBaseline: boolean;
  baselineParticipants?: number;
  baselineTreesPlanted?: number;
  baselineCommunities?: number;
  newParticipants?: number;
  newTreesPlanted?: number;
  newActivities?: number;
  newCommunities?: number;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  formattedDate: string;
  actionType: string;
  dayOfMonth: number;
  locationRegion: string;
  saplingCount: number;
  communityTypeLabel: string;
  eligibleAt: number;
}

export interface GrowthTimelinePoint {
  date: string;
  treesPlanted: number;
  activities: number;
}

export interface PartnerInterest {
  requestId: string;
  organizationName: string;
  communityType: string;
  broadLocation: string;
  representativeRole: string;
  email?: string;
  interests: string[];
  approximateCommunitySize?: string;
  message?: string;
  status?: 'submitted' | 'under_consideration' | 'contacted' | 'active_community';
  submittedAt: number;
}

export interface PartnerInterestSubmission {
  organizationName: string;
  communityType: string;
  broadLocation: string;
  representativeRole: string;
  email?: string;
  interests: string[];
  approximateCommunitySize?: string;
  message?: string;
}

export interface FutureCommunityRecord {
  communityId: string;
  communityName: string;
  communityType: string;
  cityArea: string;
  status: 'active' | 'onboarding' | 'inactive';
  approximateParticipantCount?: number;
  startDate: string;
  aggregatePlantingCount: number;
  aggregateGreenDayCount: number;
}

export interface LocalPlantingEntry {
  id: string;
  dateStr: string;
  saplingCount: number;
  plantTypeLabel: string;
  monthName: string;
  year: number;
  dayOfMonth: number;
  timestamp: number;
}

export type NurtureHumanState = 
  | 'before_planting'
  | 'after_planting'
  | 'returning_month'
  | 'green_day';


