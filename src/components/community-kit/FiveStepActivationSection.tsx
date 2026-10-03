import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Megaphone, Search, Sprout, Heart, RotateCcw, Sparkles } from '../common/Icons';

export function FiveStepActivationSection() {
  const steps = [
    {
      step: '01',
      title: 'INTRODUCE',
      subtitle: 'Explain the Idea',
      quote: '«Your birthday gave you a date. Give that date a purpose.»',
      desc: 'Introduce the concept in your school bulletin, residential WhatsApp group, staff meeting, or neighborhood circle.',
      icon: <Megaphone className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      step: '02',
      title: 'FIND',
      subtitle: 'Calculate Green Day',
      quote: '«One birth date. One recurring day.»',
      desc: 'Members use the free, private in-browser calculator on their own mobile devices to find their monthly Green Day.',
      icon: <Search className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      step: '03',
      title: 'PLANT',
      subtitle: 'Start Living Roots',
      quote: '«Planting starts the story.»',
      desc: 'On their personal Green Day, stewards plant a sapling where appropriate — in a balcony container, campus ground, or residential garden.',
      icon: <Sprout className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      step: '04',
      title: 'NURTURE',
      subtitle: 'Care for What You Started',
      quote: '«Nurturing keeps it alive.»',
      desc: 'Ongoing care matters more than the initial photo. Participants ensure regular watering, stem shielding, and soil aeration.',
      icon: <Heart className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      step: '05',
      title: 'RETURN',
      subtitle: 'Continue Next Month',
      quote: '«A recurring monthly habit.»',
      desc: 'Participants come back on their following monthly date to inspect growth, tend existing roots, or plant anew. Then repeat.',
      icon: <RotateCcw className="w-5 h-5 text-[#1F4D38]" />,
    },
  ];

  return (
    <section className="py-18 sm:py-26 surface-base relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionHeading
              eyebrow="Community Sequence"
              title="The Five-Step Activation Model"
              description="A clear, memorable sequence for introducing Birthday Green into any group."
            />
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-14">
          {steps.map((st, idx) => (
            <ScrollReveal key={st.step} delayMs={idx * 60}>
              <div className="surface-elevated rounded-3xl p-5 sm:p-6 border border-[#DDE9D8] h-full flex flex-col justify-between shadow-2xs hover:border-[#6F9F73] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#6F9F73]">
                      STEP {st.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center">
                      {st.icon}
                    </div>
                  </div>

                  <h3 className="font-display font-extrabold text-base text-[#1F4D38] mb-0.5">
                    {st.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#4D6153] block mb-2">
                    {st.subtitle}
                  </span>

                  <p className="text-[11px] font-medium text-[#1F4D38] italic bg-[#F7F3E8] p-2 rounded-xl border border-[#DDE9D8] mb-3">
                    {st.quote}
                  </p>

                  <p className="text-xs text-[#7A8E80] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Visual Continuity Flow Banner */}
        <ScrollReveal delayMs={250}>
          <div className="max-w-4xl mx-auto surface-glass rounded-2xl p-6 sm:p-8 border border-white/80 text-center shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#6F9F73] block mb-3">
              The Living Flow
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-[#1F4D38]">
              <span className="px-3 py-1.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8]">INTRODUCE</span>
              <span className="text-[#6F9F73]">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8]">FIND</span>
              <span className="text-[#6F9F73]">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8]">PLANT</span>
              <span className="text-[#6F9F73]">→</span>
              <span className="px-3 py-1.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8]">NURTURE</span>
              <span className="text-[#6F9F73]">→</span>
              <span className="px-3 py-1.5 rounded-xl surface-active shadow-2xs">RETURN & REPEAT</span>
            </div>
            <p className="text-xs text-[#7A8E80] mt-3">
              Planting creates the beginning. Nurturing gives it continuity.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
