type DateRange = [Date | null, Date | null];
export function getDefaultWeekRange(): DateRange {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    const dayOfWeek = currentDate.getDay();
    const diff = (dayOfWeek + 6) % 7; // Calculate the difference from Sunday to Monday
    startOfWeek.setDate(currentDate.getDate() - diff);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 5); // Set to Saturday of the current week
    return [startOfWeek, endOfWeek];
}

export function handlePreviousWeek(startDate: Date | null): DateRange {
    const newEndDate = new Date(startDate || new Date());
    const newStartDate = new Date(newEndDate);
  
    // Calculate the days to Monday and Sunday
    const daysToMonday = (newStartDate.getDay() + 7) % 7; // Calculate days from current day to Monday
    const daysToSunday = (newEndDate.getDay() + 7) % 6; // Calculate days from current day to Sunday
  
    // Calculate the start and end dates for the previous week
    newStartDate.setDate(newStartDate.getDate() - daysToMonday - 6); // Set to Monday of the previous week
    newEndDate.setDate(newEndDate.getDate() - daysToSunday); // Set to Sunday of the previous week
  
    return [newStartDate, newEndDate];
  }
  
  export function getPreviousWeekRange(baseDate: Date): DateRange {
    const previousWeekDate = new Date(baseDate);
    previousWeekDate.setDate(baseDate.getDate() - 7);
    return getDefaultWeekRangeFromBase(previousWeekDate);
}

function getDefaultWeekRangeFromBase(baseDate: Date): DateRange {
    const startOfWeek = new Date(baseDate);
    const dayOfWeek = baseDate.getDay();
    const diff = (dayOfWeek + 6) % 7; // Calculate the difference from Sunday to Monday
    startOfWeek.setDate(baseDate.getDate() - diff);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 5); // Set to Saturday of the current week
    return [startOfWeek, endOfWeek];
}