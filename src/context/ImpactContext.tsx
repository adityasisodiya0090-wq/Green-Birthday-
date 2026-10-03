import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  ImpactSummary,
  RecentActivityItem,
  GrowthTimelinePoint,
  PlantingActivitySubmission,
} from '../types';
import { impactRepository } from '../services/impactRepository';

interface ImpactContextValue {
  summary: ImpactSummary;
  recentActivities: RecentActivityItem[];
  calendarCounts: Record<number, number>;
  timeline: GrowthTimelinePoint[];
  pendingHoldingCount: number;
  isLoading: boolean;
  error: string | null;
  refreshImpact: () => Promise<void>;
  submitActivity: (
    submission: PlantingActivitySubmission
  ) => Promise<{ success: boolean; activityId: string; eligibleAt: number; message: string }>;
}

const DEFAULT_SUMMARY: ImpactSummary = {
  treesPlanted: 0,
  participants: 0,
  activities: 0,
  communities: 0,
  lastCalculatedAt: Date.now(),
  isZeroBaseline: true,
};

const ImpactContext = createContext<ImpactContextValue | undefined>(undefined);

export function ImpactProvider({ children }: { children: ReactNode }) {
  const [summary, setSummary] = useState<ImpactSummary>(DEFAULT_SUMMARY);
  const [recentActivities, setRecentActivities] = useState<RecentActivityItem[]>([]);
  const [calendarCounts, setCalendarCounts] = useState<Record<number, number>>({});
  const [timeline, setTimeline] = useState<GrowthTimelinePoint[]>([]);
  const [pendingHoldingCount, setPendingHoldingCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [sum, recent, cal, time, pending] = await Promise.all([
        impactRepository.getImpactSummary(),
        impactRepository.getRecentActivities(8),
        impactRepository.getCalendarActivityDays(),
        impactRepository.getGrowthTimeline(),
        impactRepository.getPendingHoldingCount(),
      ]);

      setSummary(sum);
      setRecentActivities(recent);
      setCalendarCounts(cal);
      setTimeline(time);
      setPendingHoldingCount(pending);
    } catch (err) {
      console.error('Failed to load impact data:', err);
      setError('Impact data is temporarily unavailable.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const submitActivity = async (submission: PlantingActivitySubmission) => {
    try {
      const result = await impactRepository.submitPlantingActivity(submission);
      await fetchAllData();
      return result;
    } catch (err) {
      console.error('Failed to submit planting activity:', err);
      throw err;
    }
  };

  return (
    <ImpactContext.Provider
      value={{
        summary,
        recentActivities,
        calendarCounts,
        timeline,
        pendingHoldingCount,
        isLoading,
        error,
        refreshImpact: fetchAllData,
        submitActivity,
      }}
    >
      {children}
    </ImpactContext.Provider>
  );
}

export function useImpact() {
  const context = useContext(ImpactContext);
  if (!context) {
    throw new Error('useImpact must be used within an ImpactProvider');
  }
  return context;
}
