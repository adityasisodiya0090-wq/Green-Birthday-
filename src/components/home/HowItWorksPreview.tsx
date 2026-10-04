import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { CalendarCheck, ArrowRight } from '../common/Icons';

export function HowItWorksPreview() {
  const steps = [
    {
      num: '01',
      title: 'Find your Green Day',
      body: 'Your birth-date number becomes your recurring Green Day.',
      subtext: 'e.g. Born on the 16th? The 16th of every month.',
    },
    {
      num: '02',
      title: 'Show up',
      body: 'Plant something living on your Green Day.',
      subtext: 'A tree sapling, native shrub, or balcony planter.',
    },
    {
      num: '03',
      title: 'Keep it alive',
      body: 'Nurture what you have already planted.',
      subtext: 'Regular watering, weeding, and soil care.',
    },
    {
      num: '04',
      title: 'Do it again',
      body: 'Return on your next Green Day and continue the cycle.',
      subtext: '12 recurring opportunities every year.',
    },
  ];

  return (
    <section id="how-it-works-section" className="py-8 sm:py-16 lg:py-20 surface-canvas relative border-b border-[#DDE9D8]/80 scroll-mt-16">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-12">
            <SectionHeading
              align="left"
              eyebrow="The Practice"
              title="One date. Every month. A growing responsibility."
              description="A personal commitment designed to outlast temporary trends through steady, monthly care."
            />
            <Button
              variant="secondary"
              size="md"
              href="/how-it-works"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Complete Guide
            </Button>
          </div>
        </ScrollReveal>

        {/* Timeline Visualization: Desktop Horizontal / Mobile Vertical */}
        <div className="relative my-4 sm:my-8">
          {/* Desktop Horizontal Line */}
          <div
            className="hidden md:block absolute top-[28px] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-[#1F4D38] via-[#6F9F73] to-[#8EB892] -z-0"
            aria-hidden="true"
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 md:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <ScrollReveal key={step.num} delayMs={idx * 100}>
                <div className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center group">
                  {/* Timeline Node */}
                  <div className="flex flex-col items-center mr-3 sm:mr-4 md:mr-0 md:mb-5 shrink-0">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#FFFDF7] border-2 border-[#1F4D38] shadow-sm flex items-center justify-center font-display font-extrabold text-sm sm:text-lg text-[#1F4D38] group-hover:bg-[#1F4D38] group-hover:text-white transition-all duration-200">
                      {step.num}
                    </div>
                    {/* Mobile vertical line connector */}
                    {idx < steps.length - 1 && (
                      <div className="md:hidden w-0.5 h-8 sm:h-12 bg-[#DDE9D8] my-1" aria-hidden="true" />
                    )}
                  </div>

                  {/* Step Card Content */}
                  <div className="flex-1 surface-elevated rounded-2xl p-3.5 sm:p-6 w-full border border-[#DDE9D8] group-hover:border-[#6F9F73] transition-colors">
                    <h3 className="font-display font-bold text-sm sm:text-lg text-[#1F4D38] mb-1 sm:mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#1C2821] leading-snug mb-1">
                      {step.body}
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#7A8E80] leading-relaxed">
                      {step.subtext}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Section 16 Calendar Rule Concise Note */}
        <ScrollReveal delayMs={350}>
          <div className="mt-6 sm:mt-12 rounded-2xl surface-glass p-3.5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 border border-[#DDE9D8] shadow-xs">
            <div className="p-2 sm:p-3 rounded-xl bg-[#1F4D38] text-white shrink-0 shadow-xs">
              <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#8EB892]" />
            </div>
            <div className="text-xs sm:text-sm text-[#1C2821] leading-relaxed">
              <strong className="text-[#1F4D38] block sm:inline font-semibold">
                Calendar Rule:{' '}
              </strong>
              If your Green Day falls on the 29th, 30th, or 31st and that date does not exist in a particular month, your Green Day uses the last available day of that month.
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
