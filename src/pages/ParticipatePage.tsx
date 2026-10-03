import { useState, useRef } from 'react';
import { Container } from '../components/common/Container';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { useRouter } from '../context/RouterContext';
import { useImpact } from '../context/ImpactContext';
import { useGreenDay } from '../context/GreenDayContext';
import { ParticipationHero } from '../components/participate/ParticipationHero';
import { PrivacyNotice } from '../components/participate/PrivacyNotice';
import { PlantingReportForm } from '../components/participate/PlantingReportForm';
import { CelebrationCard } from '../components/participate/CelebrationCard';
import { NurtureChecklist } from '../components/participate/NurtureChecklist';
import { NextGreenDayCountdown } from '../components/participate/NextGreenDayCountdown';
import { MyGreenDaysHistory } from '../components/participate/MyGreenDaysHistory';
import { PersonalGreenDayCard } from '../components/personal/PersonalGreenDayCard';
import { GreenDayActionHub } from '../components/personal/GreenDayActionHub';
import { GreenDayStatusCard } from '../components/common/GreenDayStatusCard';
import { GreenDayResponsibility } from '../components/common/GreenDayResponsibility';
import { GreenDayReminder } from '../components/common/GreenDayReminder';
import { MyGreenDayJourneyCard } from '../components/common/MyGreenDayJourneyCard';

interface CompletedSubmissionState {
  dateStr: string;
  saplingCount: number;
  plantTypeLabel: string;
  location: string;
  eligibleAt: number;
  dayOfMonth: number;
}

export function ParticipatePage() {
  const { savedDay, recordLocalPlanting } = useGreenDay();
  const { submitActivity } = useImpact();

  const [completedData, setCompletedData] = useState<CompletedSubmissionState | null>(null);
  const [historyTimestamp, setHistoryTimestamp] = useState<number>(Date.now());
  const reportFormRef = useRef<HTMLDivElement>(null);
  const nurtureRef = useRef<HTMLDivElement>(null);

  const handleSuccess = (data: CompletedSubmissionState) => {
    const d = new Date(data.dateStr);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    recordLocalPlanting({
      dateStr: data.dateStr,
      saplingCount: data.saplingCount,
      plantTypeLabel: data.plantTypeLabel,
      monthName: monthNames[d.getMonth()],
      year: d.getFullYear(),
      dayOfMonth: data.dayOfMonth,
    });

    setCompletedData(data);
    setHistoryTimestamp(Date.now());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCompletedData(null);
  };

  const handleScrollToReport = () => {
    reportFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToNurture = () => {
    nurtureRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <ParticipationHero savedDay={savedDay} />

      <section className="py-14 sm:py-20 surface-base">
        <Container size="narrow">
          {!completedData ? (
            /* PRE-SUBMISSION FLOW */
            <div className="space-y-12">
              {/* Personal Green Day Card (Section 2) */}
              {savedDay && (
                <ScrollReveal>
                  <PersonalGreenDayCard
                    onPlantClick={handleScrollToReport}
                    onNurtureClick={handleScrollToNurture}
                  />
                </ScrollReveal>
              )}

              {/* Green Day Action Hub: TODAY / CARE / RETURN (Section 8 & 9) */}
              {savedDay && (
                <ScrollReveal delayMs={30}>
                  <GreenDayActionHub
                    onReportPlanting={handleScrollToReport}
                  />
                </ScrollReveal>
              )}

              {/* Personal Local Journey Card (Section 4 & 5) */}
              {savedDay && (
                <ScrollReveal delayMs={60}>
                  <MyGreenDayJourneyCard />
                </ScrollReveal>
              )}

              {/* Privacy-First Introduction */}
              <ScrollReveal delayMs={90}>
                <PrivacyNotice />
              </ScrollReveal>

              {/* Planting Report Form with Review State */}
              <div ref={reportFormRef} className="scroll-mt-12">
                <ScrollReveal delayMs={120}>
                  <PlantingReportForm
                    initialDay={savedDay}
                    onSubmitSuccess={handleSuccess}
                    onSubmitActivity={submitActivity}
                  />
                </ScrollReveal>
              </div>

              {/* Core Philosophy: Plant. Nurture. Repeat. */}
              <div ref={nurtureRef} className="scroll-mt-12">
                <ScrollReveal delayMs={150}>
                  <GreenDayResponsibility />
                </ScrollReveal>
              </div>

              {/* Monthly Free Device Reminders */}
              <ScrollReveal delayMs={180}>
                <GreenDayReminder />
              </ScrollReveal>

              {/* Private Local Device History */}
              <ScrollReveal delayMs={210}>
                <MyGreenDaysHistory lastUpdated={historyTimestamp} />
              </ScrollReveal>
            </div>
          ) : (
            /* POST-SUBMISSION CELEBRATION & NURTURE FLOW */
            <div className="space-y-12">
              {/* Digital Celebration Card & Actions (Section 20) */}
              <ScrollReveal>
                <CelebrationCard
                  dateStr={completedData.dateStr}
                  saplingCount={completedData.saplingCount}
                  plantTypeLabel={completedData.plantTypeLabel}
                  location={completedData.location}
                  eligibleAt={completedData.eligibleAt}
                  onReset={handleReset}
                />
              </ScrollReveal>

              {/* Personal Green Day Card (Section 2 & 20) */}
              <ScrollReveal delayMs={40}>
                <PersonalGreenDayCard
                  onPlantClick={handleReset}
                  onNurtureClick={handleScrollToNurture}
                />
              </ScrollReveal>

              {/* Personal Local Journey Summary */}
              <ScrollReveal delayMs={80}>
                <MyGreenDayJourneyCard />
              </ScrollReveal>

              {/* Next Green Day Countdown */}
              <ScrollReveal delayMs={120}>
                <NextGreenDayCountdown dayNumber={completedData.dayOfMonth} />
              </ScrollReveal>

              {/* Core Philosophy: Plant. Nurture. Repeat. */}
              <div ref={nurtureRef}>
                <ScrollReveal delayMs={160}>
                  <GreenDayResponsibility />
                </ScrollReveal>
              </div>

              {/* Free Monthly Reminders */}
              <ScrollReveal delayMs={200}>
                <GreenDayReminder />
              </ScrollReveal>

              {/* Nurture Checklist Reminder */}
              <ScrollReveal delayMs={240}>
                <NurtureChecklist />
              </ScrollReveal>

              {/* Private Local Device History */}
              <ScrollReveal delayMs={280}>
                <MyGreenDaysHistory lastUpdated={historyTimestamp} />
              </ScrollReveal>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
