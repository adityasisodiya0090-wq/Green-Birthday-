import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { CheckCircle2, ShieldCheck, AlertCircle } from '../common/Icons';

export function ActionGuidelinesSection() {
  const principles = [
    {
      title: 'Choose suitable local plants',
      desc: 'Opt for native or climate-adapted flora that thrive in your regional temperature, rainfall, and soil conditions with minimal artificial intervention.',
    },
    {
      title: 'Commit to post-planting care',
      desc: 'Plant only what you can realistically continue watering, inspecting, and tending every month. One thriving tree beats fifty neglected saplings.',
    },
    {
      title: 'Respect land rights & public spaces',
      desc: 'Always obtain necessary permissions when planting in housing society common grounds, school perimeters, or civic zones. Never plant on private land without consent.',
    },
    {
      title: 'Safeguard infrastructure & ecosystems',
      desc: 'Ensure trees are placed safe distances away from underground utility pipes, overhead electrical wires, and foundation walls.',
    },
    {
      title: 'Prioritize survival over volume',
      desc: 'Birthday Green values saplings that survive past three years into healthy maturity, rather than one-day headline planting records.',
    },
  ];

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-canvas relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="Responsible Stewardship"
              title="Your Green Day is a reminder to act."
              description="Meaningful environmental action is thoughtful, respectful of local ecologies, and rooted in ongoing responsibility."
            />
          </div>
        </ScrollReveal>

        {/* Principles Grid */}
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {principles.map((p, idx) => (
            <ScrollReveal key={p.title} delayMs={idx * 60}>
              <div className="surface-elevated rounded-2xl p-3.5 sm:p-6 border border-[#DDE9D8] flex items-start gap-3 sm:gap-4 shadow-2xs hover:border-[#6F9F73] transition-colors">
                <div className="p-1.5 sm:p-2 rounded-xl bg-[#DDE9D8]/70 text-[#1F4D38] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#1F4D38]" />
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <h4 className="font-display font-bold text-sm sm:text-lg text-[#1F4D38]">
                    {p.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Responsible Action Context Note */}
        <ScrollReveal delayMs={350}>
          <div className="max-w-4xl mx-auto mt-10 p-5 rounded-2xl bg-[#F7F3E8] border border-[#DDE9D8] text-xs text-[#4D6153] leading-relaxed text-center">
            Birthday Green does not prescribe one single species or planting method. We encourage consulting local nurseries and horticulturists to select varieties best suited for your immediate micro-climate.
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
