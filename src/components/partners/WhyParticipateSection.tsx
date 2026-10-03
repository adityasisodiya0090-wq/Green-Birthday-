import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Check, X, ShieldCheck, HeartHandshake, Compass, AlertCircle } from '../common/Icons';

export function WhyParticipateSection() {
  const whatYouGet = [
    {
      title: 'A Green Day Framework',
      desc: 'A simple recurring environmental concept tied naturally to personal birth dates rather than sporadic annual holidays.',
    },
    {
      title: 'Digital Participation Experience',
      desc: 'Members discover their Green Day and report plantings via the free, zero-account web tool on their own devices.',
    },
    {
      title: 'Nurture-First Philosophy',
      desc: 'The initiative emphasizes quiet, ongoing seasonal care rather than one-off photo shoots or competitive metrics.',
    },
    {
      title: 'Community Visibility',
      desc: 'Eligible aggregate activity can contribute to the broader, transparent Birthday Green community impact ledger.',
    },
  ];

  const whatYouDontNeed = [
    'No organization accounts, logins, or password management',
    'No paid subscriptions, software licenses, or commercial fees',
    'No member rosters, personal birth date spreadsheets, or phone lists',
    'No custom app downloads or mandatory photo verification uploads',
    'No complicated hardware, sensors, or IT integration',
  ];

  return (
    <section className="py-18 sm:py-26 surface-canvas relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionHeading
              eyebrow="Practical Alignment"
              title="What You Get & What You Don't Need"
              description="A lightweight civic framework designed to minimize administrative burdens while maximizing sustained, real-world care."
            />
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left: What You Get */}
          <ScrollReveal delayMs={100}>
            <div className="surface-elevated rounded-3xl p-7 sm:p-9 border border-[#DDE9D8] h-full shadow-2xs space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#DDE9D8]">
                <HeartHandshake className="w-5 h-5 text-[#1F4D38]" />
                <h3 className="font-display font-bold text-lg text-[#1F4D38]">
                  What Birthday Green Provides
                </h3>
              </div>

              <div className="space-y-4">
                {whatYouGet.map((item) => (
                  <div key={item.title} className="space-y-1">
                    <span className="font-display font-bold text-sm text-[#1F4D38] flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#6F9F73] shrink-0" />
                      {item.title}
                    </span>
                    <p className="text-xs text-[#4D6153] pl-6 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-[#7A8E80] border-t border-[#DDE9D8]/70">
                * Birthday Green does not supply physical saplings, grants, awards, or certificates.
              </div>
            </div>
          </ScrollReveal>

          {/* Right: What You Don't Need */}
          <ScrollReveal delayMs={200}>
            <div className="surface-glass rounded-3xl p-7 sm:p-9 border border-white/80 h-full shadow-2xs space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#DDE9D8]">
                <ShieldCheck className="w-5 h-5 text-[#1F4D38]" />
                <h3 className="font-display font-bold text-lg text-[#1F4D38]">
                  What You Don't Need
                </h3>
              </div>

              <div className="space-y-3.5">
                {whatYouDontNeed.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#7A8E80]">
                    <X className="w-4 h-4 text-[#B87070] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-[#DDE9D8]/70 text-[11px] text-[#4D6153] italic">
                «Birthday Green provides the digital framework; participating communities provide the real-world participation.»
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Section 5: Clear Division of Responsibilities */}
        <ScrollReveal delayMs={300}>
          <div className="max-w-5xl mx-auto surface-elevated rounded-3xl p-6 sm:p-8 border border-[#DDE9D8] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F4D38]">
              <Compass className="w-4 h-4 text-[#6F9F73]" />
              <span>Division of Responsibilities</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#4D6153] leading-relaxed">
              <div className="space-y-1.5 p-4 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8]">
                <strong className="text-[#1F4D38] block font-bold">Birthday Green Responsibility:</strong>
                <p>
                  Provides the conceptual model, date calculation algorithms, zero-account participant reporting, recurring reminders, and transparent community metrics.
                </p>
              </div>

              <div className="space-y-1.5 p-4 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8]">
                <strong className="text-[#1F4D38] block font-bold">Community Responsibility:</strong>
                <p>
                  Responsible for obtaining local land permissions, ensuring participant safety, identifying appropriate planting sites, selecting native species, and arranging practical water access.
                </p>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#7A8E80] flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-[#6F9F73] shrink-0" />
              <span>Birthday Green does not physically supervise local planting locations or guarantee specific biological survival rates.</span>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
