import { useState } from 'react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { CommonFaq } from '../components/common/CommonFaq';
import { Button } from '../components/common/Button';
import { useGreenDay } from '../context/GreenDayContext';
import { ShieldCheck, Lock, EyeOff, FileText, UserX, Database, Clock, AlertCircle, RefreshCw, CheckCircle2 } from '../components/common/Icons';

export function PrivacyPage() {
  const { clearAllPersonalData } = useGreenDay();
  const [clearedMessage, setClearedMessage] = useState<string | null>(null);

  const handleClearLocalData = () => {
    try {
      clearAllPersonalData();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('birthdaygreen_participant_token_v1');
        localStorage.removeItem('birthdaygreen_active_day_v1');
        localStorage.removeItem('birthdaygreen_partner_form_draft_v1');
      }
      setClearedMessage('Your local device storage and personal rhythm data for Birthday Green have been completely reset.');
      setTimeout(() => setClearedMessage(null), 4000);
    } catch (err) {
      console.error('Failed to clear local data:', err);
    }
  };

  return (
    <div className="flex flex-col">
      {/* 01 — Hero (Section 11) */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-22 overflow-hidden border-b border-[#DDE9D8]/80">
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[380px] bg-gradient-to-b from-[#DDE9D8]/50 via-[#F7F3E8]/30 to-transparent blur-3xl -z-10"
          aria-hidden="true"
        />
        <Container size="narrow">
          <div className="text-center space-y-5">
            <ScrollReveal>
              <div className="text-xs sm:text-sm font-bold tracking-widest text-[#6F9F73] uppercase flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1F4D38]" />
                <span>PRIVACY BY DESIGN</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={100}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F4D38] tracking-tight leading-[1.14] [text-wrap:balance]">
                Your privacy stays yours.
              </h1>
            </ScrollReveal>

            <ScrollReveal delayMs={200}>
              <p className="text-base sm:text-xl text-[#4D6153] leading-relaxed max-w-xl mx-auto">
                «Birthday Green is designed to collect as little personal information as reasonably necessary.»
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 02 — Data Minimization (Section 20) */}
      <section className="py-16 sm:py-22 surface-canvas border-b border-[#DDE9D8]/80">
        <Container size="narrow">
          <ScrollReveal>
            <div className="surface-elevated rounded-3xl p-7 sm:p-10 border border-[#DDE9D8] shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6F9F73]">
                Fundamental Principle
              </span>
              <h3 className="font-display font-extrabold text-2xl text-[#1F4D38]">
                We don't need to know everything about you.
              </h3>
              <p className="text-sm sm:text-base text-[#4D6153] leading-relaxed">
                «Birthday Green is designed around the principle that environmental participation should not require unnecessary personal information.»
              </p>
              <p className="text-xs text-[#7A8E80] leading-relaxed pt-1">
                You do not need to register a user account, create a password, provide a telephone number, or link a social profile to take care of living roots in the soil.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 03 & 04 & 05 — Information Handled (Sections 12, 13, 14, 15, 16) */}
      <section className="py-18 sm:py-26 surface-base border-b border-[#DDE9D8]/80">
        <Container size="narrow">
          <div className="space-y-8">
            {/* Calculator Privacy */}
            <ScrollReveal>
              <div className="surface-elevated rounded-3xl p-6 sm:p-9 border border-[#DDE9D8] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#DDE9D8]">
                  <EyeOff className="w-5 h-5 text-[#1F4D38]" />
                  <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                    Information the Calculator Uses
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                  The Green Day calculator uses a user's birth date locally in their browser to calculate their recurring day number, upcoming Green Day, and calendar countdown.
                </p>
                <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] text-xs text-[#1F4D38] space-y-1">
                  <p>• The full birth date is <strong>not stored</strong> in the community database.</p>
                  <p>• The full birth date <strong>never appears publicly</strong>.</p>
                  <p>• The full birth date is <strong>never included in URLs</strong>.</p>
                  <p>• The full birth date is <strong>never used as an identifier</strong>.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Planting-Report Information */}
            <ScrollReveal delayMs={100}>
              <div className="surface-elevated rounded-3xl p-6 sm:p-9 border border-[#DDE9D8] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#DDE9D8]">
                  <Database className="w-5 h-5 text-[#1F4D38]" />
                  <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                    Information Used for Planting Reports
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                  When a steward voluntarily logs a planting action, only the minimum data required to represent the activity is recorded:
                </p>
                <ul className="list-disc pl-5 text-xs text-[#4D6153] space-y-1">
                  <li>Planting date and day of month</li>
                  <li>Broad plant category (e.g. tree sapling, native plant)</li>
                  <li>Approximate number of plants (positive integer)</li>
                  <li>Broad community setting (e.g. housing society, school) and broad city (e.g. Pune)</li>
                  <li>Submission timestamp and an internally generated anonymous token</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Information Not Required */}
            <ScrollReveal delayMs={150}>
              <div className="surface-elevated rounded-3xl p-6 sm:p-9 border border-[#DDE9D8] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#DDE9D8]">
                  <UserX className="w-5 h-5 text-[#B87070]" />
                  <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                    Information Not Required
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                  Birthday Green does not require participants to provide:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-[#7A8E80]">
                  <span className="p-2 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center">No full DOB</span>
                  <span className="p-2 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center">No phone number</span>
                  <span className="p-2 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center">No home address</span>
                  <span className="p-2 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center">No GPS pin</span>
                  <span className="p-2 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center">No password</span>
                  <span className="p-2 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center">No profile photo</span>
                  <span className="p-2 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center">No social handle</span>
                  <span className="p-2 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center">No government ID</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Partnership Request Data */}
            <ScrollReveal delayMs={200}>
              <div className="surface-elevated rounded-3xl p-6 sm:p-9 border border-[#DDE9D8] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#DDE9D8]">
                  <Lock className="w-5 h-5 text-[#1F4D38]" />
                  <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                    Partnership Request Data
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                  Partnership requests may include organization name, community type, broad city, role, email, and voluntary message purely to communicate regarding the request.
                </p>
                <p className="text-xs font-semibold text-[#1F4D38] italic">
                  «Partnership-request information is not part of the public Community feed.»
                </p>
              </div>
            </ScrollReveal>

            {/* Public Community Data */}
            <ScrollReveal delayMs={250}>
              <div className="surface-glass rounded-3xl p-6 sm:p-9 border border-white/80 shadow-2xs space-y-3">
                <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                  Public Community Data Boundaries
                </h4>
                <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                  Public activity displays only broad parameters: date, general city/region, community type, and plant count.
                </p>
                <p className="text-xs text-[#B87070] font-semibold">
                  We never publicly display names, emails, phone numbers, full birth dates, exact addresses, participant keys, or private notes.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 06 & 07 — 24-Hour Holding Period & Community Impact (Sections 17, 18, 19) */}
      <section className="py-18 sm:py-26 surface-canvas border-b border-[#DDE9D8]/80">
        <Container size="narrow">
          <ScrollReveal>
            <div className="space-y-8">
              {/* 24-Hour Holding Period */}
              <div className="surface-elevated rounded-3xl p-7 sm:p-10 border border-[#DDE9D8] shadow-xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#DDE9D8]">
                  <Clock className="w-5 h-5 text-[#6F9F73]" />
                  <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                    The 24-Hour Holding Period
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                  «Newly submitted planting reports enter a 24-hour holding period before they contribute to public impact figures or appear in public community activity.»
                </p>
                <p className="text-xs text-[#7A8E80] leading-relaxed">
                  «This creates a short separation between submission and public reporting and gives the system a simple, consistent data-integrity boundary.»
                </p>
                <p className="text-[11px] text-[#1F4D38] font-semibold pt-1">
                  * Note: This is an automated data-integrity holding period, not third-party verification or proof of survival.
                </p>
              </div>

              {/* Community-Reported Impact */}
              <div className="surface-elevated rounded-3xl p-7 sm:p-10 border border-[#DDE9D8] shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#DDE9D8]">
                  <AlertCircle className="w-5 h-5 text-[#6F9F73]" />
                  <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                    What do the impact numbers mean?
                  </h4>
                </div>
                <div className="p-4 rounded-2xl bg-[#F7F3E8] border border-[#DDE9D8] space-y-2 text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                  <p>
                    «Birthday Green's public impact figures are based on planting reports submitted by participants.»
                  </p>
                  <p className="font-semibold text-[#1F4D38]">
                    «These reports are not independently verified.»
                  </p>
                  <p>
                    «The numbers should therefore be understood as community-reported activity rather than independently audited environmental impact.»
                  </p>
                </div>
                <p className="text-xs text-[#7A8E80] leading-relaxed">
                  Because a reported planting does not guarantee survival, we clearly label metrics as <strong>Trees & Saplings Planted</strong> rather than "trees alive."
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 08 & 09 & 10 — Local Storage, Cookies, Services, Security (Sections 21, 23, 24, 25, 26) */}
      <section className="py-18 sm:py-26 surface-base border-b border-[#DDE9D8]/80">
        <Container size="narrow">
          <ScrollReveal>
            <div className="space-y-6">
              <div className="surface-elevated rounded-3xl p-6 sm:p-9 border border-[#DDE9D8] shadow-2xs space-y-3">
                <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                  Local Storage & Client Cache
                </h4>
                <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                  «Some information may be stored locally in your browser to remember your experience, such as your anonymous participation state.»
                </p>
                <p className="text-xs text-[#7A8E80] leading-relaxed">
                  Specifically, we store an anonymous token to display your private local planting history on this device and remember incomplete form drafts.
                </p>

                {/* Section 22: User Control Button */}
                <div className="pt-3 border-t border-[#DDE9D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-xs text-[#4D6153]">
                    Want to reset your local device identifiers?
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearLocalData}
                    icon={<RefreshCw className="w-3.5 h-3.5" />}
                  >
                    Clear Local Device Data
                  </Button>
                </div>

                {clearedMessage && (
                  <div className="p-3 rounded-xl bg-[#EEF5EC] border border-[#8EB892] text-xs text-[#1F4D38] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F9F73]" />
                    <span>{clearedMessage}</span>
                  </div>
                )}
              </div>

              {/* Cookies & Tracking */}
              <div className="surface-elevated rounded-3xl p-6 sm:p-9 border border-[#DDE9D8] shadow-2xs space-y-2">
                <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                  Zero Commercial Trackers
                </h4>
                <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                  Birthday Green operates with zero third-party advertising trackers, zero social tracking pixels, zero cross-site profiling, and zero data brokers.
                </p>
              </div>

              {/* Third-Party Services */}
              <div className="surface-elevated rounded-3xl p-6 sm:p-9 border border-[#DDE9D8] shadow-2xs space-y-2">
                <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                  Services We Use
                </h4>
                <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                  In production, our application utilizes standard modern web infrastructure (such as Google AI Studio preview hosting and Firebase Firestore when provisioned for live community persistence) to deliver fast, secure page loads.
                </p>
              </div>

              {/* Security Safeguards */}
              <div className="surface-elevated rounded-3xl p-6 sm:p-9 border border-[#DDE9D8] shadow-2xs space-y-2">
                <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                  Technical Security
                </h4>
                <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                  «Birthday Green uses technical safeguards intended to prevent unauthorized access to private information.»
                </p>
                <p className="text-xs text-[#7A8E80]">
                  We never claim absolute mathematical perfection, but we engineer our data models to minimize what is collected so there is minimal risk to our community stewards.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 11 — Combined FAQ (Section 39) */}
      <section className="py-18 sm:py-26 surface-canvas border-b border-[#DDE9D8]/80">
        <Container size="narrow">
          <ScrollReveal>
            <CommonFaq />
          </ScrollReveal>
        </Container>
      </section>
    </div>
  );
}
