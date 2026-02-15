import type CourtSlot from '../court/CourtSlot';

interface ReservationFees {
    serviceFee: number;
    hourlyFees: CourtSlot[];
}

export default ReservationFees;
