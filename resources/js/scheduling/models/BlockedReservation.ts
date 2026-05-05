import type CourtSlot from './CourtSlot';

interface BlockedReservation {
    dayOfTheWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    slots: CourtSlot[];
}

export default BlockedReservation;
