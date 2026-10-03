/**
 * Authoritative Community Baseline Configuration
 * 
 * Official figures supplied by project owner:
 * - 973 Community Members
 * - 23,659 Trees & Saplings Planted
 * - 0 Communities Reached
 * 
 * Note: Historical activity was conducted as grassroots participation.
 * No historical Green Day activity count was supplied, so digital Green Day activity
 * count strictly records new verified submissions through this website.
 */
export const COMMUNITY_BASELINE_IMPACT = {
  participants: 973,
  treesPlanted: 23659,
  communitiesReached: 0,
} as const;

export type CommunityBaselineImpact = typeof COMMUNITY_BASELINE_IMPACT;
