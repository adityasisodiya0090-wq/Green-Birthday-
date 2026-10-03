import { HeroSection } from '../components/home/HeroSection';
import { ImpactStrip } from '../components/home/ImpactStrip';
import { ConceptIntroSection } from '../components/home/ConceptIntroSection';
import { HowItWorksPreview } from '../components/home/HowItWorksPreview';
import { FindGreenDayPreview } from '../components/home/FindGreenDayPreview';
import { ImpactPreviewSection } from '../components/home/ImpactPreviewSection';
import { CommunityPreviewSection } from '../components/home/CommunityPreviewSection';
import { PartnersPreviewSection } from '../components/home/PartnersPreviewSection';
import { PhilosophySection } from '../components/home/PhilosophySection';
import { PrivacyReassuranceSection } from '../components/home/PrivacyReassuranceSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';

export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Immediate Impact Strip */}
      <ImpactStrip />

      {/* 3. "What if your birthday could keep giving?" */}
      <ConceptIntroSection />

      {/* 4. How It Works preview */}
      <HowItWorksPreview />

      {/* 5. Find My Green Day preview */}
      <FindGreenDayPreview />

      {/* 6. Impact preview */}
      <ImpactPreviewSection />

      {/* 7. Community preview */}
      <CommunityPreviewSection />

      {/* 8. Partners preview */}
      <PartnersPreviewSection />

      {/* 9. About/Philosophy preview */}
      <PhilosophySection />

      {/* 10. Privacy reassurance */}
      <PrivacyReassuranceSection />

      {/* 11. Final CTA */}
      <FinalCtaSection />
    </div>
  );
}
