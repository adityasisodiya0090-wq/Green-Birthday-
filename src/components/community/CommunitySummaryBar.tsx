import { Container } from '../common/Container';
import { ScrollReveal } from '../common/ScrollReveal';
import { useImpact } from '../../context/ImpactContext';
import { Users, MapPin, Sprout } from '../common/Icons';

export function CommunitySummaryBar() {
  const { summary, isLoading } = useImpact();

  const formattedParticipants = new Intl.NumberFormat('en-IN').format(summary.participants);
  const formattedTrees = new Intl.NumberFormat('en-IN').format(summary.treesPlanted);

  return (
    <section className="py-8 surface-canvas border-b border-[#DDE9D8]/80 shadow-2xs">
      <Container>
        <ScrollReveal>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 rounded-2xl bg-[#DDE9D8]/40" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {/* Counter 1: Participants */}
              <div className="surface-elevated rounded-2xl p-4 sm:p-5 border border-[#DDE9D8] flex items-center gap-4 shadow-2xs">
                <div className="w-12 h-12 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center text-[#1F4D38] shrink-0">
                  <Users className="w-5 h-5 text-[#1F4D38]" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-2xl text-[#1F4D38] block leading-none">
                    {formattedParticipants}
                  </span>
                  <span className="text-xs font-semibold text-[#4D6153] mt-1 block">
                    Community Members
                  </span>
                  <span className="text-[10px] text-[#7A8E80] block mt-0.5">
                    Current community scale
                  </span>
                </div>
              </div>

              {/* Counter 2: Trees & Saplings */}
              <div className="surface-elevated rounded-2xl p-4 sm:p-5 border border-[#DDE9D8] flex items-center gap-4 shadow-2xs">
                <div className="w-12 h-12 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center text-[#1F4D38] shrink-0">
                  <Sprout className="w-5 h-5 text-[#1F4D38]" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-2xl text-[#1F4D38] block leading-none">
                    {formattedTrees}
                  </span>
                  <span className="text-xs font-semibold text-[#4D6153] mt-1 block">
                    Trees & Saplings Planted
                  </span>
                  <span className="text-[10px] text-[#7A8E80] block mt-0.5">
                    Historical baseline + new reports
                  </span>
                </div>
              </div>

              {/* Counter 3: Communities Reached */}
              <div className="surface-elevated rounded-2xl p-4 sm:p-5 border border-[#DDE9D8] flex items-center gap-4 shadow-2xs">
                <div className="w-12 h-12 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center text-[#1F4D38] shrink-0">
                  <MapPin className="w-5 h-5 text-[#1F4D38]" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-2xl text-[#1F4D38] block leading-none">
                    {summary.communities}
                  </span>
                  <span className="text-xs font-semibold text-[#4D6153] mt-1 block">
                    Communities Reached
                  </span>
                  <span className="text-[10px] text-[#7A8E80] block mt-0.5">
                    0 communities reached — the next chapter starts here
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Baseline Transparency Disclosure */}
          <p className="mt-5 text-center text-xs text-[#4D6153] font-medium max-w-xl mx-auto leading-relaxed">
            «Impact figures are based on community reports and include a historical planting baseline recorded before the Birthday Green website was introduced.»
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
