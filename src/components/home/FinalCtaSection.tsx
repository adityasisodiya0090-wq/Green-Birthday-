import { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { ShareModal } from '../share/ShareModal';
import { ArrowRight, Sparkles, Share2 } from '../common/Icons';

export function FinalCtaSection() {
  const { openCalculator } = useRouter();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <section className="py-20 sm:py-28 surface-canvas relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#DDE9D8]/50 via-transparent to-transparent -z-10"
        aria-hidden="true"
      />

      <Container size="narrow">
        <ScrollReveal>
          <div className="surface-glass-forest rounded-3xl text-center p-8 sm:p-14 relative overflow-hidden shadow-2xl">
            {/* Subtle concentric rings */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full border border-[#6F9F73]/25"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -left-16 -bottom-16 w-64 h-64 rounded-full border border-[#6F9F73]/25"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-xl mx-auto space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#8EB892] font-semibold flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Plant. Nurture. Repeat.</span>
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
                Your next Green Day is waiting.
              </h2>

              <p className="text-base sm:text-lg text-[#DDE9D8] leading-relaxed">
                Choose your date. Plant something living. Keep growing.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => openCalculator()}
                >
                  Find My Green Day
                </Button>
              </div>

              {/* Subtle Organic Share Invite (Section 23) */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(true)}
                  className="text-xs text-[#DDE9D8] hover:text-white underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#8EB892]" />
                  <span>Know someone who should find theirs? Share Birthday Green →</span>
                </button>
              </div>

              <p className="text-xs text-[#8EB892]/80 pt-2">
                Free forever · Pure community initiative · ₹0 cost
              </p>
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
