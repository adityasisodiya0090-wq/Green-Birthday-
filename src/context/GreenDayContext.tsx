import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { calculateNextGreenDay, DetailedGreenDayResult } from '../utils/greenDay';
import { LocalPlantingEntry, NurtureHumanState } from '../types';

export type GreenDayStatus = 'today' | 'tomorrow' | 'upcoming' | 'passed' | 'unset';

interface GreenDayContextType {
  savedDay: number | null;
  greenDayInfo: DetailedGreenDayResult | null;
  status: GreenDayStatus;
  isToday: boolean;
  isTomorrow: boolean;
  daysRemaining: number;
  setGreenDay: (day: number) => void;
  clearGreenDay: () => void;
  hasReportedThisCycle: boolean;
  markReportedThisCycle: () => void;
  localPlantings: LocalPlantingEntry[];
  recordLocalPlanting: (planting: Omit<LocalPlantingEntry, 'id' | 'timestamp'>) => void;
  clearLocalPlantings: () => void;
  clearAllPersonalData: () => void;
  totalPlantingsRecorded: number;
  totalSaplingsRecorded: number;
  localPlantingCount: number;
  lastLocalPlantingDate: string | null;
  lastViewedGreenDay: string | null;
  recordView: () => void;
  lastPlanting: LocalPlantingEntry | null;
  nurtureState: NurtureHumanState;
  isNurtureModalOpen: boolean;
  openNurtureModal: () => void;
  closeNurtureModal: () => void;
  reminderEnabled: boolean;
  reminderPermission: 'granted' | 'denied' | 'default' | 'unsupported';
  requestNotificationReminder: () => Promise<boolean>;
  disableReminder: () => void;
  downloadCalendarEvent: () => void;
}

const GreenDayContext = createContext<GreenDayContextType | undefined>(undefined);

const STORAGE_KEY_DAY = 'birthdaygreen_active_day_v1';
const STORAGE_KEY_REMINDER = 'birthdaygreen_reminder_enabled_v1';
const STORAGE_KEY_REPORTED = 'birthdaygreen_reported_cycle_v1';
const STORAGE_KEY_LOCAL_PLANTINGS = 'birthdaygreen_local_plantings_v1';
const STORAGE_KEY_LAST_VIEWED = 'birthdaygreen_last_viewed_v1';

