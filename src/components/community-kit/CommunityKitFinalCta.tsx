import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { useRouter } from '../../context/RouterContext';
import { useGreenDay } from '../../context/GreenDayContext';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { ArrowRight, Building2, Sprout, Heart, Sparkles, BookOpen } from '../common/Icons';

export function CommunityKitFinalCta() {
  const { openCalculator, navigate } = useRouter();
  const { savedDay, isToday } = useGreenDay();

  const personalBtnText = isToday
    ? 'Plant on My Green Day →'
    : savedDay
    ? `Open My Green Day (${getOrdinalSuffix(savedDay)}) →`
    : 'Find My Green Day';

  const handlePersonalClick = () => {
    if (isToday || savedDay) {
      navigate('/participate');
    } else {
      openCalculator();
    }
  };

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-base relative overflow-hidden">
      {/* Background ambient gradient glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#DDE9D8]/50 via-transparent to-transparent -z-10"
        aria-hidden="true"
      />

      <Container size="narrow">
        <ScrollReveal>
          <div className="space-y-6 sm:space-y-12">
            {/* The Nurture Mandate Card (Section 25) */}
            <div className="surface-elevated rounded-2xl sm:rounded-3xl p-5 sm:p-12 border border-[#DDE9D8] text-center space-y-3 sm:space-y-4 shadow-xs">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#6F9F73]">
                THE STAGED RESPONSIBILITY
              </span>
              <h3 className="font-display font-extrabold text-lg sm:text-2xl md:text-3xl text-[#1F4D38] tracking-tight">
                Planting starts the story. Nurturing keeps it alive.
              </h3>
              <p className="text-xs sm:text-base text-[#4D6153] leading-relaxed max-w-xl mx-auto">
                Community activation is not an event day that ends when the sapling is placed in the ground. The true beauty of Birthday Green is the quiet recurring monthly return — returning to water, weed, aerate, and observe.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-[#7A8E80]">
                <span className="flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-[#1F4D38]" />
                  <span>Month 1: Plant</span>
                </span>
                <span className="text-[#6F9F73]">→</span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#6F9F73]" />
                  <span>Months 2+: Nurture</span>
                </span>
                <span className="text-[#6F9F73]">→</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#8EB892]" />
                  <span>Year-Round Canopy</span>
                </span>
              </div>
            </div>

            {/* Final Two-Way Activation Surface (Section 20 & 21) */}
            <div className="surface-glass-forest rounded-2xl sm:rounded-3xl text-center p-6 sm:p-14 relative overflow-hidden shadow-2xl">
              {/* Concentric ambient rings */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full border border-[#6F9F73]/25"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -left-16 -bottom-16 w-64 h-64 rounded-full border border-[#6F9F73]/25"
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-xl mx-auto space-y-4 sm:space-y-6">
                <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#8EB892] font-semibold flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ready to Begin?</span>
                </span>

                <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
                  Start individually. Grow collectively.
                </h2>

                <p className="text-xs sm:text-base text-[#DDE9D8] leading-relaxed">
                  Experience your own Green Day first, or explore bringing Birthday Green to your campus, housing society, or NGO.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <Button
                    variant="secondary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                    onClick={handlePersonalClick}
                    className="w-full sm:w-auto"
                  >
                    {personalBtnText}
                  </Button>

                  <Button
                    variant="outline"
                    size="md"
                    className="text-white border-white/30 hover:bg-white/10 hover:border-white w-full sm:w-auto"
                    icon={<Building2 className="w-4 h-4" />}
                    onClick={() => navigate('/partners')}
                  >
                    Explore Formal Partnership
                  </Button>
                </div>

                <p className="text-[11px] sm:text-xs text-[#8EB892]/80 pt-1 sm:pt-2">
                  100% Free · ₹0 cost · Zero accounts required
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
