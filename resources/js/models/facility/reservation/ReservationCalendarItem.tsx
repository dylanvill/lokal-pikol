import type ReservationStatus from '../../customer/reservation/ReservationStatus';

interface ReservationCalendarItem {
    id: string;
    customerName: string;
    reservationDate: string;
    startTime: string;
    endTime: string;
    status: ReservationStatus;
}

export default ReservationCalendarItem;
