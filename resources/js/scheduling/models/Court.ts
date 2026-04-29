import { type UuidString } from '../types/String';
import type CourtSlot from './CourtSlot';

interface Court {
    id: UuidString;
    name: string;
    slots: CourtSlot[];
    createdAt: string;
}

export default Court;
