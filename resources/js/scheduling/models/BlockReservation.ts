import { type UuidString } from '../types/String';
import type CourtSlot from './CourtSlot';

interface BlockReservation {
    id: UuidString;
    name: string;
    courtId: UuidString;
    courtName: string;
    dayOfTheWeek: string;
    blockedSlots: CourtSlot[];
}

export default BlockReservation;
