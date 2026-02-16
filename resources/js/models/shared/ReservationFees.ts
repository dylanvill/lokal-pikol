import type CourtSlot from './CourtSlot';

interface ReservationFees {
    serviceFee: number;
    hourlyFees: CourtSlot[];
}

export default ReservationFees;
