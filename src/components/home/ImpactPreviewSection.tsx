import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { ImpactCounter } from '../common/ImpactCounter';
import { ScrollReveal } from '../common/ScrollReveal';
import { useImpact } from '../../context/ImpactContext';
import { ArrowRight, AlertCircle, Sprout, Users, CalendarCheck, MapPin } from '../common/Icons';

export function ImpactPreviewSection() {
  const { summary, isLoading } = useImpact();

  return (
    <section className="py-18 sm:py-26 surface-canvas relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              align="left"
              eyebrow="Measurable Growth"
              title="Small acts. A growing impact."
              description="When hundreds of personal birthdays converge on a shared stewardship habit, individual saplings form enduring community canopies."
            />
            <Button
              variant="secondary"
              size="md"
              href="/impact"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View Impact Dashboard
            </Button>
          </div>
        </ScrollReveal>

        {/* Dashboard Preview Surface (Level 2 Elevated Surface) */}
        <ScrollReveal delayMs={150}>
          <div className="surface-elevated rounded-3xl p-6 sm:p-10 shadow-sm">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 rounded-2xl bg-[#DDE9D8]/30" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <ImpactCounter
                  label="Trees & Saplings Planted"
                  value={summary.treesPlanted}
                  icon={<Sprout className="w-5 h-5 text-[#1F4D38]" />}
                  subtext="Historical baseline + new reports"
                />
                <ImpactCounter
                  label="Community Members"
                  value={summary.participants}
                  icon={<Users className="w-5 h-5 text-[#1F4D38]" />}
                  subtext="Current community baseline"
                />
                <ImpactCounter
                  label="Communities Reached"
                  value={summary.communities}
                  icon={<MapPin className="w-5 h-5 text-[#1F4D38]" />}
                  subtext="0 communities reached — the next chapter starts here"
                />
                <ImpactCounter
                  label="Green Day Activities"
                  value={summary.activities}
                  icon={<CalendarCheck className="w-5 h-5 text-[#1F4D38]" />}
                  subtext="Digital reports logged"
                />
              </div>
            )}

            {/* Honest Community Disclosure */}
            <div className="mt-8 pt-6 border-t border-[#DDE9D8] flex items-center justify-between flex-wrap gap-4 text-xs text-[#4D6153]">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#6F9F73] shrink-0" />
                <span>
                  Impact figures are based on community reports and include a historical planting baseline recorded before the Birthday Green website was introduced.
                </span>
              </div>
              <span className="font-semibold text-[#1F4D38]">
                Official Community Baseline
              </span>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
