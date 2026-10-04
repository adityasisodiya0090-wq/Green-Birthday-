import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Button } from '../common/Button';
import { GrowthTimelinePoint } from '../../types';
import { Sprout, TrendingUp, Sparkles } from '../common/Icons';

interface GrowthVisualizationProps {
  timeline: GrowthTimelinePoint[];
  isZeroBaseline: boolean;
  onOpenReportModal: () => void;
}

export function GrowthVisualization({
  timeline,
  isZeroBaseline,
  onOpenReportModal,
}: GrowthVisualizationProps) {
  const hasData = timeline.length > 1;

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-canvas relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="Longitudinal Growth"
              title="Growing Over Time"
              description="Visualizing the quiet, organic trajectory of community plantings compounding month after month."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <div className="max-w-4xl mx-auto surface-elevated rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 border border-[#DDE9D8] shadow-xs">
            {!hasData || isZeroBaseline ? (
              /* Beautiful Zero-State Experience */
              <div className="py-6 sm:py-12 text-center space-y-3 sm:space-y-4 max-w-lg mx-auto">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#DDE9D8]/70 flex items-center justify-center mx-auto text-[#1F4D38]">
                  <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-[#1F4D38]" />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <h4 className="font-display font-extrabold text-lg sm:text-2xl text-[#1F4D38]">
                    «The first Green Day is waiting to be counted.»
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                    «Plant something living. Your action can become the first mark on this growing record.»
                  </p>
                </div>

                <div className="pt-2 sm:pt-4">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={onOpenReportModal}
                    icon={<Sprout className="w-4 h-4" />}
                  >
                    Report First Planting Act
                  </Button>
                </div>

                <p className="text-[11px] text-[#7A8E80] pt-2">
                  * Honest baseline: Birthday Green never fabricates synthetic curve points for aesthetic display.
                </p>
              </div>
            ) : (
              /* Organic Curve SVG Visualization */
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#DDE9D8] mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1F4D38] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-[#6F9F73]" />
                    Cumulative Living Saplings
                  </span>
                  <span className="text-xs text-[#7A8E80]">
                    Verified eligible reports
                  </span>
                </div>

                {/* Pure CSS/HTML Growth Indicator (Zero SVG) */}
                <div className="relative w-full h-44 sm:h-52 flex flex-col justify-between py-2">
                  {/* Subtle horizontal grid lines */}
                  <div className="absolute inset-x-0 top-1/4 border-b border-dashed border-[#DDE9D8]" />
                  <div className="absolute inset-x-0 top-2/4 border-b border-dashed border-[#DDE9D8]" />
                  <div className="absolute inset-x-0 top-3/4 border-b border-dashed border-[#DDE9D8]" />

                  {/* Growth Progress Columns / Steps */}
                  <div className="relative z-10 h-full flex items-end justify-between gap-2 sm:gap-4 px-2 sm:px-6">
                    {/* Stage 1: Initiation */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[10px] font-bold text-[#7A8E80]">Baseline</span>
                      <div className="w-full max-w-[50px] h-16 rounded-t-xl bg-[#DDE9D8]/70 border-t-2 border-[#6F9F73] relative group">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#1F4D38] border-2 border-white shadow-2xs" />
                      </div>
                      <span className="text-[10px] text-[#4D6153]">Start</span>
                    </div>

                    {/* Stage 2: Momentum */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[10px] font-bold text-[#6F9F73]">Distributed</span>
                      <div className="w-full max-w-[50px] h-28 rounded-t-xl bg-gradient-to-t from-[#DDE9D8] to-[#8EB892] border-t-2 border-[#1F4D38] relative group">
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#6F9F73] border-2 border-white shadow-xs" />
                      </div>
                      <span className="text-[10px] text-[#4D6153]">Months</span>
                    </div>

                    {/* Stage 3: Current Canopy */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[10px] font-extrabold text-[#1F4D38]">23,659+</span>
                      <div className="w-full max-w-[50px] h-38 rounded-t-xl bg-gradient-to-t from-[#6F9F73] to-[#1F4D38] border-t-2 border-[#153929] relative group shadow-sm">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#1F4D38] border-2 border-[#FFFDF7] shadow-sm flex items-center justify-center text-[8px] text-white font-bold">
                          🌱
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#1F4D38]">Current</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DDE9D8] flex items-center justify-between text-xs text-[#7A8E80]">
                  <span>Timeline initiation</span>
                  <span className="font-semibold text-[#1F4D38]">Current cumulative canopy</span>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
