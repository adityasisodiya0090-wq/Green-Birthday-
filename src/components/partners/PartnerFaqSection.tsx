import { useState } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { ChevronDown } from '../common/Icons';

interface FaqItem {
  q: string;
  a: string;
}

export function PartnerFaqSection() {
  const faqs: FaqItem[] = [
    {
      q: 'Does expressing interest mean our partnership is confirmed?',
      a: '«No. Submitting the form is an expression of interest. It does not automatically confirm a formal partnership, approve an application, or change the official count of 0 Communities Reached.»',
    },
    {
      q: 'Does participation cost anything?',
      a: '«Birthday Green participation is designed to be free.» There are no licensing charges, commercial dues, or mandatory kits.',
    },
    {
      q: 'Do participants need accounts?',
      a: '«No. The core participation flow does not require an account.» Stewards calculate their date and record planting acts with zero passwords or profiles.',
    },
    {
      q: 'Who provides the plants and manages watering?',
      a: '«The participating community remains responsible for local arrangements.» Birthday Green provides the digital framework and date mechanics; the community selects suitable native plants, ensures landowner permissions, and arranges ongoing watering.',
    },
    {
      q: 'Do we need to collect participant DOBs?',
      a: '«No. Participants can calculate their Green Day privately on their own device.» Individual birth dates never leave the participant’s browser.',
    },
    {
      q: 'Do partners have to maintain impact numbers?',
      a: '«No. Public impact is designed to be calculated automatically from eligible community-submitted activity.» Your organization is not burdened with manual tallying or spreadsheets.',
    },
    {
      q: 'Do we need to upload photos?',
      a: '«No. Photos are not required for participation.» Participation relies on integrity, personal commitment, and voluntary reporting.',
    },
    {
      q: 'Can a community organize a collective planting activity?',
      a: '«Yes. Communities can organize voluntary activities while participants remain responsible for nurturing what they plant.» A group can plant together, while individuals nurture continuously.',
    },
    {
      q: 'Are impact numbers independently verified?',
      a: '«No. Public impact figures are based on community-submitted reports and are clearly presented as such.»',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-base relative border-b border-[#DDE9D8]/80">
      <Container size="narrow">
        <ScrollReveal>
          <div className="text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="Partner Clarifications"
              title="Frequently Asked Questions"
              description="Everything your school, residential society, or civic organization needs to know before participating."
            />
          </div>
        </ScrollReveal>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={faq.q} delayMs={idx * 50}>
                <div className="surface-elevated rounded-2xl border border-[#DDE9D8] overflow-hidden transition-all shadow-2xs">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4D38]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-base sm:text-lg text-[#1F4D38]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#6F9F73] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#4D6153] leading-relaxed border-t border-[#DDE9D8]/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Contact fallback note (Section 26) */}
        <ScrollReveal delayMs={350}>
          <div className="mt-12 p-5 rounded-2xl bg-[#F7F3E8] border border-[#DDE9D8] text-center text-xs text-[#4D6153] leading-relaxed">
            <strong className="text-[#1F4D38] block font-semibold mb-1">
              Have a different idea?
            </strong>
            «If your community has a different way of participating, tell us about it through the partnership form above.»
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
