import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Sprout, Heart, RotateCcw, Calendar, Check } from '../common/Icons';

export function FourStepTimeline() {
  const steps = [
    {
      num: '01',
      title: 'FIND YOUR GREEN DAY',
      headline: 'Your personal date becomes your recurring rhythm.',
      body: 'Your birth-date number translates into your monthly Green Day. If you were born on the 16th of any month, the 16th of every subsequent month is your designated Green Day.',
      highlight: 'Example: Born on the 16th → Green Day = every 16th',
      icon: <Calendar className="w-6 h-6 text-[#1F4D38]" />,
    },
    {
      num: '02',
      title: 'SHOW UP',
      headline: 'Take a concrete environmental action.',
      body: 'When your Green Day arrives, take an environmental action. The core action is simple: plant something living. A native sapling, a balcony planter, or seeds in soil.',
      highlight: 'Action: Plant something living',
      icon: <Sprout className="w-6 h-6 text-[#1F4D38]" />,
    },
    {
      num: '03',
      title: 'NURTURE',
      headline: 'Planting is the action. Nurturing is the responsibility.',
      body: 'This is the heart of Birthday Green. Planting takes minutes; keeping a plant alive takes continuous attention. Return regularly to water, loosen the soil, and inspect its health.',
      highlight: 'Responsibility does not end after planting',
      icon: <Heart className="w-6 h-6 text-[#1F4D38]" />,
    },
    {
      num: '04',
      title: 'REPEAT',
      headline: 'Return next month and keep the cycle growing.',
      body: 'On your next Green Day, return to care for what you previously planted and introduce another living plant when appropriate. Month after month, building a personal canopy.',
      highlight: 'Rhythm: Plant → Nurture → Repeat',
      icon: <RotateCcw className="w-6 h-6 text-[#1F4D38]" />,
    },
  ];

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-canvas relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="The Four-Step Practice"
              title="The Green Day Cycle"
              description="A clear, structured timeline that turns personal birthdays into a lifetime of recurring environmental care."
            />
          </div>
        </ScrollReveal>

        {/* Timeline Visualization: Desktop Horizontal / Mobile Vertical */}
        <div className="relative my-4 sm:my-8">
          {/* Desktop Connecting Line */}
          <div
            className="hidden lg:block absolute top-[34px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#1F4D38] via-[#6F9F73] to-[#8EB892] -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <ScrollReveal key={step.num} delayMs={idx * 100}>
                <div className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center group h-full">
                  {/* Timeline Milestone Marker */}
                  <div className="flex flex-col items-center mr-3 sm:mr-5 lg:mr-0 lg:mb-6 shrink-0">
                    <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#FFFDF7] border-2 border-[#1F4D38] shadow-sm flex items-center justify-center font-display font-extrabold text-sm sm:text-xl text-[#1F4D38] group-hover:bg-[#1F4D38] group-hover:text-white transition-all duration-200">
                      {step.num}
                    </div>
                    {/* Mobile vertical line connector */}
                    {idx < steps.length - 1 && (
                      <div className="lg:hidden w-0.5 h-10 sm:h-20 bg-[#DDE9D8] my-1" aria-hidden="true" />
                    )}
                  </div>

                  {/* Step Card Container */}
                  <div className="flex-1 surface-elevated rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 border border-[#DDE9D8] group-hover:border-[#6F9F73] transition-all flex flex-col justify-between h-full shadow-xs">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#6F9F73] block mb-1">
                        Phase 0{idx + 1}
                      </span>
                      <h3 className="font-display font-extrabold text-lg text-[#1F4D38] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm font-semibold text-[#1C2821] mb-2 leading-snug">
                        {step.headline}
                      </p>
                      <p className="text-xs text-[#4D6153] leading-relaxed">
                        {step.body}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#DDE9D8]/70 flex items-center gap-2 text-xs font-semibold text-[#1F4D38]">
                      <Check className="w-3.5 h-3.5 text-[#6F9F73] shrink-0" />
                      <span className="truncate">{step.highlight}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
