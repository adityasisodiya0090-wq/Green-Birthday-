import { useState } from 'react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { ShareModal } from '../share/ShareModal';
import { useRouter } from '../../context/RouterContext';
import { useGreenDay } from '../../context/GreenDayContext';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { ArrowRight, Sprout, Sparkles, Building2, Heart, Share2 } from '../common/Icons';

export function CommunityFinalCta() {
  const { openCalculator, navigate } = useRouter();
  const { savedDay, isToday } = useGreenDay();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const primaryLabel = isToday
    ? 'Plant on My Green Day →'
    : savedDay
    ? `Open My Green Day (${getOrdinalSuffix(savedDay)}) →`
    : 'Find My Green Day';

  const handlePrimaryClick = () => {
    if (isToday || savedDay) {
      navigate('/participate');
    } else {
      openCalculator();
    }
  };

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-base relative overflow-hidden border-t border-[#DDE9D8]/80">
      {/* Ambient background lighting */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#DDE9D8]/50 via-transparent to-transparent -z-10"
        aria-hidden="true"
      />

      <Container size="narrow">
        <ScrollReveal>
          <div className="space-y-6 sm:space-y-12">
            {/* Community Story & Nurture Continuity (Section 22 & 23) */}
            <div className="surface-elevated rounded-2xl sm:rounded-3xl p-5 sm:p-12 border border-[#DDE9D8] text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto shadow-xs">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#6F9F73]">
                THE COMMUNITY PHILOSOPHY
              </span>
              <h3 className="font-display font-extrabold text-lg sm:text-2xl md:text-3xl text-[#1F4D38] tracking-tight">
                Planting creates the beginning. Nurturing gives it continuity.
              </h3>
              <p className="text-xs sm:text-base text-[#4D6153] leading-relaxed">
                A birthday is personal. A Green Day takes something personal and gives it a recurring environmental purpose. One person starts. Another joins. Different dates create different Green Days. The result is not one annual event. It is a recurring rhythm.
              </p>
              <div className="pt-2 flex items-center justify-center gap-4 sm:gap-6 text-xs text-[#7A8E80]">
                <span className="flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-[#1F4D38]" />
                  <span>Plant something living</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#6F9F73]" />
                  <span>Nurture what came before</span>
                </span>
              </div>
            </div>

            {/* Final Conversion Surface: Individual & Organization */}
            <div className="surface-glass-forest rounded-2xl sm:rounded-3xl text-center p-6 sm:p-14 relative overflow-hidden shadow-2xl">
              {/* Concentric subtle rings */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full border border-[#6F9F73]/25"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -left-16 -bottom-16 w-64 h-64 rounded-full border border-[#6F9F73]/25"
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-xl mx-auto space-y-4 sm:space-y-6">
                <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#8EB892] font-semibold flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>A Growing Movement</span>
                </span>

                <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
                  Ready to bring Green Days to your community?
                </h2>

                <p className="text-xs sm:text-base text-[#DDE9D8] leading-relaxed">
                  Whether you are an individual steward showing up for your personal date or an organization bringing the concept to campus or neighborhoods, every date counts.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <Button
                    variant="secondary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                    onClick={handlePrimaryClick}
                    className="w-full sm:w-auto"
                  >
                    {primaryLabel}
                  </Button>

                  <Button
                    variant="outline"
                    size="md"
                    className="text-white border-white/30 hover:bg-white/10 hover:border-white w-full sm:w-auto"
                    icon={<Building2 className="w-4 h-4" />}
                    onClick={() => navigate('/partners')}
                  >
                    Bring Birthday Green to a Community
                  </Button>
                </div>

                {/* Subtle Organic Share Invite (Section 24) */}
                <div className="pt-1 sm:pt-2">
                  <button
                    type="button"
                    onClick={() => setIsShareModalOpen(true)}
                    className="text-xs text-[#DDE9D8] hover:text-white underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#8EB892]" />
                    <span>Know someone whose date could become a Green Day? Share Birthday Green →</span>
                  </button>
                </div>

                <p className="text-[11px] sm:text-xs text-[#8EB892]/80 pt-1 sm:pt-2">
                  Plant. Nurture. Repeat. · 100% Free · ₹0 cost
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>

      {/* Reusable Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        contentType="FIND_YOURS"
        title="Share Birthday Green"
      />
    </section>
  );
}
