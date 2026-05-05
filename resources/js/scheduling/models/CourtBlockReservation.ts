import { type UuidString } from '../types/String';
import type BlockReservation from './BlockReservation';

interface CourtBlockReservation {
    id: UuidString;
    name: string;
    blockReservations: BlockReservation[];
    createdAt: string;
}

export default CourtBlockReservation;
