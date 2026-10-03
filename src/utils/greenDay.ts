import { GreenDayInfo } from '../types';

export function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

/**
 * Checks if a given year is a leap year.
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Returns the exact days in a given month (0-indexed month: 0 = Jan, 11 = Dec).
 * Properly handles February 28 / 29 leap year detection.
 */
export function getDaysInMonth(year: number, monthIndex0: number): number {
  if (monthIndex0 === 1) {
    // February
    return isLeapYear(year) ? 29 : 28;
  }
  // Standard 31 or 30 days
  const thirtyDayMonths = [3, 5, 8, 10]; // Apr, Jun, Sep, Nov
  if (thirtyDayMonths.includes(monthIndex0)) {
    return 30;
  }
  return 31;
}

export interface DateValidationResult {
  isValid: boolean;
  dayNumber?: number;
  error?: string;
}

/**
 * Validates a birth date string (YYYY-MM-DD or user input)
 * and returns the day number if valid.
 * Extracts ONLY the day of the month (1-31).
 */
export function validateBirthDate(
  rawDateStr: string,
  refDate: Date = new Date()
): DateValidationResult {
  if (!rawDateStr || rawDateStr.trim() === '') {
    return {
      isValid: false,
      error: 'Please enter a valid date.',
    };
  }

  // Parse YYYY-MM-DD or standard date format
  const parts = rawDateStr.trim().split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return { isValid: false, error: 'Please enter a valid date.' };
    }

    if (month < 1 || month > 12) {
      return { isValid: false, error: 'Please enter a valid date.' };
    }

    const maxDays = getDaysInMonth(year, month - 1);
    if (day < 1 || day > maxDays) {
      return { isValid: false, error: 'Please enter a valid date.' };
    }

    const parsedDate = new Date(year, month - 1, day, 0, 0, 0, 0);
    const today = new Date(
      refDate.getFullYear(),
      refDate.getMonth(),
      refDate.getDate(),
      0,
      0,
      0,
      0
    );

    if (parsedDate.getTime() > today.getTime()) {
      return {
        isValid: false,
        error: 'Please enter a birth date that has already occurred.',
      };
    }

    if (year < 1900) {
      return { isValid: false, error: 'Please enter a valid date.' };
    }

    return { isValid: true, dayNumber: day };
  }

  // Fallback for direct single day number entry (1-31)
  const numericDay = parseInt(rawDateStr, 10);
  if (!isNaN(numericDay) && numericDay >= 1 && numericDay <= 31) {
    return { isValid: true, dayNumber: numericDay };
  }

  return { isValid: false, error: 'Please enter a valid date.' };
}

export interface DetailedGreenDayResult extends GreenDayInfo {
  isToday: boolean;
  message: string;
  monthName: string;
  targetDayInMonth: number;
}

/**
 * Calculates the next recurring Green Day from the birth day number (1-31),
 * using the local device clock.
 * 
 * Rules:
 * 1. If today is before this month's Green Day -> this month's Green Day.
 * 2. If today is exactly Green Day -> today is Green Day!
 * 3. If today is after this month's Green Day -> next month's Green Day.
 * 4. Month-end rule: If Green Day is 29, 30, or 31 and does not exist in target month,
 *    use the last available day of that month (taking leap years into account).
 */
export function calculateNextGreenDay(
  dayNumber: number,
  refDate: Date = new Date()
): DetailedGreenDayResult {
  const sanitizedDay = Math.max(1, Math.min(31, Math.floor(dayNumber)));

  const currentYear = refDate.getFullYear();
  const currentMonth = refDate.getMonth();
  const currentDay = refDate.getDate();

  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
  const actualTargetDayThisMonth = Math.min(sanitizedDay, daysInCurrentMonth);

  let targetYear = currentYear;
  let targetMonth = currentMonth;
  let targetDay = actualTargetDayThisMonth;
  let wasAdjusted = sanitizedDay > daysInCurrentMonth;

  const todayMidnight = new Date(currentYear, currentMonth, currentDay).getTime();
  const thisMonthTargetMidnight = new Date(currentYear, currentMonth, actualTargetDayThisMonth).getTime();

  const isToday = thisMonthTargetMidnight === todayMidnight;

  if (thisMonthTargetMidnight < todayMidnight) {
    // Target day in current month has already passed -> advance to next month
    targetMonth += 1;
    if (targetMonth > 11) {
      targetMonth = 0;
      targetYear += 1;
    }
    const daysInNextMonth = getDaysInMonth(targetYear, targetMonth);
    targetDay = Math.min(sanitizedDay, daysInNextMonth);
    wasAdjusted = sanitizedDay > daysInNextMonth;
  }

  const nextDate = new Date(targetYear, targetMonth, targetDay, 0, 0, 0, 0);

  const diffTime = nextDate.getTime() - todayMidnight;
  const daysRemaining = Math.max(0, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formattedNextDate = `${targetDay} ${monthNames[targetMonth]} ${targetYear}`;

  let adjustmentNote: string | undefined;
  if (wasAdjusted) {
    adjustmentNote = `${monthNames[targetMonth]} has ${targetDay} days. Following the Birthday Green rule, your Green Day takes place on the month's final day (${targetDay} ${monthNames[targetMonth]}).`;
  }

  const ordinal = getOrdinalSuffix(sanitizedDay);

  // Deterministic message (No AI generation, clean, honest)
  const message = `The ${ordinal} isn't just a date anymore. It's your reminder to grow.`;

  return {
    dayNumber: sanitizedDay,
    nextDate,
    daysRemaining: isToday ? 0 : daysRemaining,
    formattedNextDate,
    isAdjustedForMonthEnd: wasAdjusted,
    adjustmentNote,
    cycleFrequency: `Every ${ordinal} of the month`,
    isToday,
    message,
    monthName: monthNames[targetMonth],
    targetDayInMonth: targetDay,
  };
}

export interface CalendarDayCell {
  dayNumber: number;
  isGreenDay: boolean;
  isToday: boolean;
  isTargetMonthDay: boolean;
}

/**
 * Builds the visual monthly calendar grid for the upcoming Green Day's month.
 */
export function buildMonthCalendarGrid(
  year: number,
  monthIndex0: number,
  greenDayNumber: number,
  refDate: Date = new Date()
): {
  monthName: string;
  year: number;
  days: CalendarDayCell[];
  paddingDays: number;
} {
  const daysInMonth = getDaysInMonth(year, monthIndex0);
  const firstDayOfWeek = new Date(year, monthIndex0, 1).getDay(); // 0 = Sun
  const activeGreenDayInMonth = Math.min(greenDayNumber, daysInMonth);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = refDate.getFullYear();
  const currentMonth = refDate.getMonth();
  const currentDate = refDate.getDate();

  const days: CalendarDayCell[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = year === currentYear && monthIndex0 === currentMonth && d === currentDate;
    const isGreenDay = d === activeGreenDayInMonth;
    days.push({
      dayNumber: d,
      isGreenDay,
      isToday,
      isTargetMonthDay: true,
    });
  }

  return {
    monthName: monthNames[monthIndex0],
    year,
    days,
    paddingDays: firstDayOfWeek,
  };
}
