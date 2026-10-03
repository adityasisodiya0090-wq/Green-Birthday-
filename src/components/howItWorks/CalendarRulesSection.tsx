import { useState } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { isLeapYear, getDaysInMonth, getOrdinalSuffix } from '../../utils/greenDay';
import { Calendar, HelpCircle, CheckCircle2, Sparkles } from '../common/Icons';

export function CalendarRulesSection() {
  const [selectedRuleDay, setSelectedRuleDay] = useState<29 | 30 | 31>(31);
  const [testYear, setTestYear] = useState<number>(2026); // 2026 is normal, 2028 is leap

  const isCurrentTestYearLeap = isLeapYear(testYear);
  const febDays = getDaysInMonth(testYear, 1);

  // Example mappings for January, February, April, May
  const exampleMonths = [
    { name: 'January', monthIndex: 0 },
    { name: 'February', monthIndex: 1 },
    { name: 'April', monthIndex: 3 },
    { name: 'May', monthIndex: 4 },
  ];

  return (
    <section className="py-18 sm:py-26 surface-base relative">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionHeading
              eyebrow="Special Calendar Cases"
              title="What happens when your date isn't in the month?"
              description="A clear, universal rule ensures no steward misses their monthly moment of action."
            />
          </div>
        </ScrollReveal>

        {/* Rule Explanation Banner */}
        <ScrollReveal delayMs={100}>
          <div className="max-w-4xl mx-auto surface-elevated rounded-3xl p-7 sm:p-9 border border-[#DDE9D8] shadow-xs mb-10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#1F4D38] rounded-2xl text-white shrink-0 shadow-xs">
                <HelpCircle className="w-6 h-6 text-[#8EB892]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-[#1F4D38]">
                  The End-of-Month Rule
                </h3>
                <p className="text-sm sm:text-base text-[#4D6153] leading-relaxed">
                  If your Green Day is the <strong>29th, 30th, or 31st</strong> and that date does not exist in a particular month, your Green Day takes place on the <strong>last available day of that month</strong>.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Month-End Matrix */}
        <ScrollReveal delayMs={150}>
          <div className="max-w-4xl mx-auto surface-glass rounded-3xl p-7 sm:p-10 border border-white/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DDE9D8] gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6F9F73]">
                  Rule Demonstrator
                </span>
                <h4 className="font-display font-bold text-lg text-[#1F4D38]">
                  Select your birth date number:
                </h4>
              </div>

              {/* Day selection tabs (29, 30, 31) */}
              <div className="flex gap-2">
                {([29, 30, 31] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedRuleDay(d)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      selectedRuleDay === d
                        ? 'surface-active scale-105'
                        : 'bg-[#FFFDF7] text-[#1F4D38] border border-[#DDE9D8] hover:bg-[#DDE9D8]'
                    }`}
                  >
                    {d}th
                  </button>
                ))}
              </div>
            </div>

            {/* Mappings across months */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {exampleMonths.map((m) => {
                const totalDaysInMonth = getDaysInMonth(testYear, m.monthIndex);
                const actualObservedDay = Math.min(selectedRuleDay, totalDaysInMonth);
                const isShifted = selectedRuleDay > totalDaysInMonth;

                return (
                  <div
                    key={m.name}
                    className={`p-5 rounded-2xl border transition-all ${
                      isShifted
                        ? 'bg-[#EEF5EC] border-[#8EB892] shadow-xs'
                        : 'surface-canvas border-[#DDE9D8]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#7A8E80] uppercase">
                        {m.name} ({totalDaysInMonth}d)
                      </span>
                      {isShifted && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1F4D38] bg-[#DDE9D8] px-2 py-0.5 rounded-full">
                          Adjusted
                        </span>
                      )}
                    </div>

                    <div className="font-display font-extrabold text-2xl text-[#1F4D38] my-1">
                      {m.name} {actualObservedDay}
                    </div>

                    <p className="text-[11px] text-[#4D6153] mt-1 leading-snug">
                      {isShifted
                        ? `Month ends on ${totalDaysInMonth}th. Green Day occurs on the final day.`
                        : `Month contains day ${selectedRuleDay}. Standard Green Day.`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Section 9: Interactive Leap Year Demonstration */}
        <ScrollReveal delayMs={250}>
          <div className="max-w-4xl mx-auto mt-12 surface-elevated rounded-3xl p-7 sm:p-10 border border-[#DDE9D8] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DDE9D8] gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6F9F73] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Leap Year Mechanics
                </span>
                <h4 className="font-display font-bold text-xl text-[#1F4D38]">
                  How February Leap Years Work
                </h4>
              </div>

              {/* Year Toggle */}
              <div className="flex items-center gap-2 bg-[#F7F3E8] p-1.5 rounded-2xl border border-[#DDE9D8]">
                <button
                  type="button"
                  onClick={() => setTestYear(2026)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    testYear === 2026
                      ? 'surface-active'
                      : 'text-[#4D6153] hover:text-[#1F4D38]'
                  }`}
                >
                  Normal Year (2026)
                </button>
                <button
                  type="button"
                  onClick={() => setTestYear(2028)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    testYear === 2028
                      ? 'surface-active'
                      : 'text-[#4D6153] hover:text-[#1F4D38]'
                  }`}
                >
                  Leap Year (2028)
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-6 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#7A8E80]">
                    Tested Year: {testYear}
                  </span>
                  <span className="text-xs font-semibold text-[#1F4D38]">
                    {isCurrentTestYearLeap ? 'Leap Year (366 days)' : 'Standard Year (365 days)'}
                  </span>
                </div>
                <div className="text-lg font-display font-extrabold text-[#1F4D38]">
                  February has {febDays} days in {testYear}
                </div>
                <p className="text-xs text-[#4D6153] leading-relaxed">
                  If your Green Day is the <strong>29th</strong>, in {testYear} it will occur on <strong>February {Math.min(29, febDays)}th</strong>.
                </p>
              </div>

              <div className="surface-glass-forest p-6 rounded-2xl shadow-sm text-xs leading-relaxed space-y-2">
                <strong className="text-white block font-bold text-sm">
                  Continuous Stewardship Principle:
                </strong>
                <p className="text-[#DDE9D8]">
                  Calendar variations never interrupt your rhythm. Even in short months or leap cycles, you always have exactly one designated Green Day every calendar month.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
