import { ShieldCheck, Check, X } from '../common/Icons';

export function PrivacyNotice() {
  const whatWeNeed = [
    'Date of your planting activity',
    'Category of plant (tree, native, or living flora)',
    'Approximate quantity planted',
    'Broad district/city (e.g. Pune)',
    'Community setting type (school, society, home)',
  ];

  const whatWeNeverAsk = [
    'Full date of birth or birth year',
    'Mobile or phone number',
    'Home address or building number',
    'Exact GPS coordinates or map pin',
    'Account registration or password',
    'Public member profile',
    'Mandatory photographs or visual proof',
  ];

  return (
    <div className="surface-elevated rounded-3xl p-6 sm:p-9 border border-[#DDE9D8] shadow-xs mb-10">
      <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#DDE9D8]">
        <ShieldCheck className="w-5 h-5 text-[#1F4D38]" />
        <h3 className="font-display font-bold text-lg text-[#1F4D38]">
          Privacy-First Reporting Principles
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* What We Need */}
        <div className="space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#1F4D38] block">
            What We Need
          </span>
          <div className="space-y-2">
            {whatWeNeed.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4D6153]">
                <Check className="w-4 h-4 text-[#6F9F73] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What We Don't Need */}
        <div className="space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#7A8E80] block">
            What We Never Request
          </span>
          <div className="space-y-2">
            {whatWeNeverAsk.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#7A8E80]">
                <X className="w-4 h-4 text-[#B87070] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-[#DDE9D8] text-center">
        <p className="text-xs sm:text-sm font-semibold text-[#1F4D38] italic">
          «Your Green Day is personal. Your planting activity can contribute to community impact without exposing your identity.»
        </p>
      </div>
    </div>
  );
}
