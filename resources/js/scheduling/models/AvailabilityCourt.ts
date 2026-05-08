import { type UuidString } from '../types/String';
import type CourtSlot from './CourtSlot';

interface AvailabilityCourt {
    id: UuidString;
    name: string;
    slots: CourtSlot[];
}

export default AvailabilityCourt;
