export interface DynamicCourseTimeframe {
  duration: string;
  startDate: string;
  endDate: string;
  periodText: string;
}

export function computeDynamicTimeframe(
  firstActivityDate?: Date | string | null,
  completionDate?: Date | string | null,
  estimatedHours?: number
): DynamicCourseTimeframe {
  const compDate = completionDate ? new Date(completionDate) : new Date();

  let startDateObj: Date;
  if (firstActivityDate) {
    startDateObj = new Date(firstActivityDate);
  } else {
    // If no explicit start date recorded yet, compute realistic start date based on estimated course hours
    const weeksCount = Math.max(1, Math.round((estimatedHours || 60) / 15));
    startDateObj = new Date(compDate.getTime() - weeksCount * 7 * 24 * 60 * 60 * 1000);
  }

  // Calculate actual elapsed duration in weeks based on start and completion timestamps
  const diffMs = Math.max(0, compDate.getTime() - startDateObj.getTime());
  const diffDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const weeks = Math.max(1, Math.round(diffDays / 7));
  const duration = `${weeks} ${weeks === 1 ? 'Week' : 'Weeks'}`;

  const startMonthYear = startDateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const endMonthYear = compDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const startMonth = startDateObj.toLocaleDateString('en-US', { month: 'long' });
  const startYear = startDateObj.getFullYear();
  const endMonth = compDate.toLocaleDateString('en-US', { month: 'long' });
  const endYear = compDate.getFullYear();

  let periodText = '';
  if (startYear === endYear) {
    if (startMonth === endMonth) {
      periodText = `${startMonth} ${startYear}`;
    } else {
      periodText = `${startMonth} – ${endMonth} ${startYear}`;
    }
  } else {
    periodText = `${startMonthYear} – ${endMonthYear}`;
  }

  return {
    duration,
    startDate: startMonthYear,
    endDate: endMonthYear,
    periodText,
  };
}
