import { PartnerInterest, PartnerInterestSubmission } from '../types';

const PARTNER_STORAGE_KEY = 'birthdaygreen_partner_requests_v1';
const DRAFT_STORAGE_KEY = 'birthdaygreen_partner_form_draft_v1';
const SUBMISSION_COOLDOWN_MS = 30000; // 30s spam protection cooldown
let lastSubmissionTimestamp = 0;

export const partnerService = {
  /**
   * Submits a voluntary partner collaboration interest request.
   * Enforces privacy, data minimization, and basic abuse cooldown.
   * Stored privately without public exposure.
   */
  async submitPartnerInterest(
    submission: PartnerInterestSubmission
  ): Promise<{ success: boolean; requestId: string; message: string }> {
    const now = Date.now();

    // 1. Spam & Rapid-fire Cooldown Protection
    if (now - lastSubmissionTimestamp < SUBMISSION_COOLDOWN_MS) {
      throw new Error('Please wait a moment before submitting another request.');
    }

    // 2. Strict Input Validation & Length Limits
    const cleanOrg = submission.organizationName?.trim().slice(0, 120);
    if (!cleanOrg || cleanOrg.length < 2) {
      throw new Error('Enter your community or organization name.');
    }

    if (!submission.communityType) {
      throw new Error('Select the type of community you represent.');
    }

    const cleanLocation = submission.broadLocation?.trim().slice(0, 80) || 'General Area';
    if (!cleanLocation) {
      throw new Error('Enter your city or broad area.');
    }

    let cleanEmail: string | undefined = undefined;
    if (submission.email && submission.email.trim()) {
      const emailTrim = submission.email.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailTrim)) {
        throw new Error('Enter a valid email address if you would like a response.');
      }
      cleanEmail = emailTrim.slice(0, 100);
    }

    const cleanMessage = submission.message?.trim().slice(0, 500);

    const requestId = 'req_' + now + '_' + Math.random().toString(36).substring(2, 8);

    const newRequest: PartnerInterest = {
      requestId,
      organizationName: cleanOrg,
      communityType: submission.communityType,
      broadLocation: cleanLocation,
      representativeRole: (submission.representativeRole || 'Volunteer').slice(0, 60),
      email: cleanEmail,
      interests: Array.isArray(submission.interests) ? submission.interests.slice(0, 10) : [],
      approximateCommunitySize: submission.approximateCommunitySize,
      message: cleanMessage,
      status: 'submitted',
      submittedAt: now,
    };

    // 3. Save Private Record
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(PARTNER_STORAGE_KEY);
        const existing: PartnerInterest[] = raw ? JSON.parse(raw) : [];
        existing.push(newRequest);
        localStorage.setItem(PARTNER_STORAGE_KEY, JSON.stringify(existing));
        // Clear local draft upon success
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch (err) {
        console.error('Failed to save partner interest locally:', err);
      }
    }

    lastSubmissionTimestamp = now;

    return {
      success: true,
      requestId,
      message: 'Your partnership request has been received.',
    };
  },

  /**
   * Safe Local Form Draft Preservation:
   * Protects incomplete input against accidental navigation or refresh.
   */
  saveDraft(draft: Partial<PartnerInterestSubmission>): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // quota fallback
    }
  },

  getDraft(): Partial<PartnerInterestSubmission> | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  clearDraft(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};
