interface CourtCalendarItem {
    id: string;
    type: string;
    label: string;
    reservationDate: string;
    startTime: string;
    endTime: string;
    metadata: Record<string, string | number | boolean>;
}
export default CourtCalendarItem;
