import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { GraduationCap, Home, TreePine, Building2 } from '../common/Icons';

export function CommunitySphereExamples() {
  const spheres = [
    {
      type: 'Schools & Colleges',
      subtitle: 'Distributed Student Rhythm',
      desc: 'A school or college can introduce Birthday Green as a recurring environmental activity without requiring all students to plant on a single day. Student A plants on the 5th, Student B on the 16th, and Student C on the 28th. This distributes care naturally throughout the term.',
      icon: <GraduationCap className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      type: 'Housing Societies',
      subtitle: 'Balconies & Permitted Gardens',
      desc: 'Residents independently discover their monthly dates and coordinate suitable planting where permitted. Neighbors can support each other with watering during holidays, keeping perimeter flowerbeds or apartment pots thriving year-round.',
      icon: <Home className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      type: 'NGOs & Environmental Groups',
      subtitle: 'Complementary Stewardship',
      desc: 'Environmental organizations can adopt the recurring Green Day concept alongside their existing conservation drives. It gives volunteers an ongoing rhythm to return and care for trees rather than dispersing after one-time planting events.',
      icon: <TreePine className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      type: 'Community Organizations & Circles',
      subtitle: 'Flexible Civic Rituals',
      desc: 'Clubs and neighborhood networks can celebrate member birthdays with living saplings instead of disposable items. The framework remains flexible with no fixed plant species, no fixed event dates, and no mandatory reporting.',
      icon: <Building2 className="w-5 h-5 text-[#1F4D38]" />,
    },
  ];

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-base relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="Practical Scenarios"
              title="How Different Communities Use It"
              description="Real-world settings require practical flexibility. Birthday Green adapts to balconies, shared residential grounds, or campus gardens."
            />
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {spheres.map((s, idx) => (
            <ScrollReveal key={s.type} delayMs={idx * 80}>
              <div className="surface-elevated rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#DDE9D8] shadow-2xs h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center">
                      {s.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-[#1F4D38]">
                        {s.type}
                      </h3>
                      <span className="text-xs font-semibold text-[#6F9F73]">
                        {s.subtitle}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#DDE9D8]/60 text-[11px] text-[#7A8E80]">
                  * General illustrative application. No formal institutional claims.
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
