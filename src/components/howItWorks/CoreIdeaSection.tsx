import { useState } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { getOrdinalSuffix, calculateNextGreenDay } from '../../utils/greenDay';
import { ArrowDown, Calendar, CheckCircle2, Info, Sparkles } from '../common/Icons';

export function CoreIdeaSection() {
  const sampleDays = [1, 5, 12, 16, 21, 29, 30, 31];
  const [selectedDay, setSelectedDay] = useState(16);

  const info = calculateNextGreenDay(selectedDay);

  return (
    <section id="core-idea-section" className="py-8 sm:py-16 lg:py-20 surface-base relative scroll-mt-16">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="The Underlying Principle"
              title="Your birthday gives you the date."
              description="A birthday happens only once a year. Birthday Green converts that single day number into a repeating monthly ritual of environmental care."
            />
          </div>
        </ScrollReveal>

        {/* Visual Transformation Flow: BIRTH DATE -> DAY NUMBER -> GREEN DAY -> MONTHLY ACTION */}
        <ScrollReveal delayMs={100}>
          <div className="max-w-4xl mx-auto surface-elevated rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xs mb-6 sm:mb-10">
            <div className="text-center mb-4 sm:mb-6">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#6F9F73]">
                The Transformation Sequence
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 items-center">
              {/* Step 1: Birth Date */}
              <div className="surface-canvas rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-center border border-[#DDE9D8]">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#7A8E80] font-bold block mb-1">
                  1. Birth Date
                </span>
                <span className="font-display font-extrabold text-base sm:text-lg text-[#1F4D38]">
                  {selectedDay} August 2010
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#4D6153] block mt-0.5 sm:mt-1">
                  Annual Milestone
                </span>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex justify-center text-[#6F9F73]">
                <span className="text-xl font-extrabold">→</span>
              </div>
              <div className="md:hidden flex justify-center text-[#6F9F73] py-0.5">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Step 2: Day Number */}
              <div className="surface-canvas rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-center border border-[#DDE9D8]">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#7A8E80] font-bold block mb-1">
                  2. Day Number
                </span>
                <span className="font-display font-extrabold text-xl sm:text-2xl text-[#1F4D38]">
                  {selectedDay}
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#4D6153] block mt-0.5 sm:mt-1">
                  Only day number extracted
                </span>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex justify-center text-[#6F9F73]">
                <span className="text-xl font-extrabold">→</span>
              </div>
              <div className="md:hidden flex justify-center text-[#6F9F73] py-0.5">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Step 3: Green Day */}
              <div className="surface-active rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-center shadow-md">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#8EB892] font-bold block mb-1">
                  3. Recurring Green Day
                </span>
                <span className="font-display font-extrabold text-base sm:text-lg text-white">
                  Every {getOrdinalSuffix(selectedDay)}
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#DDE9D8] block mt-0.5 sm:mt-1">
                  12 times each year
                </span>
              </div>
            </div>

            {/* Crucial Educational Clarification Banner */}
            <div className="mt-5 sm:mt-8 p-3 sm:p-4 rounded-xl bg-[#F7F3E8] border border-[#DDE9D8] flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#4D6153]">
              <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#6F9F73] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1F4D38] block font-semibold mb-0.5">
                  Important Distinction:
                </strong>
                The year and month of birth do not determine the Green Day. Only the day number (1–31) matters. Your age and birth year remain completely irrelevant and private.
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 4: Interactive Date Demonstration */}
        <ScrollReveal delayMs={200}>
          <div className="max-w-4xl mx-auto surface-glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg shadow-[#1F4D38]/5 border border-white/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 border-b border-[#DDE9D8] gap-2 sm:gap-3">
              <div>
                <h3 className="font-display font-bold text-base sm:text-xl text-[#1F4D38] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#6F9F73]" />
                  <span>Interactive Demonstration</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#4D6153]">
                  Select any sample day to see how the Green Day cycle dynamically maps:
                </p>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-[#6F9F73] uppercase tracking-wider bg-[#DDE9D8]/50 px-2.5 py-1 rounded-full w-fit">
                Live Preview
              </span>
            </div>

            {/* Sample Day Selector Chips */}
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2 items-center">
              <span className="text-xs font-semibold text-[#4D6153] mr-1">Choose sample day:</span>
              {sampleDays.map((d) => {
                const isSelected = selectedDay === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDay(d)}
                    className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer min-h-[38px] ${
                      isSelected
                        ? 'surface-active scale-105'
                        : 'bg-[#FFFDF7] text-[#1F4D38] border border-[#DDE9D8] hover:bg-[#DDE9D8]/70 shadow-2xs'
                    }`}
                  >
                    {getOrdinalSuffix(d)}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Demonstration Output Box */}
            <div className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-2xl surface-glass-forest shadow-md space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#8EB892] font-semibold uppercase tracking-wider">
                <span>Calculated Monthly Cycle</span>
                <span>Active Example: {getOrdinalSuffix(selectedDay)}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="text-xl sm:text-3xl md:text-4xl font-display font-extrabold text-white">
                  Every {getOrdinalSuffix(selectedDay)} of the month
                </span>
              </div>

              <div className="pt-2 border-t border-white/20 text-xs text-[#DDE9D8] flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#8EB892]" />
                  Next occurrence: <strong className="text-white">{info.formattedNextDate}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8EB892]" />
                  Status: <strong>{info.isToday ? 'Today is Green Day!' : `${info.daysRemaining} days away`}</strong>
                </span>
              </div>

              {/* Special Calendar rule explanation for 29, 30, 31 */}
              {selectedDay >= 29 && (
                <div className="mt-3 pt-3 border-t border-white/20 text-xs text-[#DDE9D8] bg-white/10 p-3 rounded-xl">
                  <strong>ℹ️ Calendar Rule for the {getOrdinalSuffix(selectedDay)}:</strong> In months that do not have {selectedDay} days (such as February or 30-day months), your Green Day occurs on the final available day of that month.
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
