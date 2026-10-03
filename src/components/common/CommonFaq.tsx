import { useState } from 'react';
import { ChevronDown, HelpCircle } from './Icons';

export function CommonFaq() {
  const faqData = [
    {
      q: 'Do I need an account?',
      a: 'No. Birthday Green does not require user accounts, passwords, or personal profile creation. You can calculate your date, plant, and participate freely.',
    },
    {
      q: 'Do I need to publish my birthday?',
      a: 'No. Your birth date is only used locally inside your browser to derive your monthly Green Day number. We never ask you to disclose your full birthday publicly.',
    },
    {
      q: 'Is my full DOB shown publicly?',
      a: 'No. The system never stores or displays your birth year or full date of birth. Only your anonymized planting day (e.g. 16th) and broad city appear in community ledgers.',
    },
    {
      q: 'Does Birthday Green verify every planting?',
      a: 'No. Public activity is community-reported and relies on the civic integrity of stewards. We do not perform in-person or third-party audits.',
    },
    {
      q: 'Why is there a 24-hour holding period?',
      a: '«It creates a consistent delay before submitted activity becomes public impact.» This brief holding period establishes an automated data-integrity boundary before records update public counters.',
    },
    {
      q: 'Can I plant without submitting a report?',
      a: 'Yes. Participation does not depend on reporting. You are encouraged to plant and nurture living flora on your Green Day purely for personal and ecological fulfillment.',
    },
    {
      q: 'Do I need a photo?',
      a: 'No. Photographs are not required for participation. This avoids unnecessary storage costs, minimizes bandwidth, and respects your personal privacy.',
    },
    {
      q: 'Do I need to pay?',
      a: 'No. Core participation is designed to be completely free (₹0). There are no subscription tiers, hidden fees, or premium features.',
    },
    {
      q: 'Can my school or society participate?',
      a: 'Yes. Schools, colleges, residential societies, and civic groups can visit our Partners page to express voluntary interest in organizing collective participation.',
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="surface-elevated rounded-3xl p-6 sm:p-10 border border-[#DDE9D8] shadow-xs">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#6F9F73] flex items-center justify-center gap-1.5 mb-1.5">
          <HelpCircle className="w-4 h-4 text-[#1F4D38]" />
          <span>QUESTIONS & ANSWERS</span>
        </span>
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1F4D38]">
          Frequently Asked Questions
        </h3>
        <p className="text-xs sm:text-sm text-[#4D6153] mt-1.5">
          Clear, straightforward answers about how Birthday Green operates.
        </p>
      </div>

      <div className="space-y-3">
        {faqData.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={item.q}
              className="surface-canvas rounded-2xl border border-[#DDE9D8] overflow-hidden transition-all shadow-2xs"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4D38]"
                aria-expanded={isOpen}
              >
                <span className="font-display font-bold text-sm sm:text-base text-[#1F4D38]">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6F9F73] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#4D6153] leading-relaxed border-t border-[#DDE9D8]/50">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
