import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { useRouter } from '../../context/RouterContext';
import { ArrowRight, Sprout, ShieldCheck, HeartHandshake } from '../common/Icons';

interface ImpactHeroProps {
  onOpenReportModal: () => void;
}

export function ImpactHero({ onOpenReportModal }: ImpactHeroProps) {
  const { openCalculator } = useRouter();

  return (
    <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-22 overflow-hidden border-b border-[#DDE9D8]/80">
      {/* Background subconscious organic glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[400px] bg-gradient-to-b from-[#DDE9D8]/55 via-[#F7F3E8]/30 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline and Call to Action */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <ScrollReveal>
              <div className="text-xs sm:text-sm font-bold tracking-widest text-[#6F9F73] uppercase flex items-center gap-2">
                <Sprout className="w-4 h-4 text-[#1F4D38]" />
                <span>COMMUNITY LEDGER</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={100}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F4D38] tracking-tight leading-[1.14] [text-wrap:balance]">
                Small acts.{' '}
                <span className="text-[#6F9F73] block sm:inline">
                  A growing impact.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delayMs={200}>
              <p className="text-base sm:text-xl text-[#4D6153] leading-relaxed max-w-xl">
                «Every Green Day adds another action to the growing record of this community.»
              </p>
            </ScrollReveal>

            <ScrollReveal delayMs={300}>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onOpenReportModal}
                  icon={<Sprout className="w-4 h-4" />}
                >
                  Report a Planting Act
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => openCalculator()}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Find My Green Day
                </Button>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#7A8E80] pt-2">
                <ShieldCheck className="w-4 h-4 text-[#6F9F73] shrink-0" />
                <span>Zero-profile protected</span>
                <span aria-hidden="true">·</span>
                <span>24-hour verification holding period</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Organic Canopy Convergence Vignette */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal delayMs={150}>
              <div className="relative w-72 h-72 sm:w-84 sm:h-84 surface-glass rounded-3xl p-6 flex flex-col items-center justify-between text-center shadow-lg shadow-[#1F4D38]/6 border border-white/80 overflow-hidden">
                {/* Visual organic canopy network Pure CSS (Zero SVG) */}
                <div className="relative w-full h-36 sm:h-44 flex flex-col items-center justify-end pb-2" aria-hidden="true">
                  {/* Subtle circular canopy rings */}
                  <div className="absolute top-2 w-32 h-32 rounded-full border border-dashed border-[#DDE9D8]" />
                  <div className="absolute top-6 w-24 h-24 rounded-full border border-[#8EB892]/30" />

                  {/* Cluster of leaf nodes */}
                  <div className="relative z-10 flex items-center justify-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-tr-full rounded-bl-full bg-[#6F9F73] -rotate-45 shadow-2xs" />
                    <span className="w-7 h-7 rounded-full bg-[#1F4D38] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      🌱
                    </span>
                    <span className="w-5 h-5 rounded-tl-full rounded-br-full bg-[#8EB892] rotate-12 shadow-2xs" />
                  </div>

                  {/* Tree trunk and base */}
                  <div className="w-1.5 h-10 bg-[#1F4D38] rounded-full" />
                  <div className="w-16 h-1.5 bg-[#6F9F73]/40 rounded-full mt-0.5" />
                </div>

                <div className="z-10 pb-1">
                  <span className="text-xs uppercase tracking-widest text-[#6F9F73] font-bold block">
                    Individual Actions · Collective Canopy
                  </span>
                  <p className="text-[11px] text-[#4D6153] max-w-[220px] mx-auto mt-0.5">
                    Individual monthly planting acts accumulate into lasting community green cover.
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
