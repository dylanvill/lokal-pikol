import type { UuidString } from '../types/String';

type ReservationCalendarItemType = 'reservation' | 'block_reservation';

interface ReservationCalendarItem {
    id: UuidString | null;
    type: ReservationCalendarItemType;
    title: string;
    start: string;
    end: string;
    name: string;
    courtName: string;
    formattedDate: string;
    formattedTimeRange: string;
}

export type { ReservationCalendarItemType };
export default ReservationCalendarItem;
