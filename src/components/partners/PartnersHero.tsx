import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { useRouter } from '../../context/RouterContext';
import { ArrowRight, ChevronDown, Sparkles, BookOpen, BirthdayCake } from '../common/Icons';

export function PartnersHero() {
  const { navigate } = useRouter();

  const handleScrollToForm = () => {
    const el = document.getElementById('partner-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-6 pb-8 sm:pt-12 sm:pb-16 overflow-hidden border-b border-[#DDE9D8]/80">
      {/* Background subconscious lighting */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[400px] bg-gradient-to-b from-[#DDE9D8]/50 via-[#F7F3E8]/30 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            <ScrollReveal>
              <div className="text-[11px] sm:text-xs font-bold tracking-widest text-[#6F9F73] uppercase flex items-center gap-1.5 sm:gap-2">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1F4D38]" />
                <span>GROW WITH US</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={100}>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F4D38] tracking-tight leading-tight [text-wrap:balance]">
                Bring Birthday Green to your community.
              </h1>
            </ScrollReveal>

            <ScrollReveal delayMs={200}>
              <p className="text-sm sm:text-lg text-[#4D6153] leading-relaxed max-w-xl">
                «Schools, colleges, housing societies, NGOs, environmental groups and community organizations can help more people turn a personal date into a recurring environmental action.»
              </p>
            </ScrollReveal>

            <ScrollReveal delayMs={300}>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleScrollToForm}
                  icon={<ChevronDown className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Bring Birthday Green to Us →
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate('/how-it-works')}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  See How It Works
                </Button>
              </div>

              <div className="pt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/community-kit')}
                  className="text-xs font-semibold text-[#1F4D38] hover:text-[#6F9F73] underline flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#6F9F73]" />
                  <span>Looking for a self-serve guide? Open the Community Starter Kit →</span>
                </button>
              </div>

              <p className="text-[11px] sm:text-xs text-[#7A8E80] pt-1">
                Zero commercial fees · Privacy-first participant model · Open civic framework
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: Abstract community panels converging into organic roots & canopy */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal delayMs={150}>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 surface-glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-between text-center shadow-lg shadow-[#1F4D38]/6 border border-white/80 overflow-hidden">
                {/* Pure HTML/CSS Community Nodes (Zero SVG) */}
                <div className="relative w-full h-44 flex flex-col items-center justify-between p-2" aria-hidden="true">
                  {/* Top row: School & Society */}
                  <div className="w-full flex items-center justify-between px-2">
                    <span className="px-2.5 py-1 rounded-xl bg-[#FFFDF7] border border-[#6F9F73] text-[10px] font-bold text-[#1F4D38] shadow-2xs">
                      School
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-[#FFFDF7] border border-[#6F9F73] text-[10px] font-bold text-[#1F4D38] shadow-2xs">
                      Society
                    </span>
                  </div>

                  {/* Center Convergence Badge */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#52AB62] text-white flex items-center justify-center shadow-md border-2 border-[#DDE9D8]">
                      <BirthdayCake className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Bottom row: NGO & Civic Club */}
                  <div className="w-full flex items-center justify-between px-2">
                    <span className="px-2.5 py-1 rounded-xl bg-[#FFFDF7] border border-[#8EB892] text-[10px] font-bold text-[#1F4D38] shadow-2xs">
                      NGO
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-[#FFFDF7] border border-[#8EB892] text-[10px] font-bold text-[#1F4D38] shadow-2xs">
                      Civic Club
                    </span>
                  </div>
                </div>

                <div className="z-10 pb-1">
                  <span className="text-xs uppercase tracking-widest text-[#6F9F73] font-bold block">
                    Multiple Spheres · One Simple Concept
                  </span>
                  <p className="text-[11px] text-[#4D6153] max-w-[240px] mx-auto mt-0.5">
                    Communities adapt the monthly Green Day framework to fit their own local grounds and rhythms.
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
