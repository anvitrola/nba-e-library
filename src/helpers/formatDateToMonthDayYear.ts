export function formatDateToMonthDayYear(inputDateString: string) {
    // Parse the input date string
    const inputDate = new Date(inputDateString);

    // Extract year, month, and day components
    const year = inputDate.getUTCFullYear();
    const month = inputDate.getUTCMonth() + 1; // Months are zero-based
    const day = inputDate.getUTCDate();

    // Format the date as month/day/year
    const outputDateString = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${(year % 100).toString().padStart(2, '0')}`;

    return outputDateString;
}
