import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { useRouter } from '../../context/RouterContext';
import { useGreenDay } from '../../context/GreenDayContext';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { ArrowRight, ChevronDown, Sparkles, BookOpen, Sprout, ShieldCheck } from '../common/Icons';

export function CommunityKitHero() {
  const { openCalculator, navigate } = useRouter();
  const { savedDay, isToday } = useGreenDay();

  const handleScrollToGuide = () => {
    const el = document.getElementById('starter-kit-guide');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const personalBtnText = isToday
    ? 'Plant on My Green Day'
    : savedDay
    ? `My Green Day (${getOrdinalSuffix(savedDay)})`
    : 'Find My Green Day';

  const handlePersonalClick = () => {
    if (isToday || savedDay) {
      navigate('/participate');
    } else {
      openCalculator();
    }
  };

  return (
    <section className="relative pt-6 pb-8 sm:pt-12 sm:pb-16 overflow-hidden border-b border-[#DDE9D8]/80">
      {/* Background subconscious lighting */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[420px] bg-gradient-to-b from-[#DDE9D8]/50 via-[#F7F3E8]/30 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <ScrollReveal>
            <div className="text-[11px] sm:text-xs font-bold tracking-widest text-[#6F9F73] uppercase flex items-center justify-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1F4D38]" />
              <span>BIRTHDAY GREEN COMMUNITY KIT</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={100}>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F4D38] tracking-tight leading-tight [text-wrap:balance]">
              Bring Green Days to your community.
            </h1>
          </ScrollReveal>

          <ScrollReveal delayMs={200}>
            <p className="text-sm sm:text-lg text-[#4D6153] leading-relaxed max-w-2xl mx-auto">
              Give people a simple way to turn their birth date into a recurring monthly opportunity to plant, nurture, and return.
            </p>
          </ScrollReveal>

          <ScrollReveal delayMs={300}>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={handleScrollToGuide}
                icon={<ChevronDown className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Start With the Guide
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={handlePersonalClick}
                icon={<Sprout className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                {personalBtnText}
              </Button>
            </div>

            <p className="text-[11px] sm:text-xs text-[#7A8E80] pt-2 sm:pt-3">
              100% Free · No accounts or passwords · Self-serve community activation
            </p>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
