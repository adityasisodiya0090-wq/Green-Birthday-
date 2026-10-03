import { CommunityKitHero } from '../components/community-kit/CommunityKitHero';
import { FivePracticalQuestionsSection } from '../components/community-kit/FivePracticalQuestionsSection';
import { FiveStepActivationSection } from '../components/community-kit/FiveStepActivationSection';
import { InteractiveAudienceFilter } from '../components/community-kit/InteractiveAudienceFilter';
import { ReadyToShareSection } from '../components/community-kit/ReadyToShareSection';
import { CommunitySphereExamples } from '../components/community-kit/CommunitySphereExamples';
import { CommunityLaunchChecklist } from '../components/community-kit/CommunityLaunchChecklist';
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

      {/* 04 — Interactive Audience Selector & Tailored Guidance */}
      <InteractiveAudienceFilter />

      {/* 05 — Ready to Share Text, WhatsApp Message & Explainer Card */}
      <ReadyToShareSection />

      {/* 06 — Real-World Community Sphere Scenarios */}
      <CommunitySphereExamples />

      {/* 07 — Interactive Self-Serve Launch Checklist */}
      <CommunityLaunchChecklist />

      {/* 08 — Printable Handout & PDF Generation */}
      <PrintableGuideSection />

      {/* 09 — Final Continuity & Partnership CTA */}
      <CommunityKitFinalCta />
    </div>
  );
}
