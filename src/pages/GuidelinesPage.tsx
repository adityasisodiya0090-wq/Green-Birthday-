import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { WhatWePromise } from '../components/common/WhatWePromise';
import { CommonFaq } from '../components/common/CommonFaq';
import { useRouter } from '../context/RouterContext';
import { Shield, Sprout, Heart, FileCheck2, UserCheck, Users, Trophy, AlertTriangle, CheckCircle2, Camera, ArrowRight, Sparkles } from '../components/common/Icons';

export function GuidelinesPage() {
  const { openCalculator } = useRouter();

  const guidelines = [
    {
      num: '01',
      title: 'Plant responsibly',
      quote: '«Only plant where you have permission and where planting is appropriate.»',
      detail: 'Do not plant on restricted private property, along highway margins, across underground utility corridors, or inside sensitive wildlife reserves without official authorization.',
      icon: <Sprout className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '02',
      title: 'Nurture what you plant',
      quote: '«Planting is only the beginning. Continue caring for what you plant according to the needs of the plant and the conditions of the location.»',
      detail: 'A seedling requires regular watering, weeding, and protection during its initial seasons. Real value lies in sustained recurring attention, not a single photogenic gesture.',
      icon: <Heart className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '03',
      title: 'Report honestly',
      quote: '«Only submit planting activity that actually happened.»',
      detail: 'Do not inflate the count of plants, participants, or community scale. Do not submit someone else’s activity as your own. Community impact relies on voluntary honesty.',
      icon: <FileCheck2 className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '04',
      title: 'Respect privacy',
      quote: '«Do not submit another person\'s personal information.»',
      detail: 'Never include telephone numbers, residential home addresses, private contact details, or identifying notes about family members or neighbors in activity submissions.',
      icon: <UserCheck className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '05',
      title: 'Respect communities',
      quote: '«Green Day activities should respect local communities, property, public spaces and applicable rules.»',
      detail: 'Do not trespass, obstruct pedestrian walking zones, or interfere with public municipal access. Always coordinate with housing society committees or park caretakers.',
      icon: <Users className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '06',
      title: 'No competition',
      quote: '«Birthday Green is not a competition.»',
      detail: 'The platform does not rank individuals by number of plants, frequency, or community size. There are no scoreboards, XP points, or badges implying superiority.',
      icon: <Trophy className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '07',
      title: 'Children & young participants',
      quote: '«Young participants should involve a parent, guardian, teacher or responsible adult when an activity requires permission, travel, tools, or access to a location.»',
      detail: 'We never solicit personal details from minors. Young stewards should always be accompanied by responsible adults during planting or tool handling.',
      icon: <Shield className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '08',
      title: 'Follow local rules',
      quote: '«Participants are responsible for following applicable local rules and obtaining permission where necessary.»',
      detail: 'Familiarize yourself with municipal tree planting directives, water rationing notices, and soil preservation guidelines in your local territory.',
      icon: <CheckCircle2 className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '09',
      title: 'Prioritize physical safety',
      quote: '«Choose safe locations and appropriate activities. Do not enter restricted areas or place yourself or others at unnecessary risk for a Green Day activity.»',
      detail: 'Avoid steep embankments, electrical sub-stations, loose debris, or areas lacking adequate footing. Wear appropriate gardening gloves and footwear.',
      icon: <AlertTriangle className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '10',
      title: 'Photos are optional',
      quote: '«Birthday Green does not require photographs for participation.»',
      detail: 'You are never required or pressured to upload photos. Ethical stewardship is an intrinsic personal commitment, not an online photo contest.',
      icon: <Camera className="w-5 h-5 text-[#1F4D38]" />,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* 01 — Hero (Section 27) */}
      <section className="relative pt-6 pb-8 sm:pt-12 sm:pb-16 overflow-hidden border-b border-[#DDE9D8]/80">
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[380px] bg-gradient-to-b from-[#DDE9D8]/50 via-[#F7F3E8]/30 to-transparent blur-3xl -z-10"
          aria-hidden="true"
        />
        <Container size="narrow">
          <div className="text-center space-y-4 sm:space-y-5">
            <ScrollReveal>
              <div className="text-[11px] sm:text-xs font-bold tracking-widest text-[#6F9F73] uppercase flex items-center justify-center gap-1.5 sm:gap-2">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1F4D38]" />
                <span>COMMUNITY STANDARDS</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={100}>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F4D38] tracking-tight leading-tight [text-wrap:balance]">
                Participate thoughtfully.
              </h1>
            </ScrollReveal>

            <ScrollReveal delayMs={200}>
              <p className="text-sm sm:text-lg text-[#4D6153] leading-relaxed max-w-xl mx-auto">
                «Birthday Green is simple by design. A few good practices help keep the community useful and responsible.»
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 02 — Guidelines List (Sections 28 to 37) */}
      <section className="py-8 sm:py-16 lg:py-20 surface-canvas border-b border-[#DDE9D8]/80">
        <Container size="narrow">
          <div className="space-y-3.5 sm:space-y-6">
            {guidelines.map((g, idx) => (
              <ScrollReveal key={g.num} delayMs={idx * 50}>
                <div className="surface-elevated rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#DDE9D8] shadow-2xs hover:border-[#6F9F73] transition-all">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#DDE9D8]/70 flex items-center justify-center shrink-0">
                      {g.icon}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-extrabold text-base sm:text-xl text-[#1F4D38]">
                          {g.num}. {g.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-[#1C2821] italic">
                        {g.quote}
                      </p>

                      <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                        {g.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 03 — Transparency Section (Section 38) */}
      <section className="py-8 sm:py-16 lg:py-20 surface-base border-b border-[#DDE9D8]/80">
        <Container size="narrow">
          <ScrollReveal>
            <WhatWePromise />
          </ScrollReveal>
        </Container>
      </section>

      {/* 04 — Combined FAQ (Section 39) */}
      <section className="py-8 sm:py-16 lg:py-20 surface-canvas border-b border-[#DDE9D8]/80">
        <Container size="narrow">
          <ScrollReveal>
            <CommonFaq />
          </ScrollReveal>
        </Container>
      </section>

      {/* 05 — CTA */}
      <section className="py-8 sm:py-16 lg:py-20 surface-base text-center">
        <Container size="narrow">
          <ScrollReveal>
            <div className="space-y-4 sm:space-y-6 max-w-lg mx-auto">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#1F4D38] tracking-tight">
                Ready to begin your Green Day?
              </h3>
              <p className="text-xs sm:text-base text-[#4D6153]">
                Plant something living. Nurture it. Then return on your next Green Day.
              </p>
              <div className="pt-2 flex justify-center">
                <Button
                  variant="primary"
                  size="md"
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
