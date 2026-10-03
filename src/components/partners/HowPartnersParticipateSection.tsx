import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Megaphone, Search, Sprout, Heart, RotateCcw } from '../common/Icons';

export function HowPartnersParticipateSection() {
  const steps = [
    {
      num: '01',
      title: 'Introduce',
      sub: 'Introduce Birthday Green',
      desc: 'Share the concept across your school, college, housing society, or NGO through existing boards, announcements, or informal circles.',
      icon: <Megaphone className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '02',
      title: 'Find',
      sub: 'Discover Green Days',
      desc: 'Members use the private, zero-account in-browser tool on their personal phones to determine their recurring monthly date.',
      icon: <Search className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '03',
      title: 'Plant',
      sub: 'Encourage Planting',
      desc: 'Stewards plant on their personal Green Day, whether on a window balcony, perimeter boundary, or permitted community garden.',
      icon: <Sprout className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '04',
      title: 'Nurture',
      sub: 'Care for What You Plant',
      desc: 'Emphasize regular watering, soil aeration, and young sapling protection. Planting is an action; nurturing is the continuous responsibility.',
      icon: <Heart className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '05',
      title: 'Repeat',
      sub: 'Monthly Community Habit',
      desc: 'Let the monthly cycle become part of your community culture as different members show up on their respective dates all month long.',
      icon: <RotateCcw className="w-5 h-5 text-[#1F4D38]" />,
    },
  ];

  return (
    <section className="py-18 sm:py-26 surface-base relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionHeading
              eyebrow="The Community Model"
              title="How a Community Participates"
              description="A lightweight, organic sequence that fits seamlessly into your existing rhythm without software installations or corporate frameworks."
            />
          </div>
        </ScrollReveal>

        {/* 5-Step Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-14">
          {steps.map((st, idx) => (
            <ScrollReveal key={st.num} delayMs={idx * 60}>
              <div className="surface-elevated rounded-3xl p-5 sm:p-6 border border-[#DDE9D8] h-full flex flex-col justify-between shadow-2xs hover:border-[#6F9F73] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#6F9F73]">
                      STEP {st.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center">
                      {st.icon}
                    </div>
                  </div>

                  <h3 className="font-display font-extrabold text-base text-[#1F4D38] mb-1">
                    {st.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#4D6153] block mb-2">
                    {st.sub}
                  </span>

                  <p className="text-xs text-[#7A8E80] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Visual Partner Journey */}
        <ScrollReveal delayMs={250}>
          <div className="max-w-4xl mx-auto surface-glass rounded-2xl p-6 sm:p-8 border border-white/80 text-center shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#6F9F73] block mb-3">
              The Five-Step Community Cycle
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-[#1F4D38]">
              <span className="px-3 py-1.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8]">1. Introduce</span>
              <span className="text-[#6F9F73]">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8]">2. Find</span>
              <span className="text-[#6F9F73]">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8]">3. Plant</span>
              <span className="text-[#6F9F73]">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8]">4. Nurture</span>
              <span className="text-[#6F9F73]">→</span>
              <span className="px-3 py-1.5 rounded-xl surface-active shadow-2xs">5. Repeat</span>
            </div>
            <p className="text-[11px] text-[#7A8E80] mt-4">
              * Individual stewards participate quietly on their own dates throughout each month.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
