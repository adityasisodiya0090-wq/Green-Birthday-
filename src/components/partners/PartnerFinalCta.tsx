import { useRouter } from '../../context/RouterContext';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { ChevronDown, Sparkles, BookOpen } from '../common/Icons';

export function PartnerFinalCta() {
  const { navigate } = useRouter();

  const handleScrollToForm = () => {
    const el = document.getElementById('partner-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 sm:py-28 surface-base relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#DDE9D8]/50 via-transparent to-transparent -z-10"
        aria-hidden="true"
      />

      <Container size="narrow">
        <ScrollReveal>
          <div className="surface-glass-forest rounded-3xl text-center p-8 sm:p-14 relative overflow-hidden shadow-2xl">
            {/* Subtle concentric rings */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full border border-[#6F9F73]/25"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -left-16 -bottom-16 w-64 h-64 rounded-full border border-[#6F9F73]/25"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-xl mx-auto space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#8EB892] font-semibold flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start Growing Locally</span>
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
                Bring a date to your community.
              </h2>

              <p className="text-base sm:text-lg text-[#DDE9D8] leading-relaxed">
                Your community already has birthdays. Give those dates a purpose.
              </p>

              <div className="pt-2 flex justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ChevronDown className="w-4 h-4" />}
                  onClick={handleScrollToForm}
                >
                  Express Community Interest →
                </Button>
              </div>

              {/* Section 25: Partner Page Community Kit link */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/community-kit')}
                  className="text-xs text-[#DDE9D8] hover:text-white underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#8EB892]" />
                  <span>Know a school, college, society, or NGO that could explore Birthday Green? Share the Community Kit →</span>
                </button>
              </div>

              <p className="text-xs text-[#8EB892]/80 pt-2">
                100% free · Zero institutional paperwork · Plant. Nurture. Repeat.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
