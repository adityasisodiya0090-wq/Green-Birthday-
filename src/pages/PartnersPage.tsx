import { PartnersHero } from '../components/partners/PartnersHero';
import { PartnerTypesSection } from '../components/partners/PartnerTypesSection';
import { HowPartnersParticipateSection } from '../components/partners/HowPartnersParticipateSection';
import { WhyParticipateSection } from '../components/partners/WhyParticipateSection';
import { CommunityLaunchChecklistSection } from '../components/partners/CommunityLaunchChecklistSection';
import { CommunityEventOptionSection } from '../components/partners/CommunityEventOptionSection';
import { PartnerInterestForm } from '../components/partners/PartnerInterestForm';
import { PartnerFaqSection } from '../components/partners/PartnerFaqSection';
import { PartnerFinalCta } from '../components/partners/PartnerFinalCta';

export function PartnersPage() {
  return (
    <div className="flex flex-col">
      {/* 01 — Hero */}
      <PartnersHero />

      {/* 02 — Who Can Participate (Schools, Societies, NGOs, Civic Groups) */}
      <PartnerTypesSection />

      {/* 03 — How Partnership Works (Introduce -> Find -> Plant -> Nurture -> Repeat) */}
      <HowPartnersParticipateSection />

      {/* 04 — Why Participate & Clear Operational Boundaries */}
      <WhyParticipateSection />

      {/* 05 — Community Launch Checklist (Before, During, After) */}
      <CommunityLaunchChecklistSection />

      {/* 06 — Community Event Option (Collective Planting Principle) */}
      <CommunityEventOptionSection />

      {/* 07 — Partnership Form (Express Community Interest) */}
      <PartnerInterestForm />

      {/* 08 — Partner FAQ */}
      <PartnerFaqSection />

      {/* 09 — Final CTA */}
      <PartnerFinalCta />
    </div>
  );
}
