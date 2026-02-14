import type Court from '../court/Court';
import type CourtSlot from '../court/CourtSlot';
import type Facility from '../facility/Facility';
import type ReservationStatus from './ReservationStatus';

interface Reservation {
    id: string;
    facility: Facility;
    court: Court;
    slots: CourtSlot[];
    reservationDate: string;
    status: ReservationStatus;
}

export default Reservation;
