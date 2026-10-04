import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { useRouter } from '../../context/RouterContext';
import { ArrowRight, ChevronDown, Sprout, Calendar } from '../common/Icons';

export function HowItWorksHero() {
  const { openCalculator } = useRouter();

  const handleScrollToCycle = () => {
    const el = document.getElementById('core-idea-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-4 pb-8 sm:pt-12 sm:pb-16 overflow-hidden border-b border-[#DDE9D8]/80">
      {/* Background subconscious atmosphere */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[380px] bg-gradient-to-b from-[#DDE9D8]/50 via-[#F7F3E8]/30 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-5 text-left">
            <ScrollReveal>
              <div className="text-[10px] sm:text-xs font-bold tracking-widest text-[#6F9F73] uppercase flex items-center gap-2">
                <Sprout className="w-3.5 h-3.5 text-[#1F4D38]" />
                <span>HOW IT WORKS</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={100}>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F4D38] tracking-tight leading-[1.16] [text-wrap:balance]">
                One date. Every month.{' '}
                <span className="text-[#6F9F73] block sm:inline">
                  A growing responsibility.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delayMs={200}>
              <p className="text-xs sm:text-base text-[#4D6153] leading-relaxed max-w-xl">
                Birthday Green turns the day you were born into a recurring reminder to plant, nurture, and keep growing.
              </p>
            </ScrollReveal>

            <ScrollReveal delayMs={300}>
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5">
                <Button
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => openCalculator()}
                >
                  Find My Green Day
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  icon={<ChevronDown className="w-4 h-4" />}
                  onClick={handleScrollToCycle}
                >
                  Explore the Cycle
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Hero Date / Sprout Vignette */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal delayMs={150}>
              <div className="relative w-56 h-56 xs:w-64 xs:h-64 sm:w-80 sm:h-80 surface-glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center text-center shadow-lg shadow-[#1F4D38]/6 border border-white/80">
                {/* Concentric growth orbit */}
                <div className="absolute inset-3 sm:inset-4 rounded-full border border-dashed border-[#6F9F73]/30 pointer-events-none" />
                <div className="absolute inset-6 sm:inset-8 rounded-full border border-[#DDE9D8] pointer-events-none" />

                <div className="relative z-10 space-y-1.5 sm:space-y-2">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#DDE9D8]/70 flex items-center justify-center mx-auto text-[#1F4D38] mb-2 sm:mb-3 shadow-2xs">
                    <Calendar className="w-5 h-5 sm:w-7 sm:h-7 text-[#1F4D38]" />
                  </div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#6F9F73] font-bold block">
                    The Monthly Habit
                  </span>
                  <div className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#1F4D38] tracking-tight">
                    12 Times
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#4D6153] font-medium max-w-[200px] mx-auto pt-0.5 sm:pt-1">
                    Every year, your birth date returns to check on life you've nurtured.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
