import type CourtSlot from './CourtSlot';

interface BlockReservation {
    dayOfTheWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    slots: CourtSlot[];
}

export default BlockReservation;
