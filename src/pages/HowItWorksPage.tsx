import { HowItWorksHero } from '../components/howItWorks/HowItWorksHero';
import { CoreIdeaSection } from '../components/howItWorks/CoreIdeaSection';
import { FourStepTimeline } from '../components/howItWorks/FourStepTimeline';
import { PlantingVsNurturing } from '../components/howItWorks/PlantingVsNurturing';
import { MonthlyCycleVisual } from '../components/howItWorks/MonthlyCycleVisual';
import { CalendarRulesSection } from '../components/howItWorks/CalendarRulesSection';
import { ActionGuidelinesSection } from '../components/howItWorks/ActionGuidelinesSection';
import { AnnualExampleSection } from '../components/howItWorks/AnnualExampleSection';
import { FaqSection } from '../components/howItWorks/FaqSection';
import { HowItWorksCta } from '../components/howItWorks/HowItWorksCta';

export function HowItWorksPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Page Hero */}
      <HowItWorksHero />

      {/* 2. The Core Idea & Interactive Date Demonstration */}
      <CoreIdeaSection />

      {/* 3. Four-Step Green Day Cycle Timeline */}
      <FourStepTimeline />

      {/* 4. Planting vs Nurturing Split Section */}
      <PlantingVsNurturing />

      {/* 5. Immersive Monthly Stewardship Cycle Visual */}
      <MonthlyCycleVisual />

      {/* 6. Calendar Rules & Leap Year Demonstration */}
      <CalendarRulesSection />

      {/* 7. Responsible Action Guidelines */}
      <ActionGuidelinesSection />

      {/* 8. Annual Journey Example */}
      <AnnualExampleSection />

      {/* 9. Accessible Accordion FAQ */}
      <FaqSection />

      {/* 10. Closing Call to Action */}
      <HowItWorksCta />
    </div>
  );
}
