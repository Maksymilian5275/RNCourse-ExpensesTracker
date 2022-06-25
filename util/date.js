export function getFormattedDate(date) {
    const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    return `${date.getDate()}/${month[date.getMonth()]}/${date.getFullYear()}`;
}

export function getDateMinusDays(date,days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()-days);
}