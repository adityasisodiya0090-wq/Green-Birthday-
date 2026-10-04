import { Container } from '../common/Container';
import { ScrollReveal } from '../common/ScrollReveal';
import { Users, Sprout, Heart, ShieldAlert } from '../common/Icons';

export function CommunityEventOptionSection() {
  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-base relative border-b border-[#DDE9D8]/80">
      <Container size="narrow">
        <ScrollReveal>
          <div className="surface-glass-forest rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-white shadow-xl relative overflow-hidden space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#8EB892]">
              <Users className="w-4 h-4" />
              <span>COLLECTIVE GREEN DAYS</span>
            </div>

            <h3 className="font-display font-extrabold text-xl sm:text-3xl text-white tracking-tight">
              Organizing a Community Planting Drive?
            </h3>

            <p className="text-xs sm:text-base text-[#DDE9D8] leading-relaxed">
              Housing societies, student bodies, and civic clubs often wish to launch their participation with a collective planting day. Birthday Green enthusiastically accommodates this, provided one foundational principle is respected:
            </p>

            {/* Core Principle Callout */}
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white font-medium space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#8EB892]">
                <Heart className="w-4 h-4 text-[#8EB892]" />
                <span>The Collective Stewardship Principle:</span>
              </div>
              <p className="italic leading-relaxed">
                «A group can plant together. The responsibility to nurture still belongs to everyone who participates.»
              </p>
            </div>

            <p className="text-[11px] sm:text-xs text-[#DDE9D8] leading-relaxed">
              When organizing a campus or compound plantation day, each participant can adopt their sapling and link it back to their recurring monthly Green Day for continued watering, weed clearance, and seasonal tending.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
