import { Container } from '../common/Container';
import { ScrollReveal } from '../common/ScrollReveal';
import { ShieldCheck, AlertCircle, Clock } from '../common/Icons';

export function CommunityTransparency() {
  return (
    <section className="py-12 sm:py-16 surface-base relative border-b border-[#DDE9D8]/80">
      <Container size="narrow">
        <ScrollReveal>
          <div className="surface-elevated rounded-3xl p-6 sm:p-8 border border-[#DDE9D8] shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#DDE9D8]">
              <ShieldCheck className="w-5 h-5 text-[#1F4D38]" />
              <h4 className="font-display font-bold text-base text-[#1F4D38]">
                What you're seeing
              </h4>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#4D6153] leading-relaxed">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#6F9F73] shrink-0 mt-0.5" />
                <p>
                  «Community activity is based on planting reports submitted by participants. Reports enter a 24-hour holding period before appearing publicly.»
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#6F9F73] shrink-0 mt-0.5" />
                <p>
                  «Impact figures are based on community reports and include a historical planting baseline recorded before the Birthday Green website was introduced.»
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#6F9F73] shrink-0 mt-0.5" />
                <p>
                  <strong>Community Members (973):</strong> Reflects the wider group of individual people participating in the Birthday Green movement. <strong>Communities Reached (0):</strong> Reflects formally adopting external institutions (schools, housing societies, NGOs).
                </p>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#7A8E80]">
              Birthday Green prioritizes transparent, quiet civic action over inflated claims or unverified metrics.
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
