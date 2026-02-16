import type Court from '../court/Court';
import type CourtSlot from '../../shared/CourtSlot';
import type Facility from '../facility/Facility';
import type ReservationFees from '../../shared/ReservationFees';
import type ReservationStatus from './ReservationStatus';

interface Reservation {
    id: string;
    facility: Facility;
    court: Court;
    slots: CourtSlot[];
    reservationDate: string;
    status: ReservationStatus;
    fees: ReservationFees;
    startTime: string;
    endTime: string;
}

export default Reservation;
