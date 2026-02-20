import type ReservationStatus from '../../customer/reservation/ReservationStatus';
import type Photo from '../../shared/Photo';

interface ReservationListItem {
    id: string;
    courtName: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    reservationDate: string;
    startTime: string;
    endTime: string;
    status: ReservationStatus;
    paymentReceipt: Photo;
    createdAt: string;
}

export default ReservationListItem;
