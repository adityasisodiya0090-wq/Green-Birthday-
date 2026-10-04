import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { Card } from '../common/Card';
import { GraduationCap, Building2, Trees, Users, ArrowRight } from '../common/Icons';

export function PartnersPreviewSection() {
  const groups = [
    {
      title: 'Schools & Colleges',
      description: 'Engage students with a personal, recurring environmental ritual that connects classroom learning with monthly tree care.',
      icon: <GraduationCap className="w-6 h-6 text-[#1F4D38]" />,
    },
    {
      title: 'Housing Societies',
      description: 'Transform residential campuses into shared micro-forests where residents nurture greenery on their respective monthly birthdays.',
      icon: <Building2 className="w-6 h-6 text-[#1F4D38]" />,
    },
    {
      title: 'NGOs & Environmental Groups',
      description: 'Collaborate on local sapling availability, native species selection, and community planting drives.',
      icon: <Trees className="w-6 h-6 text-[#1F4D38]" />,
    },
    {
      title: 'Community Organizations',
      description: 'Activate neighborhood groups, youth clubs, and civic circles around monthly recurring green days.',
      icon: <Users className="w-6 h-6 text-[#1F4D38]" />,
    },
  ];

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-canvas relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-12">
            <SectionHeading
              align="left"
              eyebrow="Collaborative Framework"
              title="Grow with us."
              description="Bring Birthday Green to places where people learn, live, work, and come together."
            />
            <Button
              variant="secondary"
              size="md"
              href="/partners"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Partnership Spheres
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {groups.map((group, idx) => (
            <ScrollReveal key={group.title} delayMs={idx * 80}>
              <Card
                variant="interactive"
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#DDE9D8]/60 border border-[#DDE9D8] flex items-center justify-center mb-3 sm:mb-5 shadow-2xs">
                    {group.icon}
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#1F4D38] mb-1 sm:mb-2">
                    {group.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                    {group.description}
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#DDE9D8]/60 text-[11px] sm:text-xs font-semibold text-[#6F9F73]">
                  Collaborative Sphere
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[#7A8E80]">
          Note: Birthday Green is an open grassroots initiative. Listed categories represent community sectors we invite to participate.
        </p>
      </Container>
    </section>
  );
}