export function GreenDayProvider({ children }: { children: ReactNode }) {
  // 1. Saved Green Day Day Number (1-31). Never stores full DOB.
  const [savedDay, setSavedDayState] = useState<number | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DAY);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (parsed >= 1 && parsed <= 31) return parsed;
      }
    } catch {
      // storage quota or private browsing fallback
    }
    return null;
  });

  // 2. Local Planting Memory (convenience state stored on this browser only)
  const [localPlantings, setLocalPlantings] = useState<LocalPlantingEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY_LOCAL_PLANTINGS);
      if (raw) {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      // parse fallback
    }
    return [];
  });

  // 3. Reminder preference
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem(STORAGE_KEY_REMINDER) === 'true';
    } catch {
      return false;
    }
  });

  // 4. Cycle reporting flag (resets each month)
  const [hasReportedThisCycle, setHasReportedThisCycle] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const currentMonthKey = `${new Date().getFullYear()}_${new Date().getMonth()}`;
      const stored = localStorage.getItem(STORAGE_KEY_REPORTED);
      return stored === currentMonthKey;
    } catch {
      return false;
    }
  });

  // 5. Last viewed timestamp string (device-only)
  const [lastViewedGreenDay, setLastViewedGreenDay] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(STORAGE_KEY_LAST_VIEWED);
    } catch {
      return null;
    }
  });

  // 6. Nurture Modal State
  const [isNurtureModalOpen, setIsNurtureModalOpen] = useState<boolean>(false);

  // Record viewing of personal Green Day
  const recordView = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    setLastViewedGreenDay(todayStr);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_LAST_VIEWED, todayStr);
      } catch {
        // storage fallback
      }
    }
  };

  useEffect(() => {
    if (savedDay) {
      recordView();
    }
  }, [savedDay]);

  // Calculate Green Day Info dynamically from local clock
  const greenDayInfo = useMemo(() => {
    if (!savedDay) return null;
    return calculateNextGreenDay(savedDay);
  }, [savedDay]);

  // Determine current lifecycle status: today, tomorrow, upcoming, passed
  const { status, isToday, isTomorrow, daysRemaining } = useMemo(() => {
    if (!greenDayInfo || !savedDay) {
      return { status: 'unset' as GreenDayStatus, isToday: false, isTomorrow: false, daysRemaining: 0 };
    }

    const todayDate = new Date();
    const todayDay = todayDate.getDate();

    // Check if today matches the resolved target day of the current month
    if (greenDayInfo.isToday) {
      return { status: 'today' as GreenDayStatus, isToday: true, isTomorrow: false, daysRemaining: 0 };
    }

    if (greenDayInfo.daysRemaining === 1) {
      return { status: 'tomorrow' as GreenDayStatus, isToday: false, isTomorrow: true, daysRemaining: 1 };
    }

    // If today is past the Green Day of the current calendar month, but next Green Day is next month
    const thisMonthDays = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0).getDate();
    const thisMonthTarget = Math.min(savedDay, thisMonthDays);
    if (todayDay > thisMonthTarget) {
      return {
        status: 'passed' as GreenDayStatus,
        isToday: false,
        isTomorrow: false,
        daysRemaining: greenDayInfo.daysRemaining,
      };
    }

    return {
      status: 'upcoming' as GreenDayStatus,
      isToday: false,
      isTomorrow: false,
      daysRemaining: greenDayInfo.daysRemaining,
    };
  }, [greenDayInfo, savedDay]);

  // Human Nurture Lifecycle State
  const nurtureState: NurtureHumanState = useMemo(() => {
    if (localPlantings.length === 0) {
      return 'before_planting';
    }
    if (isToday) {
      return 'green_day';
    }
    if (daysRemaining <= 7) {
      return 'returning_month';
    }
    return 'after_planting';
  }, [localPlantings.length, isToday, daysRemaining]);

  const setGreenDay = (day: number) => {
    const validDay = Math.max(1, Math.min(31, Math.floor(day)));
    setSavedDayState(validDay);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_DAY, validDay.toString());
      } catch {
        // storage fallback
      }
    }
  };

  const clearGreenDay = () => {
    setSavedDayState(null);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY_DAY);
      } catch {
        // storage fallback
      }
    }
  };

  const markReportedThisCycle = () => {
    setHasReportedThisCycle(true);
    if (typeof window !== 'undefined') {
      const currentMonthKey = `${new Date().getFullYear()}_${new Date().getMonth()}`;
      try {
        localStorage.setItem(STORAGE_KEY_REPORTED, currentMonthKey);
      } catch {
        // storage fallback
      }
    }
  };

  const recordLocalPlanting = (data: Omit<LocalPlantingEntry, 'id' | 'timestamp'>) => {
    const newEntry: LocalPlantingEntry = {
      ...data,
      id: 'lp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      timestamp: Date.now(),
    };

    setLocalPlantings((prev) => {
      const updated = [newEntry, ...prev];
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY_LOCAL_PLANTINGS, JSON.stringify(updated));
        } catch {
          // storage fallback
        }
      }
      return updated;
    });

    markReportedThisCycle();
  };

  const clearLocalPlantings = () => {
    setLocalPlantings([]);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY_LOCAL_PLANTINGS);
      } catch {
        // storage fallback
      }
    }
  };

  /**
   * Complete local device state reset (Section 30).
   * Clears only this browser's stored data; does not affect any public community reports.
   */
  const clearAllPersonalData = () => {
    setSavedDayState(null);
    setLocalPlantings([]);
    setReminderEnabled(false);
    setHasReportedThisCycle(false);
    setLastViewedGreenDay(null);

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY_DAY);
        localStorage.removeItem(STORAGE_KEY_LOCAL_PLANTINGS);
        localStorage.removeItem(STORAGE_KEY_REMINDER);
        localStorage.removeItem(STORAGE_KEY_REPORTED);
        localStorage.removeItem(STORAGE_KEY_LAST_VIEWED);
      } catch {
        // storage fallback
      }
    }
  };

  const totalPlantingsRecorded = localPlantings.length;
  const localPlantingCount = localPlantings.length;
  const totalSaplingsRecorded = localPlantings.reduce((acc, p) => acc + (p.saplingCount || 1), 0);
  const lastPlanting = localPlantings[0] || null;
  const lastLocalPlantingDate = lastPlanting ? lastPlanting.dateStr : null;

  // Browser Notification capability check
  const reminderPermission: 'granted' | 'denied' | 'default' | 'unsupported' = useMemo(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'unsupported';
    }
    return Notification.permission;
  }, []);

  const requestNotificationReminder = async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false;
    }

    try {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        setReminderEnabled(true);
        localStorage.setItem(STORAGE_KEY_REMINDER, 'true');

        try {
          new Notification('Birthday Green Reminder Active 🌱', {
            body: `We will remind you on the ${savedDay || 16}th of each month. Plant. Nurture. Repeat.`,
            icon: '/favicon.ico',
          });
        } catch {
          // notification display fallback
        }
        return true;
      } else {
        setReminderEnabled(false);
        localStorage.removeItem(STORAGE_KEY_REMINDER);
        return false;
      }
    } catch {
      return false;
    }
  };

  const disableReminder = () => {
    setReminderEnabled(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY_REMINDER);
      } catch {
        // storage fallback
      }
    }
  };

  /**
   * Free Calendar Event Download (.ics format):
   * Pure native browser download; works 100% offline, on all devices, at ₹0 cost.
   * Creates a recurring monthly reminder on the user's Green Day.
   */
  const downloadCalendarEvent = () => {
    const day = savedDay || 16;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const targetDate = new Date(currentYear, currentMonth, Math.min(day, 28));

    const y = targetDate.getFullYear();
    const m = String(targetDate.getMonth() + 1).padStart(2, '0');
    const d = String(targetDate.getDate()).padStart(2, '0');
    const dateStamp = `${y}${m}${d}`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Birthday Green//Green Day Movement//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:greenday-${day}-${Date.now()}@birthdaygreen.org`,
      `DTSTAMP:${dateStamp}T090000Z`,
      `DTSTART;VALUE=DATE:${dateStamp}`,
      `RRULE:FREQ=MONTHLY;BYMONTHDAY=${day}`,
      'SUMMARY:Birthday Green — My Green Day 🌱',
      'DESCRIPTION:Plant. Nurture. Repeat.\\n\\nYour Green Day is your recurring monthly opportunity to plant something living and care for what you have already started.',
      'STATUS:CONFIRMED',
      'TRANSP:TRANSPARENT',
      'BEGIN:VALARM',
      'TRIGGER:-PT9H',
      'ACTION:DISPLAY',
      'DESCRIPTION:Today is your Green Day! Plant something living and care for your previous plants. 🌱',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BirthdayGreen_Day_${day}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <GreenDayContext.Provider
      value={{
        savedDay,
        greenDayInfo,
        status,
        isToday,
        isTomorrow,
        daysRemaining,
        setGreenDay,
        clearGreenDay,
        hasReportedThisCycle,
        markReportedThisCycle,
        localPlantings,
        recordLocalPlanting,
        clearLocalPlantings,
        clearAllPersonalData,
        totalPlantingsRecorded,
        totalSaplingsRecorded,
        localPlantingCount,
        lastLocalPlantingDate,
        lastViewedGreenDay,
        recordView,
        lastPlanting,
        nurtureState,
        isNurtureModalOpen,
        openNurtureModal: () => setIsNurtureModalOpen(true),
        closeNurtureModal: () => setIsNurtureModalOpen(false),
        reminderEnabled,
        reminderPermission,
        requestNotificationReminder,
        disableReminder,
        downloadCalendarEvent,
      }}
    >
      {children}
    </GreenDayContext.Provider>
  );
}

export function useGreenDay(): GreenDayContextType {
  const context = useContext(GreenDayContext);
  if (!context) {
    throw new Error('useGreenDay must be used within a GreenDayProvider');
  }
  return context;
}
