import type CourtCalendarItem from "./CourtCalendarItem";

interface CourtCalendar {
    id: string;
    courtName: string;
    openingTime: string;
    closingTime: string;
    reservations: CourtCalendarItem[];
}

export default CourtCalendar;