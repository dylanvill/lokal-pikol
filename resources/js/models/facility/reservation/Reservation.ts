import type ReservationStatus from '../../customer/reservation/ReservationStatus';
import type CourtSlot from '../../shared/CourtSlot';
import type Photo from '../../shared/Photo';
import type ReservationFees from '../../shared/ReservationFees';
import type Court from '../Court';
import type Customer from '../customer/Customer';

interface Reservation {
    id: string;
    reservationDate: string;
    startTime: string;
    endTime: string;
    customer: Customer
    court: Court;
    status: ReservationStatus;
    fees: ReservationFees;
    paymentReceipt: Photo;
    createdAt: string;
    slots: CourtSlot[];
}

export default Reservation;
