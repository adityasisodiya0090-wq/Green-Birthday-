import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { ArrowRight, Sparkles } from '../common/Icons';

export function PhilosophySection() {
  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-[#1F4D38] text-[#FFFDF7] relative overflow-hidden">
      {/* Decorative ambient lighting */}
      <div
        className="pointer-events-none absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#153929] blur-3xl opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#2A664B] blur-3xl opacity-40"
        aria-hidden="true"
      />

      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
          <ScrollReveal>
            <SectionHeading
              dark={true}
              eyebrow="Core Philosophy"
              title="Why Birthday Green?"
              description="Conventional tree-planting campaigns often celebrate the seed and forget the sapling. We believe true environmental change is rooted in sustained attention."
            />
          </ScrollReveal>

          {/* Level 3 Forest Glass Callout Card */}
          <ScrollReveal delayMs={150}>
            <div className="mt-5 sm:mt-10 p-4 sm:p-10 rounded-2xl sm:rounded-3xl surface-glass-forest text-center space-y-3 sm:space-y-4 shadow-xl">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8EB892] font-semibold flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Essential Truth</span>
              </span>

              <blockquote className="text-lg sm:text-2xl md:text-3xl font-display font-extrabold text-white leading-tight">
                “Planting is an action.{' '}
                <span className="text-[#8EB892] block sm:inline">
                  Nurturing is a responsibility.
                </span>”
              </blockquote>

              <p className="text-xs sm:text-base text-[#DDE9D8]/95 max-w-xl mx-auto leading-relaxed pt-1 sm:pt-2">
                Planting a tree is never the completion of stewardship — it is only the first sentence. The regular watering, soil weeding, and quiet protection month after month is what turns a fragile sprout into an enduring shade tree.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={250}>
            <div className="pt-3 sm:pt-6 flex justify-center">
              <Button
                variant="secondary"
                size="md"
                href="/about"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Read Full Initiative Philosophy
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
