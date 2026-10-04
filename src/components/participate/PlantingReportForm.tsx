import { useState, FormEvent } from 'react';
import { Button } from '../common/Button';
import { StatusMessage } from '../common/StatusMessage';
import {
  PlantCategory,
  BroadLocationCategory,
  CommunityType,
  PlantingActivitySubmission,
} from '../../types';
import {
  getPlantCategoryLabel,
  getBroadLocationLabel,
  getCommunityTypeLabel,
} from '../../services/impactRepository';
import { Calendar, Sprout, MapPin, Building2, Check, ArrowRight, ShieldCheck, ArrowLeft, Clock } from '../common/Icons';

interface PlantingReportFormProps {
  initialDay?: number | null;
  onSubmitSuccess: (data: {
    dateStr: string;
    saplingCount: number;
    plantTypeLabel: string;
    location: string;
    eligibleAt: number;
    dayOfMonth: number;
  }) => void;
  onSubmitActivity: (
    submission: PlantingActivitySubmission
  ) => Promise<{ success: boolean; activityId: string; eligibleAt: number; message: string }>;
}

export function PlantingReportForm({
  initialDay,
  onSubmitSuccess,
  onSubmitActivity,
}: PlantingReportFormProps) {
  // Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const [plantingDate, setPlantingDate] = useState<string>(todayStr);
  const [plantCategory, setPlantCategory] = useState<PlantCategory>('tree_sapling');
  const [customPlantName, setCustomPlantName] = useState<string>('');
  const [saplingCount, setSaplingCount] = useState<number>(1);
  const [broadLocation, setBroadLocation] = useState<BroadLocationCategory>('housing_society');
  const [locationRegion, setLocationRegion] = useState<string>('Pune');
  const [communityType, setCommunityType] = useState<CommunityType>('housing_society');
  const [optionalNote, setOptionalNote] = useState<string>('');

  // Review step state
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Idempotency token to prevent double-submit
  const [submissionToken] = useState<string>(() => 'tok_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8));

  // Determine day of month from the selected planting date
  const selectedDayOfMonth = plantingDate ? parseInt(plantingDate.split('-')[2], 10) : (initialDay || 16);

  const plantTypeLabel = getPlantCategoryLabel(plantCategory, customPlantName);
  const broadLocationLabel = getBroadLocationLabel(broadLocation);
  const communityTypeLabel = getCommunityTypeLabel(communityType);

  const handleProceedToReview = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!plantingDate) {
      setErrorMessage('Choose the Green Day on which you planted.');
      return;
    }

    const todayDate = new Date();
    todayDate.setHours(23, 59, 59, 999);
    const chosenDate = new Date(plantingDate);

    if (chosenDate.getTime() > todayDate.getTime()) {
      setErrorMessage('A planting report can be submitted after the planting has happened.');
      return;
    }

    if (plantCategory === 'other_plant' && !customPlantName.trim()) {
      setErrorMessage('Tell us what you planted.');
      return;
    }

    if (!saplingCount || saplingCount < 1) {
      setErrorMessage('Enter a valid number of plants.');
      return;
    }

    if (saplingCount > 500) {
      setErrorMessage('Please check the number of plants entered (maximum 500 per report).');
      return;
    }

    if (!locationRegion.trim()) {
      setErrorMessage('Please enter your broad city or district.');
      return;
    }

    setIsReviewing(true);
  };

  const handleFinalSubmit = async () => {
    if (isSubmitting) return; // Prevent double-submit
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const submission: PlantingActivitySubmission = {
        plantingDate,
        dayOfMonth: selectedDayOfMonth,
        plantCategory,
        customPlantName: customPlantName.trim() || undefined,
        saplingCount: Math.max(1, Math.min(500, Math.floor(saplingCount))),
        broadLocation,
        locationRegion: locationRegion.trim(),
        communityType,
        actionType: `${saplingCount} ${plantTypeLabel} planted`,
        optionalNote: optionalNote.trim() || undefined,
        clientSubmissionToken: submissionToken,
      };

      const result = await onSubmitActivity(submission);

      onSubmitSuccess({
        dateStr: plantingDate,
        saplingCount: Math.max(1, Math.floor(saplingCount)),
        plantTypeLabel,
        location: locationRegion.trim(),
        eligibleAt: result.eligibleAt,
        dayOfMonth: selectedDayOfMonth,
      });
    } catch (err) {
      setErrorMessage("We couldn't submit your activity yet. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="surface-glass rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-white/90 shadow-xl shadow-[#1F4D38]/6">
      {errorMessage && (
        <div className="mb-6">
          <StatusMessage type="note">
            {errorMessage}
          </StatusMessage>
        </div>
      )}

      {!isReviewing ? (
        /* STEP 1: INPUT FORM */
        <form onSubmit={handleProceedToReview} className="space-y-6" noValidate>
          <div className="pb-4 border-b border-[#DDE9D8]">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#1F4D38]">
              Record Green Day Activity
            </h3>
            <p className="text-xs sm:text-sm text-[#4D6153] mt-1">
              Your report enters a 24-hour verification hold before counting toward public community impact.
            </p>
          </div>

          {/* 1. Green Day Date */}
          <div>
            <label
              htmlFor="planting-date-input"
              className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5"
            >
              1. Green Day Date
            </label>
            <p className="text-xs text-[#7A8E80] mb-2.5">
              Select the date you planted. No birth year or full DOB is requested.
            </p>
            <div className="relative max-w-sm">
              <input
                id="planting-date-input"
                type="date"
                max={todayStr}
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl tactile-control-inset text-sm font-semibold text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38] cursor-pointer"
              />
            </div>
          </div>

          {/* 2. What did you plant? */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5">
              2. What did you plant?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl">
              {[
                { key: 'tree_sapling', label: 'Tree Sapling' },
                { key: 'native_plant', label: 'Native Plant' },
                { key: 'other_plant', label: 'Other Plant' },
              ].map((opt) => {
                const isSelected = plantCategory === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setPlantCategory(opt.key as PlantCategory)}
                    className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'surface-active border-[#1F4D38] shadow-xs'
                        : 'bg-[#FFFDF7] text-[#1C2821] border-[#DDE9D8] hover:bg-[#DDE9D8]/70'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {plantCategory === 'other_plant' && (
              <div className="mt-3 max-w-sm">
                <input
                  type="text"
                  placeholder="Specify plant (e.g. Tulsi, Aloe, Rose)"
                  value={customPlantName}
                  onChange={(e) => setCustomPlantName(e.target.value)}
                  maxLength={50}
                  className="w-full px-4 py-2.5 rounded-xl tactile-control-inset text-sm text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38]"
                />
              </div>
            )}
          </div>

          {/* 3. How Many? */}
          <div>
            <label
              htmlFor="sapling-count-input"
              className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5"
            >
              3. How many did you plant?
            </label>
            <div className="flex items-center gap-3">
              <input
                id="sapling-count-input"
                type="number"
                min={1}
                max={500}
                value={saplingCount}
                onChange={(e) => setSaplingCount(parseInt(e.target.value, 10) || 1)}
                required
                className="w-28 px-4 py-2.5 rounded-xl tactile-control-inset text-sm font-bold text-[#1F4D38] focus:outline-none focus:ring-2 focus:ring-[#1F4D38]"
              />
              <span className="text-xs text-[#7A8E80]">
                sapling{saplingCount === 1 ? '' : 's'} (min 1, max 500)
              </span>
            </div>
          </div>

          {/* 4. Where did you plant? & Broad City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="broad-location-select"
                className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5"
              >
                4. Location Category
              </label>
              <select
                id="broad-location-select"
                value={broadLocation}
                onChange={(e) => setBroadLocation(e.target.value as BroadLocationCategory)}
                className="w-full px-4 py-3 rounded-2xl tactile-control-inset text-sm font-semibold text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38] cursor-pointer"
              >
                <option value="home_community_garden">Home / Community Garden</option>
                <option value="housing_society">Housing Society Campus</option>
                <option value="school_college">School / College Grounds</option>
                <option value="public_community_space">Public / Neighborhood Space</option>
                <option value="ngo_environmental">NGO / Environmental Project</option>
                <option value="other_community_space">Other Community Space</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="location-region-input"
                className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5"
              >
                Broad City / Area
              </label>
              <input
                id="location-region-input"
                type="text"
                placeholder="e.g. Pune, Maharashtra"
                value={locationRegion}
                onChange={(e) => setLocationRegion(e.target.value)}
                required
                maxLength={60}
                className="w-full px-4 py-3 rounded-2xl tactile-control-inset text-sm font-semibold text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38]"
              />
              <span className="text-[10px] text-[#7A8E80] block mt-1">
                * No street address, flat number, or GPS pin needed
              </span>
            </div>
          </div>

          {/* 5. Community Sphere */}
          <div>
            <label
              htmlFor="community-type-select"
              className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5"
            >
              5. Community Setting
            </label>
            <select
              id="community-type-select"
              value={communityType}
              onChange={(e) => setCommunityType(e.target.value as CommunityType)}
              className="w-full max-w-sm px-4 py-3 rounded-2xl tactile-control-inset text-sm font-semibold text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38] cursor-pointer"
            >
              <option value="individual_neighborhood">Individual / Neighborhood</option>
              <option value="housing_society">Housing Society</option>
              <option value="school_college">School / College</option>
              <option value="ngo_environmental">NGO / Environmental Group</option>
              <option value="community_group">Community Organization</option>
            </select>
          </div>

          {/* 6. Optional Note */}
          <div>
            <label
              htmlFor="optional-note-input"
              className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5"
            >
              6. Optional Memory (Non-Public)
            </label>
            <input
              id="optional-note-input"
              type="text"
              placeholder="Anything you'd like to remember about this Green Day?"
              value={optionalNote}
              onChange={(e) => setOptionalNote(e.target.value)}
              maxLength={200}
              className="w-full px-4 py-2.5 rounded-xl tactile-control-inset text-xs sm:text-sm text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38]"
            />
            <span className="text-[10px] text-[#7A8E80] block mt-1">
              * Max 200 characters. Not displayed publicly.
            </span>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-[#DDE9D8]">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Review Action →
            </Button>
          </div>
        </form>
      ) : (
        /* STEP 2: REVIEW STATE (Section 10) */
        <div className="space-y-6 animate-hero-center">
          <div className="pb-4 border-b border-[#DDE9D8]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F9F73]">
              Review Before Submission
            </span>
            <h3 className="font-display font-extrabold text-2xl text-[#1F4D38] mt-1">
              Your Green Day action
            </h3>
          </div>

          <div className="surface-elevated rounded-2xl p-6 border border-[#DDE9D8] space-y-4 max-w-lg">
            <div className="flex justify-between items-center text-xs sm:text-sm pb-2.5 border-b border-[#DDE9D8]">
              <span className="font-bold text-[#7A8E80] uppercase">Date</span>
              <span className="font-display font-bold text-[#1F4D38]">{plantingDate}</span>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm pb-2.5 border-b border-[#DDE9D8]">
              <span className="font-bold text-[#7A8E80] uppercase">Action</span>
              <span className="font-semibold text-[#1F4D38]">
                Planted {saplingCount} {plantTypeLabel}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm pb-2.5 border-b border-[#DDE9D8]">
              <span className="font-bold text-[#7A8E80] uppercase">Community</span>
              <span className="font-semibold text-[#1F4D38]">{communityTypeLabel}</span>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="font-bold text-[#7A8E80] uppercase">Location</span>
              <span className="font-semibold text-[#1F4D38]">{locationRegion}</span>
            </div>
          </div>

          {/* 24-Hour Holding Transparency Note */}
          <div className="p-4 rounded-xl bg-[#EEF5EC] border border-[#8EB892] flex items-start gap-2.5 text-xs text-[#1F4D38]">
            <Clock className="w-4 h-4 text-[#6F9F73] shrink-0 mt-0.5" />
            <p>
              «Your report will enter a <strong>24-hour holding period</strong> before contributing to public impact figures.»
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={handleFinalSubmit}
              isLoading={isSubmitting}
              icon={<Check className="w-4 h-4" />}
            >
              Submit Green Day Activity
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => setIsReviewing(false)}
              disabled={isSubmitting}
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
            >
              Edit Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
