import type BlockBooking from "./BlockBooking";

interface CourtBlockBooking {
    id: string;
    name: string;
    covered: boolean;
    blockBookings: BlockBooking[];
}

export default CourtBlockBooking;
