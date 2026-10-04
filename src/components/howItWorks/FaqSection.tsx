import { useState } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { ChevronDown } from '../common/Icons';

interface FaqItem {
  q: string;
  a: string;
}

export function FaqSection() {
  const faqs: FaqItem[] = [
    {
      q: 'What is a Green Day?',
      a: 'Your birth-date day number becomes your recurring monthly Green Day. If you were born on the 16th, every 16th of each month is your designated day to plant and nurture.',
    },
    {
      q: 'Do I have to create an account?',
      a: 'No account is required for the core Green Day calculation. Everything runs locally in your device browser with zero registration hurdles.',
    },
    {
      q: 'Is my full birth date public?',
      a: 'No. The exact birth date stays strictly private on your device. We only evaluate the day number (1–31). Your birth month and year are never stored or displayed.',
    },
    {
      q: 'What if my Green Day is the 31st?',
      a: 'When a month does not have a 31st (such as February, April, June, September, or November), your Green Day occurs on the last available day of that month.',
    },
    {
      q: 'What if my Green Day is the 29th?',
      a: 'Use the 29th when it exists; in February during non-leap years, your Green Day takes place on the 28th.',
    },
    {
      q: 'Does planting once complete the responsibility?',
      a: 'No. Birthday Green emphasizes continued nurturing. Planting starts the story, but regular watering, soil inspection, and tending is what ensures long-term survival.',
    },
    {
      q: 'Do I need to upload a photo?',
      a: 'No. Visual proof is never mandatory. Community participation is founded entirely on trust, personal integrity, and quiet stewardship.',
    },
    {
      q: 'Do I have to reveal my identity?',
      a: 'No public identity is required for participation. Community reports are anonymized and contain no personal profiles, phone numbers, or exact addresses.',
    },
  ];

  // Accordion state (open index)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-canvas relative border-b border-[#DDE9D8]/80">
      <Container size="narrow">
        <ScrollReveal>
          <div className="text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="Common Questions"
              title="Frequently Asked Questions"
              description="Everything you need to know about calculating your date, showing up, and participating responsibly."
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
      </Container>
    </section>
  );
}
