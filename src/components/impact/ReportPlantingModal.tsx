import { useState, FormEvent } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { StatusMessage } from '../common/StatusMessage';
import { useImpact } from '../../context/ImpactContext';
import { CommunityType, PlantingActivitySubmission } from '../../types';
import { Sprout, ShieldCheck, Clock, CheckCircle2 } from '../common/Icons';

interface ReportPlantingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportPlantingModal({ isOpen, onClose }: ReportPlantingModalProps) {
  const { submitActivity } = useRouterAction();
  const [dayOfMonth, setDayOfMonth] = useState<number>(16);
  const [plantingDate, setPlantingDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [saplingCount, setSaplingCount] = useState<number>(1);
  const [communityType, setCommunityType] = useState<CommunityType>('individual_neighborhood');
  const [locationRegion, setLocationRegion] = useState<string>('Pune');
  const [actionType, setActionType] = useState<string>('Native sapling planted');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successInfo, setSuccessInfo] = useState<{ eligibleAt: number; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];

  function useRouterAction() {
    return useImpact();
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (saplingCount < 1) {
      setError('Please report at least 1 sapling or living plant.');
      return;
    }
    if (!locationRegion.trim()) {
      setError('Please provide a broad city or district name.');
      return;
    }

    setIsSubmitting(true);
    try {
      const submission: PlantingActivitySubmission = {
        plantingDate,
        dayOfMonth,
        plantCategory: 'tree_sapling',
        broadLocation: 'housing_society',
        communityType,
        locationRegion: locationRegion.trim(),
        saplingCount: Math.max(1, Math.floor(saplingCount)),
        actionType: actionType.trim() || 'Green Day planting',
      };

      const res = await submitActivity(submission);
      setSuccessInfo({
        eligibleAt: res.eligibleAt,
        message: res.message,
      });
    } catch (err) {
      setError('Unable to record planting activity right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccessInfo(null);
    setError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title="Report Community Planting Act"
      size="md"
    >
      {successInfo ? (
        <div className="py-4 space-y-6 text-center animate-hero-center">
          <div className="w-16 h-16 rounded-full bg-[#DDE9D8] text-[#1F4D38] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-[#1F4D38]" />
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-extrabold text-2xl text-[#1F4D38]">
              Planting Activity Recorded
            </h3>
            <p className="text-sm text-[#4D6153] leading-relaxed max-w-md mx-auto">
              Thank you for contributing to the living community record. In accordance with Birthday Green's integrity principles, your report enters a <strong>24-hour holding period</strong> before public counters update.
            </p>
          </div>

          {/* Holding Period Countdown Notice */}
          <div className="p-4 rounded-2xl surface-glass-forest text-left text-xs text-[#DDE9D8] space-y-1.5 max-w-md mx-auto">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Clock className="w-4 h-4 text-[#8EB892]" />
              <span>24-Hour Integrity Hold Active</span>
            </div>
            <p>
              Eligible for public impact on:{' '}
              <strong className="text-white">
                {new Date(successInfo.eligibleAt).toLocaleString()}
              </strong>
            </p>
            <p className="text-[11px] text-[#8EB892] pt-1 border-t border-white/20">
              * Privacy verified: No personal name, email, or telephone was recorded.
            </p>
          </div>

          <div className="pt-2">
            <Button variant="primary" size="md" onClick={handleResetAndClose}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Privacy Note */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#DDE9D8]/60 border border-[#6F9F73]/30 text-xs text-[#1F4D38]">
            <ShieldCheck className="w-4 h-4 text-[#1F4D38] shrink-0 mt-0.5" />
            <p>
              <strong>Privacy commitment:</strong> Anonymized submission. Zero full DOB, zero personal phone numbers or email addresses requested.
            </p>
          </div>

          {error && (
            <StatusMessage type="note">
              {error}
            </StatusMessage>
          )}

          {/* Form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5">
                Green Day (Day of Month)
              </label>
              <select
                value={dayOfMonth}
                onChange={(e) => setDayOfMonth(parseInt(e.target.value, 10))}
                className="w-full px-3.5 py-2.5 rounded-xl tactile-control-inset text-sm font-semibold text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38]"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    Day {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5">
                Date Planted
              </label>
              <input
                type="date"
                max={todayStr}
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl tactile-control-inset text-sm font-semibold text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5">
                Trees / Saplings Count
              </label>
              <input
                type="number"
                min={1}
                max={500}
                value={saplingCount}
                onChange={(e) => setSaplingCount(parseInt(e.target.value, 10) || 1)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl tactile-control-inset text-sm font-semibold text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5">
                Broad District / City
              </label>
              <input
                type="text"
                placeholder="e.g. Pune, Maharashtra"
                value={locationRegion}
                onChange={(e) => setLocationRegion(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl tactile-control-inset text-sm font-semibold text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5">
              Participating Community Sphere
            </label>
            <select
              value={communityType}
              onChange={(e) => setCommunityType(e.target.value as CommunityType)}
              className="w-full px-3.5 py-2.5 rounded-xl tactile-control-inset text-sm font-semibold text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38]"
            >
              <option value="individual_neighborhood">Neighborhood / Balcony / Home</option>
              <option value="housing_society">Housing Society / Residential Campus</option>
              <option value="school_college">School / College Campus</option>
              <option value="ngo_environmental">NGO / Environmental Group</option>
              <option value="community_group">Community Organization / Civic Club</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-1.5">
              Brief Action Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Planted native Neem sapling along compound wall"
              value={actionType}
              onChange={(e) => setActionType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl tactile-control-inset text-sm text-[#1C2821] focus:outline-none focus:ring-2 focus:ring-[#1F4D38]"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              isLoading={isSubmitting}
              icon={<Sprout className="w-4 h-4" />}
            >
              Submit Planting Report
            </Button>
            <Button
              type="button"
              variant="outline"
              size="md"
              fullWidth
              onClick={handleResetAndClose}
            >
              Cancel
            </Button>
          </div>

          <p className="text-[11px] text-[#7A8E80] text-center">
            Submissions enter a 24-hour holding period before contributing to public counters.
          </p>
        </form>
      )}
    </Modal>
  );
}
