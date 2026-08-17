export interface StreakData {
  streak_count: number;
  last_active_date: string | null; // ISO YYYY-MM-DD format
}

/**
 * Calculates updated streak information based on activity on a given ISO date string.
 * @param currentData Existing streak count and last active date
 * @param activityDateStr ISO YYYY-MM-DD date string (defaults to today in local calendar)
 */
export function calculateUpdatedStreak(
  currentData: StreakData,
  activityDateStr?: string
): StreakData {
  const todayStr = activityDateStr || new Date().toISOString().split('T')[0];

  // If no previous activity, start 1-day streak
  if (!currentData.last_active_date) {
    return {
      streak_count: 1,
      last_active_date: todayStr,
    };
  }

  const lastDateStr = currentData.last_active_date;

  // Same calendar day: streak remains unchanged
  if (lastDateStr === todayStr) {
    return {
      streak_count: Math.max(1, currentData.streak_count),
      last_active_date: todayStr,
    };
  }

  // Calculate day difference using UTC dates to avoid timezone daylight savings issues
  const lastDateParts = lastDateStr.split('-').map(Number);
  const todayDateParts = todayStr.split('-').map(Number);

  const lastUtc = Date.UTC(lastDateParts[0], lastDateParts[1] - 1, lastDateParts[2]);
  const todayUtc = Date.UTC(todayDateParts[0], todayDateParts[1] - 1, todayDateParts[2]);

  const diffDays = Math.round((todayUtc - lastUtc) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Next consecutive calendar day: increment streak
    return {
      streak_count: currentData.streak_count + 1,
      last_active_date: todayStr,
    };
  } else if (diffDays > 1) {
    // Missed a day or more: reset streak to 1
    return {
      streak_count: 1,
      last_active_date: todayStr,
    };
  } else {
    // Activity date is earlier than last_active_date (e.g. out of order time sync), keep current
    return currentData;
  }
}

const LOCAL_STREAK_KEY = 'learntech_guest_streak';

/**
 * Reads local guest streak from localStorage.
 */
export function getGuestStreak(): StreakData {
  if (typeof window === 'undefined') {
    return { streak_count: 0, last_active_date: null };
  }
  try {
    const raw = localStorage.getItem(LOCAL_STREAK_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StreakData;
      if (!parsed.last_active_date) return { streak_count: 0, last_active_date: null };

      const todayStr = new Date().toISOString().split('T')[0];
      const lastDateParts = parsed.last_active_date.split('-').map(Number);
      const todayDateParts = todayStr.split('-').map(Number);

      const lastUtc = Date.UTC(lastDateParts[0], lastDateParts[1] - 1, lastDateParts[2]);
      const todayUtc = Date.UTC(todayDateParts[0], todayDateParts[1] - 1, todayDateParts[2]);
      const diffDays = Math.round((todayUtc - lastUtc) / (1000 * 60 * 60 * 24));

      if (diffDays > 1) {
        const resetData = { streak_count: 0, last_active_date: parsed.last_active_date };
        localStorage.setItem(LOCAL_STREAK_KEY, JSON.stringify(resetData));
        return resetData;
      }
      return parsed;
    }
  } catch {
    // Ignore localStorage error
  }
  return { streak_count: 0, last_active_date: null };
}

/**
 * Records activity for guest user and returns updated streak.
 */
export function recordGuestActivity(): StreakData {
  if (typeof window === 'undefined') {
    return { streak_count: 1, last_active_date: new Date().toISOString().split('T')[0] };
  }
  try {
    const current = getGuestStreak();
    const updated = calculateUpdatedStreak(current);
    localStorage.setItem(LOCAL_STREAK_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return { streak_count: 1, last_active_date: new Date().toISOString().split('T')[0] };
  }
}
