import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { HelpCircle, Calendar, Sprout, Clock, Users, ShieldCheck } from '../common/Icons';

export function FivePracticalQuestionsSection() {
  const questions = [
    {
      num: '01',
      q: 'What is Birthday Green?',
      a: 'A person\'s birth-date number becomes their recurring monthly Green Day. If you were born on the 16th, the 16th of every month is your personal day to plant and nurture living soil.',
      icon: <Calendar className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '02',
      q: 'What does a participant do?',
      a: 'On their Green Day, they plant a tree or potted sapling where appropriate, and continue caring for what they started in previous months. Planting is the action; care is the responsibility.',
      icon: <Sprout className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '03',
      q: 'How often does it happen?',
      a: 'Every month, on their Green Day. Because everyone has a different birth date, the community generates a continuous daily rhythm of care throughout the entire month.',
      icon: <Clock className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '04',
      q: 'What does a coordinator do?',
      a: 'Introduce the idea to your group, share the website link, encourage responsible local planting, and help create a safe environment with appropriate permissions and watering access.',
      icon: <Users className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      num: '05',
      q: 'Does the community need an account?',
      a: 'No. There are no organization accounts, no administrator dashboards, no passwords, and no fees. The entire model is open, private, and lightweight.',
      icon: <ShieldCheck className="w-5 h-5 text-[#1F4D38]" />,
    },
  ];

  return (
    <section id="starter-kit-guide" className="py-18 sm:py-26 surface-canvas relative border-b border-[#DDE9D8]/80 scroll-mt-16">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionHeading
              eyebrow="The Essentials"
              title="Five Practical Questions"
              description="Everything a teacher, resident coordinator, student organizer, or group lead needs to know about Birthday Green."
            />
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto space-y-4">
          {questions.map((item, idx) => (
            <ScrollReveal key={item.num} delayMs={idx * 60}>
              <div className="surface-elevated rounded-2xl p-6 sm:p-7 border border-[#DDE9D8] shadow-2xs flex flex-col sm:flex-row sm:items-start gap-4 hover:border-[#6F9F73] transition-colors">
                <div className="flex items-center gap-3 sm:flex-col sm:items-center shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center text-[#1F4D38]">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#6F9F73]">
                    {item.num}
                  </span>
                </div>

                <div className="space-y-1.5 flex-1">
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#1F4D38]">
                    {item.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
