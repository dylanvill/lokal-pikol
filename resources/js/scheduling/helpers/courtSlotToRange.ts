import type CourtSlot from '../models/CourtSlot';
import { type Range } from '../types/DateTime';
import sortSlots from './sortSlots';

const courtSlotsToRange = (slots: CourtSlot[]): Range => {
    const sorted = sortSlots(slots);
    return {
        startTime: sorted[0].slot.split(' - ')[0],
        endTime: sorted[sorted.length - 1].slot.split(' - ')[1],
    };
};

export default courtSlotsToRange;
