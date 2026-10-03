import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { WhatWePromise } from '../components/common/WhatWePromise';
import { useRouter } from '../context/RouterContext';
import { Sprout, Heart, ShieldCheck, ArrowRight, Sparkles, Check, X, Calendar, RotateCcw } from '../components/common/Icons';

export function AboutPage() {
  const { openCalculator } = useRouter();

  const sixSteps = [
    { num: '01', title: 'Your birth date gives you a day number.', desc: 'Born on the 16th? Your recurring day number is 16.' },
    { num: '02', title: 'That day becomes your Green Day.', desc: 'A personal checkpoint that arrives each month without fail.' },
    { num: '03', title: 'Every month brings another opportunity.', desc: 'Twelve regular occasions across the year to show up for nature.' },
    { num: '04', title: 'Plant something living.', desc: 'A native sapling, a balcony herb, or a compound shrub in living soil.' },
    { num: '05', title: 'Nurture what you planted.', desc: 'Carry water, loosen soil, check growth, and protect the stem.' },
    { num: '06', title: 'Return again next month.', desc: 'Repeat the cycle on your next Green Day. Plant. Nurture. Repeat.' },
  ];

  const whatItIs = [
    'A community environmental initiative',
    'A recurring Green Day concept',
    'An established baseline of 973 participants and 23,659 trees & saplings planted',
    'A privacy-conscious participation platform',
    'A way to record community-reported planting activity',
    'A framework for encouraging planting and nurturing',
  ];

  const whatItIsNot = [
    'A government program or municipal body',
    'A substitute for professional environmental organizations',
    'A certification authority or auditing agency',
    'A guarantee that every reported plant survives',
    'A system for independently verifying every planting report',
    'A public social network with profiles or followers',
    'A membership club with fees or dues',
    'A system requiring participants to disclose their full birth date publicly',
  ];

  return (
    <div className="flex flex-col">
      {/* 01 — Hero (Section 3) */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-22 overflow-hidden border-b border-[#DDE9D8]/80">
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[400px] bg-gradient-to-b from-[#DDE9D8]/50 via-[#F7F3E8]/30 to-transparent blur-3xl -z-10"
          aria-hidden="true"
        />
        <Container size="narrow">
          <div className="text-center space-y-6">
            <ScrollReveal>
              <div className="text-xs sm:text-sm font-bold tracking-widest text-[#6F9F73] uppercase flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1F4D38]" />
                <span>WHY BIRTHDAY GREEN?</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={100}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F4D38] tracking-tight leading-[1.14] [text-wrap:balance]">
                What if your birthday could keep giving?
              </h1>
            </ScrollReveal>

            <ScrollReveal delayMs={200}>
              <p className="text-base sm:text-xl text-[#4D6153] leading-relaxed max-w-xl mx-auto">
                «A birthday happens once a year. Your Green Day can happen every month.»
              </p>
              <p className="text-xs sm:text-sm text-[#7A8E80] max-w-lg mx-auto pt-2">
                «Birthday Green turns the day of your birth into a recurring reminder to plant something living, nurture it, and return to the responsibility again.»
              </p>
            </ScrollReveal>

            <ScrollReveal delayMs={300}>
              <div className="pt-2 flex justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => openCalculator()}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Find My Green Day
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 02 — The Idea (Section 4) */}
      <section className="py-18 sm:py-26 surface-canvas border-b border-[#DDE9D8]/80">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <SectionHeading
                eyebrow="The Concept"
                title="One date. Every month. A growing responsibility."
                description="A simple, personal mechanism to transform an annual celebration into a sustained ecological habit."
              />
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sixSteps.map((step, idx) => (
              <ScrollReveal key={step.num} delayMs={idx * 70}>
                <div className="surface-elevated rounded-3xl p-6 sm:p-7 border border-[#DDE9D8] h-full flex flex-col justify-between shadow-2xs">
                  <div>
                    <span className="font-display font-extrabold text-2xl text-[#6F9F73] block mb-3">
                      {step.num}
                    </span>
                    <h3 className="font-display font-bold text-base text-[#1F4D38] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delayMs={300}>
            <div className="text-center">
              <span className="inline-block px-5 py-2 rounded-full surface-glass font-display font-extrabold text-xs sm:text-sm text-[#1F4D38] tracking-wider uppercase border border-white/80 shadow-2xs">
                Plant · Nurture · Repeat 🌱
              </span>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 03 — The Philosophy (Section 5) */}
      <section className="py-18 sm:py-26 surface-base border-b border-[#DDE9D8]/80">
        <Container size="narrow">
          <ScrollReveal>
            <div className="surface-glass-forest rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden space-y-6 text-center">
              <span className="text-xs uppercase tracking-widest text-[#8EB892] font-semibold block">
                The Guiding Principle
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
                Planting is an action. Nurturing is a responsibility.
              </h2>

              <p className="text-base sm:text-lg text-[#DDE9D8] leading-relaxed max-w-xl mx-auto italic">
                «A tree is not an achievement simply because it was planted. Its real value begins with the care that follows.»
              </p>

              <div className="pt-2 text-xs sm:text-sm text-[#DDE9D8]/90 max-w-xl mx-auto leading-relaxed border-t border-white/20 pt-6">
                «Birthday Green is designed around that distinction. The goal is not to encourage people to plant something once and forget it. The goal is to create a recurring reminder to keep caring.»
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 04 — Why a Monthly Green Day? (Section 6) */}
      <section className="py-16 sm:py-22 surface-canvas border-b border-[#DDE9D8]/80">
        <Container size="narrow">
          <ScrollReveal>
            <div className="surface-elevated rounded-3xl p-7 sm:p-10 border border-[#DDE9D8] shadow-xs space-y-4 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6F9F73]">
                Human Psychology & Habit
              </span>
              <h3 className="font-display font-extrabold text-2xl text-[#1F4D38]">
                Why a Monthly Green Day?
              </h3>
              <p className="text-sm sm:text-base text-[#4D6153] leading-relaxed max-w-xl mx-auto">
                «Birthdays are naturally memorable. Birthday Green uses that existing personal connection with a date to create a recurring reminder for environmental action.»
              </p>
              <p className="text-xs text-[#7A8E80] leading-relaxed max-w-lg mx-auto pt-2">
                We make no extravagant claims of solving the global climate crisis overnight. Instead, we offer a steady, quiet personal commitment to ensure living flora actually receives water, protection, and sustained attention.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 05 & 06 — What Birthday Green Is & Is Not (Sections 7 & 8) */}
      <section className="py-18 sm:py-26 surface-base border-b border-[#DDE9D8]/80">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <SectionHeading
                eyebrow="Radical Transparency"
                title="What Birthday Green Is — and What It Is Not"
                description="We believe lasting civic trust requires explicit boundaries. Here is exactly what this project is and what it never claims to be."
              />
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What Birthday Green Is */}
            <ScrollReveal delayMs={100}>
              <div className="surface-elevated rounded-3xl p-7 sm:p-9 border border-[#DDE9D8] h-full shadow-2xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#DDE9D8]">
                  <Check className="w-5 h-5 text-[#1F4D38]" />
                  <h3 className="font-display font-bold text-lg text-[#1F4D38]">
                    Birthday Green is:
                  </h3>
                </div>
                <div className="space-y-3">
                  {whatItIs.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4D6153]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6F9F73] shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* What Birthday Green Is Not */}
            <ScrollReveal delayMs={200}>
              <div className="surface-glass rounded-3xl p-7 sm:p-9 border border-white/80 h-full shadow-2xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#DDE9D8]">
                  <X className="w-5 h-5 text-[#B87070]" />
                  <h3 className="font-display font-bold text-lg text-[#B87070]">
                    Birthday Green is not:
                  </h3>
                </div>
                <div className="space-y-3">
                  {whatItIsNot.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#7A8E80]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B87070] shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 07 — Who Can Participate? & The Green Day Rule (Sections 9 & 10) */}
      <section className="py-18 sm:py-26 surface-canvas border-b border-[#DDE9D8]/80">
        <Container size="narrow">
          <ScrollReveal>
            <div className="space-y-12">
              {/* Who can participate */}
              <div className="surface-elevated rounded-3xl p-7 sm:p-10 border border-[#DDE9D8] shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#DDE9D8]">
                  <Sprout className="w-5 h-5 text-[#1F4D38]" />
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#1F4D38]">
                    Who can participate?
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                  Anyone who wants to participate can use the core Birthday Green experience. Participation does not require:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-semibold text-[#1F4D38]">
                  <span className="p-2.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center">No account</span>
                  <span className="p-2.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center">No membership fees</span>
                  <span className="p-2.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center">No public profile</span>
                  <span className="p-2.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center">No phone number</span>
                  <span className="p-2.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center">No photographs</span>
                  <span className="p-2.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-center">No public DOB</span>
                </div>
              </div>

              {/* The Green Day Rule */}
              <div className="surface-elevated rounded-3xl p-7 sm:p-10 border border-[#DDE9D8] shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#DDE9D8]">
                  <Calendar className="w-5 h-5 text-[#1F4D38]" />
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#1F4D38]">
                    The Green Day Date Rule
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                  If your birth date is the <strong>16th</strong>, your Green Day is the <strong>16th of every month</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-[#F7F3E8] border border-[#DDE9D8] text-xs text-[#4D6153] space-y-2">
                  <p className="font-semibold text-[#1F4D38]">
                    For dates that do not exist in a particular month:
                  </p>
                  <p className="italic">
                    «When a month does not contain the participant's usual day number, the Green Day uses the last available day of that month.»
                  </p>
                  <ul className="list-disc pl-5 space-y-1 pt-1 text-[11px] text-[#7A8E80]">
                    <li>29th → last available day in February (28th or 29th in leap years)</li>
                    <li>30th → last available day in February</li>
                    <li>31st → last available day in shorter 30-day months</li>
                  </ul>
                </div>
                <p className="text-[11px] text-[#7A8E80]">
                  The Birthday Green calculator handles the exact date automatically on your device.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 08 — Transparency Promises (Section 38) */}
      <section className="py-18 sm:py-26 surface-base border-b border-[#DDE9D8]/80">
        <Container size="narrow">
          <ScrollReveal>
            <WhatWePromise />
          </ScrollReveal>
        </Container>
      </section>

      {/* 09 — Final CTA */}
      <section className="py-18 sm:py-24 surface-canvas text-center">
        <Container size="narrow">
          <ScrollReveal>
            <div className="space-y-6 max-w-lg mx-auto">
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#1F4D38] tracking-tight">
                Turn your date into a living purpose.
              </h3>
              <p className="text-sm sm:text-base text-[#4D6153]">
                Find your Green Day in five seconds. 100% private, free, and account-free.
              </p>
              <div className="pt-2 flex justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => openCalculator()}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Find My Green Day
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </div>
  );
}
