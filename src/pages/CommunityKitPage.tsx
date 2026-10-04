import { CommunityKitHero } from '../components/community-kit/CommunityKitHero';
import { FivePracticalQuestionsSection } from '../components/community-kit/FivePracticalQuestionsSection';
import { FiveStepActivationSection } from '../components/community-kit/FiveStepActivationSection';
import { CommunitySphereExamples } from '../components/community-kit/CommunitySphereExamples';
import { PrintableGuideSection } from '../components/community-kit/PrintableGuideSection';
import { CommunityKitFinalCta } from '../components/community-kit/CommunityKitFinalCta';

export function CommunityKitPage() {
  return (
    <div className="flex flex-col">
      {/* 01 — Focused Hero */}
      <CommunityKitHero />

      {/* 02 — Five Practical Questions */}
      <FivePracticalQuestionsSection />

      {/* 03 — Five-Step Activation Model */}
      <FiveStepActivationSection />

      {/* 04 — Real-World Community Sphere Scenarios */}
      <CommunitySphereExamples />

      {/* 05 — Printable Handout & PDF Generation */}
      <PrintableGuideSection />

      {/* 06 — Final Continuity & Partnership CTA */}
      <CommunityKitFinalCta />
    </div>
  );
}
