import type { UuidString } from '../types/String';

type ReservationCalendarItemType = 'reservation' | 'block_reservation';

interface ReservationCalendarItem {
    id: UuidString;
    type: ReservationCalendarItemType;
    title: string;
    start: string;
    end: string;
    courtName: string;
    dateDisplay: string;
    timeDisplay: string;
}

export type { ReservationCalendarItemType };
export default ReservationCalendarItem;
