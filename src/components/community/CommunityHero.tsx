import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { useRouter } from '../../context/RouterContext';
import { useGreenDay } from '../../context/GreenDayContext';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { ArrowRight, Sprout, Sparkles, Building2, Users, Heart } from '../common/Icons';

export function CommunityHero() {
  const { openCalculator, navigate } = useRouter();
  const { savedDay, isToday } = useGreenDay();

  const primaryLabel = isToday
    ? 'Plant on My Green Day →'
    : savedDay
    ? `Open My Green Day (${getOrdinalSuffix(savedDay)}) →`
    : 'Find My Green Day';

  const handlePrimaryClick = () => {
    if (isToday || savedDay) {
      navigate('/participate');
    } else {
      openCalculator();
    }
  };

  const handlePartnerClick = () => {
    navigate('/partners');
  };

  const threeLevels = [
    {
      level: 'LEVEL 1',
      title: 'YOU',
      sub: 'Your Green Day',
      desc: 'One personal recurring date each month to plant and nurture.',
      icon: <Sprout className="w-4 h-4 text-[#1F4D38]" />,
    },
    {
      level: 'LEVEL 2',
      title: 'US',
      sub: 'The Collective Rhythm',
      desc: '973 Community Members whose dates weave a continuous wave of care.',
      icon: <Users className="w-4 h-4 text-[#1F4D38]" />,
    },
    {
      level: 'LEVEL 3',
      title: 'COMMUNITIES',
      sub: 'Future Organizations',
      desc: 'Schools, colleges, societies, and NGOs adopting shared Green Days.',
      icon: <Building2 className="w-4 h-4 text-[#1F4D38]" />,
    },
  ];

  return (
    <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-22 overflow-hidden border-b border-[#DDE9D8]/80">
      {/* Background subconscious organic glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[420px] bg-gradient-to-b from-[#DDE9D8]/50 via-[#F7F3E8]/30 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <ScrollReveal>
            <div className="text-xs sm:text-sm font-bold tracking-widest text-[#6F9F73] uppercase flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#1F4D38]" />
              <span>THE BIRTHDAY GREEN MOVEMENT</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={100}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F4D38] tracking-tight leading-[1.14] [text-wrap:balance]">
              A movement that grows one Green Day at a time.
            </h1>
          </ScrollReveal>

          <ScrollReveal delayMs={200}>
            <p className="text-base sm:text-xl text-[#4D6153] leading-relaxed max-w-2xl mx-auto">
              Every person brings one date. Every month, that date becomes an opportunity to plant, nurture, and return. When individual Green Days come together, they form something larger.
            </p>
          </ScrollReveal>

          <ScrollReveal delayMs={300}>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Button
                variant="primary"
                size="lg"
                onClick={handlePrimaryClick}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {primaryLabel}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={handlePartnerClick}
                icon={<Building2 className="w-4 h-4" />}
              >
                Bring Birthday Green to a Community
              </Button>
            </div>

            <p className="text-xs text-[#7A8E80] pt-3">
              Connected by shared environmental stewardship, not by profiles or social feeds · 100% private
            </p>
          </ScrollReveal>

          {/* Three Progressive Levels of Birthday Green */}
          <ScrollReveal delayMs={400}>
            <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
              {threeLevels.map((lvl) => (
                <div
                  key={lvl.level}
                  className="surface-glass rounded-2xl p-4 sm:p-5 border border-white/80 shadow-2xs space-y-2 hover:border-[#6F9F73]/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[#DDE9D8]/70 flex items-center justify-center">
                      {lvl.icon}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#6F9F73]">
                      {lvl.level}
                    </span>
                  </div>
                  <div>
                    <span className="font-display font-bold text-sm text-[#1F4D38] block">
                      {lvl.title} · {lvl.sub}
                    </span>
                    <p className="text-xs text-[#7A8E80] mt-1 leading-relaxed">
                      {lvl.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
