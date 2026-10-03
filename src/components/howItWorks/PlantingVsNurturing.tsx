import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Sprout, HeartHandshake, CheckCircle2, ShieldAlert } from '../common/Icons';

export function PlantingVsNurturing() {
  const plantPoints = [
    'Take tangible environmental action',
    'Start something living in soil',
    'Mark your Green Day with intention',
    'Plant an indigenous seed or sapling',
  ];

  const nurturePoints = [
    'Continue caring through dry spells',
    'Check what you previously planted',
    'Support root growth and soil health',
    'Keep the personal responsibility going',
  ];

  return (
    <section className="py-18 sm:py-26 surface-base relative">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionHeading
              eyebrow="The Essential Distinction"
              title="Planting starts the story. Nurturing keeps it alive."
              description="A single day's planting is only the opening chapter. Without sustained monthly care, fragile saplings struggle to reach maturity."
            />
          </div>
        </ScrollReveal>

        {/* Split Visual Comparison */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Card: PLANT */}
          <ScrollReveal delayMs={100}>
            <div className="surface-elevated rounded-3xl p-8 sm:p-10 border border-[#DDE9D8] shadow-xs flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#DDE9D8]/70 flex items-center justify-center text-[#1F4D38]">
                    <Sprout className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6F9F73]">
                    The Spark
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl text-[#1F4D38] mb-2">
                  PLANT
                </h3>
                <p className="text-sm text-[#4D6153] leading-relaxed mb-6">
                  Initiating new green life into the earth. It is an intentional, energetic act of hope that marks your personal day on the calendar.
                </p>

                <div className="space-y-3 pt-4 border-t border-[#DDE9D8]">
                  {plantPoints.map((pt) => (
                    <div key={pt} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1C2821]">
                      <CheckCircle2 className="w-4 h-4 text-[#6F9F73] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#DDE9D8] text-xs font-semibold text-[#6F9F73]">
                “Planting is the action.”
              </div>
            </div>
          </ScrollReveal>

          {/* Right Card: NURTURE */}
          <ScrollReveal delayMs={200}>
            <div className="surface-glass-forest rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-white">
                    <HeartHandshake className="w-7 h-7 text-[#8EB892]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8EB892]">
                    The Substance
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl text-white mb-2">
                  NURTURE
                </h3>
                <p className="text-sm text-[#DDE9D8] leading-relaxed mb-6">
                  Returning quietly month after month to water, inspect, protect from harsh weather, and ensure roots take hold deeply.
                </p>

                <div className="space-y-3 pt-4 border-t border-white/20">
                  {nurturePoints.map((pt) => (
                    <div key={pt} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#DDE9D8]">
                      <CheckCircle2 className="w-4 h-4 text-[#8EB892] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/20 text-xs font-semibold text-[#8EB892]">
                “Nurturing is the responsibility.”
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Ethical Ecological Disclaimer Notice */}
        <ScrollReveal delayMs={300}>
          <div className="max-w-3xl mx-auto mt-12 p-4 sm:p-5 rounded-2xl bg-[#DDE9D8]/50 border border-[#6F9F73]/30 flex items-start gap-3.5 text-xs sm:text-sm text-[#4D6153]">
            <ShieldAlert className="w-5 h-5 text-[#6F9F73] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1F4D38] block font-semibold mb-0.5">
                Honest Ecological Fact:
              </strong>
              No tree planting campaign can honestly guarantee 100% survival. Real natural systems face heatwaves, soil variations, and pests. That is precisely why Birthday Green focuses on ongoing, month-after-month stewardship rather than one-off numbers.
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
