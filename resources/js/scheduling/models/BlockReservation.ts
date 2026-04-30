import { type UuidString } from '../types/String';

interface BlockReservation {
    id: UuidString;
    name: string;
    courtId: UuidString;
    courtName: string;
    dayOfTheWeek: string;
    startTime: string;
    endTime: string;
}

export default BlockReservation;
