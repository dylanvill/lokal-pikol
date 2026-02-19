import type ReservationStatus from '../customer/reservation/ReservationStatus';

interface CourtCalendarItem {
    id: string;
    customerName: string;
    reservationDate: string; // ISO date string (e.g., "2026-02-20")
    startTime: string; // ISO time string (e.g., "09:00:00")
    endTime: string; // ISO time string (e.g., "11:00:00")
    status: ReservationStatus;
}

export default CourtCalendarItem;
