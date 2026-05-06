import { type UuidString } from '../types/String';
import type CourtSlot from './CourtSlot';

interface BlockReservation {
    dayOfTheWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    slots: {
        id: UuidString;
        slots: CourtSlot[];
    };
}

export default BlockReservation;
