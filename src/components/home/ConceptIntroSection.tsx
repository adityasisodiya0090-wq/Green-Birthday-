import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Card } from '../common/Card';
import { ArrowRight } from '../common/Icons';

export function ConceptIntroSection() {
  const steps = [
    {
      title: 'PLANT',
      stage: 'Step 1: The Action',
      copy: 'Take an environmental action on your Green Day.',
      detail: 'Plant something living — a native tree sapling, a balcony planter, or seeds in living soil.',
      sproutVisual: (
        <div className="relative w-10 h-10 flex items-center justify-center" aria-hidden="true">
          {/* Pure CSS Seed & Shoot */}
          <div className="absolute bottom-1 w-5 h-2.5 rounded-full bg-[#4D6153]/50" />
          <div className="absolute bottom-2.5 w-0.5 h-4 bg-[#1F4D38] rounded-full" />
          <div className="absolute top-1.5 right-2 w-3.5 h-3.5 rounded-tr-full rounded-bl-full bg-[#6F9F73] border border-[#1F4D38] -rotate-45" />
        </div>
      ),
    },
    {
      title: 'NURTURE',
      stage: 'Step 2: The Responsibility',
      copy: 'Continue caring for what you have already planted.',
      detail: 'Return regularly to water, loosen soil, protect from weeds, and track growth progress.',
      sproutVisual: (
        <div className="relative w-10 h-10 flex items-center justify-center" aria-hidden="true">
          {/* Pure CSS Growing Sapling */}
          <div className="absolute bottom-1 w-0.5 h-6 bg-[#1F4D38] rounded-full" />
          <div className="absolute top-2.5 left-1 w-3 h-3 rounded-tl-full rounded-br-full bg-[#8EB892] border border-[#1F4D38] rotate-12" />
          <div className="absolute top-1.5 right-1 w-3.5 h-3.5 rounded-tr-full rounded-bl-full bg-[#6F9F73] border border-[#1F4D38] -rotate-45" />
          <div className="absolute top-0.5 w-1.5 h-1.5 rounded-full bg-[#1F4D38]" />
        </div>
      ),
    },
    {
      title: 'REPEAT',
      stage: 'Step 3: The Cycle',
      copy: 'Return on your next Green Day and keep the cycle growing.',
      detail: 'Every single month when your birth date arrives, nurture your plants and continue the rhythm.',
      sproutVisual: (
        <div className="relative w-10 h-10 flex items-center justify-center" aria-hidden="true">
          {/* Pure CSS Flourishing Tree & Cycle Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#6F9F73]/50" />
          <div className="absolute bottom-1.5 w-0.5 h-5 bg-[#1F4D38] rounded-full" />
          <div className="absolute top-2 w-5 h-5 rounded-full bg-[#6F9F73] border border-[#1F4D38] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#8EB892]" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-base relative overflow-hidden">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="The Monthly Cycle"
              title="What if your birthday could keep giving?"
              description={
                <span>
                  A birthday comes once a year. Your Green Day can come every month. By turning your birth-date number into a recurring personal reminder, you take regular environmental action all year round.
                </span>
              }
            />
          </div>
        </ScrollReveal>

        {/* 3 Step Triad Cards with visual progression connector */}
        <div className="relative">
          {/* Subtle horizontal connector line on desktop */}
          <div
            className="hidden md:block absolute top-1/2 left-[12%] right-[12%] -translate-y-12 h-0.5 border-t-2 border-dashed border-[#DDE9D8] -z-0 pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <ScrollReveal key={step.title} delayMs={idx * 120}>
                <Card
                  variant="interactive"
                  className="h-full flex flex-col justify-between group hover:border-[#6F9F73]"
                >
                  <div>
                    {/* Header with progressive sprout visual */}
                    <div className="flex items-center justify-between mb-3 sm:mb-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#DDE9D8]/70 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                        {step.sproutVisual}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#6F9F73]">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Step Title & Subtitle */}
                    <h3 className="text-lg sm:text-2xl font-display font-extrabold text-[#1F4D38] tracking-tight mb-1">
                      {step.title}
                    </h3>
                    <div className="text-xs font-semibold text-[#6F9F73] uppercase tracking-wider mb-2 sm:mb-3">
                      {step.stage}
                    </div>

                    {/* Primary Requirement Copy */}
                    <p className="text-sm sm:text-base font-semibold text-[#1C2821] leading-snug mb-1.5 sm:mb-2">
                      {step.copy}
                    </p>

                    {/* Detail copy */}
                    <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#DDE9D8]/70 flex items-center justify-between text-xs font-semibold text-[#1F4D38]">
                    <span>Monthly Habit</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6F9F73] transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Philosophical distinction callout with Level 3 glass styling */}
        <ScrollReveal delayMs={350}>
          <div className="mt-6 sm:mt-12 mx-auto max-w-3xl rounded-2xl sm:rounded-3xl surface-glass p-4 sm:p-8 text-center shadow-sm">
            <p className="text-base sm:text-xl font-display font-extrabold text-[#1F4D38]">
              “Planting is the action. Nurturing is the responsibility.”
            </p>
            <p className="mt-2 text-xs sm:text-sm text-[#4D6153] leading-relaxed max-w-xl mx-auto">
              Anyone can put a seed in the ground on a whim. The lasting transformation happens in the quiet, faithful months of continued care.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
