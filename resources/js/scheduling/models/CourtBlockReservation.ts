import { type UuidString } from '../types/String';
import type BlockReservation from './BlockedReservation';

interface CourtBlockReservation {
    id: UuidString;
    name: string;
    blockedReservations: BlockReservation[];
    createdAt: string;
}

export default CourtBlockReservation;
