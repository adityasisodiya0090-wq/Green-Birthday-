import { Container } from '../common/Container';
import { ScrollReveal } from '../common/ScrollReveal';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { Sprout, ArrowRight, ShieldCheck, Calendar, RotateCcw } from '../common/Icons';

interface ParticipationHeroProps {
  savedDay: number | null;
}

export function ParticipationHero({ savedDay }: ParticipationHeroProps) {
  const displayDay = savedDay || 16;

  const sequence = [
    { label: 'DATE', detail: savedDay ? `Every ${getOrdinalSuffix(savedDay)}` : 'Your Birth Day' },
    { label: 'PLANT', detail: 'Put living roots in soil' },
    { label: 'NURTURE', detail: 'Care month after month' },
    { label: 'REPEAT', detail: 'Return next Green Day' },
  ];

  return (
    <section className="relative pt-4 pb-8 sm:pt-12 sm:pb-16 overflow-hidden border-b border-[#DDE9D8]/80">
      {/* Background subconscious lighting */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[380px] bg-gradient-to-b from-[#DDE9D8]/50 via-[#F7F3E8]/30 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-3.5 sm:space-y-5">
          <ScrollReveal>
            <div className="text-[10px] sm:text-xs font-bold tracking-widest text-[#6F9F73] uppercase flex items-center justify-center gap-2">
              <Sprout className="w-3.5 h-3.5 text-[#1F4D38]" />
              <span>REPORT & CELEBRATE</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={100}>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F4D38] tracking-tight leading-[1.16] [text-wrap:balance]">
              Your Green Day starts here.
            </h1>
          </ScrollReveal>

          <ScrollReveal delayMs={200}>
            <p className="text-xs sm:text-base text-[#4D6153] leading-relaxed max-w-2xl mx-auto">
              «Plant something living. Nurture it. Report the action. Then do it again on your next Green Day.»
            </p>
            <p className="text-[11px] sm:text-xs text-[#7A8E80] font-medium pt-0.5 sm:pt-1">
              «Participation is free. No account is required.»
            </p>
          </ScrollReveal>

          {/* Subtle Visual Sequence: DATE -> PLANT -> NURTURE -> REPEAT */}
          <ScrollReveal delayMs={300}>
            <div className="mt-5 sm:mt-10 p-3 sm:p-6 surface-glass rounded-2xl sm:rounded-3xl border border-white/80 shadow-xs max-w-3xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 items-center">
                {sequence.map((item, idx) => (
                  <div
                    key={item.label}
                    className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl text-center border transition-all ${
                      idx === 0 && savedDay
                        ? 'surface-active shadow-sm scale-102'
                        : 'surface-canvas border-[#DDE9D8]'
                    }`}
                  >
                    <span className={`text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider block mb-0.5 ${
                      idx === 0 && savedDay ? 'text-[#8EB892]' : 'text-[#6F9F73]'
                    }`}>
                      0{idx + 1} · {item.label}
                    </span>
                    <span className={`font-display font-bold text-[11px] sm:text-sm block ${
                      idx === 0 && savedDay ? 'text-white' : 'text-[#1F4D38]'
                    }`}>
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
