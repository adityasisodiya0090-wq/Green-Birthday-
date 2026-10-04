import { useState, FormEvent, useEffect } from 'react';
import { Button } from '../common/Button';
import { useRouter } from '../../context/RouterContext';
import { partnerService } from '../../services/partnerService';
import { PartnerInterestSubmission } from '../../types';
import {
  CheckCircle2,
  ShieldCheck,
  Mail,
  Building2,
  MapPin,
  User,
  Sparkles,
  ArrowRight,
  Home,
  Info,
  Users,
} from '../common/Icons';

export function PartnerInterestForm() {
  const { navigate, openCalculator } = useRouter();

  // Form State
  const [organizationName, setOrganizationName] = useState<string>('');
  const [communityType, setCommunityType] = useState<string>('Housing Society');
  const [broadLocation, setBroadLocation] = useState<string>('');
  const [representativeRole, setRepresentativeRole] = useState<string>('Society Representative');
  const [email, setEmail] = useState<string>('');
  const [interests, setInterests] = useState<string[]>([
    'Introduce Birthday Green',
  ]);
  const [communitySize, setCommunitySize] = useState<string>('50–100');
  const [message, setMessage] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Restore draft on mount
  useEffect(() => {
    const draft = partnerService.getDraft();
    if (draft) {
      if (draft.organizationName) setOrganizationName(draft.organizationName);
      if (draft.communityType) setCommunityType(draft.communityType);
      if (draft.broadLocation) setBroadLocation(draft.broadLocation);
      if (draft.representativeRole) setRepresentativeRole(draft.representativeRole);
      if (draft.email) setEmail(draft.email);
      if (draft.interests) setInterests(draft.interests);
      if (draft.approximateCommunitySize) setCommunitySize(draft.approximateCommunitySize);
      if (draft.message) setMessage(draft.message);
    }
  }, []);

  // Save draft on change
  useEffect(() => {
    if (!isSuccess && (organizationName || email || message || broadLocation)) {
      partnerService.saveDraft({
        organizationName,
        communityType,
        broadLocation,
        representativeRole,
        email,
        interests,
        approximateCommunitySize: communitySize,
        message,
      });
    }
  }, [
    organizationName,
    communityType,
    broadLocation,
    representativeRole,
    email,
    interests,
    communitySize,
    message,
    isSuccess,
  ]);

  const communityTypeOptions = [
    'School',
    'College',
    'Housing Society',
    'NGO',
    'Environmental Group',
    'Community Organization',
    'Other',
  ];

  const roleOptions = [
    'Student',
    'Teacher',
    'College Representative',
    'Society Representative',
    'NGO Representative',
    'Volunteer',
    'Coordinator',
    'Other',
  ];

  const sizeOptions = ['Under 50', '50–100', '100–500', '500+', 'Not sure'];

  const interestOptions = [
    'Introduce Birthday Green',
    'Green Day awareness',
    'Student participation',
    'Resident participation',
    'Environmental activity',
    'Community planting',
    'Other',
  ];

  const toggleInterest = (opt: string) => {
    setInterests((prev) =>
      prev.includes(opt) ? prev.filter((i) => i !== opt) : [...prev, opt]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanOrg = organizationName.trim();
    if (!cleanOrg || cleanOrg.length < 2) {
      setErrorMessage('Enter your community or organization name.');
      return;
    }

    if (!communityType) {
      setErrorMessage('Select the type of community you represent.');
      return;
    }

    const cleanLoc = broadLocation.trim();
    if (!cleanLoc || cleanLoc.length < 2) {
      setErrorMessage('Enter your city or broad area (e.g. Pune, North Bangalore).');
      return;
    }

    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        setErrorMessage('Enter a valid email address if you would like a response.');
        return;
      }
    }

    if (message.length > 500) {
      setErrorMessage('Please shorten your message (maximum 500 characters).');
      return;
    }

    setIsSubmitting(true);
    try {
      const submission: PartnerInterestSubmission = {
        organizationName: cleanOrg,
        communityType,
        broadLocation: cleanLoc,
        representativeRole,
        email: email.trim() ? email.trim().toLowerCase() : undefined,
        interests,
        approximateCommunitySize: communitySize,
        message: message.trim() || undefined,
      };

      await partnerService.submitPartnerInterest(submission);
      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(
        err?.message || "We couldn't submit your request right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    partnerService.clearDraft();
    setOrganizationName('');
    setBroadLocation('');
    setEmail('');
    setMessage('');
    setIsSuccess(false);
  };

  return (
    <section
      id="partner-form-section"
      className="py-8 sm:py-16 lg:py-20 surface-canvas relative border-b border-[#DDE9D8]/80 scroll-mt-16"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {isSuccess ? (
          /* SUCCESS STATE (Section 10 & 11) */
          <div className="surface-elevated rounded-2xl sm:rounded-3xl p-5 sm:p-12 text-center border border-[#DDE9D8] shadow-sm space-y-4 sm:space-y-6 animate-hero-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#DDE9D8] text-[#1F4D38] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#1F4D38]" />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#6F9F73]">
                THANK YOU
              </span>
              <h3 className="font-display font-extrabold text-xl sm:text-3xl text-[#1F4D38]">
                We received your interest in bringing Birthday Green to your community.
              </h3>
              <p className="text-xs sm:text-base text-[#4D6153] leading-relaxed max-w-lg mx-auto">
                Birthday Green begins with one date. Communities help that date become a shared habit.
              </p>
              <p className="text-[11px] sm:text-xs text-[#7A8E80] max-w-lg mx-auto leading-relaxed pt-1">
                If a follow-up is possible, the information you've provided can be used to understand how your community would like to participate.
              </p>
            </div>

            {/* Crucial Disclosure (Section 10) */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F7F3E8] border border-[#DDE9D8] text-xs text-[#4D6153] max-w-md mx-auto">
              <span className="font-bold text-[#1F4D38]">Important Note:</span> This is an expression of interest, not confirmation of a partnership or formal program launch.
            </div>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/')}
                icon={<Home className="w-4 h-4" />}
                iconPosition="left"
              >
                Return Home
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={() => openCalculator()}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Find My Green Day
              </Button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[#7A8E80] hover:text-[#1F4D38] underline cursor-pointer"
              >
                Submit another community inquiry
              </button>
            </div>
          </div>
        ) : (
          /* INPUT FORM (Sections 7, 8, 9, 10) */
          <div className="surface-glass rounded-2xl sm:rounded-3xl p-5 sm:p-12 border border-white/90 shadow-xl shadow-[#1F4D38]/5">
            <div className="text-center pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-[#DDE9D8]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#6F9F73] flex items-center justify-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXPRESS COMMUNITY INTEREST</span>
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1F4D38]">
                Bring Birthday Green to Us
              </h3>
              <p className="text-xs sm:text-sm text-[#4D6153] mt-1.5 max-w-lg mx-auto leading-relaxed">
                Tell us a little about your community and how you'd like to participate. No account creation required.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-[#FFF5F5] border border-[#B87070]/40 flex items-center justify-between text-xs text-[#9B2C2C]">
                <span>{errorMessage}</span>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="font-bold underline cursor-pointer ml-3 shrink-0"
                >
                  Dismiss
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Field 1: Organization / Community Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="org-name"
                  className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38]"
                >
                  Organization / Community Name <span className="text-[#B87070]">*</span>
                </label>
                <div className="relative">
                  <input
                    id="org-name"
                    type="text"
                    required
                    maxLength={120}
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="e.g. St. Xavier’s College, Green Valley Society"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] text-sm text-[#1C2821] placeholder-[#7A8E80] focus:outline-none focus:ring-2 focus:ring-[#1F4D38] focus:border-transparent transition-all shadow-2xs"
                  />
                  <Building2 className="w-4 h-4 text-[#7A8E80] absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Field 2 & 3: Community Type & City/Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="comm-type"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38]"
                  >
                    Community Type <span className="text-[#B87070]">*</span>
                  </label>
                  <select
                    id="comm-type"
                    value={communityType}
                    onChange={(e) => setCommunityType(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] text-sm text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38] focus:border-transparent transition-all shadow-2xs cursor-pointer"
                  >
                    {communityTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="broad-location"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38]"
                  >
                    City / Broad Area <span className="text-[#B87070]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="broad-location"
                      type="text"
                      required
                      maxLength={80}
                      value={broadLocation}
                      onChange={(e) => setBroadLocation(e.target.value)}
                      placeholder="e.g. Pune, North Bangalore, Bhopal"
                      className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] text-sm text-[#1C2821] placeholder-[#7A8E80] focus:outline-none focus:ring-2 focus:ring-[#1F4D38] focus:border-transparent transition-all shadow-2xs"
                    />
                    <MapPin className="w-4 h-4 text-[#7A8E80] absolute right-4 top-3.5 pointer-events-none" />
                  </div>
                  <span className="text-[10px] text-[#7A8E80]">
                    Broad city/area only. No street address needed.
                  </span>
                </div>
              </div>

              {/* Field 4 & 5: Your Role & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="rep-role"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38]"
                  >
                    Your Role in the Community
                  </label>
                  <select
                    id="rep-role"
                    value={representativeRole}
                    onChange={(e) => setRepresentativeRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] text-sm text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38] focus:border-transparent transition-all shadow-2xs cursor-pointer"
                  >
                    {roleOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38]"
                  >
                    Email Address <span className="text-[10px] text-[#7A8E80] font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      id="contact-email"
                      type="email"
                      maxLength={100}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] text-sm text-[#1C2821] placeholder-[#7A8E80] focus:outline-none focus:ring-2 focus:ring-[#1F4D38] focus:border-transparent transition-all shadow-2xs"
                    />
                    <Mail className="w-4 h-4 text-[#7A8E80] absolute right-4 top-3.5 pointer-events-none" />
                  </div>
                  <span className="text-[10px] text-[#7A8E80]">
                    Only if you would like Birthday Green to respond.
                  </span>
                </div>
              </div>

              {/* Field 6: Approximate Community Size */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38]">
                  Approximate Community Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {sizeOptions.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setCommunitySize(sz)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        communitySize === sz
                          ? 'surface-active shadow-2xs border-[#6F9F73]'
                          : 'bg-[#FFFDF7] border-[#DDE9D8] text-[#4D6153] hover:border-[#6F9F73]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 7: What Interests You? */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38]">
                  What interests your community? <span className="text-[10px] text-[#7A8E80] font-normal">(Select all that apply)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {interestOptions.map((opt) => {
                    const isChecked = interests.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleInterest(opt)}
                        className={`p-3 rounded-xl text-xs text-left border flex items-center justify-between transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#EEF5EC] border-[#6F9F73] text-[#1F4D38] font-bold shadow-2xs'
                            : 'bg-[#FFFDF7] border-[#DDE9D8] text-[#4D6153] hover:border-[#6F9F73]'
                        }`}
                      >
                        <span>{opt}</span>
                        {isChecked && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#6F9F73] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Field 8: Optional Message */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="inquiry-message"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38]"
                  >
                    Additional Details <span className="text-[10px] text-[#7A8E80] font-normal">(Optional)</span>
                  </label>
                  <span className="text-[10px] text-[#7A8E80]">
                    {message.length}/500
                  </span>
                </div>
                <textarea
                  id="inquiry-message"
                  rows={3}
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share any thoughts, local planting spaces, or questions..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] text-sm text-[#1C2821] placeholder-[#7A8E80] focus:outline-none focus:ring-2 focus:ring-[#1F4D38] focus:border-transparent transition-all shadow-2xs resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Submit Community Interest
                </Button>
              </div>

              {/* Section 8 & 10 Privacy and Distinction Notice */}
              <div className="pt-2 p-4 rounded-2xl bg-[#F7F3E8] border border-[#DDE9D8] space-y-1.5 text-xs text-[#4D6153]">
                <div className="flex items-center gap-1.5 font-bold text-[#1F4D38]">
                  <ShieldCheck className="w-4 h-4 text-[#6F9F73] shrink-0" />
                  <span>Privacy & Verification Guarantee:</span>
                </div>
                <p className="text-[11px] text-[#7A8E80] leading-relaxed">
                  Partner requests are completely private and never appear in public feeds or search results. Submitting this form is an expression of interest and does not imply confirmation of a partnership or an automatic increase in reached communities.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
