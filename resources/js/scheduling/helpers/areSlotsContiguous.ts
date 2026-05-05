import type CourtSlot from '../models/CourtSlot';
import sortSlots from './sortSlots';

const areSlotsContiguous = (slots: CourtSlot[]): boolean => {
    const sorted = sortSlots(slots);
    for (let i = 0; i < sorted.length - 1; i++) {
        const currentEnd = sorted[i].slot.split(' - ')[1];
        const nextStart = sorted[i + 1].slot.split(' - ')[0];
        if (currentEnd !== nextStart) return false;
    }
    return true;
};

export default areSlotsContiguous;
