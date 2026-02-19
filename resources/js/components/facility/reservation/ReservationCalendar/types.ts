import type ReservationCalendarItem from '../../../../models/facility/reservation/ReservationCalendarItem';

export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    resource: ReservationCalendarItem;
}
