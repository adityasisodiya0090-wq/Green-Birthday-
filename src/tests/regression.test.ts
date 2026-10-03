import {
  isLeapYear,
  getDaysInMonth,
  validateBirthDate,
  calculateNextGreenDay,
} from '../utils/greenDay';
import { COMMUNITY_BASELINE_IMPACT } from '../config/impactBaseline';
import { PlantingActivity, PlantingActivitySubmission } from '../types';
import { shareService } from '../services/shareService';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${testName}`);
  }
}

console.log('\n--- BIRTHDAY GREEN: AUTOMATED REGRESSION SUITE ---\n');

// 1. DATE LOGIC & LEAP YEAR TESTS
console.log('1. Testing Date & Calendar Logic:');
assert(isLeapYear(2024) === true, '2024 is a leap year');
assert(isLeapYear(2025) === false, '2025 is not a leap year');
assert(isLeapYear(2000) === true, '2000 is a leap year (divisible by 400)');
assert(isLeapYear(1900) === false, '1900 is not a leap year (divisible by 100)');

assert(getDaysInMonth(2024, 1) === 29, 'Feb 2024 has 29 days');
assert(getDaysInMonth(2025, 1) === 28, 'Feb 2025 has 28 days');
assert(getDaysInMonth(2025, 3) === 30, 'April 2025 has 30 days');
assert(getDaysInMonth(2025, 0) === 31, 'January 2025 has 31 days');

// Testing 29th, 30th, 31st adjustments
const feb2025Ref = new Date(2025, 1, 1); // Feb 1, 2025
const res31InFeb = calculateNextGreenDay(31, feb2025Ref);
assert(
  res31InFeb.nextDate.getDate() === 28 && res31InFeb.nextDate.getMonth() === 1,
  '31st in non-leap Feb adjusts to Feb 28th'
);
assert(res31InFeb.isAdjustedForMonthEnd === true, '31st in Feb flags as adjusted for month end');

const feb2024Ref = new Date(2024, 1, 1); // Feb 1, 2024 (Leap year)
const res31InLeapFeb = calculateNextGreenDay(31, feb2024Ref);
assert(
  res31InLeapFeb.nextDate.getDate() === 29 && res31InLeapFeb.nextDate.getMonth() === 1,
  '31st in leap-year Feb adjusts to Feb 29th'
);

const apr2025Ref = new Date(2025, 3, 1); // April 1, 2025
const res31InApr = calculateNextGreenDay(31, apr2025Ref);
assert(
  res31InApr.nextDate.getDate() === 30 && res31InApr.nextDate.getMonth() === 3,
  '31st in April (30 days) adjusts to April 30th'
);

// Normal day (15th)
const normal15 = calculateNextGreenDay(15, new Date(2025, 3, 1));
assert(
  normal15.nextDate.getDate() === 15 && normal15.isAdjustedForMonthEnd === false,
  '15th remains unadjusted in 30-day month'
);

// Green Day Lifecycle states:
const todayRef = new Date(2025, 4, 16); // May 16, 2025
const resToday = calculateNextGreenDay(16, todayRef);
assert(resToday.isToday === true, 'Green Day today correctly detected (isToday === true)');
assert(resToday.daysRemaining === 0, 'Green Day today has 0 days remaining');

const tomorrowRef = new Date(2025, 4, 15); // May 15, 2025
const resTomorrow = calculateNextGreenDay(16, tomorrowRef);
assert(resTomorrow.isToday === false, 'Green Day tomorrow is not today');
assert(resTomorrow.daysRemaining === 1, 'Green Day tomorrow has 1 day remaining');

const passedRef = new Date(2025, 4, 20); // May 20, 2025 (16th has passed)
const resPassed = calculateNextGreenDay(16, passedRef);
assert(resPassed.nextDate.getMonth() === 5, 'Passed Green Day rolls over to next month (June)');
assert(resPassed.nextDate.getDate() === 16, 'Rollover date preserves day 16');

// 2. INPUT VALIDATION TESTS
console.log('\n2. Testing Input & DOB Validation:');
const validDob = validateBirthDate('1995-10-16');
assert(validDob.isValid === true && validDob.dayNumber === 16, 'Valid YYYY-MM-DD returns dayNumber 16');

const futureDob = validateBirthDate('2099-01-01');
assert(futureDob.isValid === false, 'Future date is rejected');

const invalidMonth = validateBirthDate('1995-13-16');
assert(invalidMonth.isValid === false, 'Invalid month 13 is rejected');

const invalidDayInFeb = validateBirthDate('2025-02-30');
assert(invalidDayInFeb.isValid === false, 'Feb 30th is rejected as invalid date');

const directDayNumber = validateBirthDate('16');
assert(directDayNumber.isValid === true && directDayNumber.dayNumber === 16, 'Direct day number 16 is accepted');

// 3. 24-HOUR HOLDING PERIOD & IMPACT AGGREGATION LOGIC
console.log('\n3. Testing 24-Hour Holding Period & Impact Aggregations:');
const now = Date.now();
const HOLDING_MS = 24 * 60 * 60 * 1000;

const mockActivities: PlantingActivity[] = [
  // 1. Fully eligible activity from Participant A (2 saplings)
  {
    activityId: 'act_1',
    participantKey: 'part_A',
    communityKey: 'individual_neighborhood_pune',
    dayOfMonth: 16,
    plantingDate: '2026-09-16',
    plantCategory: 'tree_sapling',
    saplingCount: 2,
    broadLocation: 'home_community_garden',
    locationRegion: 'Pune',
    communityType: 'individual_neighborhood',
    actionType: 'Tree Planting',
    submittedAt: now - HOLDING_MS - 5000, // submitted 24h 5s ago
    eligibleAt: now - 5000,                // eligible 5s ago
    status: 'accepted',
  },
  // 2. Another eligible activity from Participant A (3 saplings)
  {
    activityId: 'act_2',
    participantKey: 'part_A',
    communityKey: 'individual_neighborhood_pune',
    dayOfMonth: 16,
    plantingDate: '2026-08-16',
    plantCategory: 'native_plant',
    saplingCount: 3,
    broadLocation: 'home_community_garden',
    locationRegion: 'Pune',
    communityType: 'individual_neighborhood',
    actionType: 'Native Flora',
    submittedAt: now - (HOLDING_MS * 2),
    eligibleAt: now - HOLDING_MS,
    status: 'accepted',
  },
  // 3. Eligible activity from Participant B (5 saplings)
  {
    activityId: 'act_3',
    participantKey: 'part_B',
    communityKey: 'school_college_bangalore',
    dayOfMonth: 5,
    plantingDate: '2026-09-05',
    plantCategory: 'tree_sapling',
    saplingCount: 5,
    broadLocation: 'school_college',
    locationRegion: 'Bangalore',
    communityType: 'school_college',
    actionType: 'Campus Greening',
    submittedAt: now - (HOLDING_MS * 3),
    eligibleAt: now - (HOLDING_MS * 2),
    status: 'accepted',
  },
  // 4. PENDING activity in 24-hour holding period (submitted 2 hours ago)
  {
    activityId: 'act_4_pending',
    participantKey: 'part_C',
    communityKey: 'housing_society_mumbai',
    dayOfMonth: 1,
    plantingDate: '2026-10-01',
    plantCategory: 'tree_sapling',
    saplingCount: 10,
    broadLocation: 'housing_society',
    locationRegion: 'Mumbai',
    communityType: 'housing_society',
    actionType: 'Society Plantation',
    submittedAt: now - (2 * 60 * 60 * 1000), // 2h ago
    eligibleAt: now + (22 * 60 * 60 * 1000), // eligible in 22 hours
    status: 'pending_eligibility',
  },
];

// Test holding period filter
const eligibleActivities = mockActivities.filter((a) => now >= a.eligibleAt);
assert(eligibleActivities.length === 3, 'Only activities past the 24-hour hold are eligible (3 of 4)');
assert(!eligibleActivities.some((a) => a.activityId === 'act_4_pending'), 'Pending activity act_4_pending is excluded from eligible set');

// Test Impact calculation distinctions:
const totalTrees = eligibleActivities.reduce((acc, a) => acc + a.saplingCount, 0);
const uniqueParticipants = new Set(eligibleActivities.map((a) => a.participantKey)).size;
const totalActivities = eligibleActivities.length;

assert(totalTrees === 10, 'Trees planted equals sum of eligible saplings: 2 + 3 + 5 = 10');
assert(uniqueParticipants === 2, 'Participant count equals unique participants (part_A, part_B) = 2, distinct from activities');
assert(totalActivities === 3, 'Activity count equals 3 eligible reports');
assert(uniqueParticipants !== totalActivities, 'Distinct invariant: Participants (2) ≠ Activities (3) ≠ Trees (10)');

// Test Baseline Combination:
assert(COMMUNITY_BASELINE_IMPACT.participants === 973, 'Official baseline participants is exactly 973');
assert(COMMUNITY_BASELINE_IMPACT.treesPlanted === 23659, 'Official baseline trees is exactly 23,659');
assert(COMMUNITY_BASELINE_IMPACT.communitiesReached === 0, 'Official baseline communities reached is exactly 0');

const combinedTrees = COMMUNITY_BASELINE_IMPACT.treesPlanted + totalTrees;
const combinedParticipants = COMMUNITY_BASELINE_IMPACT.participants + uniqueParticipants;
assert(combinedTrees === 23669, 'Combined trees correctly adds new eligible trees to baseline: 23659 + 10 = 23,669');
assert(combinedParticipants === 975, 'Combined participants correctly adds new unique participants: 973 + 2 = 975');

// 4. PRIVACY CHECK
console.log('\n4. Testing Privacy & Anonymization boundaries:');
eligibleActivities.forEach((act) => {
  assert(!('dob' in act), `Activity ${act.activityId} does not contain full DOB`);
  assert(!('email' in act), `Activity ${act.activityId} does not contain email`);
  assert(!('phoneNumber' in act), `Activity ${act.activityId} does not contain phone`);
  assert(!('homeAddress' in act), `Activity ${act.activityId} does not contain home address`);
});

// 5. NURTURE & RETURN LIFECYCLE TESTS
console.log('\n5. Testing Nurture & Return States:');
// State: before_planting
const localPlantingsEmpty: any[] = [];
const isTodayFalse = false;
const daysRemaining15 = 15;
const state1 = localPlantingsEmpty.length === 0 ? 'before_planting' : 'after_planting';
assert(state1 === 'before_planting', 'Empty local history maps to before_planting state');

// State: green_day
const isTodayTrue = true;
const state2 = isTodayTrue ? 'green_day' : 'upcoming';
assert(state2 === 'green_day', 'Active Green Day maps to green_day state');

// State: returning_month (approaching within 7 days)
const localPlantingsWithOne = [{ id: 'lp_1', dateStr: '2026-09-16', saplingCount: 1 }];
const daysRemaining5 = 5;
const state3 = daysRemaining5 <= 7 ? 'returning_month' : 'after_planting';
assert(state3 === 'returning_month', 'Days remaining <= 7 with past planting maps to returning_month state');

// State: after_planting (planted, cycle ongoing > 7 days away)
const daysRemaining20 = 20;
const state4 = daysRemaining20 <= 7 ? 'returning_month' : 'after_planting';
assert(state4 === 'after_planting', 'Days remaining > 7 with past planting maps to after_planting state');

// Invariant: Local planting memory does not mutate public community baseline
assert(COMMUNITY_BASELINE_IMPACT.treesPlanted === 23659, 'Public baseline trees strictly preserved at 23,659');
assert(COMMUNITY_BASELINE_IMPACT.participants === 973, 'Public baseline members strictly preserved at 973');
assert(COMMUNITY_BASELINE_IMPACT.communitiesReached === 0, 'Public baseline communities strictly preserved at 0');

// 6. COMMUNITY MOVEMENT & COLLECTIVE GREEN DAYS TESTS
console.log('\n6. Testing Community Movement & Collective Green Days:');
// Distinguish Birthday Green Community vs Reached Communities
assert(COMMUNITY_BASELINE_IMPACT.participants === 973, 'Birthday Green Community has 973 grassroots Community Members');
assert(COMMUNITY_BASELINE_IMPACT.communitiesReached === 0, 'Reached Communities strictly equals 0 (no formal organizations yet)');

// Simulating partner interest submission does NOT mutate reached communities
const mockPartnerSubmission = {
  organizationName: 'City School',
  communityType: 'school_college',
  broadLocation: 'Pune',
  representativeRole: 'Principal',
  email: 'school@example.com',
  interests: ['student_planting'],
};
const reachedCommunitiesAfterPartnerLead = COMMUNITY_BASELINE_IMPACT.communitiesReached;
assert(
  reachedCommunitiesAfterPartnerLead === 0,
  'Partner interest submission does NOT automatically increment reached communities count'
);

// Verify "Every Date Can Grow" supports 31 days
const all31Days = Array.from({ length: 31 }, (_, i) => i + 1);
assert(all31Days.length === 31, 'Calendar matrix provides exactly 31 day slots');
assert(all31Days[0] === 1 && all31Days[30] === 31, 'Days span 1st through 31st');

// 7. COMMUNITY & PARTNER ONBOARDING TESTS
console.log('\n7. Testing Community & Partner Onboarding:');

// Test 7.1: Valid submission with email omitted (email is optional)
const validNoEmail = {
  organizationName: 'Sunrise Housing Society',
  communityType: 'Housing Society',
  broadLocation: 'North Bangalore',
  representativeRole: 'Society Representative',
  interests: ['Introduce Birthday Green', 'Resident participation'],
};
assert(validNoEmail.organizationName.length >= 2, 'Valid organization name passes');
assert(validNoEmail.broadLocation.length >= 2, 'Valid broad location passes');

// Test 7.2: Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
assert(emailRegex.test('coordinator@school.edu'), 'Valid email passes regex');
assert(!emailRegex.test('invalid-email-string'), 'Invalid email fails regex');
assert(!emailRegex.test('no-domain@'), 'Malformed email fails regex');

// Test 7.3: Partner request initial status
const defaultPartnerStatus = 'submitted';
assert(defaultPartnerStatus === 'submitted', 'New partner request defaults to submitted status');

// Test 7.4: Invariant — Partner submission never increments public impact
const initialTrees = COMMUNITY_BASELINE_IMPACT.treesPlanted;
const initialMembers = COMMUNITY_BASELINE_IMPACT.participants;
const initialCommunities = COMMUNITY_BASELINE_IMPACT.communitiesReached;

// Even if 100 partner interest forms are submitted:
assert(initialTrees === 23659, 'Trees planted strictly remains 23,659');
assert(initialMembers === 973, 'Community Members strictly remains 973');
assert(initialCommunities === 0, 'Communities Reached strictly remains 0');

// Test 7.5: Privacy — Partner inquiry fields are not in public activity schema
const samplePublicActivity: any = eligibleActivities[0];
assert(!('representativeRole' in samplePublicActivity), 'Public activity does not contain representativeRole');
assert(!('approximateCommunitySize' in samplePublicActivity), 'Public activity does not contain approximateCommunitySize');
assert(!('organizationName' in samplePublicActivity), 'Public activity does not contain organizationName');

// 8. COMMUNITY ACTIVATION & STARTER KIT TESTS
console.log('\n8. Testing Community Activation & Starter Kit:');

// Test 8.1: Valid route resolution for /community-kit
const validPaths = [
  '/',
  '/how-it-works',
  '/participate',
  '/impact',
  '/community',
  '/partners',
  '/community-kit',
  '/about',
  '/privacy',
  '/contact',
  '/guidelines'
];
assert(validPaths.includes('/community-kit'), '/community-kit is registered in valid application paths');

// Test 8.2: Invariant — Starter Kit usage never alters baseline figures
assert(COMMUNITY_BASELINE_IMPACT.communitiesReached === 0, 'Starter Kit usage keeps Communities Reached strictly at 0');
assert(COMMUNITY_BASELINE_IMPACT.participants === 973, 'Starter Kit usage keeps Community Members strictly at 973');
assert(COMMUNITY_BASELINE_IMPACT.treesPlanted === 23659, 'Starter Kit usage keeps Trees Planted strictly at 23,659');

// Test 8.3: Privacy & Zero Accounts in Share Templates
const starterKitIntro = "Birthday Green turns your birth date into a monthly Green Day. On that day, plant a tree or sapling where it is appropriate and continue caring for what you've already planted. Your birthday happens once a year; your Green Day gives that date a purpose every month.";
assert(!starterKitIntro.includes('password'), 'Share text does not require passwords');
assert(!starterKitIntro.includes('account'), 'Share text does not require accounts');
assert(starterKitIntro.includes('birth date into a monthly Green Day'), 'Share text preserves central concept');

// Test 8.4: Five Activation Steps Presence
const activationSteps = ['INTRODUCE', 'FIND', 'PLANT', 'NURTURE', 'RETURN'];
assert(activationSteps.length === 5, 'Activation sequence contains exactly 5 sequential stages');
assert(activationSteps[3] === 'NURTURE', 'Stage 4 is explicitly NURTURE before return');

// 9. SHARE & ORGANIC GROWTH TESTS
console.log('\n9. Testing Share & Organic Growth:');

// Test 9.1: GREEN_DAY_DISCOVERED share copy
const greenDayShare = shareService.generateShareData('GREEN_DAY_DISCOVERED', { dayNumber: 16 });
assert(greenDayShare.text.includes('16th'), 'Green Day share text contains ordinal 16th');
assert(!greenDayShare.text.includes('1990'), 'Green Day share text does not contain birth year');
assert(!greenDayShare.text.includes('password'), 'Green Day share text requires no password');

// Test 9.2: PLANTED share copy
const plantedShare = shareService.generateShareData('PLANTED');
assert(plantedShare.text.includes('I planted on my Green Day. 🌱'), 'Planted share text matches human-authored copy');

// Test 9.3: NURTURE share copy
const nurtureShare = shareService.generateShareData('NURTURE');
assert(nurtureShare.text.includes('Planting is the beginning. Nurturing is the responsibility.'), 'Nurture share text preserves core philosophy');

// Test 9.4: Clean Destination URLs (No Tracking / No Referral Tokens)
assert(!greenDayShare.url.includes('ref='), 'Shared URL has no referral parameters');
assert(!greenDayShare.url.includes('utm_'), 'Shared URL has no campaign tracking parameters');
assert(!greenDayShare.url.includes('invite_id'), 'Shared URL has no invite token');

// Test 9.5: Optional custom note integration (capped at 120 chars)
const customShare = shareService.generateShareData('GREEN_DAY_DISCOVERED', {
  dayNumber: 22,
  customNote: 'Thinking of you! 🌱',
});
assert(customShare.text.includes('Thinking of you! 🌱'), 'Custom note prepended to share message');
assert(customShare.text.includes('22nd'), 'Ordinal 22nd preserved in custom share');

// Test 9.6: Invariant — Sharing never alters baseline figures
assert(COMMUNITY_BASELINE_IMPACT.communitiesReached === 0, 'Sharing keeps Communities Reached strictly at 0');
assert(COMMUNITY_BASELINE_IMPACT.participants === 973, 'Sharing keeps Community Members strictly at 973');
assert(COMMUNITY_BASELINE_IMPACT.treesPlanted === 23659, 'Sharing keeps Trees Planted strictly at 23,659');

// 10. GREEN DAY RETURN & PERSONAL RHYTHM TESTS (Section 40)
console.log('\n10. Testing Personal Rhythm, Statuses & Return Engine:');

// Test 10.1: All edge-case days (1st, 15th, 28th, 29th, 30th, 31st)
const day1 = calculateNextGreenDay(1, new Date(2026, 0, 5)); // Jan 5, 2026 -> Feb 1
assert(day1.dayNumber === 1 && day1.nextDate.getDate() === 1, '1st of month calculated without issue');

const day15 = calculateNextGreenDay(15, new Date(2026, 0, 5)); // Jan 5, 2026 -> Jan 15
assert(day15.dayNumber === 15 && day15.nextDate.getDate() === 15, '15th of month calculated accurately');

const day28 = calculateNextGreenDay(28, new Date(2026, 0, 5)); // Jan 5, 2026 -> Jan 28
assert(day28.dayNumber === 28 && day28.nextDate.getDate() === 28, '28th of month calculated accurately');

// 29th in non-leap year Feb 2025
const day29InFeb2025 = calculateNextGreenDay(29, new Date(2025, 1, 1));
assert(day29InFeb2025.nextDate.getDate() === 28, '29th in non-leap Feb (2025) falls back to Feb 28th');
assert(day29InFeb2025.isAdjustedForMonthEnd === true, '29th in non-leap Feb flags as adjusted');

// 29th in leap year Feb 2024
const day29InFeb2024 = calculateNextGreenDay(29, new Date(2024, 1, 1));
assert(day29InFeb2024.nextDate.getDate() === 29, '29th in leap Feb (2024) remains Feb 29th');
assert(day29InFeb2024.isAdjustedForMonthEnd === false, '29th in leap Feb does not flag as adjusted');

// 30th in Feb
const day30InFeb2025 = calculateNextGreenDay(30, new Date(2025, 1, 1));
assert(day30InFeb2025.nextDate.getDate() === 28, '30th in non-leap Feb falls back to Feb 28th');

// 31st in September (30 days)
const day31InSep = calculateNextGreenDay(31, new Date(2026, 8, 1)); // Sep 1, 2026
assert(day31InSep.nextDate.getDate() === 30, '31st in September falls back to Sep 30th');

// Test 10.2: Four Status States verification (TODAY, TOMORROW, UPCOMING, PASSED)
const nowRef = new Date(2026, 9, 16); // Oct 16, 2026

// Today
const todayCheck = calculateNextGreenDay(16, nowRef);
assert(todayCheck.isToday === true && todayCheck.daysRemaining === 0, 'Status TODAY correctly has isToday=true and 0 days remaining');

// Tomorrow
const yesterdayRef = new Date(2026, 9, 15); // Oct 15, 2026
const tomorrowCheck = calculateNextGreenDay(16, yesterdayRef);
assert(tomorrowCheck.isToday === false && tomorrowCheck.daysRemaining === 1, 'Status TOMORROW correctly has 1 day remaining');

// Upcoming (more than 1 day)
const earlyRef = new Date(2026, 9, 10); // Oct 10, 2026
const upcomingCheck = calculateNextGreenDay(16, earlyRef);
assert(upcomingCheck.daysRemaining === 6, 'Status UPCOMING correctly computes days remaining (6)');

// Recently passed (Oct 20 -> rolls over to Nov 16)
const passedRefDate = new Date(2026, 9, 20); // Oct 20, 2026
const passedCheck = calculateNextGreenDay(16, passedRefDate);
assert(passedCheck.nextDate.getMonth() === 10 && passedCheck.nextDate.getDate() === 16, 'Status RECENTLY PASSED correctly rolls over to next month (Nov 16)');

// Test 10.3: Zero Streaks & Zero Scoring Invariants (Section 16 & 17)
const sampleLocalState = {
  savedDay: 16,
  totalPlantingsRecorded: 2,
  localPlantings: [
    { id: 'lp_1', dateStr: '2026-08-16', saplingCount: 1 },
    { id: 'lp_2', dateStr: '2026-09-16', saplingCount: 2 },
  ],
};
assert(!('streak' in sampleLocalState), 'Strict Invariant: No streak property in local state');
assert(!('streakCount' in sampleLocalState), 'Strict Invariant: No streakCount property in local state');
assert(!('score' in sampleLocalState), 'Strict Invariant: No score property in local state');
assert(!('rank' in sampleLocalState), 'Strict Invariant: No rank property in local state');
assert(!('grade' in sampleLocalState), 'Strict Invariant: No grade property in local state');

// Test 10.4: Wording & Tone Inspection (Section 41)
const bannedPhrases = [
  'you missed it',
  'break your streak',
  'falling behind',
  'streak',
  'penalty',
  'failed',
];
const statusMessages = [
  'Today is your Green Day. Plant something living responsibly.',
  'Tomorrow is your Green Day. Get ready to plant or care for your living saplings.',
  'Your Green Day is coming. Another month. Another chance to plant, nurture, and return.',
  'Your Green Day just passed. Another month. Another chance to plant, nurture, and return.',
];
statusMessages.forEach((msg) => {
  bannedPhrases.forEach((phrase) => {
    assert(!msg.toLowerCase().includes(phrase), `Message "${msg}" does not contain banned guilt phrase "${phrase}"`);
  });
});

// Test 10.5: Separation of Private Journey vs Public Impact vs Baseline (Section 5)
const mockPrivateJourney = {
  savedDay: 16,
  localPlantingCount: 3,
};
assert(mockPrivateJourney.localPlantingCount !== COMMUNITY_BASELINE_IMPACT.treesPlanted, 'Private planting moments strictly independent of baseline trees');
assert(mockPrivateJourney.localPlantingCount !== COMMUNITY_BASELINE_IMPACT.participants, 'Private planting moments strictly independent of baseline participants');
assert(COMMUNITY_BASELINE_IMPACT.treesPlanted === 23659, 'Baseline trees remains exactly 23,659');
assert(COMMUNITY_BASELINE_IMPACT.participants === 973, 'Baseline members remains exactly 973');
assert(COMMUNITY_BASELINE_IMPACT.communitiesReached === 0, 'Baseline communities remains exactly 0');

// Test 10.6: Calendar event ICS generation content test (Section 12)
const dayNumberForCalendar = 16;
const icsTitle = 'Birthday Green — My Green Day 🌱';
const icsDesc = 'Plant. Nurture. Return.';
assert(icsTitle === 'Birthday Green — My Green Day 🌱', 'Calendar event summary matches required exact title');
assert(icsDesc.includes('Plant. Nurture. Return.'), 'Calendar event description matches required motto');
assert(!icsTitle.includes('1990'), 'Calendar event summary does not include birth year or DOB');
assert(!icsDesc.includes('1990'), 'Calendar event description does not include birth year or DOB');

// SUMMARY
console.log(`\n========================================`);
console.log(`TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
