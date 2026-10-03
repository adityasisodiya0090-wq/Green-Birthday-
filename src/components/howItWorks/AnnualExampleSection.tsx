import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Calendar, Sprout, Heart, RotateCcw } from '../common/Icons';

export function AnnualExampleSection() {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return (
    <section className="py-18 sm:py-26 surface-base relative">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionHeading
              eyebrow="Annual Journey Example"
              title="A Year in the Life of a Green Day"
              description="See how twelve quiet monthly milestones compound into an enduring personal canopy over 365 days."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={100}>
          <div className="max-w-4xl mx-auto surface-glass rounded-3xl p-7 sm:p-10 border border-white/80 shadow-md">
            <div className="text-center pb-6 border-b border-[#DDE9D8]">
              <span className="text-xs uppercase tracking-widest text-[#6F9F73] font-bold block mb-1">
                Illustrative Example
              </span>
              <h3 className="font-display font-extrabold text-2xl text-[#1F4D38]">
                Steward Born on the 16th
              </h3>
              <p className="text-xs text-[#7A8E80] mt-1">
                * Note: 16th is an illustrative example only, not an actual participant.
              </p>
            </div>

            {/* 12 Months Grid */}
            <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {months.map((m, idx) => {
                const isHighlight = idx === 9; // e.g. October
                return (
                  <div
                    key={m}
                    className={`p-3.5 rounded-2xl text-center border transition-all ${
                      isHighlight
                        ? 'surface-active shadow-md scale-105'
                        : 'surface-canvas border-[#DDE9D8]'
                    }`}
                  >
                    <span className={`text-[11px] uppercase tracking-wider block font-bold ${
                      isHighlight ? 'text-[#8EB892]' : 'text-[#7A8E80]'
                    }`}>
                      {m}
                    </span>
                    <span className={`font-display text-xl font-extrabold my-0.5 block ${
                      isHighlight ? 'text-white' : 'text-[#1F4D38]'
                    }`}>
                      16th
                    </span>
                    <span className={`text-[10px] ${
                      isHighlight ? 'text-[#DDE9D8]' : 'text-[#4D6153]'
                    }`}>
                      {isHighlight ? 'Active' : 'Green Day'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Step Sequence on Active Day */}
            <div className="mt-10 p-6 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8]">
              <h4 className="text-xs uppercase tracking-widest text-[#6F9F73] font-bold mb-4 text-center">
                Action Cadence on Every 16th
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#DDE9D8]">
                  <Sprout className="w-5 h-5 text-[#1F4D38] mx-auto mb-2" />
                  <span className="font-display font-bold text-sm text-[#1F4D38] block">1. Plant</span>
                  <span className="text-[11px] text-[#4D6153]">Start new living growth</span>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#DDE9D8]">
                  <Heart className="w-5 h-5 text-[#1F4D38] mx-auto mb-2" />
                  <span className="font-display font-bold text-sm text-[#1F4D38] block">2. Nurture</span>
                  <span className="text-[11px] text-[#4D6153]">Water and weed previous plants</span>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#DDE9D8]">
                  <Calendar className="w-5 h-5 text-[#1F4D38] mx-auto mb-2" />
                  <span className="font-display font-bold text-sm text-[#1F4D38] block">3. Return Next Month</span>
                  <span className="text-[11px] text-[#4D6153]">Check back in 30 days</span>
                </div>

                <div className="p-4 rounded-xl surface-active shadow-xs">
                  <RotateCcw className="w-5 h-5 text-white mx-auto mb-2" />
                  <span className="font-display font-bold text-sm text-white block">4. Repeat</span>
                  <span className="text-[11px] text-[#DDE9D8]">Keep the cycle alive</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
