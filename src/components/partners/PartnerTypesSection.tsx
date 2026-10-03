import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { GraduationCap, Home, TreePine, Users } from '../common/Icons';

export function PartnerTypesSection() {
  const partnerTypes = [
    {
      title: 'Schools & Colleges',
      desc: '«Give students a simple recurring way to connect personal milestones with environmental responsibility.»',
      detail: 'Introduce the monthly ritual across academic terms. Students find their Green Day and care for potted seedlings or campus boundaries without exams, fees, or complicated clubs.',
      icon: <GraduationCap className="w-6 h-6 text-[#1F4D38]" />,
    },
    {
      title: 'Housing Societies',
      desc: '«Turn a shared community into a place where Green Days can become recurring local action.»',
      detail: 'Designate common perimeter flowerbeds, compound walls, or balcony potting zones where residents can plant on their monthly birth date and share watering duties with neighbors.',
      icon: <Home className="w-6 h-6 text-[#1F4D38]" />,
    },
    {
      title: 'NGOs & Environmental Groups',
      desc: '«Use Birthday Green as a simple framework for encouraging recurring planting and nurturing activities.»',
      detail: 'Leverage our open date-based framework to promote native species stewardship, encouraging volunteers to return month after month rather than dispersing after one-day drives.',
      icon: <TreePine className="w-6 h-6 text-[#1F4D38]" />,
    },
    {
      title: 'Community Organizations',
      desc: '«Bring the Green Day idea into clubs, groups and local community initiatives.»',
      detail: 'Engage rotary networks, running groups, morning walkers circles, or neighborhood welfare trusts in a quiet, synchronized habit that continually enriches public green spaces.',
      icon: <Users className="w-6 h-6 text-[#1F4D38]" />,
    },
  ];

  return (
    <section className="py-18 sm:py-26 surface-canvas relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionHeading
              eyebrow="Community Spheres"
              title="Who Can Participate"
              description="Any setting where people live, study, organize, or connect can become a fertile ground for recurring Green Days."
            />
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {partnerTypes.map((type, idx) => (
            <ScrollReveal key={type.title} delayMs={idx * 80}>
              <div className="surface-elevated rounded-3xl p-7 sm:p-9 border border-[#DDE9D8] shadow-2xs hover:border-[#6F9F73] hover:shadow-md transition-all duration-200 h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#DDE9D8]/70 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      {type.icon}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6F9F73]">
                      Sector 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#1F4D38] mb-2.5">
                    {type.title}
                  </h3>

                  <p className="text-sm font-semibold text-[#1C2821] mb-3 leading-snug">
                    {type.desc}
                  </p>

                  <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                    {type.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DDE9D8]/70 text-[11px] font-semibold text-[#7A8E80]">
                  Open civic framework · Zero licensing fees
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
