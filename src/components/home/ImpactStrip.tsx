import { Container } from '../common/Container';
import { ImpactCounter } from '../common/ImpactCounter';
import { ScrollReveal } from '../common/ScrollReveal';
import { useImpact } from '../../context/ImpactContext';
import { Sprout, Users, Calendar, MapPin, AlertCircle, RotateCcw } from '../common/Icons';

export function ImpactStrip() {
  const { summary, isLoading, error, refreshImpact } = useImpact();

  if (error) {
    return (
      <section className="relative py-8 surface-canvas border-y border-[#DDE9D8]/80 text-center">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[#4D6153]">
            <AlertCircle className="w-4 h-4 text-[#6F9F73]" />
            <span>Impact figures are temporarily unavailable.</span>
            <button
              onClick={() => refreshImpact()}
              className="text-[#1F4D38] font-bold underline hover:text-[#6F9F73] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative py-10 surface-canvas border-y border-[#DDE9D8]/80 shadow-xs">
      <Container>
        <ScrollReveal>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-2xl surface-elevated opacity-70" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <ImpactCounter
                label="Community Members"
                value={summary.participants}
                icon={<Users className="w-5 h-5 text-[#1F4D38]" />}
                subtext="Current community baseline"
              />
              <ImpactCounter
                label="Trees & Saplings Planted"
                value={summary.treesPlanted}
                icon={<Sprout className="w-5 h-5 text-[#1F4D38]" />}
                subtext="Historical baseline + new reports"
              />
              <ImpactCounter
                label="Communities Reached"
                value={summary.communities}
                icon={<MapPin className="w-5 h-5 text-[#1F4D38]" />}
                subtext="0 communities reached — the next chapter starts here"
              />
            </div>
          )}

          {/* Context disclosure */}
          <p className="mt-5 text-center text-xs text-[#4D6153] font-medium tracking-wide">
            Impact figures are based on community reports and include a historical planting baseline recorded before the Birthday Green website was introduced.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
