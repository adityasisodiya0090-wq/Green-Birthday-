import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Users, CalendarCheck, Sprout, Building2, AlertCircle } from '../common/Icons';

export function CountingDistinctionSection() {
  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-base relative">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="Metric Clarity"
              title="What These Numbers Mean"
              description="To maintain complete civic integrity, Birthday Green maintains strict counting boundaries. We never conflate participants with planting events or sapling counts."
            />
          </div>
        </ScrollReveal>

        {/* The 4 Distinct Definitions Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-12">
          <ScrollReveal delayMs={80}>
            <div className="surface-elevated rounded-2xl p-3.5 sm:p-6 border border-[#DDE9D8] h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center text-[#1F4D38] mb-4">
                  <Sprout className="w-5 h-5 text-[#1F4D38]" />
                </div>
                <h4 className="font-display font-bold text-base text-[#1F4D38] mb-1.5">
                  Trees & Saplings
                </h4>
                <p className="text-xs text-[#4D6153] leading-relaxed">
                  Total individual living plants or saplings reported across accepted planting activities.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#DDE9D8] text-[11px] font-semibold text-[#6F9F73]">
                Unit of Living Flora
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={140}>
            <div className="surface-elevated rounded-2xl p-6 border border-[#DDE9D8] h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center text-[#1F4D38] mb-4">
                  <Users className="w-5 h-5 text-[#1F4D38]" />
                </div>
                <h4 className="font-display font-bold text-base text-[#1F4D38] mb-1.5">
                  Community Members
                </h4>
                <p className="text-xs text-[#4D6153] leading-relaxed">
                  People who participate in the Birthday Green movement. Does not imply accounts or passwords. Repeat participation from the same steward is only counted once.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#DDE9D8] text-[11px] font-semibold text-[#6F9F73]">
                Community Movement Stewards
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={200}>
            <div className="surface-elevated rounded-2xl p-6 border border-[#DDE9D8] h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center text-[#1F4D38] mb-4">
                  <CalendarCheck className="w-5 h-5 text-[#1F4D38]" />
                </div>
                <h4 className="font-display font-bold text-base text-[#1F4D38] mb-1.5">
                  Green Day Activities
                </h4>
                <p className="text-xs text-[#4D6153] leading-relaxed">
                  Distinct planting sessions recorded on a Green Day. One participant can submit multiple monthly activities.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#DDE9D8] text-[11px] font-semibold text-[#6F9F73]">
                Reported Action Events
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={260}>
            <div className="surface-elevated rounded-2xl p-6 border border-[#DDE9D8] h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center text-[#1F4D38] mb-4">
                  <Building2 className="w-5 h-5 text-[#1F4D38]" />
                </div>
                <h4 className="font-display font-bold text-base text-[#1F4D38] mb-1.5">
                  Communities Reached
                </h4>
                <p className="text-xs text-[#4D6153] leading-relaxed">
                  Distinct residential societies, school campuses, clubs, or regional neighborhoods represented in the reports.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#DDE9D8] text-[11px] font-semibold text-[#6F9F73]">
                Distinct Spheres Reached
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Concrete Counting Example Walkthrough */}
        <ScrollReveal delayMs={300}>
          <div className="max-w-4xl mx-auto surface-glass rounded-2xl p-6 sm:p-8 border border-white/80 shadow-xs mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F4D38] mb-3">
              How Multiple Activities Relate:
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-[#4D6153] leading-relaxed">
              <p>
                • <strong>Session 1:</strong> Participant A submits their first Green Day planting activity with <strong>5 saplings</strong>.
                <br />
                <span className="text-[#1F4D38] font-semibold">→ Result: Participants: 1 · Activities: 1 · Trees: 5</span>
              </p>
              <p>
                • <strong>Session 2:</strong> In the following month, Participant A returns and submits a second activity with <strong>2 saplings</strong>.
                <br />
                <span className="text-[#1F4D38] font-semibold">→ Result: Participants: 1 (remains 1) · Activities: 2 · Trees: 7</span>
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Mandatory Transparency Disclosure */}
        <ScrollReveal delayMs={350}>
          <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-[#F7F3E8] border border-[#DDE9D8] flex items-start gap-3.5 text-xs text-[#4D6153]">
            <AlertCircle className="w-5 h-5 text-[#6F9F73] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-[#1F4D38] block font-semibold mb-1">
                Community-Reported Disclosure:
              </strong>
              «Impact figures are based on community-submitted planting reports and are not independently verified.»
              Birthday Green is an open grassroots initiative. We never represent these numbers as audited, government-confirmed, or third-party certified.
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
