import { useState, useEffect } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Button } from '../common/Button';
import { useRouter } from '../../context/RouterContext';
import { impactRepository } from '../../services/impactRepository';
import { CommunityType } from '../../types';
import { Building2, GraduationCap, Home, Users, TreePine, Sprout, ArrowRight, ShieldCheck, BookOpen } from '../common/Icons';

export function CommunityTypesSection() {
  const { navigate } = useRouter();
  const [breakdown, setBreakdown] = useState<
    { type: CommunityType; label: string; count: number; saplings: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    impactRepository.getCommunityTypeBreakdown().then((data) => {
      if (isMounted) {
        setBreakdown(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const totalActs = breakdown.reduce((acc, b) => acc + b.count, 0);

  const getIcon = (type: CommunityType) => {
    switch (type) {
      case 'school_college':
        return <GraduationCap className="w-5 h-5 text-[#1F4D38]" />;
      case 'housing_society':
        return <Home className="w-5 h-5 text-[#1F4D38]" />;
      case 'ngo_environmental':
        return <TreePine className="w-5 h-5 text-[#1F4D38]" />;
      case 'community_group':
        return <Building2 className="w-5 h-5 text-[#1F4D38]" />;
      case 'individual_neighborhood':
      default:
        return <Users className="w-5 h-5 text-[#1F4D38]" />;
    }
  };

  const communitySpheres = [
    {
      type: 'school_college',
      title: 'Schools & Colleges',
      desc: 'Students and educators celebrating birth dates through campus trees, balcony planters, and campus ecology projects.',
      icon: <GraduationCap className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      type: 'housing_society',
      title: 'Housing Societies',
      desc: 'Residential communities planting along boundaries, shared courtyards, and community gardens.',
      icon: <Home className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      type: 'ngo_environmental',
      title: 'NGOs & Environmental Groups',
      desc: 'Grassroots conservation organizations anchoring recurring monthly planting and nurturing in civic parks.',
      icon: <TreePine className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      type: 'community_group',
      title: 'Workplaces & Civic Groups',
      desc: 'Teams and neighborhood circles turning employee or member birthdays into continuous civic greenery.',
      icon: <Building2 className="w-5 h-5 text-[#1F4D38]" />,
    },
  ];

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-canvas relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="Community Spheres"
              title="Participation Across Settings"
              description="From single apartment balconies to expansive school grounds and residential layouts, stewardship takes root anywhere living soil exists."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {/* Intentional Zero-State for Reached Communities (Section 12) */}
            <div className="surface-elevated rounded-2xl sm:rounded-3xl p-5 sm:p-12 border border-[#DDE9D8] shadow-xs text-center space-y-4 sm:space-y-5 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDE9D8]/60 text-xs font-bold uppercase tracking-wider text-[#1F4D38]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Formal Organizational Outreach</span>
              </div>

              <div>
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#1F4D38] block tracking-tight">
                  0
                </span>
                <span className="font-display font-bold text-lg text-[#1F4D38] block mt-1">
                  Communities Reached
                </span>
                <p className="text-xs text-[#7A8E80] mt-0.5">
                  0 communities reached — the next chapter starts here.
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#4D6153] max-w-lg mx-auto leading-relaxed">
                Birthday Green is ready to grow into schools, colleges, housing societies, NGOs, and community organizations. We are actively inviting institutions to adopt recurring monthly Green Days.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/partners')}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Bring Birthday Green to Your Community →
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate('/community-kit')}
                  icon={<BookOpen className="w-4 h-4" />}
                >
                  View Community Starter Kit
                </Button>
              </div>
            </div>

            {/* The 4 Prospective Spheres */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {communitySpheres.map((sphere) => (
                <div
                  key={sphere.type}
                  className="surface-elevated rounded-2xl p-5 border border-[#DDE9D8] shadow-2xs space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center">
                    {sphere.icon}
                  </div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-[#1F4D38]">
                    {sphere.title}
                  </h4>
                  <p className="text-xs text-[#7A8E80] leading-relaxed">
                    {sphere.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* If actual eligible website-reported breakdown exists, display below */}
            {totalActs > 0 && (
              <div className="mt-8 pt-6 border-t border-[#DDE9D8]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6F9F73] block mb-4">
                  Community-Reported Planting Distribution
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {breakdown.map((item) => (
                    <div
                      key={item.type}
                      className="surface-elevated rounded-xl p-4 border border-[#DDE9D8] flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#DDE9D8]/60 flex items-center justify-center shrink-0">
                        {getIcon(item.type)}
                      </div>
                      <div className="text-xs">
                        <strong className="text-[#1F4D38] block font-bold">{item.label}</strong>
                        <span className="text-[#7A8E80]">{item.count} reports · {item.saplings} saplings</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
