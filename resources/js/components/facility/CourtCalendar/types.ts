import type CourtCalendarItem from '../../../models/facility/CourtCalendarItem';

export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    resource: CourtCalendarItem;
}
