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

