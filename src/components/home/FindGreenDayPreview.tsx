import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { GreenDayCalculator } from '../calculator/GreenDayCalculator';
import { PersonalGreenDayCard } from '../personal/PersonalGreenDayCard';
import { MyGreenDayJourneyCard } from '../common/MyGreenDayJourneyCard';
import { useGreenDay } from '../../context/GreenDayContext';

export function FindGreenDayPreview() {
  const { savedDay } = useGreenDay();

  return (
    <section id="find-green-day" className="py-18 sm:py-26 surface-base relative scroll-mt-16">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <SectionHeading
              eyebrow="Interactive Discovery"
              title={savedDay ? 'My Green Day Journey' : 'Find your Green Day'}
              description={
                savedDay
                  ? 'Your recurring monthly checkpoint. Plant, nurture, and return.'
                  : 'Your exact birth date stays private. Only the day number is needed to calculate your Green Day.'
              }
            />
          </div>
        </ScrollReveal>

        {/* If local state exists: show Personal Green Day Card & Journey */}
        {savedDay ? (
          <div className="max-w-4xl mx-auto space-y-8">
            <ScrollReveal delayMs={50}>
              <PersonalGreenDayCard />
            </ScrollReveal>
            <ScrollReveal delayMs={100}>
              <MyGreenDayJourneyCard />
            </ScrollReveal>
          </div>
        ) : (
          /* Standard public calculator experience if no local state */
          <ScrollReveal delayMs={100}>
            <div className="max-w-4xl mx-auto">
              <GreenDayCalculator />
            </div>
          </ScrollReveal>
        )}
      </Container>
    </section>
  );
}
